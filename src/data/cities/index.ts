import type { Locale } from "@/i18n/config";
import { cities } from "./dataset";
import type {
  BudgetTier,
  City,
  CityRegion,
  CityTag,
  Season,
} from "./types";

export type {
  City,
  CityFood,
  CityHighlight,
  CityIdentity,
  CityMood,
  CityPace,
  CityRegion,
  CityTag,
  DayMoment,
  Season,
  BudgetTier,
  HighlightKind,
  LocalizedText,
} from "./types";
export { cities } from "./dataset";
export { REGIONS, SEASONS, BUDGETS, TAGS } from "./enums";

export function getAllCities(): City[] {
  return cities;
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getFeaturedCities(): City[] {
  return cities.filter((city) => city.featured);
}

export function getCitiesByRegion(region: CityRegion): City[] {
  return cities.filter((city) => city.region === region);
}

// Liste des identifiants, utile à generateStaticParams.
export function getCitySlugs(): string[] {
  return cities.map((city) => city.slug);
}

// Nom de la ville dans la langue demandée.
export function cityName(city: City, locale: Locale): string {
  return city.name[locale];
}

// Tri alphabétique selon la langue active.
export function sortCitiesByName(list: City[], locale: Locale): City[] {
  return [...list].sort((a, b) =>
    a.name[locale].localeCompare(b.name[locale], locale),
  );
}

// Critères de filtrage du catalogue, tous optionnels.
export interface CityFilter {
  region?: CityRegion;
  season?: Season;
  budget?: BudgetTier;
  tag?: CityTag;
}

export function filterCities(list: City[], criteria: CityFilter): City[] {
  return list.filter((city) => {
    if (criteria.region && city.region !== criteria.region) return false;
    if (criteria.season && !city.bestSeasons.includes(criteria.season)) return false;
    if (criteria.budget && city.budgetTier !== criteria.budget) return false;
    if (criteria.tag && !city.tags.includes(criteria.tag)) return false;
    return true;
  });
}
