"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import { niches, type NicheSlug } from "@/data/routes";

interface Props {
  active: NicheSlug | null;
  onSelect: (slug: NicheSlug | null) => void;
  dict: Dictionary;
}

// Bandeau de chips emoji pour appliquer un preset de niche en un clic.
// Le toggle se comporte en mono-selection : reclic = desactivation.
export function NicheChips({ active, onSelect, dict }: Props) {
  const ni = dict.routePlanner.niches;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">
          {ni.title}
        </h4>
        <p className="text-xs text-muted">{ni.hint}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {niches.map((n) => {
          const isActive = n.slug === active;
          return (
            <button
              key={n.slug}
              type="button"
              onClick={() => onSelect(isActive ? null : n.slug)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface text-foreground hover:border-accent/40"
              }`}
            >
              <span aria-hidden>{n.emoji}</span>
              {ni.items[n.slug]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
