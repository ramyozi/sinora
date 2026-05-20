"use client";

import Link from "next/link";
import { BookHeart, MapPinned, NotebookPen, Sparkles, Heart } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/lib/navigation";
import {
  useJournalHydrated,
  useJournalStore,
} from "@/features/travel-journal";
import { QuickNoteForm } from "./quick-note-form";
import { JournalNotesList } from "./journal-notes-list";

// Vue principale du carnet : header chaleureux, stats, et bloc notes rapide
// pour valider la persistence end-to-end. Le reste arrivera dans les PRs
// successives (saved trips, budget, planner, memories, favorites, insights).
export function JournalOverview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const hydrated = useJournalHydrated();
  const trips = useJournalStore((s) => s.trips);
  const notes = useJournalStore((s) => s.notes);
  const favorites = useJournalStore((s) => s.favorites);
  const memories = useJournalStore((s) => s.memories);

  const j = dict.journal;
  const stats = [
    { label: j.stats.trips, value: trips.length, icon: MapPinned },
    { label: j.stats.notes, value: notes.length, icon: NotebookPen },
    { label: j.stats.favorites, value: favorites.length, icon: Heart },
    { label: j.stats.memories, value: memories.length, icon: Sparkles },
  ];
  const isEmpty = trips.length === 0 && notes.length === 0;

  return (
    <div className="space-y-8">
      {/* Hero du carnet : marqueur "local-first" + tagline + decor doux. */}
      <header className="relative overflow-hidden rounded-card border border-border bg-surface p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
            <BookHeart className="size-3.5" />
            {j.localFirstBadge}
          </div>
          <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {j.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
            {j.subtitle}
          </p>
        </div>
      </header>

      {/* Carte stats : visibilite immediate sur le contenu du carnet. Les
          compteurs n'apparaissent qu'apres hydration pour eviter un flash
          de zeros sur un appareil ou l'utilisateur a deja des donnees. */}
      <section
        aria-busy={!hydrated}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-card border border-border bg-surface p-4"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
              <Icon className="size-5" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">
                {label}
              </div>
              <div className="text-xl font-semibold text-foreground">
                {hydrated ? value : "-"}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Empty state : on le montre uniquement apres hydration ET si le
          carnet est vide. Pendant la rehydration on garde la coquille mais
          on n'affiche pas l'invite, pour eviter un flash chez les utilisateurs
          qui ont deja des donnees. */}
      {hydrated && isEmpty && (
        <section className="rounded-card border border-dashed border-border bg-surface p-6 text-center sm:p-10">
          <div className="mx-auto max-w-xl">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent">
              <BookHeart className="size-6" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-foreground sm:text-xl">
              {j.empty.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{j.empty.description}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <Link
                href={localizedPath("/route-planner", locale)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <MapPinned className="size-4" />
                {j.empty.ctaPlanner}
              </Link>
              <a
                href="#quick-note"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
              >
                <NotebookPen className="size-4" />
                {j.empty.ctaNote}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Section notes : utilisee comme preuve-de-vie de la persistence en
          PR1. Ajout d'une note + reload = la note doit etre toujours la. */}
      <section
        id="quick-note"
        className="rounded-card border border-border bg-surface p-5 sm:p-6"
      >
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {j.notes.title}
            </h2>
            <p className="mt-1 text-sm text-muted">{j.notes.subtitle}</p>
          </div>
        </header>
        <div className="mt-4">
          <QuickNoteForm dict={dict} />
        </div>
        <div className="mt-6">
          <JournalNotesList dict={dict} hydrated={hydrated} />
        </div>
      </section>

      {/* Rappel privacy : insiste sur la promesse local-first du produit. */}
      <section className="rounded-card border border-border bg-surface-muted p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground">
          {j.privacy.title}
        </h3>
        <p className="mt-1 text-xs text-muted">{j.privacy.body}</p>
      </section>
    </div>
  );
}
