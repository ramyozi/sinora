import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCities } from "@/data/cities";
import {
  computeEditorialScore,
  getActivityBySlug,
  getAllActivities,
  relatedFor,
} from "@/data/activities";
import { getWikiLeadImage } from "@/lib/api/providers/wiki-image";
import { Container } from "@/components/ui/container";
import { ActivityDetail } from "@/components/activities/activity-detail";

// Pre-genere chaque page activite pour les trois langues.
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllActivities().map((a) => ({ locale, slug: a.slug })),
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
    activity.coverWikiTitle
      ? getWikiLeadImage(activity.coverWikiTitle)
      : Promise.resolve(null),
    ...(activity.galleryWikiTitles ?? []).map((t) => getWikiLeadImage(t)),
  ]);
  const galleryImages = gallery.filter(
    (img): img is NonNullable<typeof img> => Boolean(img),
  );

  // Activites liees + leurs images / scores.
  const relatedActivities = relatedFor(activity, 3);
  const relatedImages = await Promise.all(
    relatedActivities.map((r) =>
      r.coverWikiTitle
        ? getWikiLeadImage(r.coverWikiTitle)
        : Promise.resolve(null),
    ),
  );
  const related = relatedActivities.map((r, i) => ({
    activity: r,
    image: relatedImages[i] ?? null,
    cityName: cityBySlug.get(r.citySlug)?.name[locale] ?? r.citySlug,
    score: computeEditorialScore(r),
  }));

  return (
    <Container className="py-8 sm:py-12">
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
