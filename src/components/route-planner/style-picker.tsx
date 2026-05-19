"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import { ROUTE_STYLES, type RouteStyle } from "@/data/routes/style";
import { cn } from "@/lib/cn";

interface Props {
  value: RouteStyle;
  onChange: (style: RouteStyle) => void;
  dict: Dictionary;
}

// Sélecteur du style de voyage : pilote budget et biais de recommandation.
export function StylePicker({ value, onChange, dict }: Props) {
  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header>
        <h2 className="text-base font-semibold text-foreground">
          {dict.routePlanner.style.title}
        </h2>
        <p className="mt-1 text-xs text-muted">
          {dict.routePlanner.style.subtitle}
        </p>
      </header>

      <div
        role="radiogroup"
        aria-label={dict.routePlanner.style.title}
        className="mt-4 flex flex-wrap gap-2"
      >
        {ROUTE_STYLES.map((style) => (
          <button
            key={style}
            type="button"
            role="radio"
            aria-checked={style === value}
            onClick={() => onChange(style)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              style === value
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background text-foreground hover:border-accent/40 hover:text-accent",
            )}
          >
            {dict.routePlanner.style.options[style]}
          </button>
        ))}
      </div>
    </section>
  );
}
