import { JOURNAL_SCHEMA_VERSION } from "./migrations";
import type { JournalState } from "../store/journal-store.types";

// Format de l'export local. Le wrapping permet d'enregistrer la version du
// schema cote utilisateur, sans dependre de la cle localStorage. Tout import
// JSON doit etre valide contre cette structure avant d'etre injecte.
export interface JournalExport {
  schema: "sinora.journal";
  version: number;
  exportedAt: string;
  data: Partial<JournalState>;
}

// Serialise l'etat actuel en JSON pret a l'enregistrement. On garde l'objet
// brut pour qu'un utilisateur curieux puisse l'inspecter / le diffuser.
export function exportJournal(state: JournalState): JournalExport {
  return {
    schema: "sinora.journal",
    version: JOURNAL_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      trips: state.trips,
      notes: state.notes,
      expenses: state.expenses,
      categoryBudgets: state.categoryBudgets,
      checklists: state.checklists,
      favorites: state.favorites,
      memories: state.memories,
      days: state.days,
      dayItems: state.dayItems,
      activeTripId: state.activeTripId,
      lastImportAt: state.lastImportAt,
    },
  };
}

// Tente de parser un JSON d'import. Retourne null si la structure ne
// correspond pas au schema attendu, ou si la version est inconnue. Plus
// tard, on pourra appeler `migrateJournal` ici pour accepter d'anciens
// fichiers ; pour l'instant on accepte uniquement la version courante.
export function parseJournalExport(raw: string): JournalExport | null {
  try {
    const parsed = JSON.parse(raw) as Partial<JournalExport>;
    if (!parsed || parsed.schema !== "sinora.journal") return null;
    if (typeof parsed.version !== "number") return null;
    if (!parsed.data || typeof parsed.data !== "object") return null;
    return {
      schema: "sinora.journal",
      version: parsed.version,
      exportedAt: parsed.exportedAt ?? new Date().toISOString(),
      data: parsed.data,
    };
  } catch {
    return null;
  }
}
