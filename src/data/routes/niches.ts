import type { CityTag } from "@/data/cities";
import type { RouteStyle } from "./style";

export type NicheSlug =
  | "otaku"
  | "nightlife"
  | "spiritual"
  | "calm"
  | "luxury"
  | "backpacker"
  | "nature"
  | "photography"
  | "food-hunter";

/**
 * Presets de profil niche : application en un clic d'une combinaison
 * d'interests (tags) et eventuellement d'un style de voyage.
 * Les chips deviennent un raccourci ergonomique au-dessus des preferences fines.
 */
export interface NichePreset {
  slug: NicheSlug;
  /** Tags appliques comme interests (boost dans la recommandation). */
  interests: CityTag[];
  /** Style de voyage applique si different du choix utilisateur. */
  style?: RouteStyle;
  /** Emoji rendu dans le chip. */
  emoji: string;
}

export const niches: NichePreset[] = [
  {
    slug: "otaku",
    emoji: "🎮",
    interests: ["modernite", "shopping"],
  },
  {
    slug: "nightlife",
    emoji: "🌃",
    interests: ["modernite", "gastronomie"],
  },
  {
    slug: "spiritual",
    emoji: "🕊️",
    interests: ["culture", "histoire"],
  },
  {
    slug: "calm",
    emoji: "🍵",
    interests: ["nature", "panorama"],
    style: "slow",
  },
  {
    slug: "luxury",
    emoji: "💎",
    interests: [],
    style: "luxury",
  },
  {
    slug: "backpacker",
    emoji: "🎒",
    interests: [],
    style: "eco",
  },
  {
    slug: "nature",
    emoji: "🏞️",
    interests: ["nature", "aventure"],
  },
  {
    slug: "photography",
    emoji: "📷",
    interests: ["panorama"],
  },
  {
    slug: "food-hunter",
    emoji: "🥟",
    interests: ["gastronomie"],
  },
];
