"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { useUrlFilters } from "@/lib/url-filters";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Season } from "@/data/cities/types";
import type {
  Activity,
  ActivityBudget,
  ActivityCategory,
  ActivityCrowd,
  ActivityDifficulty,
  ActivitySetting,
  ActivitySort,
  ActivityTouristLevel,
} from "@/data/activities";
import {
  applyFilters,
  budgets,
  categoriesByGroup,
  categoryGroups,
  categoryMeta,
  countActiveFilters,
  crowds,
  difficulties,
  emptyFilters,
  settings as settingOptions,
  sortActivities,
  touristLevels,
  type ActivityFilters,
} from "@/data/activities";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { ActivityCard } from "./activity-card";
import { ActivityCardCompact } from "./activity-card-compact";

type DisplayMode = "immersive" | "compact";

export interface ActivityEntry {
  activity: Activity;
  image: WikiLeadImage | null;
  score: number;
}

interface Props {
  entries: ActivityEntry[];
  cities: { slug: string; name: string }[];
  locale: Locale;
  dict: Dictionary;
}

const SEASONS: Season[] = ["printemps", "ete", "automne", "hiver"];
const SORTS: ActivitySort[] = ["editorial", "rating", "duration", "budget"];

// Petit chip a bascule reutilise dans tout le panneau de filtres.
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

// Explorateur d'activites : recherche fuzzy, panneau de filtres riche,
// tri, et grille de cartes immersives. Tout le filtrage est cote client
// pour une reponse instantanee.
export function ActivitiesExplorer({ entries, cities, locale, dict }: Props) {
  const a = dict.activities;
  const url = useUrlFilters();

  // Dimensions URL-driven : source de verite = URL. Permettent deep linking,
  // partage et back/forward natifs.
  const urlCities = url.getList("city");
  const urlCategories = url.getList("category") as ActivityCategory[];
  const sort = (url.get("sort") as ActivitySort | null) ?? "editorial";
  const displayMode: DisplayMode =
    url.get("view") === "compact" ? "compact" : "immersive";

  // Etat local pour les autres dimensions de filtrage (budgets, saisons,
  // affluence, bascules rapides...) qui restent ephemeres.
  const [otherFilters, setOtherFilters] = useState<ActivityFilters>(emptyFilters);
  const [panelOpen, setPanelOpen] = useState(false);

  // Vue effective : URL + etat local. React Compiler memoise automatiquement
  // les derivations sans qu'on ait besoin d'un useMemo manuel.
  const filters: ActivityFilters = {
    ...otherFilters,
    cities: urlCities,
    categories: urlCategories,
  };

  const scoreBySlug = useMemo(
    () => new Map(entries.map((e) => [e.activity.slug, e.score])),
    [entries],
  );

  // Pipeline : filtre -> tri. Le tri editorial respecte l'ordre d'entree
  // (deja trie par score cote serveur) ; les autres re-trient la liste.
  // Pas de useMemo manuel : React Compiler gere la memoization a partir
  // des derivations URL + etat local.
  const filteredBase = applyFilters(
    entries.map((e) => e.activity),
    filters,
  );
  let visible: Activity[];
  if (sort === "editorial") {
    const order = new Map(
      entries.map((e, i) => [e.activity.slug, i] as const),
    );
    visible = [...filteredBase].sort(
      (x, y) => (order.get(x.slug) ?? 0) - (order.get(y.slug) ?? 0),
    );
  } else {
    visible = sortActivities(filteredBase, sort);
  }

  const activeCount = countActiveFilters(filters);
  const imageBySlug = useMemo(
    () => new Map(entries.map((e) => [e.activity.slug, e.image])),
    [entries],
  );
  const cityName = useMemo(
    () => new Map(cities.map((c) => [c.slug, c.name])),
    [cities],
  );

  // Helpers de bascule. Les dimensions URL-driven (cities, categories)
  // ecrivent dans l'URL ; les autres dans l'etat local.
  function toggleCity(slug: string) {
    const next = urlCities.includes(slug)
      ? urlCities.filter((s) => s !== slug)
      : [...urlCities, slug];
    url.setMany({ city: next.length ? next : null });
  }
  function toggleCategory(cat: ActivityCategory) {
    const next = urlCategories.includes(cat)
      ? urlCategories.filter((c) => c !== cat)
      : [...urlCategories, cat];
    url.setMany({ category: next.length ? next : null });
  }
  function toggle<T>(key: keyof ActivityFilters, value: T) {
    setOtherFilters((prev) => {
      const list = prev[key] as T[];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [key]: next };
    });
  }
  function setSort(value: ActivitySort) {
    url.setMany({ sort: value === "editorial" ? null : value });
  }
  function setDisplayMode(value: DisplayMode) {
    url.setMany({ view: value === "immersive" ? null : value });
  }
  function resetAll() {
    url.reset(["city", "category", "sort", "view"]);
    setOtherFilters(emptyFilters);
  }

  // Bandeau "filtres actifs" : ville et categories URL-driven, avec X.
  const activeCityChips = urlCities
    .map((slug) => {
      const name = cityName.get(slug);
      return name ? { slug, name } : null;
    })
    .filter((c): c is { slug: string; name: string } => c !== null);

  return (
    <div className="space-y-5">
      {/* Bandeau de filtres actifs URL-driven : ville(s), avec X pour retirer
          chacune et un reset global si plusieurs criteres sont actifs. */}
      {activeCityChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-card border border-accent/30 bg-accent/5 px-3 py-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {a.activeFilters.label}
          </span>
          {activeCityChips.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => toggleCity(c.slug)}
              className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <MapPin className="size-3" />
              {c.name}
              <X className="size-3" />
            </button>
          ))}
          <button
            type="button"
            onClick={resetAll}
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
          >
            <X className="size-3.5" />
            {a.activeFilters.clearAll}
          </button>
        </div>
      )}

      {/* Barre d'outils : recherche + tri + bouton filtres. */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={filters.query}
            onChange={(e) =>
              setOtherFilters((p) => ({ ...p, query: e.target.value }))
            }
            placeholder={a.filters.searchPlaceholder}
            className="h-10 w-full appearance-none rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          />
        </div>
        <label className="sr-only" htmlFor="activity-sort">
          {a.filters.sortLabel}
        </label>
        <select
          id="activity-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as ActivitySort)}
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground focus:border-accent focus:outline-none"
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>
              {a.filters.sorts[s]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setPanelOpen((o) => !o)}
          className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors ${
            panelOpen || activeCount > 0
              ? "border-accent text-accent"
              : "border-border text-muted hover:text-foreground"
          }`}
        >
          <SlidersHorizontal className="size-4" />
          {a.filters.title}
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {activeCount}
            </span>
          )}
        </button>
        {/* Bascule mode d'affichage : immersif (grosses cartes) ou
            compact (liste dense). */}
        <div
          role="group"
          aria-label={a.display.label}
          className="inline-flex h-10 rounded-lg border border-border bg-surface p-0.5"
        >
          <button
            type="button"
            onClick={() => setDisplayMode("immersive")}
            aria-pressed={displayMode === "immersive"}
            aria-label={a.display.immersive}
            className={`grid w-9 place-items-center rounded-md transition-colors ${
              displayMode === "immersive"
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setDisplayMode("compact")}
            aria-pressed={displayMode === "compact"}
            aria-label={a.display.compact}
            className={`grid w-9 place-items-center rounded-md transition-colors ${
              displayMode === "compact"
                ? "bg-accent text-accent-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>

      {/* Panneau de filtres detaille. */}
      {panelOpen && (
        <div className="space-y-4 rounded-card border border-border bg-surface p-4">
          {/* Villes. */}
          <FilterBlock label={a.filters.city}>
            {cities.map((c) => (
              <Chip
                key={c.slug}
                active={filters.cities.includes(c.slug)}
                onClick={() => toggleCity(c.slug)}
              >
                {c.name}
              </Chip>
            ))}
          </FilterBlock>

          {/* Categories, rangees par groupe. */}
          {categoryGroups.map((group) => (
            <FilterBlock key={group} label={a.groups[group]}>
              {categoriesByGroup[group].map((cat: ActivityCategory) => (
                <Chip
                  key={cat}
                  active={filters.categories.includes(cat)}
                  onClick={() => toggleCategory(cat)}
                >
                  <span aria-hidden>{categoryMeta[cat].emoji}</span>{" "}
                  {a.categories[cat]}
                </Chip>
              ))}
            </FilterBlock>
          ))}

          {/* Budget. */}
          <FilterBlock label={a.filters.budget}>
            {budgets.map((b: ActivityBudget) => (
              <Chip
                key={b}
                active={filters.budgets.includes(b)}
                onClick={() => toggle("budgets", b)}
              >
                {a.budgets[b]}
              </Chip>
            ))}
          </FilterBlock>

          {/* Difficulte. */}
          <FilterBlock label={a.filters.difficulty}>
            {difficulties.map((d: ActivityDifficulty) => (
              <Chip
                key={d}
                active={filters.difficulties.includes(d)}
                onClick={() => toggle("difficulties", d)}
              >
                {a.difficulties[d]}
              </Chip>
            ))}
          </FilterBlock>

          {/* Saison. */}
          <FilterBlock label={a.filters.season}>
            {SEASONS.map((s) => (
              <Chip
                key={s}
                active={filters.seasons.includes(s)}
                onClick={() => toggle("seasons", s)}
              >
                {a.seasons[s]}
              </Chip>
            ))}
          </FilterBlock>

          {/* Affluence. */}
          <FilterBlock label={a.filters.crowd}>
            {crowds.map((c: ActivityCrowd) => (
              <Chip
                key={c}
                active={filters.crowds.includes(c)}
                onClick={() => toggle("crowds", c)}
              >
                {a.crowds[c]}
              </Chip>
            ))}
          </FilterBlock>

          {/* Niveau touristique. */}
          <FilterBlock label={a.filters.tourist}>
            {touristLevels.map((t: ActivityTouristLevel) => (
              <Chip
                key={t}
                active={filters.touristLevels.includes(t)}
                onClick={() => toggle("touristLevels", t)}
              >
                {a.touristLevels[t]}
              </Chip>
            ))}
          </FilterBlock>

          {/* Cadre. */}
          <FilterBlock label={a.filters.setting}>
            {settingOptions.map((s: ActivitySetting) => (
              <Chip
                key={s}
                active={filters.settings.includes(s)}
                onClick={() => toggle("settings", s)}
              >
                {a.settings[s]}
              </Chip>
            ))}
          </FilterBlock>

          {/* Bascules rapides. */}
          <FilterBlock label={a.filters.quickLabel}>
            <Chip
              active={filters.familyFriendly}
              onClick={() =>
                setOtherFilters((p) => ({
                  ...p,
                  familyFriendly: !p.familyFriendly,
                }))
              }
            >
              {a.filters.quick.family}
            </Chip>
            <Chip
              active={filters.soloFriendly}
              onClick={() =>
                setOtherFilters((p) => ({ ...p, soloFriendly: !p.soloFriendly }))
              }
            >
              {a.filters.quick.solo}
            </Chip>
            <Chip
              active={filters.nightActivity}
              onClick={() =>
                setOtherFilters((p) => ({ ...p, nightActivity: !p.nightActivity }))
              }
            >
              {a.filters.quick.night}
            </Chip>
            <Chip
              active={filters.rainCompatible}
              onClick={() =>
                setOtherFilters((p) => ({
                  ...p,
                  rainCompatible: !p.rainCompatible,
                }))
              }
            >
              {a.filters.quick.rain}
            </Chip>
          </FilterBlock>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => resetAll()}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
            >
              <X className="size-3.5" />
              {a.filters.reset}
            </button>
          )}
        </div>
      )}

      {/* Compteur de resultats. */}
      <p className="text-sm text-muted">
        {visible.length} {a.countLabel}
      </p>

      {/* Grille ou liste suivant le mode d'affichage. */}
      {visible.length > 0 ? (
        <div
          className={
            displayMode === "immersive"
              ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "grid gap-2 sm:grid-cols-2"
          }
        >
          {visible.map((activity) => {
            const image = imageBySlug.get(activity.slug) ?? null;
            const cName = cityName.get(activity.citySlug) ?? activity.citySlug;
            const score = scoreBySlug.get(activity.slug) ?? 0;
            return displayMode === "immersive" ? (
              <ActivityCard
                key={activity.slug}
                activity={activity}
                image={image}
                cityName={cName}
                locale={locale}
                dict={dict}
                score={score}
              />
            ) : (
              <ActivityCardCompact
                key={activity.slug}
                activity={activity}
                image={image}
                cityName={cName}
                locale={locale}
                dict={dict}
                score={score}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-card border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-sm font-medium text-foreground">
            {a.filters.noResults}
          </p>
          <button
            type="button"
            onClick={() => resetAll()}
            className="mt-2 text-xs font-medium text-accent hover:underline"
          >
            {a.filters.reset}
          </button>
        </div>
      )}
    </div>
  );
}

// Bloc de filtre etiquete : un titre + une rangee de chips.
function FilterBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
