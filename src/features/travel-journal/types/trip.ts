import type { RouteStyle } from "@/data/routes/style";
import type { CityTag } from "@/data/cities";
import type { TripDates } from "@/data/routes/duration";
import type { TravelProfile, DietRestriction } from "@/data/routes/preferences";

// Etat d'avancement d'un voyage : permet a l'UI de differencier
// "en preparation" / "en cours" / "termine" / "archive".
export type TripStatus = "planning" | "ongoing" | "completed" | "archived";

// Snapshot d'un itineraire sauvegarde depuis le route planner. Contient tout
// ce qui est necessaire pour reprendre la planification a l'identique plus
// tard, sans dependre du backend.
export interface SavedTrip {
  id: string;
  name: string;
  status: TripStatus;
  /** Liste ordonnee des slugs de villes. Mode boucle = derniere ville duplicue. */
  cities: string[];
  /** Slug d'origine / destination (peuvent etre identiques en mode boucle). */
  originSlug: string | null;
  destinationSlug: string | null;
  /** Style de voyage choisi (comfort, fast, slow...). */
  style: RouteStyle;
  profile: TravelProfile;
  diet: DietRestriction[];
  interests: CityTag[];
  dates: TripDates;
  /** Budget previsionnel en CNY (utilisateur). Reel = somme des expenses lies. */
  plannedBudgetCNY: number | null;
  /** Liste de slugs d'events suivis pour ce voyage. */
  pinnedEventSlugs: string[];
  /** Notes libres attachees a ce trip (text Markdown leger). */
  notes: string;
  createdAt: string;
  updatedAt: string;
}
