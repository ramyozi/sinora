// Point d'entree public de la feature Travel Journal. On expose uniquement
// les types et hooks utilises par les autres modules ; le store est consomme
// via les hooks (`useJournalStore`, `useJournalHydrated`) pour garder une
// couche d'indirection.
export type { SavedTrip, TripStatus } from "./types/trip";
export type { Note, NoteCategory } from "./types/note";
export type { Expense, ExpenseCategory, CategoryBudget } from "./types/expense";
export type { ChecklistItem, ChecklistGroup } from "./types/checklist";
export type { Favorite, FavoriteKind } from "./types/favorite";
export type { Memory, MemoryPhoto, MoodTag } from "./types/memory";
export type { DailyDay, DailyItem, DailyItemKind } from "./types/daily";

export { useJournalStore } from "./store/journal-store";
export type {
  JournalState,
} from "./store/journal-store.types";
export { useJournalHydrated } from "./hooks/use-journal-hydrated";
export {
  JOURNAL_SCHEMA_VERSION,
  migrateJournal,
} from "./lib/migrations";
export {
  exportJournal,
  parseJournalExport,
  type JournalExport,
} from "./lib/serialization";
