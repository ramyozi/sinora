import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCities } from "@/data/cities";
import {
  computeEditorialScore,
  getAllActivities,
  sortByEditorialScore,
} from "@/data/activities";
import { getWikiLeadImage } from "@/lib/api/providers/wiki-image";
import { Container } from "@/components/ui/container";
import {
  ActivitiesExplorer,
  type ActivityEntry,
} from "@/components/activities/activities-explorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.activities.meta.title,
    description: dict.activities.meta.description,
    alternates: { canonical: `/${locale}/activites` },
  };
}

// Page exploration des activites : hero + explorateur filtrable. Les images
// sont pre-fetchees cote serveur (Wikipedia) et passees a l'explorateur, qui
// gere ensuite tout le filtrage cote client.
export default async function ActivitiesPage({
  params,
}: PageProps<"/[locale]/activites">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  // Activites triees par score editorial : la grille s'ouvre sur les
  // meilleures experiences.
  const ranked = sortByEditorialScore(getAllActivities());

  // Resolution des images de couverture :
  // - tier generated : URL deja resolue par le pipeline (coverImageUrl)
  // - tier curated : image en tete d'article Wikipedia, fetchee ici
  // L'echec retombe silencieusement sur le degrade de categorie de la carte.
  const images = await Promise.all(
    ranked.map(async (activity) => {
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
    }),
  );

  const entries: ActivityEntry[] = ranked.map((activity, i) => ({
    activity,
    image: images[i] ?? null,
    score: computeEditorialScore(activity),
  }));

  // Villes representees dans le dataset, pour le filtre par ville.
  const allCities = getAllCities();
  const presentCitySlugs = new Set(ranked.map((a) => a.citySlug));
  const cities = allCities
    .filter((c) => presentCitySlugs.has(c.slug))
    .map((c) => ({ slug: c.slug, name: c.name[locale] }))
    .sort((x, y) => x.name.localeCompare(y.name, locale));

  return (
    <Container className="py-6 sm:py-14">
      <header className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          {entries.length} {dict.activities.countLabel}
        </span>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:mt-4 sm:text-5xl">
          {dict.activities.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.activities.subtitle}
        </p>
      </header>

      <div className="mt-8">
        <ActivitiesExplorer
          entries={entries}
          cities={cities}
          locale={locale}
          dict={dict}
        />
      </div>
    </Container>
  );
}
