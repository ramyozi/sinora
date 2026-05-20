"use client";

import { Flag, MapPin, RefreshCw } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";

interface Props {
  cities: City[];
  originSlug: string | null;
  destinationSlug: string | null;
  onChange: (origin: string | null, destination: string | null) => void;
  locale: Locale;
  dict: Dictionary;
}

const selectClass =
  "h-10 w-full appearance-none rounded-lg border border-border bg-surface px-3 pr-9 text-sm text-foreground transition-colors hover:border-accent/50 focus:border-accent focus:outline-none";

// Origine + destination du voyage. Quand renseignees, elles encadrent
// les villes intermediaires : origin -> intermediates -> destination.
// Une selection vide ("") signifie "pas d'endpoint defini".
export function RouteEndpoints({
  cities,
  originSlug,
  destinationSlug,
  onChange,
  locale,
  dict,
}: Props) {
  const re = dict.routePlanner.endpoints;
  const sorted = [...cities].sort((a, b) =>
    a.name[locale].localeCompare(b.name[locale], locale),
  );
  // Boucle / roadtrip : origin === destination, route circulaire.
  const isLoop = Boolean(originSlug && destinationSlug && originSlug === destinationSlug);
  const originCity = originSlug ? cities.find((c) => c.slug === originSlug) : null;

  return (
    <section className="rounded-card border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
          {re.badge}
        </span>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
          <Flag className="size-3.5 text-accent" />
          {re.title}
        </div>
        {isLoop && (
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
            <RefreshCw className="size-3" />
            {re.loopBadge}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted">
        {isLoop && originCity
          ? re.loopHint.replace("{city}", originCity.name[locale])
          : re.subtitle}
      </p>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="block text-xs font-medium text-muted">
            {re.originLabel}
          </span>
          <div className="relative mt-1">
            <Flag className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <select
              value={originSlug ?? ""}
              onChange={(e) => onChange(e.target.value || null, destinationSlug)}
              className={selectClass}
              aria-label={re.originLabel}
            >
              <option value="">{re.anyOrigin}</option>
              {sorted.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name[locale]}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className="block">
          <span className="block text-xs font-medium text-muted">
            {re.destinationLabel}
          </span>
          <div className="relative mt-1">
            <MapPin className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <select
              value={destinationSlug ?? ""}
              onChange={(e) => onChange(originSlug, e.target.value || null)}
              className={selectClass}
              aria-label={re.destinationLabel}
            >
              <option value="">{re.anyDestination}</option>
              {sorted.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name[locale]}
                </option>
              ))}
            </select>
          </div>
        </label>
      </div>
    </section>
  );
}
