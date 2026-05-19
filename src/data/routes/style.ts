import type { CityTag } from "@/data/cities";
import type { PricingTier } from "./pricing";

/**
 * Style de voyage : pilote la gamme budgétaire et le biais de recommandation.
 * Une seule dimension perçue par l'utilisateur, plusieurs effets internes.
 */
export type RouteStyle =
  | "eco"
  | "comfort"
  | "luxury"
  | "cultural"
  | "adventure"
  | "halal"
  | "fast"
  | "slow";

export interface StyleConfig {
  /** Gamme budgétaire associée. */
  tier: PricingTier;
  /** Tags des villes à favoriser dans les suggestions. */
  tagBoost: CityTag[];
  /** Limite le nombre de suggestions affichées (style « rapide »). */
  suggestionLimit: number;
}

export const styleConfig: Record<RouteStyle, StyleConfig> = {
  eco: { tier: "eco", tagBoost: [], suggestionLimit: 5 },
  comfort: { tier: "comfort", tagBoost: [], suggestionLimit: 5 },
  luxury: { tier: "luxury", tagBoost: [], suggestionLimit: 5 },
  cultural: {
    tier: "comfort",
    tagBoost: ["culture", "histoire"],
    suggestionLimit: 5,
  },
  adventure: {
    tier: "comfort",
    tagBoost: ["aventure", "nature"],
    suggestionLimit: 5,
  },
  halal: {
    tier: "comfort",
    tagBoost: ["halal"],
    suggestionLimit: 5,
  },
  fast: { tier: "comfort", tagBoost: [], suggestionLimit: 3 },
  slow: {
    tier: "comfort",
    tagBoost: ["nature", "panorama"],
    suggestionLimit: 5,
  },
};

export const ROUTE_STYLES: RouteStyle[] = [
  "eco",
  "comfort",
  "luxury",
  "cultural",
  "adventure",
  "halal",
  "fast",
  "slow",
];
