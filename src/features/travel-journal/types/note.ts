// Note libre : capture rapide de pensee, conseil, phrase, adresse.
// Volontairement legere, sans Markdown ni rich text, pour le confort mobile.
export type NoteCategory =
  | "tip"
  | "phrase"
  | "address"
  | "thought"
  | "todo"
  | "other";

export interface Note {
  id: string;
  /** Texte libre. Pas de format impose ; UI applique du whitespace-preserving. */
  body: string;
  category: NoteCategory;
  /** Trip auquel la note est attachee. null = note generale (preparation, idees). */
  tripId: string | null;
  /** Etiquettes libres pour retrouver la note (ex. "transport", "shanghai"). */
  tags: string[];
  /** ISO date pour ordre / regroupement. */
  createdAt: string;
  updatedAt: string;
}
