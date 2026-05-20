"use client";

import { Activity, Sparkles, Wand2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type {
  DensityScore,
  DurationAdvice,
  DurationBudget,
} from "@/data/routes";

interface Props {
  budget: DurationBudget;
  density: DensityScore | null;
  advice: DurationAdvice[];
  cities: City[];
  locale: Locale;
  dict: Dictionary;
  onCutCity?: (slug: string) => void;
  onAddCity?: (slug: string) => void;
}

const levelTone: Record<NonNullable<DensityScore>["level"], string> = {
  rushed: "text-rose-500",
  tight: "text-amber-500",
  balanced: "text-emerald-500",
  spacious: "text-sky-500",
  empty: "text-sky-400",
};

// Carte densite : score, pression, conseils actionnables.
export function DensityCard({
  budget,
  density,
  advice,
  cities,
  locale,
  dict,
  onCutCity,
  onAddCity,
}: Props) {
  if (!density) return null;
  const dn = dict.routePlanner.density;
  const nameOf = (slug?: string) =>
    cities.find((c) => c.slug === slug)?.name[locale] ?? slug ?? "";

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-accent" />
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {dn.title}
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted">{dn.subtitle}</p>
        </div>
        <div className="text-right">
          <div
            className={`text-3xl font-semibold ${levelTone[density.level]}`}
          >
            {density.score}
          </div>
          <div className={`text-xs font-medium ${levelTone[density.level]}`}>
            {dn.levels[density.level]}
          </div>
        </div>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs text-muted">{dn.total}</dt>
          <dd className="font-semibold text-foreground">
            {budget.totalDays} {dn.daysShort}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{dn.transit}</dt>
          <dd className="font-semibold text-foreground">
            {budget.transitDays} {dn.daysShort}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{dn.stays}</dt>
          <dd className="font-semibold text-foreground">
            {budget.minStayDays}-{budget.maxStayDays} {dn.daysShort}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">{dn.free}</dt>
          <dd className="font-semibold text-foreground">
            {budget.freeDaysMax} {dn.daysShort}
          </dd>
        </div>
      </dl>

      {advice.length > 0 && (
        <ul className="mt-5 space-y-2">
          {advice.map((a, idx) => {
            const key = `${a.kind}-${a.citySlug ?? ""}-${idx}`;
            if (a.kind === "cut" && a.citySlug) {
              return (
                <li
                  key={key}
                  className="flex items-start gap-2 rounded-card bg-rose-500/10 p-3 text-xs text-foreground"
                >
                  <Wand2 className="mt-0.5 size-4 shrink-0 text-rose-500" />
                  <span className="flex-1">
                    <strong className="font-medium">{dn.advice.cut.title}</strong>{" "}
                    <span className="text-muted">
                      {dn.advice.cut.body.replace("{city}", nameOf(a.citySlug))}
                    </span>
                  </span>
                  {onCutCity && (
                    <button
                      type="button"
                      onClick={() => onCutCity(a.citySlug!)}
                      className="shrink-0 rounded-full border border-rose-500/40 px-2 py-0.5 text-rose-500 transition-colors hover:bg-rose-500/10"
                    >
                      {dn.advice.cut.action}
                    </button>
                  )}
                </li>
              );
            }
            if (a.kind === "explore" && a.citySlug) {
              return (
                <li
                  key={key}
                  className="flex items-start gap-2 rounded-card bg-sky-500/10 p-3 text-xs text-foreground"
                >
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-sky-500" />
                  <span className="flex-1">
                    <strong className="font-medium">
                      {dn.advice.explore.title}
                    </strong>{" "}
                    <span className="text-muted">
                      {dn.advice.explore.body.replace(
                        "{city}",
                        nameOf(a.citySlug),
                      )}
                    </span>
                  </span>
                  {onAddCity && (
                    <button
                      type="button"
                      onClick={() => onAddCity(a.citySlug!)}
                      className="shrink-0 rounded-full border border-sky-500/40 px-2 py-0.5 text-sky-500 transition-colors hover:bg-sky-500/10"
                    >
                      {dn.advice.explore.action}
                    </button>
                  )}
                </li>
              );
            }
            if (a.kind === "trim") {
              return (
                <li
                  key={key}
                  className="rounded-card bg-amber-500/10 p-3 text-xs text-foreground"
                >
                  <strong className="font-medium">{dn.advice.trim.title}</strong>{" "}
                  <span className="text-muted">{dn.advice.trim.body}</span>
                </li>
              );
            }
            if (a.kind === "extend") {
              return (
                <li
                  key={key}
                  className="rounded-card bg-sky-500/10 p-3 text-xs text-foreground"
                >
                  <strong className="font-medium">{dn.advice.extend.title}</strong>{" "}
                  <span className="text-muted">{dn.advice.extend.body}</span>
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}
    </section>
  );
}
