"use client";

import { Flame, CalendarRange, AlertTriangle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type { SinoraEvent, EventOccurrence } from "@/data/events";

interface Match {
  event: SinoraEvent;
  occurrence: EventOccurrence;
  /** Distance entre la ville de l'evenement et le voyage (km approx). */
  proximityKm?: number;
}

interface Props {
  /** Events qui chevauchent les villes selectionnees ET les dates du voyage. */
  matchesInRoute: Match[];
  /** Events proches en geographie / temps, non encore inclus. */
  nearbyEvents: Match[];
  /** Events avec conflit temporel detecte (extreme crowd pendant le sejour). */
  conflicts: Match[];
  cityBySlug: Record<string, City>;
  locale: Locale;
  dict: Dictionary;
  /** Action sur clic "Ajouter cette ville". */
  onAddCity?: (slug: string) => void;
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

// Vue synthetique des evenements liés a l'itineraire en cours :
// dans le voyage, a proximite, ou en conflit. Apparait sous les disclosures.
export function EventOverlay({
  matchesInRoute,
  nearbyEvents,
  conflicts,
  cityBySlug,
  locale,
  dict,
  onAddCity,
}: Props) {
  const total = matchesInRoute.length + nearbyEvents.length + conflicts.length;
  if (total === 0) return null;
  const eo = dict.routePlanner.eventOverlay;

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header className="flex items-center gap-2">
        <Flame className="size-4 text-accent" />
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {eo.title}
        </h3>
      </header>
      <p className="mt-1 text-xs text-muted">{eo.subtitle}</p>

      {matchesInRoute.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <CalendarRange className="size-3.5 text-accent" />
            {eo.inRouteTitle}
          </div>
          <ul className="mt-2 space-y-1.5">
            {matchesInRoute.map(({ event, occurrence }) => (
              <li
                key={event.slug}
                className="flex items-start gap-2 rounded-card bg-accent/10 p-2 text-xs text-foreground"
              >
                <span aria-hidden>🔥</span>
                <div className="flex-1">
                  <div className="font-medium">{event.title[locale]}</div>
                  <div className="text-muted">
                    {cityBySlug[event.citySlug]?.name[locale]} ·{" "}
                    {formatRange(occurrence.start, occurrence.end, locale)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {conflicts.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <AlertTriangle className="size-3.5 text-amber-500" />
            {eo.conflictsTitle}
          </div>
          <ul className="mt-2 space-y-1.5">
            {conflicts.map(({ event, occurrence }) => (
              <li
                key={event.slug}
                className="flex items-start gap-2 rounded-card bg-amber-500/10 p-2 text-xs text-foreground"
              >
                <span aria-hidden>⚠️</span>
                <div className="flex-1">
                  <div className="font-medium">{event.title[locale]}</div>
                  <div className="text-muted">
                    {cityBySlug[event.citySlug]?.name[locale]} ·{" "}
                    {formatRange(occurrence.start, occurrence.end, locale)} ·{" "}
                    {eo.conflictHint}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {nearbyEvents.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <CalendarRange className="size-3.5 text-sky-500" />
            {eo.nearbyTitle}
          </div>
          <ul className="mt-2 space-y-1.5">
            {nearbyEvents.map(({ event, occurrence, proximityKm }) => (
              <li
                key={event.slug}
                className="flex items-start gap-2 rounded-card bg-sky-500/10 p-2 text-xs text-foreground"
              >
                <span aria-hidden>📍</span>
                <div className="flex-1">
                  <div className="font-medium">{event.title[locale]}</div>
                  <div className="text-muted">
                    {cityBySlug[event.citySlug]?.name[locale]} ·{" "}
                    {formatRange(occurrence.start, occurrence.end, locale)}
                    {proximityKm != null
                      ? ` · ~${Math.round(proximityKm)} km`
                      : ""}
                  </div>
                </div>
                {onAddCity && (
                  <button
                    type="button"
                    onClick={() => onAddCity(event.citySlug)}
                    className="shrink-0 rounded-full border border-sky-500/40 px-2 py-0.5 text-sky-500 transition-colors hover:bg-sky-500/10"
                  >
                    {eo.addCity}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
