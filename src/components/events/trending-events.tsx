import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type { EventCategory, EventOccurrence, SinoraEvent } from "@/data/events";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { localizedPath } from "@/lib/navigation";

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

const categoryColor: Record<EventCategory, string> = {
  festival: "bg-accent/15 text-accent",
  religious: "bg-violet-500/15 text-violet-500",
  food: "bg-amber-500/15 text-amber-500",
  music: "bg-rose-500/15 text-rose-500",
  sport: "bg-emerald-500/15 text-emerald-500",
  national: "bg-red-500/15 text-red-500",
  lantern: "bg-orange-500/15 text-orange-500",
  "ice-snow": "bg-sky-500/15 text-sky-500",
  art: "bg-fuchsia-500/15 text-fuchsia-500",
  tech: "bg-cyan-500/15 text-cyan-500",
};

function formatShort(start: string, end: string, locale: Locale): string {
  const tag = locale === "zh" ? "zh-CN" : locale === "en" ? "en-GB" : "fr-FR";
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString(tag, {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
    });
  return start === end ? fmt(start) : `${fmt(start)} - ${fmt(end)}`;
}

// Bandeau "tendances" : strip horizontale de mini-cartes plutot que grille
// pleine page. Garde la recherche en dessous immediatement visible sur mobile.
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
    <section className="-mx-4 sm:mx-0">
      <header className="flex items-center gap-2 px-4 sm:px-0">
        <Flame className="size-4 text-accent" />
        <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
          {ev.trendingTitle}
        </h2>
      </header>

      <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:px-0 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {entries.map(({ event, occurrence }) => {
          const city = cityBySlug[event.citySlug];
          const image = imageBySlug[event.slug] ?? null;
          return (
            <Link
              key={`${event.slug}-trending`}
              href={localizedPath(`/events/${event.slug}`, locale)}
              className="group w-44 shrink-0 snap-start sm:w-52"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-muted">
                {image ? (
                  <Image
                    src={image.url}
                    alt={event.title[locale]}
                    fill
                    sizes="(max-width: 640px) 45vw, 220px"
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="grid h-full place-items-center text-xl"
                    aria-hidden
                  >
                    🎉
                  </div>
                )}
                <span
                  className={`absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${categoryColor[event.category]}`}
                >
                  {ev.categories[event.category]}
                </span>
              </div>
              <div className="mt-2">
                <div className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                  {event.title[locale]}
                </div>
                <div className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {city ? `${city.name[locale]} · ` : ""}
                  {formatShort(occurrence.start, occurrence.end, locale)}
                </div>
              </div>
            </Link>
          );
        })}
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
