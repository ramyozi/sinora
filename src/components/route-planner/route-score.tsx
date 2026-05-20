import { AlertTriangle, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type { RouteScore } from "@/data/routes";

interface Props {
  score: RouteScore;
  cities: City[];
  locale: Locale;
  dict: Dictionary;
}

const levelStyles: Record<RouteScore["level"], string> = {
  weak: "text-rose-500",
  fair: "text-amber-500",
  good: "text-emerald-500",
  excellent: "text-emerald-400",
};

// Carte synthétique : note globale, trois sous-scores, alertes d'optimisation.
export function RouteScoreCard({ score, cities, locale, dict }: Props) {
  const rp = dict.routePlanner;
  const sc = rp.score;
  const nameOf = (slug: string) =>
    cities.find((c) => c.slug === slug)?.name[locale] ?? slug;

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {sc.title}
          </h3>
          <p className="mt-1 text-xs text-muted">{sc.subtitle}</p>
        </div>
        <div className="text-right">
          <div
            className={`text-4xl font-semibold tracking-tight ${levelStyles[score.level]}`}
          >
            {score.overall}
          </div>
          <div className={`text-xs font-medium ${levelStyles[score.level]}`}>
            {sc.levels[score.level]}
          </div>
        </div>
      </header>

      <dl className="mt-5 grid grid-cols-3 gap-4 text-center">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">
            {sc.criteria.coherence}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-foreground">
            {score.coherence}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">
            {sc.criteria.pace}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-foreground">
            {score.pace}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted">
            {sc.criteria.balance}
          </dt>
          <dd className="mt-1 text-lg font-semibold text-foreground">
            {score.balance}
          </dd>
        </div>
      </dl>

      {score.warnings.length > 0 && (
        <ul className="mt-5 space-y-2">
          {score.warnings.map((w, idx) => (
            <li
              key={`${w.kind}-${idx}`}
              className="flex items-start gap-2 rounded-card bg-amber-500/10 p-3 text-xs text-foreground"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
              <span>
                <strong className="font-medium">
                  {sc.warnings[w.kind].title}
                </strong>{" "}
                <span className="text-muted">
                  {sc.warnings[w.kind].body
                    .replace(
                      "{cities}",
                      w.cities.map(nameOf).join(" -> "),
                    )
                    .replace("{value}", w.value != null ? String(w.value) : "")}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {score.warnings.length === 0 && score.level !== "weak" && (
        <p className="mt-5 flex items-center gap-2 text-xs text-emerald-500">
          <Sparkles className="size-4" />
          {sc.allGood}
        </p>
      )}
    </section>
  );
}
