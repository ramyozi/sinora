"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { JOURNAL_SCHEMA_VERSION, migrateJournal } from "../lib/migrations";
import { makeId, nowIso } from "../lib/ids";
import {
  initialJournalState,
  type JournalState,
} from "./journal-store.types";
import type { SavedTrip, TripStatus } from "../types/trip";
import type { Note, NoteCategory } from "../types/note";

// Actions exposees par le store. On distingue les operations PR1 (notes +
// trips squelette) des futures : les autres entites (expenses, checklists,
// memories, favoris, planner) recevront leurs actions dans leur PR dediee
// pour garder ce fichier digeste et chaque PR autonome.
export interface JournalActions {
  // --- Trips ---
  saveTrip: (
    trip: Omit<SavedTrip, "id" | "createdAt" | "updatedAt" | "status"> & {
      status?: TripStatus;
    },
  ) => SavedTrip;
  renameTrip: (id: string, name: string) => void;
  duplicateTrip: (id: string) => SavedTrip | null;
  archiveTrip: (id: string) => void;
  unarchiveTrip: (id: string) => void;
  removeTrip: (id: string) => void;
  setActiveTrip: (id: string | null) => void;

  // --- Notes ---
  addNote: (
    input: Omit<Note, "id" | "createdAt" | "updatedAt"> & {
      category?: NoteCategory;
    },
  ) => Note;
  updateNote: (id: string, patch: Partial<Pick<Note, "body" | "category" | "tags" | "tripId">>) => void;
  removeNote: (id: string) => void;

  // --- Maintenance ---
  /** Remplace integralement l'etat persiste (utilise par l'import JSON). */
  hydrateFromImport: (snapshot: Partial<JournalState>) => void;
  /** Vide tout le carnet. UI doit confirmer avant d'appeler. */
  resetJournal: () => void;
}

export type JournalStore = JournalState & JournalActions;

// Cle localStorage : suffixe "v1" pour reperer le schema actuel. Si on bump
// la version majeure plus tard, on incremente cette cle pour repartir d'un
// snapshot propre quand la migration n'est pas suffisante.
const STORAGE_KEY = "sinora.journal.v1";

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      ...initialJournalState,

      // --- Trips ---
      saveTrip: (input) => {
        const now = nowIso();
        const trip: SavedTrip = {
          id: makeId("trip"),
          status: input.status ?? "planning",
          createdAt: now,
          updatedAt: now,
          ...input,
        };
        set((state) => ({
          trips: [...state.trips, trip],
          activeTripId: state.activeTripId ?? trip.id,
        }));
        return trip;
      },

      renameTrip: (id, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set((state) => ({
          trips: state.trips.map((t) =>
            t.id === id ? { ...t, name: trimmed, updatedAt: nowIso() } : t,
          ),
        }));
      },

      duplicateTrip: (id) => {
        const source = get().trips.find((t) => t.id === id);
        if (!source) return null;
        const now = nowIso();
        const copy: SavedTrip = {
          ...source,
          id: makeId("trip"),
          name: `${source.name} (copie)`,
          status: "planning",
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ trips: [...state.trips, copy] }));
        return copy;
      },

      archiveTrip: (id) => {
        set((state) => ({
          trips: state.trips.map((t) =>
            t.id === id ? { ...t, status: "archived", updatedAt: nowIso() } : t,
          ),
        }));
      },

      unarchiveTrip: (id) => {
        set((state) => ({
          trips: state.trips.map((t) =>
            t.id === id ? { ...t, status: "planning", updatedAt: nowIso() } : t,
          ),
        }));
      },

      removeTrip: (id) => {
        set((state) => ({
          trips: state.trips.filter((t) => t.id !== id),
          notes: state.notes.filter((n) => n.tripId !== id),
          expenses: state.expenses.filter((e) => e.tripId !== id),
          categoryBudgets: Object.fromEntries(
            Object.entries(state.categoryBudgets).filter(([k]) => k !== id),
          ),
          checklists: state.checklists.filter((c) => c.tripId !== id),
          favorites: state.favorites.filter((f) => f.tripId !== id),
          memories: state.memories.filter((m) => m.tripId !== id),
          days: state.days.filter((d) => d.tripId !== id),
          dayItems: state.dayItems.filter((di) => {
            const day = state.days.find((d) => d.id === di.dayId);
            return day ? day.tripId !== id : true;
          }),
          activeTripId: state.activeTripId === id ? null : state.activeTripId,
        }));
      },

      setActiveTrip: (id) => set({ activeTripId: id }),

      // --- Notes ---
      addNote: (input) => {
        const now = nowIso();
        const note: Note = {
          id: makeId("note"),
          createdAt: now,
          updatedAt: now,
          category: input.category ?? "thought",
          body: input.body,
          tripId: input.tripId,
          tags: input.tags ?? [],
        };
        set((state) => ({ notes: [note, ...state.notes] }));
        return note;
      },

      updateNote: (id, patch) => {
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...patch, updatedAt: nowIso() } : n,
          ),
        }));
      },

      removeNote: (id) => {
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
      },

      // --- Maintenance ---
      hydrateFromImport: (snapshot) => {
        set({
          ...initialJournalState,
          ...snapshot,
          lastImportAt: nowIso(),
        });
      },

      resetJournal: () => {
        set({ ...initialJournalState });
      },
    }),
    {
      name: STORAGE_KEY,
      version: JOURNAL_SCHEMA_VERSION,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted, fromVersion) =>
        migrateJournal(persisted, fromVersion) as JournalStore,
      // On ne persiste que les donnees, pas les actions (Zustand stripe deja
      // les fonctions, mais on garde le partialize explicite pour pouvoir
      // exclure plus tard d'eventuels champs ephemeres).
      partialize: (state) => ({
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
      }),
    },
  ),
);
