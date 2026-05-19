import type { Locale } from "@/i18n/config";

// Texte décliné dans les trois langues du site.
export type LocalizedText = Record<Locale, string>;

export type CityRegion =
  | "nord"
  | "est"
  | "sud"
  | "sud-ouest"
  | "centre"
  | "ouest";

export type Season = "printemps" | "ete" | "automne" | "hiver";

export type BudgetTier = "eco" | "modere" | "confort";

export type CityTag =
  | "culture"
  | "histoire"
  | "modernite"
  | "nature"
  | "gastronomie"
  | "halal"
  | "famille"
  | "shopping"
  | "panorama"
  | "aventure";

export type HighlightKind = "monument" | "quartier" | "nature" | "musee";

export interface CityHighlight {
  name: LocalizedText;
  kind: HighlightKind;
}

export interface City {
  /** Identifiant stable, utilisé dans les URLs. */
  slug: string;
  name: LocalizedText;
  region: CityRegion;
  coordinates: { lat: number; lng: number };
  /** Population de l'aire urbaine, en millions d'habitants. */
  population: number;
  bestSeasons: Season[];
  budgetTier: BudgetTier;
  /** Durée de séjour conseillée en jours : [minimum, maximum]. */
  recommendedStay: [number, number];
  tags: CityTag[];
  tagline: LocalizedText;
  summary: LocalizedText;
  highlights: CityHighlight[];
  /** Code IATA de l'aéroport principal. */
  airport: string;
  /** Titre de l'article Wikipedia (anglais), pour récupérer l'image en tête. */
  wikiTitle: string;
  /** Mise en avant sur la page d'accueil. */
  featured: boolean;
}
