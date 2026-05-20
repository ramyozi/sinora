"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import {
  useJournalStore,
  type NoteCategory,
} from "@/features/travel-journal";

const CATEGORIES: NoteCategory[] = [
  "thought",
  "tip",
  "phrase",
  "address",
  "todo",
  "other",
];

// Petit formulaire d'ajout de note : champ texte + select de categorie +
// bouton submit. Persiste dans le store Zustand, qui ecrit dans localStorage.
// Utilise comme test end-to-end de la persistence en PR1.
export function QuickNoteForm({ dict }: { dict: Dictionary }) {
  const addNote = useJournalStore((s) => s.addNote);
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<NoteCategory>("thought");
  const n = dict.journal.notes;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = body.trim();
    if (!trimmed) return;
    addNote({ body: trimmed, category, tripId: null, tags: [] });
    setBody("");
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      <label className="flex-1">
        <span className="sr-only">{n.addPlaceholder}</span>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={n.addPlaceholder}
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          maxLength={500}
        />
      </label>
      <div className="flex items-stretch gap-2">
        <label className="block">
          <span className="sr-only">{n.categories.thought}</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as NoteCategory)}
            className="h-11 appearance-none rounded-lg border border-border bg-background px-3 pr-7 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {n.categories[c]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={!body.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="size-4" />
          {n.addSubmit}
        </button>
      </div>
    </form>
  );
}
