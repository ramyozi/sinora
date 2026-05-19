import type { BudgetTier, CityRegion, CityTag, Season } from "./types";

// Listes des valeurs d'énumérations, à utiliser pour valider et itérer.
export const REGIONS: CityRegion[] = [
  "nord",
  "est",
  "sud",
  "sud-ouest",
  "centre",
  "ouest",
];

export const SEASONS: Season[] = ["printemps", "ete", "automne", "hiver"];

export const BUDGETS: BudgetTier[] = ["eco", "modere", "confort"];

export const TAGS: CityTag[] = [
  "culture",
  "histoire",
  "modernite",
  "nature",
  "gastronomie",
  "halal",
  "famille",
  "shopping",
  "panorama",
  "aventure",
];
