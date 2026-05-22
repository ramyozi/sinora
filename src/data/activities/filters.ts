import type { Locale } from "@/i18n/config";
import type { Season } from "@/data/cities/types";
import { budgetRank, difficultyRank } from "./tags";
import type {
  Activity,
  ActivityBudget,
  ActivityCategory,
  ActivityCrowd,
  ActivityDifficulty,
  ActivitySetting,
  ActivityTouristLevel,
} from "./types";

// ============================================================================
// Filtres & recherche des activites
// ============================================================================

// Etat complet du filtrage. Tous les champs sont optionnels / vides par
// defaut : un filtre vide ne restreint rien. Pense pour un panneau de
// filtres riche cote client.
export interface ActivityFilters {
  /** Recherche texte libre (fuzzy). */
  query: string;
  /** Slugs de villes retenues (vide = toutes). */
  cities: string[];
  /** Categories retenues (vide = toutes). */
  categories: ActivityCategory[];
  /** Budgets retenus. */
  budgets: ActivityBudget[];
  /** Difficultes retenues. */
  difficulties: ActivityDifficulty[];
  /** Saisons : une activite passe si elle recommande au moins une saison cochee. */
  seasons: Season[];
  /** Niveaux de foule retenus. */
  crowds: ActivityCrowd[];
  /** Niveaux touristiques retenus. */
  touristLevels: ActivityTouristLevel[];
  /** Cadres retenus (indoor / outdoor / mixed). */
  settings: ActivitySetting[];
  /** Duree maximale en minutes (0 = pas de limite). */
  maxDurationMinutes: number;
  /** Filtres booleens : actif uniquement si true. */
  familyFriendly: boolean;
  soloFriendly: boolean;
  nightActivity: boolean;
  rainCompatible: boolean;
  /** Niche voyageur ciblee (null = aucune). */
  niche: string | null;
}

// Etat initial : aucun filtre actif.
export const emptyFilters: ActivityFilters = {
  query: "",
  cities: [],
  categories: [],
  budgets: [],
  difficulties: [],
  seasons: [],
  crowds: [],
  touristLevels: [],
  settings: [],
  maxDurationMinutes: 0,
  familyFriendly: false,
  soloFriendly: false,
  nightActivity: false,
  rainCompatible: false,
  niche: null,
};

// Normalise une chaine pour la recherche : minuscule, sans accents, sans
// ponctuation. Permet un matching tolerant cross-langue.
function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Construit le texte indexable d'une activite : titres, resumes, quartier,
// sous-categorie dans toutes les langues. Memoise par activite.
const searchIndex = new WeakMap<Activity, string>();

function searchableText(activity: Activity): string {
  const cached = searchIndex.get(activity);
  if (cached) return cached;
  const locales: Locale[] = ["fr", "en", "zh"];
  const parts: string[] = [activity.slug, activity.category];
  for (const loc of locales) {
    parts.push(activity.title[loc]);
    parts.push(activity.summary[loc]);
    parts.push(activity.subCategory[loc]);
    parts.push(activity.district[loc]);
  }
  const text = normalize(parts.join(" "));
  searchIndex.set(activity, text);
  return text;
}

// Distance d'edition bornee a 1 : retourne true si `a` et `b` sont egaux ou
// separes par une seule insertion, suppression ou substitution. Borner a 1
// suffit pour la tolerance de frappe et reste tres rapide (pas de matrice).
function withinEditDistance1(a: string, b: string): boolean {
  if (a === b) return true;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  // Parcours synchronise ; au premier ecart on consomme une operation.
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < la && j < lb) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (la > lb) i++;
    else if (lb > la) j++;
    else {
      i++;
      j++;
    }
  }
  // Caractere restant en fin de chaine = une derniere operation.
  if (i < la || j < lb) edits++;
  return edits <= 1;
}

// Recherche fuzzy : chaque token de la requete doit matcher le texte indexe.
// Un token matche s'il apparait en sous-chaine, ou si un mot du texte le
// contient en prefixe, ou est a une faute de frappe pres (distance <= 1).
// Le matching se fait mot a mot pour eviter les faux positifs d'un matching
// "subsequence" sur le texte concatene complet.
export function fuzzyMatch(activity: Activity, rawQuery: string): boolean {
  const query = normalize(rawQuery);
  if (!query) return true;
  const haystack = searchableText(activity);
  const words = haystack.split(" ");
  const tokens = query.split(" ").filter(Boolean);
  return tokens.every((token) => {
    if (haystack.includes(token)) return true;
    return words.some((word) => {
      if (word.startsWith(token) || token.startsWith(word)) return true;
      // Tolerance frappe : seulement pour les tokens assez longs.
      return token.length >= 4 && withinEditDistance1(token, word);
    });
  });
}

// Applique l'ensemble des filtres a une liste d'activites.
export function applyFilters(
  activities: Activity[],
  filters: ActivityFilters,
): Activity[] {
  return activities.filter((a) => {
    if (!fuzzyMatch(a, filters.query)) return false;
    if (filters.cities.length && !filters.cities.includes(a.citySlug)) {
      return false;
    }
    if (filters.categories.length && !filters.categories.includes(a.category)) {
      return false;
    }
    if (filters.budgets.length && !filters.budgets.includes(a.budget)) {
      return false;
    }
    if (
      filters.difficulties.length &&
      !filters.difficulties.includes(a.difficulty)
    ) {
      return false;
    }
    if (
      filters.seasons.length &&
      !filters.seasons.some((s) => a.recommendedSeasons.includes(s))
    ) {
      return false;
    }
    if (filters.crowds.length && !filters.crowds.includes(a.crowd)) {
      return false;
    }
    if (
      filters.touristLevels.length &&
      !filters.touristLevels.includes(a.touristLevel)
    ) {
      return false;
    }
    if (filters.settings.length && !filters.settings.includes(a.setting)) {
      return false;
    }
    if (
      filters.maxDurationMinutes > 0 &&
      a.duration.minMinutes > filters.maxDurationMinutes
    ) {
      return false;
    }
    if (filters.familyFriendly && !a.familyFriendly) return false;
    if (filters.soloFriendly && !a.soloFriendly) return false;
    if (filters.nightActivity && !a.nightActivity) return false;
    if (filters.rainCompatible && !a.rainCompatible) return false;
    if (
      filters.niche &&
      !(a.recommendedForNiches ?? []).includes(filters.niche)
    ) {
      return false;
    }
    return true;
  });
}

// Compte le nombre de filtres actifs : utile pour afficher un badge "3 filtres".
export function countActiveFilters(filters: ActivityFilters): number {
  let n = 0;
  if (filters.query.trim()) n++;
  n += filters.cities.length;
  n += filters.categories.length;
  n += filters.budgets.length;
  n += filters.difficulties.length;
  n += filters.seasons.length;
  n += filters.crowds.length;
  n += filters.touristLevels.length;
  n += filters.settings.length;
  if (filters.maxDurationMinutes > 0) n++;
  if (filters.familyFriendly) n++;
  if (filters.soloFriendly) n++;
  if (filters.nightActivity) n++;
  if (filters.rainCompatible) n++;
  if (filters.niche) n++;
  return n;
}

// Tri secondaire propose dans l'UI (le tri par score vit dans scoring.ts).
export type ActivitySort = "editorial" | "rating" | "duration" | "budget";

export function sortActivities(
  activities: Activity[],
  sort: ActivitySort,
): Activity[] {
  const copy = [...activities];
  switch (sort) {
    case "rating":
      return copy.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );
    case "duration":
      return copy.sort(
        (a, b) => a.duration.minMinutes - b.duration.minMinutes,
      );
    case "budget":
      return copy.sort(
        (a, b) => budgetRank[a.budget] - budgetRank[b.budget],
      );
    case "editorial":
    default:
      // Le tri editorial reel est applique en amont ; ici on garde l'ordre.
      return copy.sort(
        (a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty],
      );
  }
}
