"use client";

import { Plus } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { RouteRecommendation } from "@/data/routes/recommendation";

interface Props {
  recommendations: RouteRecommendation[];
  locale: Locale;
  dict: Dictionary;
  onAdd: (slug: string, insertAfterIndex: number) => void;
}

// Suggestions de villes pour étoffer un tracé.
export function SuggestionsPanel({
  recommendations,
  locale,
  dict,
  onAdd,
}: Props) {
  if (recommendations.length === 0) return null;

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header>
        <h2 className="text-base font-semibold text-foreground">
          {dict.routePlanner.suggestions.title}
        </h2>
        <p className="mt-1 text-xs text-muted">
          {dict.routePlanner.suggestions.subtitle}
        </p>
      </header>

      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {recommendations.map((rec) => (
          <li
            key={rec.city.slug}
            className="flex items-center gap-3 rounded-card border border-border bg-background p-3"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground">
                {rec.city.name[locale]}
              </div>
              <div className="mt-0.5 text-xs text-muted">
                {dict.labels.regions[rec.city.region]} ·{" "}
                {dict.routePlanner.suggestions.reasons[rec.reason]}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onAdd(rec.city.slug, rec.insertAfterIndex)}
              aria-label={`${dict.routePlanner.suggestions.add} ${rec.city.name[locale]}`}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Plus className="size-3.5" />
              {dict.routePlanner.suggestions.add}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
