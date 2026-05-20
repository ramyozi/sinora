import { Compass, Diamond, Handshake, Heart, Sparkles, Sun, Moon, Sunrise, Sunset, AlertTriangle, Gauge, CloudSnow } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City, CityIdentity, DayMoment, Season } from "@/data/cities";

interface Props {
  city: City;
  locale: Locale;
  dict: Dictionary;
}

const moodColor: Record<NonNullable<CityIdentity["moods"]>[number], string> = {
  electric: "bg-fuchsia-500/15 text-fuchsia-500",
  contemplative: "bg-sky-500/15 text-sky-500",
  imperial: "bg-amber-500/15 text-amber-500",
  vibrant: "bg-rose-500/15 text-rose-500",
  spiritual: "bg-violet-500/15 text-violet-500",
  wild: "bg-emerald-500/15 text-emerald-500",
  cozy: "bg-orange-500/15 text-orange-500",
  spicy: "bg-red-500/15 text-red-500",
  ancient: "bg-stone-500/15 text-stone-500",
  futuristic: "bg-cyan-500/15 text-cyan-500",
};

const momentIcon: Record<DayMoment, typeof Sun> = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  night: Moon,
};

const orderedMoments: DayMoment[] = ["morning", "afternoon", "evening", "night"];
const orderedSeasons: Season[] = ["printemps", "ete", "automne", "hiver"];

// Identite emotionnelle d'une ville : moods, rythme, plats, experiences, journee, pieges.
export function CityIdentitySection({ city, locale, dict }: Props) {
  const id = city.identity;
  if (!id) return null;
  const ci = dict.destinations.identity;

  return (
    <section className="space-y-8">
      <header>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {ci.title}
        </h2>
        <p className="mt-2 text-sm text-muted">{ci.subtitle}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-card border border-border bg-surface p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
            <Heart className="size-4 text-accent" />
            {ci.moodsLabel}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {id.moods.map((m) => (
              <span
                key={m}
                className={`rounded-full px-3 py-1 text-xs font-medium ${moodColor[m]}`}
              >
                {ci.moods[m]}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
            <Gauge className="size-4 text-accent" />
            {ci.paceLabel}
          </div>
          <div className="mt-3 text-base font-semibold text-foreground">
            {ci.paces[id.pace]}
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface p-4 sm:col-span-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
            <Sun className="size-4 text-accent" />
            {ci.bestMomentLabel}
          </div>
          <p className="mt-3 text-sm text-foreground">
            {id.bestMoment[locale]}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {id.food.map((f, idx) => (
          <article
            key={idx}
            className="rounded-card border border-border bg-surface p-4"
          >
            <div className="flex items-center gap-2 text-2xl" aria-hidden>
              {f.emoji}
            </div>
            <h3 className="mt-2 text-base font-semibold text-foreground">
              {f.name[locale]}
            </h3>
            <p className="mt-1 text-sm text-muted">{f.hint[locale]}</p>
          </article>
        ))}
      </div>

      <div className="rounded-card border border-border bg-surface p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="size-4 text-accent" />
          {ci.experiencesLabel}
        </div>
        <ul className="mt-3 space-y-2">
          {id.mustExperience.map((e, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {e[locale]}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-card border border-border bg-surface p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Compass className="size-4 text-accent" />
          {ci.dayMomentsLabel}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {orderedMoments
            .filter((m) => id.dayMoments[m])
            .map((m) => {
              const Icon = momentIcon[m];
              return (
                <div key={m} className="rounded-card bg-surface-muted p-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
                    <Icon className="size-4 text-accent" />
                    {ci.moments[m]}
                  </div>
                  <p className="mt-2 text-sm text-foreground">
                    {id.dayMoments[m]?.[locale]}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="rounded-card border border-amber-500/30 bg-amber-500/5 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <AlertTriangle className="size-4 text-amber-500" />
          {ci.pitfallsLabel}
        </div>
        <ul className="mt-3 space-y-2">
          {id.pitfalls.map((p, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-foreground"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" />
              {p[locale]}
            </li>
          ))}
        </ul>
      </div>

      {id.hiddenGems && id.hiddenGems.length > 0 && (
        <div className="rounded-card border border-violet-500/30 bg-violet-500/5 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Diamond className="size-4 text-violet-500" />
            {ci.hiddenGemsLabel}
          </div>
          <ul className="mt-3 space-y-2">
            {id.hiddenGems.map((g, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500" />
                {g[locale]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {id.etiquette && id.etiquette.length > 0 && (
        <div className="rounded-card border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Handshake className="size-4 text-accent" />
            {ci.etiquetteLabel}
          </div>
          <ul className="mt-3 space-y-2">
            {id.etiquette.map((e, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {e[locale]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {id.seasonalTips && (
        <div className="rounded-card border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <CloudSnow className="size-4 text-accent" />
            {ci.seasonalTipsLabel}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {orderedSeasons
              .filter((s) => id.seasonalTips?.[s])
              .map((s) => (
                <div key={s} className="rounded-card bg-surface-muted p-3">
                  <div className="text-xs uppercase tracking-wide text-muted">
                    {dict.labels.seasons[s]}
                  </div>
                  <p className="mt-1 text-sm text-foreground">
                    {id.seasonalTips?.[s]?.[locale]}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
