"use client";

import { CalendarDays } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { TripDates } from "@/data/routes";

interface Props {
  dates: TripDates;
  onChange: (dates: TripDates) => void;
  totalDays: number | null;
  locale: Locale;
  dict: Dictionary;
}

const inputClass =
  "h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground transition-colors hover:border-accent/50 focus:border-accent focus:outline-none";

// Saisie des dates de voyage : depart, retour, duree auto.
export function TripDates({ dates, onChange, totalDays, locale, dict }: Props) {
  const td = dict.routePlanner.dates;

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header className="flex items-center gap-2">
        <CalendarDays className="size-4 text-accent" />
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {td.title}
        </h3>
      </header>
      <p className="mt-1 text-xs text-muted">{td.subtitle}</p>

      <div className="mt-4 grid gap-3">
        <label className="block">
          <span className="block text-xs font-medium text-muted">
            {td.startLabel}
          </span>
          <input
            type="date"
            className={`mt-1 ${inputClass}`}
            value={dates.start ?? ""}
            onChange={(e) =>
              onChange({ ...dates, start: e.target.value || null })
            }
            aria-label={td.startLabel}
          />
        </label>
        <label className="block">
          <span className="block text-xs font-medium text-muted">
            {td.endLabel}
          </span>
          <input
            type="date"
            className={`mt-1 ${inputClass}`}
            value={dates.end ?? ""}
            min={dates.start ?? undefined}
            onChange={(e) => onChange({ ...dates, end: e.target.value || null })}
            aria-label={td.endLabel}
          />
        </label>
        <div className="block sm:self-end">
          <span className="block text-xs font-medium text-muted">
            {td.totalLabel}
          </span>
          <div className="mt-1 inline-flex h-10 items-center rounded-lg border border-border bg-surface-muted px-3 text-sm font-semibold text-foreground">
            {totalDays != null ? `${totalDays} ${td.daysShort}` : td.pending}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        {td.locale[locale === "fr" ? "fr" : locale === "zh" ? "zh" : "en"]}
      </p>
    </section>
  );
}
