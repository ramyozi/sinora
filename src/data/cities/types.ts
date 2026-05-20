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

export type CityMood =
  | "electric"
  | "contemplative"
  | "imperial"
  | "vibrant"
  | "spiritual"
  | "wild"
  | "cozy"
  | "spicy"
  | "ancient"
  | "futuristic";

export type CityPace = "slow" | "balanced" | "fast";

export interface CityFood {
  /** Nom du plat localisé. */
  name: LocalizedText;
  /** Une ligne pour le situer ou le décrire. */
  hint: LocalizedText;
  /** Emoji pour l'icone visuelle. */
  emoji: string;
}

export type DayMoment = "morning" | "afternoon" | "evening" | "night";

export type POICategory =
  | "monument"
  | "quartier"
  | "marche"
  | "vue"
  | "experience"
  | "spot";

export interface CityPOI {
  /** Identifiant stable, utilise pour la section a ne pas rater et le focus carte. */
  slug: string;
  name: LocalizedText;
  category: POICategory;
  coordinates: { lat: number; lng: number };
  /** Article Wikipedia (anglais) pour recuperer la photo de presentation. */
  wikiTitle?: string;
  description: LocalizedText;
  /** Tags emotionnels courts affiches en surimpression sur la carte POI. */
  tags?: LocalizedText[];
}

export interface CityIdentity {
  /** Vibes generales en mots simples. */
  moods: CityMood[];
  /** Rythme suggere pour le visiteur. */
  pace: CityPace;
  /** Trois plats incontournables. */
  food: CityFood[];
  /** Choses a vivre pour ressentir la ville. */
  mustExperience: LocalizedText[];
  /** Saison ideale en une phrase. */
  bestMoment: LocalizedText;
  /** Ambiance evoquee a chaque moment cle de la journee. */
  dayMoments: Partial<Record<DayMoment, LocalizedText>>;
  /** Erreurs classiques que les visiteurs commettent. */
  pitfalls: LocalizedText[];
  /** Pepites cachees : spots locaux peu touristiques. */
  hiddenGems?: LocalizedText[];
  /** Regles d'etiquette locale a connaitre. */
  etiquette?: LocalizedText[];
  /** Conseils saisonniers : printemps / ete / automne / hiver. */
  seasonalTips?: Partial<Record<Season, LocalizedText>>;
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
  /** Personnalite emotionnelle : optionnelle, etoffee ville par ville. */
  identity?: CityIdentity;
  /** Points d'interet cliquables sur la carte ville. */
  pointsOfInterest?: CityPOI[];
}
