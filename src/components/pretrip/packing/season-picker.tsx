"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Season } from "@/data/cities/types";
import { SEASONS } from "@/data/cities";
import { seasonList } from "@/data/pretrip/packing";
import { cn } from "@/lib/cn";
import { PackingItemRow } from "./packing-item-row";

// Sélecteur de saison + liste des items adaptée.
export function SeasonPicker({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [season, setSeason] = useState<Season>("printemps");
  const items = seasonList(season);

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {SEASONS.map((s) => (
          <button
            key={s}
            type="button"
            role="tab"
            aria-selected={s === season}
            onClick={() => setSeason(s)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              s === season
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-surface text-foreground hover:bg-surface-muted",
            )}
          >
            {dict.labels.seasons[s]}
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-3 rounded-card border border-border bg-surface p-5">
        {items.map((item) => (
          <PackingItemRow key={item.slug} item={item} locale={locale} />
        ))}
      </ul>
    </div>
  );
}
