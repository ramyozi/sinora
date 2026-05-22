import { beijingActivities } from "./dataset/beijing";
import { shanghaiActivities } from "./dataset/shanghai";
import { chengduActivities } from "./dataset/chengdu";
import { xianActivities } from "./dataset/xian";
import { generatedActivities } from "./generated";
import { computeEditorialScore } from "./scoring";
import type { Activity } from "./types";

// ============================================================================
// Point d'entree du module Activites
// ----------------------------------------------------------------------------
// Le dataset est separe par ville pour rester scalable : ajouter une ville =
// un fichier de plus, importe ici. Pas de chargement paresseux pour l'instant
// (volume raisonnable), mais l'architecture s'y prete (import dynamique par
// citySlug le jour ou le dataset explosera).
// ============================================================================

export type {
  Activity,
  ActivityBadge,
  ActivityBudget,
  ActivityCategory,
  ActivityCrowd,
  ActivityDifficulty,
  ActivityDuration,
  ActivityImmersion,
  ActivityReview,
  ActivitySetting,
  ActivitySource,
  ActivityTouristLevel,
  WeatherSensitivity,
} from "./types";

export {
  categoryMeta,
  categoriesByGroup,
  categoryGroups,
  groupGradient,
  allCategories,
  allBadges,
  difficulties,
  budgets,
  crowds,
  touristLevels,
  settings,
  budgetRank,
  difficultyRank,
  type CategoryGroup,
  type CategoryMeta,
} from "./tags";

export {
  applyFilters,
  countActiveFilters,
  emptyFilters,
  fuzzyMatch,
  sortActivities,
  type ActivityFilters,
  type ActivitySort,
} from "./filters";

export {
  computeEditorialScore,
  sortByEditorialScore,
  pickFeatured,
} from "./scoring";

// Dataset curated : ecrit a la main, qualite editoriale maximale.
export const curatedActivities: Activity[] = [
  ...beijingActivities,
  ...shanghaiActivities,
  ...chengduActivities,
  ...xianActivities,
];

// Catalogue hybride : le curated d'abord (prioritaire), puis le tier genere.
// Le pipeline dedoublonne deja le genere contre le curated ; on filtre ici
// par slug en plus, par securite, le curated gagnant toujours.
const curatedSlugs = new Set(curatedActivities.map((a) => a.slug));
export const activities: Activity[] = [
  ...curatedActivities,
  ...generatedActivities.filter((a) => !curatedSlugs.has(a.slug)),
];

// Index par slug pour un acces O(1) depuis les pages de detail.
const bySlug = new Map(activities.map((a) => [a.slug, a]));

export function getAllActivities(): Activity[] {
  return activities;
}

export function getActivityBySlug(slug: string): Activity | undefined {
  return bySlug.get(slug);
}

export function getActivitiesByCity(citySlug: string): Activity[] {
  return activities.filter((a) => a.citySlug === citySlug);
}

export function getActivitiesByCategory(category: string): Activity[] {
  return activities.filter((a) => a.category === category);
}

// Resout une liste de slugs en activites (pour relatedActivities). Ignore les
// slugs inconnus pour rester robuste a un dataset partiellement rempli.
export function resolveActivities(slugs: string[]): Activity[] {
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((a): a is Activity => Boolean(a));
}

// Nombre d'activites par ville : utile pour les compteurs de l'UI.
export function activityCountByCity(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const a of activities) {
    counts[a.citySlug] = (counts[a.citySlug] ?? 0) + 1;
  }
  return counts;
}

// Suggestions liees a une activite : on combine les relations explicites du
// dataset et un repli "meme ville, meme groupe" trie par score editorial.
export function relatedFor(activity: Activity, limit = 4): Activity[] {
  const explicit = resolveActivities(activity.relatedActivities ?? []);
  if (explicit.length >= limit) return explicit.slice(0, limit);

  const seen = new Set([activity.slug, ...explicit.map((a) => a.slug)]);
  const fallback = activities
    .filter(
      (a) =>
        !seen.has(a.slug) &&
        a.citySlug === activity.citySlug &&
        a.category === activity.category,
    )
    .sort((a, b) => computeEditorialScore(b) - computeEditorialScore(a));

  return [...explicit, ...fallback].slice(0, limit);
}
