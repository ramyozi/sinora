import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { FoodTip } from "@/data/pretrip/food";

// Conseil culturel ou pratique pour les repas.
export function FoodTipCard({
  tip,
  locale,
  dict,
}: {
  tip: FoodTip;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">
          {tip.title[locale]}
        </h3>
        <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground">
          {dict.pretrip.food.needs[tip.need]}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {tip.detail[locale]}
      </p>
    </article>
  );
}
