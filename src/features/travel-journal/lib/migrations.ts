import type { JournalState } from "../store/journal-store.types";

// Numero de version du schema persiste. A bumper chaque fois qu'on modifie
// la forme des donnees sauvees, et a accompagner d'une fonction migrate
// ci-dessous pour transformer l'ancien snapshot en nouvelle forme.
export const JOURNAL_SCHEMA_VERSION = 1;

// Migration appliquee a l'etat lu depuis localStorage. Recoit le snapshot
// brut (`unknown`) et le numero de version stocke ; doit retourner un objet
// compatible avec le state courant. Zustand persist appelle cette fonction
// quand `version` du store > version stockee.
export function migrateJournal(
  persisted: unknown,
  fromVersion: number,
): Partial<JournalState> {
  // Version 0 -> 1 : structure initiale. Pas de transformation a faire, on
  // accepte un snapshot vide et on revient au defaut.
  if (fromVersion < 1) {
    return (persisted as Partial<JournalState>) ?? {};
  }
  return (persisted as Partial<JournalState>) ?? {};
}
