"use client";

import type { Dictionary } from "@/i18n/dictionaries";
import type { CityTag } from "@/data/cities";
import { ROUTE_STYLES, type RouteStyle } from "@/data/routes/style";
import {
  DIET_RESTRICTIONS,
  INTEREST_TAGS,
  TRAVEL_PROFILES,
  type DietRestriction,
  type TravelProfile,
} from "@/data/routes/preferences";
import { cn } from "@/lib/cn";

interface Props {
  style: RouteStyle;
  profile: TravelProfile;
  diet: DietRestriction[];
  interests: CityTag[];
  onStyleChange: (style: RouteStyle) => void;
  onProfileChange: (profile: TravelProfile) => void;
  onDietChange: (diet: DietRestriction[]) => void;
  onInterestsChange: (interests: CityTag[]) => void;
  dict: Dictionary;
}

const chipBase =
  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors";
const chipSelected = "border-accent bg-accent text-accent-foreground";
const chipIdle =
  "border-border bg-background text-foreground hover:border-accent/40 hover:text-accent";

// Panneau de raffinage : style, profil, restrictions, intérêts.
// Chaque dimension alimente le scoring des recommandations.
export function PreferencesPanel({
  style,
  profile,
  diet,
  interests,
  onStyleChange,
  onProfileChange,
  onDietChange,
  onInterestsChange,
  dict,
}: Props) {
  const p = dict.routePlanner.preferences;

  function toggleDiet(d: DietRestriction) {
    onDietChange(
      diet.includes(d) ? diet.filter((x) => x !== d) : [...diet, d],
    );
  }
  function toggleInterest(t: CityTag) {
    onInterestsChange(
      interests.includes(t)
        ? interests.filter((x) => x !== t)
        : [...interests, t],
    );
  }

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header>
        <h2 className="text-base font-semibold text-foreground">{p.title}</h2>
        <p className="mt-1 text-xs text-muted">{p.subtitle}</p>
      </header>

      <fieldset className="mt-5">
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          {dict.routePlanner.style.title}
        </legend>
        <div role="radiogroup" className="mt-2 flex flex-wrap gap-2">
          {ROUTE_STYLES.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={s === style}
              onClick={() => onStyleChange(s)}
              className={cn(chipBase, s === style ? chipSelected : chipIdle)}
            >
              {dict.routePlanner.style.options[s]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          {p.profileTitle}
        </legend>
        <div role="radiogroup" className="mt-2 flex flex-wrap gap-2">
          {TRAVEL_PROFILES.map((pr) => (
            <button
              key={pr}
              type="button"
              role="radio"
              aria-checked={pr === profile}
              onClick={() => onProfileChange(pr)}
              className={cn(chipBase, pr === profile ? chipSelected : chipIdle)}
            >
              {p.profiles[pr]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          {p.dietTitle}
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {DIET_RESTRICTIONS.map((d) => {
            const checked = diet.includes(d);
            return (
              <button
                key={d}
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => toggleDiet(d)}
                className={cn(chipBase, checked ? chipSelected : chipIdle)}
              >
                {p.diet[d]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-xs font-semibold uppercase tracking-wide text-muted">
          {p.interestsTitle}
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTEREST_TAGS.map((t) => {
            const checked = interests.includes(t);
            return (
              <button
                key={t}
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => toggleInterest(t)}
                className={cn(chipBase, checked ? chipSelected : chipIdle)}
              >
                {dict.labels.tags[t]}
              </button>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}
