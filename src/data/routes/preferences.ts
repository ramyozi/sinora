import type { CityTag } from "@/data/cities";
import type { RouteStyle } from "./style";

// Profil de voyageur - influence les biais de tag (famille, etc.).
export type TravelProfile = "solo" | "couple" | "family" | "group";

// Restriction alimentaire - la version halal aligne les suggestions sur les villes adaptées.
export type DietRestriction = "halal";

export const TRAVEL_PROFILES: TravelProfile[] = [
  "solo",
  "couple",
  "family",
  "group",
];

export const DIET_RESTRICTIONS: DietRestriction[] = ["halal"];

// Liste des tags proposables comme intérêts dans le panneau.
export const INTEREST_TAGS: CityTag[] = [
  "culture",
  "histoire",
  "modernite",
  "nature",
  "gastronomie",
  "panorama",
  "aventure",
  "shopping",
  "famille",
];

export interface RoutePreferences {
  style: RouteStyle;
  profile: TravelProfile;
  diet: DietRestriction[];
  interests: CityTag[];
}

// Compose le biais de tag effectif à partir des préférences utilisateur.
// Le résultat est dédoublonné pour éviter le sur-scoring d'un même tag.
export function composeTagBoost(
  styleBoost: readonly CityTag[],
  prefs: Omit<RoutePreferences, "style">,
): CityTag[] {
  const set = new Set<CityTag>(styleBoost);
  if (prefs.profile === "family") set.add("famille");
  for (const d of prefs.diet) {
    if (d === "halal") set.add("halal");
  }
  for (const i of prefs.interests) set.add(i);
  return Array.from(set);
}
