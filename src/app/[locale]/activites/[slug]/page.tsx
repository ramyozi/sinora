import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCities } from "@/data/cities";
import {
  computeEditorialScore,
  curatedActivities,
  getActivityBySlug,
  relatedFor,
} from "@/data/activities";
import {
  getWikiLeadImage,
  type WikiLeadImage,
} from "@/lib/api/providers/wiki-image";
import type { Activity } from "@/data/activities";
import { Container } from "@/components/ui/container";
import { ActivityDetail } from "@/components/activities/activity-detail";

// Resout l'image de couverture d'une activite : URL deja resolue pour le
// tier generated, sinon image en tete d'article Wikipedia pour le curated.
async function resolveCover(
  activity: Activity,
): Promise<WikiLeadImage | null> {
  if (activity.coverImageUrl) {
    return {
      url: activity.coverImageUrl,
      width: 0,
      height: 0,
      articleUrl: activity.coverImageAttribution ?? "",
    };
  }
  if (activity.coverWikiTitle) {
    return getWikiLeadImage(activity.coverWikiTitle);
  }
  return null;
}

// Pre-genere uniquement les pages des activites curated (qualite editoriale,
// volume maitrise). Les activites generees, bien plus nombreuses, sont
// rendues a la demande (dynamicParams reste a true par defaut) pour garder
// un temps de build raisonnable.
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    curatedActivities.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const activity = getActivityBySlug(slug);
  if (!activity) return {};
  return {
    title: `${activity.title[locale]} - Sinora`,
    description: activity.summary[locale],
    alternates: { canonical: `/${locale}/activites/${slug}` },
  };
}

export default async function ActivityPage({
  params,
}: PageProps<"/[locale]/activites/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();
  const dict = await getDictionary(locale);

  const cityBySlug = new Map(getAllCities().map((c) => [c.slug, c]));
  const cityName =
    cityBySlug.get(activity.citySlug)?.name[locale] ?? activity.citySlug;

  // Images : couverture + galerie, fetchees en parallele.
  const [cover, ...gallery] = await Promise.all([
    resolveCover(activity),
    ...(activity.galleryWikiTitles ?? []).map((t) => getWikiLeadImage(t)),
  ]);
  const galleryImages = gallery.filter(
    (img): img is NonNullable<typeof img> => Boolean(img),
  );

  // Activites liees + leurs images / scores.
  const relatedActivities = relatedFor(activity, 3);
  const relatedImages = await Promise.all(
    relatedActivities.map((r) => resolveCover(r)),
  );
  const related = relatedActivities.map((r, i) => ({
    activity: r,
    image: relatedImages[i] ?? null,
    cityName: cityBySlug.get(r.citySlug)?.name[locale] ?? r.citySlug,
    score: computeEditorialScore(r),
  }));

  return (
    <Container className="py-5 sm:py-12">
      <ActivityDetail
        activity={activity}
        cover={cover ?? null}
        gallery={galleryImages}
        cityName={cityName}
        score={computeEditorialScore(activity)}
        related={related}
        locale={locale}
        dict={dict}
      />
    </Container>
  );
}
