// Element de checklist preparation : visa, eSIM, Alipay, etc.
// Les items "preset" sont livres par defaut quand on cree un nouveau trip ;
// l'utilisateur peut en ajouter des custom et tout cocher.
export type ChecklistGroup =
  | "documents"
  | "tech"
  | "money"
  | "health"
  | "luggage"
  | "custom";

export interface ChecklistItem {
  id: string;
  tripId: string;
  label: string;
  group: ChecklistGroup;
  /** Item issu d'un preset (visa, eSIM, etc.) ou ajoute manuellement. */
  preset: boolean;
  done: boolean;
  /** ISO date a laquelle l'item a ete coche (pour timeline). */
  doneAt: string | null;
  createdAt: string;
  updatedAt: string;
}
