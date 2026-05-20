"use client";

import { X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { useJournalStore } from "@/features/travel-journal";

// Liste des notes ; supporte la suppression. Les nouvelles notes sont
// inserees en tete (cf addNote dans le store). Pendant l'hydration, on
// affiche un placeholder neutre pour eviter le mismatch SSR / client.
export function JournalNotesList({
  dict,
  hydrated,
}: {
  dict: Dictionary;
  hydrated: boolean;
}) {
  const notes = useJournalStore((s) => s.notes);
  const removeNote = useJournalStore((s) => s.removeNote);
  const n = dict.journal.notes;

  if (!hydrated) {
    return (
      <p className="text-sm text-muted" aria-live="polite">
        {dict.journal.loading}
      </p>
    );
  }

  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-2">
      {notes.map((note) => (
        <li
          key={note.id}
          className="group flex items-start gap-3 rounded-lg border border-border bg-background p-3"
        >
          <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
            {n.categories[note.category]}
          </span>
          <p className="flex-1 whitespace-pre-wrap text-sm text-foreground">
            {note.body}
          </p>
          <button
            type="button"
            onClick={() => removeNote(note.id)}
            aria-label={n.remove}
            className="grid size-7 shrink-0 place-items-center rounded-full text-muted opacity-0 transition-opacity hover:bg-accent/10 hover:text-accent group-hover:opacity-100 focus-visible:opacity-100"
          >
            <X className="size-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
