"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type { RouteTotals } from "@/data/routes";
import {
  type PricingTier,
  stayCostsForRoute,
} from "@/data/routes/pricing";
import { cn } from "@/lib/cn";

const TIERS: PricingTier[] = ["eco", "comfort", "luxury"];

interface Props {
  cities: City[];
  transport: RouteTotals;
  locale: Locale;
  dict: Dictionary;
}

// Estimation budgétaire du séjour selon la gamme choisie.
export function BudgetEstimate({ cities, transport, locale, dict }: Props) {
  const [tier, setTier] = useState<PricingTier>("comfort");
  const stay = stayCostsForRoute(cities, tier);
  const grandTotalMin = stay.total + transport.priceMin;
  const grandTotalMax = stay.total + transport.priceMax;
  const rp = dict.routePlanner;
  const b = rp.budget;

  return (
    <section className="rounded-card border border-border bg-surface p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">{b.title}</h2>
        <div
          role="radiogroup"
          aria-label={b.tierLabel}
          className="inline-flex rounded-full border border-border bg-background p-0.5 text-xs"
        >
          {TIERS.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={t === tier}
              onClick={() => setTier(t)}
              className={cn(
                "rounded-full px-3 py-1.5 font-medium transition-colors",
                t === tier
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {b.tiers[t]}
            </button>
          ))}
        </div>
      </header>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <BudgetLine
          label={b.lodging}
          amount={stay.lodging}
          sub={`${stay.nights} ${b.nights}`}
          cny={rp.cny}
        />
        <BudgetLine
          label={b.food}
          amount={stay.food}
          sub={`${stay.nights} ${b.nights}`}
          cny={rp.cny}
        />
        <BudgetLine label={b.activities} amount={stay.activities} cny={rp.cny} />
      </dl>

      <dl className="mt-6 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <BudgetLine
          label={b.totalStay}
          amount={stay.total}
          cny={rp.cny}
          emphasis
        />
        <BudgetLine
          label={b.grandTotal}
          amount={`${grandTotalMin}–${grandTotalMax}`}
          cny={rp.cny}
          emphasis
        />
      </dl>

      {stay.byCity.length > 0 && (
        <details className="mt-6 border-t border-border pt-4 text-sm">
          <summary className="cursor-pointer text-muted hover:text-foreground">
            {b.perCity}
          </summary>
          <ul className="mt-3 space-y-1.5">
            {stay.byCity.map((c) => {
              const city = cities.find((x) => x.slug === c.citySlug);
              if (!city) return null;
              return (
                <li
                  key={c.citySlug}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-foreground">
                    {city.name[locale]}
                    <span className="ml-2 text-xs text-muted">
                      {c.nights} {b.nights}
                    </span>
                  </span>
                  <span className="font-mono text-sm text-foreground">
                    {c.total} {rp.cny}
                  </span>
                </li>
              );
            })}
          </ul>
        </details>
      )}
    </section>
  );
}

function BudgetLine({
  label,
  amount,
  sub,
  cny,
  emphasis,
}: {
  label: string;
  amount: number | string;
  sub?: string;
  cny: string;
  emphasis?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd
        className={cn(
          "mt-1 font-mono text-foreground",
          emphasis ? "text-xl font-semibold" : "text-lg font-semibold",
        )}
      >
        {amount} {cny}
      </dd>
      {sub && <dd className="mt-0.5 text-xs text-muted">{sub}</dd>}
    </div>
  );
}
