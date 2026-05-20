"use client";

import { useSyncExternalStore } from "react";
import { useJournalStore } from "../store/journal-store";

// Indique si le store Zustand a fini de rehydrater depuis localStorage.
// On utilise `useSyncExternalStore` plutot qu'un useEffect + setState pour
// rester compatible avec React 19 strict mode et eviter les cascading
// renders signales par react-hooks/set-state-in-effect.
function subscribe(callback: () => void): () => void {
  return useJournalStore.persist.onFinishHydration(callback);
}

function getSnapshot(): boolean {
  return useJournalStore.persist.hasHydrated();
}

// Cote SSR il n'y a pas de localStorage : on renvoie false pour que les
// composants montrent leur placeholder hydration avant que le client ne
// finalise la rehydration.
function getServerSnapshot(): boolean {
  return false;
}

export function useJournalHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
