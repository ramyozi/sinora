import Image from "next/image";
import Link from "next/link";
import { CalendarRange, MapPin, Sparkles, Users } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type {
  EventCategory,
  EventCrowd,
  EventOccurrence,
  SinoraEvent,
} from "@/data/events";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { localizedPath } from "@/lib/navigation";

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

const crowdLabel: Record<EventCrowd, string> = {
  calme: "•",
  modere: "••",
  dense: "•••",
  extreme: "••••",
};

interface Props {
  event: SinoraEvent;
  /** Occurrence pertinente a afficher (la plus proche dans le futur). */
  occurrence: EventOccurrence;
  city: City | undefined;
  image: WikiLeadImage | null;
  locale: Locale;
  dict: Dictionary;
}

function formatRange(start: string, end: string, locale: Locale): string {
  const tag = locale === "zh" ? "zh-CN" : locale === "en" ? "en-GB" : "fr-FR";
  const s = new Date(`${start}T00:00:00Z`).toLocaleDateString(tag, {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
  if (start === end) return s;
  const e = new Date(`${end}T00:00:00Z`).toLocaleDateString(tag, {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
  return `${s} - ${e}`;
}

// Carte evenement : photo Wikipedia, infos cles, deux CTAs vers le planner.
export function EventCard({
  event,
  occurrence,
  city,
  image,
  locale,
  dict,
}: Props) {
  const ev = dict.events;
  const params = new URLSearchParams({
    cities: event.citySlug,
    eventStart: occurrence.start,
    eventEnd: occurrence.end,
    eventSlug: event.slug,
  });
  const plannerHref = `${localizedPath("/route-planner", locale)}?${params.toString()}`;
  const optimizeHref = `${plannerHref}&optimizeAround=1`;

  return (
    <article className="overflow-hidden rounded-card border border-border bg-surface">
      <div className="relative aspect-[16/9] bg-surface-muted">
        {image ? (
          <Image
            src={image.url}
            alt={event.title[locale]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-3xl" aria-hidden>
            🎉
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${categoryColor[event.category]}`}
        >
          {ev.categories[event.category]}
        </span>
        <span
          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-xs font-medium text-muted backdrop-blur"
          title={ev.crowdLabels[event.crowd]}
        >
          <Users className="size-3" />
          {crowdLabel[event.crowd]}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-foreground">
          {event.title[locale]}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <CalendarRange className="size-3.5" />
            {formatRange(occurrence.start, occurrence.end, locale)}
          </span>
          {city && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {city.name[locale]}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-muted line-clamp-3">
          {event.summary[locale]}
        </p>
        {event.venue && (
          <p className="mt-2 text-xs text-foreground/70">
            {event.venue[locale]}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={plannerHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            <Sparkles className="size-3.5" />
            {ev.addToTrip}
          </Link>
          <Link
            href={optimizeHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/40"
          >
            {ev.optimizeAround}
          </Link>
        </div>
      </div>
    </article>
  );
}
