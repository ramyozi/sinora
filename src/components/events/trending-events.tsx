import { Flame } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type { EventOccurrence, SinoraEvent } from "@/data/events";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { EventCard } from "./event-card";

interface Entry {
  event: SinoraEvent;
  occurrence: EventOccurrence;
}

interface Props {
  entries: Entry[];
  cityBySlug: Record<string, City>;
  imageBySlug: Record<string, WikiLeadImage | null>;
  locale: Locale;
  dict: Dictionary;
}

// Section Trending now : events les plus chauds en cours ou dans les 30 jours.
export function TrendingEvents({
  entries,
  cityBySlug,
  imageBySlug,
  locale,
  dict,
}: Props) {
  if (entries.length === 0) return null;
  const ev = dict.events;

  return (
    <section>
      <div className="flex items-center gap-2">
        <Flame className="size-5 text-accent" />
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {ev.trendingTitle}
        </h2>
      </div>
      <p className="mt-2 text-sm text-muted">{ev.trendingSubtitle}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(({ event, occurrence }) => (
          <EventCard
            key={`${event.slug}-trending`}
            event={event}
            occurrence={occurrence}
            city={cityBySlug[event.citySlug]}
            image={imageBySlug[event.slug] ?? null}
            locale={locale}
            dict={dict}
          />
        ))}
      </div>
    </section>
  );
}

/**
 * Selectionne les events les plus chauds : popularityScore eleve OU prioritaires,
 * en cours ou dans les `windowDays` prochains jours. Trie par popularite.
 */
export function pickTrending(
  entries: Entry[],
  windowDays = 30,
  limit = 6,
): Entry[] {
  const now = new Date();
  const windowEnd = new Date(now.getTime() + windowDays * 86_400_000);
  const nowKey = dateKey(now);
  const endKey = dateKey(windowEnd);
  const eligible = entries.filter(({ occurrence }) => {
    return occurrence.end >= nowKey && occurrence.start <= endKey;
  });
  return [...eligible]
    .sort((a, b) => {
      const pa = a.event.popularityScore ?? 0;
      const pb = b.event.popularityScore ?? 0;
      if (pb !== pa) return pb - pa;
      // En cas d'egalite, prefere l'occurrence imminente.
      return a.occurrence.start.localeCompare(b.occurrence.start);
    })
    .slice(0, limit);
}

function dateKey(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
