import type { Locale } from "@/i18n/config";
import { cities } from "./dataset";
import type { City, CityRegion } from "./types";

export type {
  City,
  CityHighlight,
  CityRegion,
  CityTag,
  Season,
  BudgetTier,
  HighlightKind,
  LocalizedText,
} from "./types";
export { cities } from "./dataset";

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
