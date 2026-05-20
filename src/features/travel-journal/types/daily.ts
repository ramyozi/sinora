// Planning quotidien : pour chaque jour du voyage on liste des "items" avec
// un horaire approximatif (HH:MM optionnel). Volontairement libre : pas de
// duree obligatoire, pas de validation forte, pour rester un carnet et non
// un agenda d'entreprise.
export type DailyItemKind =
  | "transport"
  | "meal"
  | "visit"
  | "lodging"
  | "free"
  | "other";

export interface DailyItem {
  id: string;
  dayId: string;
  /** Heure ISO partielle HH:MM, ou null si pas d'heure precise. */
  startTime: string | null;
  /** Texte court, modifiable inline ("Train Suzhou", "Jardin Yu"). */
  label: string;
  kind: DailyItemKind;
  /** Slug de ville facultatif pour mapping. */
  citySlug: string | null;
  /** Position dans la liste du jour (entier ; utilise pour drag & drop). */
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Un jour de voyage. Date ISO yyyy-mm-dd + label libre ("Jour 1", "Arrivee Pekin").
export interface DailyDay {
  id: string;
  tripId: string;
  /** ISO date yyyy-mm-dd. Sert de cle de tri. */
  date: string;
  label: string;
  /** Note libre du jour (humeur, meteo, anecdote). */
  body: string;
  createdAt: string;
  updatedAt: string;
}
