import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { BudgetTip } from "@/data/pretrip/budget";
import { cn } from "@/lib/cn";

const kindAccent: Record<BudgetTip["kind"], string> = {
  payment: "bg-jade/10 text-jade",
  currency: "bg-gold/10 text-gold",
  trap: "bg-accent/10 text-accent",
};

// Conseil ou piège budgétaire.
export function BudgetTipCard({
  tip,
  locale,
  dict,
}: {
  tip: BudgetTip;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">
          {tip.title[locale]}
        </h3>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            kindAccent[tip.kind],
          )}
        >
          {dict.pretrip.budget.kinds[tip.kind]}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {tip.detail[locale]}
      </p>
    </article>
  );
}
