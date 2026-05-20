// Souvenirs de voyage : carnet emotionnel. Lies au trip, ranges par date.
// Les "photos" sont stockees comme references (data URL ou IndexedDB blob ID
// dans une PR ulterieure) pour ne pas exploser le quota localStorage.
export type MoodTag =
  | "joy"
  | "awe"
  | "nostalgia"
  | "exhaustion"
  | "discovery"
  | "calm"
  | "rush"
  | "other";

export interface MemoryPhoto {
  id: string;
  /** Identifiant de blob IndexedDB ou data URL courte. */
  blobRef: string;
  /** Mime type pour ne pas avoir a deviner a l'affichage. */
  mime: string;
  /** Legende facultative. */
  caption: string;
}

export interface Memory {
  id: string;
  tripId: string;
  /** Titre court : "Lever de soleil a Zhangjiajie". */
  title: string;
  /** Recit libre du souvenir (whitespace preserved). */
  body: string;
  mood: MoodTag;
  /** Date du souvenir (ISO yyyy-mm-dd). null = pas datee. */
  happenedOn: string | null;
  /** Ville liee (facultatif, slug). */
  citySlug: string | null;
  /** Photos attachees (volume reserve pour PR5). */
  photos: MemoryPhoto[];
  /** Etiquettes emotionnelles libres complementaires au mood principal. */
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
