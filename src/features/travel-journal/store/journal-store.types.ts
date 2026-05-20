import type { SavedTrip } from "../types/trip";
import type { Note } from "../types/note";
import type { Expense, CategoryBudget } from "../types/expense";
import type { ChecklistItem } from "../types/checklist";
import type { Favorite } from "../types/favorite";
import type { Memory } from "../types/memory";
import type { DailyDay, DailyItem } from "../types/daily";

// Etat persiste du carnet. Toutes les collections sont des tableaux ranges
// par date d'ajout (les modifications passent par les actions du store).
export interface JournalState {
  /** Trips sauvegardes (entites racine du carnet). */
  trips: SavedTrip[];
  /** Notes libres, lieges ou pas a un trip. */
  notes: Note[];
  /** Depenses ; toujours rattachees a un trip. */
  expenses: Expense[];
  /** Budget previsionnel par categorie pour chaque trip. */
  categoryBudgets: Record<string, CategoryBudget[]>;
  /** Items de checklist preparation, par trip. */
  checklists: ChecklistItem[];
  /** Favoris (villes, POI, events) optionnellement attaches a un trip. */
  favorites: Favorite[];
  /** Memories : carnet emotionnel par trip. */
  memories: Memory[];
  /** Jours de planning par trip. */
  days: DailyDay[];
  /** Items horaires lies a un jour. */
  dayItems: DailyItem[];
  /** Trip actuellement actif dans l'UI (selection persistante). */
  activeTripId: string | null;
  /** Timestamp du dernier import : permet de detecter un restore externe. */
  lastImportAt: string | null;
}

// Forme initiale : aucune entree. Sert de defaut au store et fallback de
// migration quand le snapshot est inutilisable.
export const initialJournalState: JournalState = {
  trips: [],
  notes: [],
  expenses: [],
  categoryBudgets: {},
  checklists: [],
  favorites: [],
  memories: [],
  days: [],
  dayItems: [],
  activeTripId: null,
  lastImportAt: null,
};
