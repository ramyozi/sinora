import type { RouteStyle } from "./style";

// Itinéraire-type pré-construit, à charger d'un clic dans le route planner.
export interface RouteTemplate {
  slug: string;
  /** Slugs de villes dans l'ordre de visite suggéré. */
  cities: string[];
  /** Style de voyage recommandé pour ce template. */
  style: RouteStyle;
  /** Icône Lucide associée au template. */
  icon:
    | "landmark"
    | "mountain"
    | "compass"
    | "building-2"
    | "footprints"
    | "moon-star";
}

export const routeTemplates: RouteTemplate[] = [
  {
    slug: "cultural-north",
    cities: ["pekin", "datong", "pingyao", "xian", "luoyang"],
    style: "cultural",
    icon: "landmark",
  },
  {
    slug: "yunnan-slow",
    cities: ["kunming", "dali", "lijiang"],
    style: "slow",
    icon: "footprints",
  },
  {
    slug: "silk-road",
    cities: ["xian", "dunhuang", "kachgar"],
    style: "adventure",
    icon: "compass",
  },
  {
    slug: "halal-xinjiang",
    cities: ["xian", "dunhuang", "kachgar"],
    style: "halal",
    icon: "moon-star",
  },
  {
    slug: "megacities",
    cities: ["pekin", "shanghai", "hong-kong"],
    style: "comfort",
    icon: "building-2",
  },
  {
    slug: "southwest-mountain",
    cities: ["chengdu", "kunming", "dali", "lijiang"],
    style: "adventure",
    icon: "mountain",
  },
];
