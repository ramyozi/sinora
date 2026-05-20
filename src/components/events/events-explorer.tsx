"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
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
  const [category, setCategory] = useState<EventCategory | "all">("all");
  const [crowd, setCrowd] = useState<EventCrowd | "all">("all");
  const [query, setQuery] = useState("");

  const categories: EventCategory[] = useMemo(() => {
    const set = new Set<EventCategory>();
    for (const e of entries) set.add(e.event.category);
    return Array.from(set);
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter(({ event }) => {
      if (category !== "all" && event.category !== category) return false;
      if (crowd !== "all" && event.crowd !== crowd) return false;
      if (q) {
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
  }, [entries, category, crowd, query]);

  const crowds: EventCrowd[] = ["calme", "modere", "dense", "extreme"];

  return (
    <div className="space-y-6">
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
              className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm text-foreground transition-colors hover:border-accent/40 focus:border-accent focus:outline-none"
              aria-label={ev.searchPlaceholder}
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
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
              onClick={() => setCategory(c)}
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
