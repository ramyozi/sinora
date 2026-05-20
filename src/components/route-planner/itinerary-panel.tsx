"use client";

import { ArrowDown, ArrowUp, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type {
  Connection,
  FatigueAssessment,
  RouteTotals,
} from "@/data/routes";
import { FatigueMeter } from "./fatigue-meter";

interface Props {
  selected: City[];
  segments: (Connection | undefined)[];
  totals: RouteTotals;
  fatigue: FatigueAssessment;
  locale: Locale;
  dict: Dictionary;
  onMoveUp: (slug: string) => void;
  onMoveDown: (slug: string) => void;
  onRemove: (slug: string) => void;
  onClear: () => void;
}

// Panneau latéral : liste ordonnée des villes sélectionnées, segments et totaux.
export function ItineraryPanel({
  selected,
  segments,
  totals,
  fatigue,
  locale,
  dict,
  onMoveUp,
  onMoveDown,
  onRemove,
  onClear,
}: Props) {
  const rp = dict.routePlanner;

  return (
    <aside className="flex flex-col gap-4 rounded-card border border-border bg-surface p-5">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          {rp.panelTitle}
        </h2>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-muted hover:text-accent"
          >
            {rp.clear}
          </button>
        )}
      </header>

      {selected.length === 0 ? (
        <p className="rounded-card bg-surface-muted p-4 text-sm text-muted">
          {rp.empty}
        </p>
      ) : (
        <ol className="space-y-3">
          {selected.map((city, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === selected.length - 1;
            const segment = !isLast ? segments[idx] : undefined;

            return (
              <li key={city.slug}>
                <div className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                    {idx + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {city.name[locale]}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onMoveUp(city.slug)}
                      disabled={isFirst}
                      aria-label={rp.moveUp}
                      className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowUp className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onMoveDown(city.slug)}
                      disabled={isLast}
                      aria-label={rp.moveDown}
                      className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ArrowDown className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(city.slug)}
                      aria-label={rp.remove}
                      className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>
                {!isLast && (
                  <div className="ml-10 mt-2 text-xs text-muted">
                    {segment
                      ? `${segment.durationHours} ${rp.hours} · ${rp.modes[segment.mode]} · ${segment.priceCNY[0]}–${segment.priceCNY[1]} ${rp.cny}`
                      : "—"}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {selected.length >= 2 && (
        <div className="rounded-card bg-surface-muted p-4 text-sm">
          <div className="text-xs uppercase tracking-wide text-muted">
            {rp.totalsTitle}
          </div>
          <dl className="mt-2 grid grid-cols-3 gap-3">
            <div>
              <dt className="text-xs text-muted">{rp.totalDistance}</dt>
              <dd className="font-semibold text-foreground">
                {totals.distanceKm} {rp.km}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{rp.totalDuration}</dt>
              <dd className="font-semibold text-foreground">
                {totals.durationHours.toFixed(1)} {rp.hours}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{rp.totalPrice}</dt>
              <dd className="font-semibold text-foreground">
                {totals.priceMin}–{totals.priceMax} {rp.cny}
              </dd>
            </div>
          </dl>
          {totals.missingSegments > 0 && (
            <p className="mt-3 text-xs text-muted">{rp.missingHint}</p>
          )}
        </div>
      )}

      {selected.length >= 2 && (
        <FatigueMeter assessment={fatigue} dict={dict} />
      )}
    </aside>
  );
}
