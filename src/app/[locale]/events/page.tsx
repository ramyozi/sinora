import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCities, type City } from "@/data/cities";
import { events, type EventOccurrence } from "@/data/events";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { getWikiLeadImage } from "@/lib/api/providers/wiki-image";
import { Container } from "@/components/ui/container";
import { EventsExplorer } from "@/components/events/events-explorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.events.meta.title,
    description: dict.events.meta.description,
    alternates: { canonical: `/${locale}/events` },
  };
}

interface DisplayEntry {
  event: (typeof events)[number];
  occurrence: EventOccurrence;
}

function nextOccurrenceAfter(
  occurrences: EventOccurrence[],
  reference: Date,
): EventOccurrence | undefined {
  const refKey = dateKey(reference);
  // Occurrence en cours d'abord, sinon la prochaine future.
  const ongoing = occurrences.find((o) => o.start <= refKey && o.end >= refKey);
  if (ongoing) return ongoing;
  const upcoming = occurrences
    .filter((o) => o.start > refKey)
    .sort((a, b) => a.start.localeCompare(b.start));
  return upcoming[0];
}

function dateKey(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default async function EventsPage({
  params,
}: PageProps<"/[locale]/events">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  // Selectionner la prochaine occurrence pertinente par evenement.
  const today = new Date();
  const entries: DisplayEntry[] = [];
  for (const event of events) {
    const occ = nextOccurrenceAfter(event.occurrences, today);
    if (occ) entries.push({ event, occurrence: occ });
  }
  entries.sort((a, b) => a.occurrence.start.localeCompare(b.occurrence.start));

  const allCities = getAllCities();
  const cityBySlug: Record<string, City> = Object.fromEntries(
    allCities.map((c) => [c.slug, c]),
  );

  // Pre-fetch images des events en parallel (Wiki, cache 1 semaine).
  const images = await Promise.all(
    entries.map(({ event }) =>
      event.wikiTitle ? getWikiLeadImage(event.wikiTitle) : Promise.resolve(null),
    ),
  );
  const imageBySlug: Record<string, WikiLeadImage | null> = Object.fromEntries(
    entries.map(({ event }, i) => [event.slug, images[i] ?? null]),
  );

  return (
    <Container className="py-12 sm:py-16">
      <header className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          {entries.length} {dict.events.countLabel}
        </span>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.events.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">{dict.events.subtitle}</p>
      </header>

      <div className="mt-10">
        <EventsExplorer
          entries={entries}
          cityBySlug={cityBySlug}
          imageBySlug={imageBySlug}
          locale={locale}
          dict={dict}
        />
      </div>
    </Container>
  );
}
