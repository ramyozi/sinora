"use client";

import { useMemo, useState } from "react";
import { Filter, MapPin, Search, X } from "lucide-react";
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
import { useUrlFilters } from "@/lib/url-filters";
import { EventCard } from "./event-card";

interface DisplayEntry {
  event: SinoraEvent;
  occurrence: EventOccurrence;
}

interface Props {
  entries: DisplayEntry[];
  cityBySlug: Record<string, City>;
  imageBySlug: Record<string, WikiLeadImage | null>;
  locale: Locale;
  dict: Dictionary;
}

export function EventsExplorer({
  entries,
  cityBySlug,
  imageBySlug,
  locale,
  dict,
}: Props) {
  const ev = dict.events;
  const url = useUrlFilters();

  // Dimensions URL-driven : city + category (single). Permettent deep linking
  // depuis une page ville, partage de lien et back/forward navigateur.
  const urlCity = url.get("city");
  const urlCategory = url.get("category");
  const category: EventCategory | "all" = urlCategory
    ? (urlCategory as EventCategory)
    : "all";

  const [crowd, setCrowd] = useState<EventCrowd | "all">("all");
  const [query, setQuery] = useState("");

  function setCategoryFilter(value: EventCategory | "all") {
    url.setMany({ category: value === "all" ? null : value });
  }
  function clearCity() {
    url.setMany({ city: null });
  }
  function resetAll() {
    url.reset(["city", "category"]);
    setCrowd("all");
    setQuery("");
  }

  const categories: EventCategory[] = useMemo(() => {
    const set = new Set<EventCategory>();
    for (const e of entries) set.add(e.event.category);
    return Array.from(set);
  }, [entries]);

  const filtered = entries.filter(({ event }) => {
    if (urlCity && event.citySlug !== urlCity) return false;
    if (category !== "all" && event.category !== category) return false;
    if (crowd !== "all" && event.crowd !== crowd) return false;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const haystack = [
        event.title.fr,
        event.title.en,
        event.title.zh,
        event.summary.fr,
        event.summary.en,
        event.citySlug,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const activeCityName = urlCity
    ? (cityBySlug[urlCity]?.name[locale] ?? null)
    : null;

  const crowds: EventCrowd[] = ["calme", "modere", "dense", "extreme"];

  return (
    <div className="space-y-6">
      {/* Bandeau de filtres actifs URL-driven : ville (deep link depuis page
          ville) avec X pour retirer, bouton "Tout effacer" si plusieurs
          dimensions sont posees. */}
      {(activeCityName || urlCategory) && (
        <div className="flex flex-wrap items-center gap-2 rounded-card border border-accent/30 bg-accent/5 px-3 py-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {ev.activeFilters.label}
          </span>
          {activeCityName && (
            <button
              type="button"
              onClick={clearCity}
              className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <MapPin className="size-3" />
              {activeCityName}
              <X className="size-3" />
            </button>
          )}
          <button
            type="button"
            onClick={resetAll}
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
          >
            <X className="size-3.5" />
            {ev.activeFilters.clearAll}
          </button>
        </div>
      )}

      <div className="rounded-card border border-border bg-surface p-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
          <Filter className="size-3.5 text-accent" />
          {ev.filterTitle}
        </div>

        <div className="mt-3">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={ev.searchPlaceholder}
              className="h-10 w-full appearance-none rounded-full border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted transition-colors hover:border-accent/40 focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
              aria-label={ev.searchPlaceholder}
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCategoryFilter("all")}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              category === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-surface text-foreground hover:border-accent/40"
            }`}
          >
            {ev.allCategories}
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoryFilter(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                category === c
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface text-foreground hover:border-accent/40"
              }`}
            >
              {ev.categories[c]}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <span className="text-xs text-muted">{ev.crowdFilter}</span>
          <button
            type="button"
            onClick={() => setCrowd("all")}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              crowd === "all"
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-surface text-foreground"
            }`}
          >
            {ev.allCrowds}
          </button>
          {crowds.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCrowd(c)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                crowd === c
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface text-foreground"
              }`}
            >
              {ev.crowdLabels[c]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-card border border-border bg-surface p-10 text-center text-muted">
          {ev.empty}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ event, occurrence }) => (
            <EventCard
              key={`${event.slug}-${occurrence.start}`}
              event={event}
              occurrence={occurrence}
              city={cityBySlug[event.citySlug]}
              image={imageBySlug[event.slug] ?? null}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      )}
    </div>
  );
}
