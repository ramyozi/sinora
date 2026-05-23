import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCities, type City } from "@/data/cities";
import {
  getAllEvents,
  getEventBySlug,
  getSimilarEvents,
  type EventOccurrence,
  type SinoraEvent,
} from "@/data/events";
import { getWikiLeadImage } from "@/lib/api/providers/wiki-image";
import { Container } from "@/components/ui/container";
import {
  EventDetail,
  type SimilarEntry,
} from "@/components/events/event-detail";

// Pre-genere chaque page evenement pour les trois langues.
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllEvents().map((e) => ({ locale, slug: e.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: `${event.title[locale]} - Sinora`,
    description: event.summary[locale],
    alternates: { canonical: `/${locale}/events/${slug}` },
  };
}

// Choisit l'occurrence pertinente : celle en cours, sinon la prochaine
// future, sinon la derniere connue.
function relevantOccurrence(event: SinoraEvent): EventOccurrence {
  const today = new Date().toISOString().slice(0, 10);
  const ongoing = event.occurrences.find(
    (o) => o.start <= today && o.end >= today,
  );
  if (ongoing) return ongoing;
  const upcoming = event.occurrences
    .filter((o) => o.start > today)
    .sort((a, b) => a.start.localeCompare(b.start));
  if (upcoming[0]) return upcoming[0];
  return (
    [...event.occurrences].sort((a, b) => b.start.localeCompare(a.start))[0] ??
    event.occurrences[0]
  );
}

// Resout l'image d'un evenement : article Wikipedia, sinon image directe.
async function resolveImage(event: SinoraEvent, host: City | undefined) {
  if (event.wikiTitle) {
    const image = await getWikiLeadImage(event.wikiTitle);
    if (image) return image;
  }
  if (event.imageUrl) {
    return { url: event.imageUrl, width: 0, height: 0, articleUrl: "" };
  }
  // Repli : image de la ville hote, pour ne jamais laisser un hero vide.
  if (host?.wikiTitle) return getWikiLeadImage(host.wikiTitle);
  return null;
}

export default async function EventPage({
  params,
}: PageProps<"/[locale]/events/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const event = getEventBySlug(slug);
  if (!event) notFound();
  const dict = await getDictionary(locale);

  const cityBySlug = new Map(getAllCities().map((c) => [c.slug, c]));
  const city = cityBySlug.get(event.citySlug);
  const occurrence = relevantOccurrence(event);

  // Images : couverture + galerie, en parallele.
  const [cover, ...gallery] = await Promise.all([
    resolveImage(event, city),
    ...(event.galleryWikiTitles ?? []).map((t) => getWikiLeadImage(t)),
  ]);
  const galleryImages = gallery.filter(
    (img): img is NonNullable<typeof img> => Boolean(img),
  );

  // Evenements similaires + leurs images.
  const similarEvents = getSimilarEvents(event, 3);
  const similarImages = await Promise.all(
    similarEvents.map((e) => resolveImage(e, cityBySlug.get(e.citySlug))),
  );
  const similar: SimilarEntry[] = similarEvents.map((e, i) => ({
    event: e,
    occurrence: relevantOccurrence(e),
    city: cityBySlug.get(e.citySlug),
    image: similarImages[i] ?? null,
  }));

  return (
    <Container className="py-5 sm:py-12">
      <EventDetail
        event={event}
        occurrence={occurrence}
        city={city}
        cover={cover ?? null}
        gallery={galleryImages}
        similar={similar}
        locale={locale}
        dict={dict}
      />
    </Container>
  );
}
