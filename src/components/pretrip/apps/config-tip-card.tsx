import type { Locale } from "@/i18n/config";
import type { PretripConfigTip } from "@/data/pretrip/apps";

// Conseil ponctuel à appliquer sur le téléphone.
export function ConfigTipCard({
  tip,
  locale,
  beforeLabel,
  arrivalLabel,
}: {
  tip: PretripConfigTip;
  locale: Locale;
  beforeLabel: string;
  arrivalLabel: string;
}) {
  const badge = tip.beforeDeparture
    ? { label: beforeLabel, className: "bg-accent/10 text-accent" }
    : { label: arrivalLabel, className: "bg-jade/10 text-jade" };

  return (
    <article className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-center gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
        <h3 className="text-base font-semibold text-foreground">
          {tip.title[locale]}
        </h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {tip.detail[locale]}
      </p>
    </article>
  );
}
