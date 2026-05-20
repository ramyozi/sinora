"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BookHeart, Check, ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { RouteStyle } from "@/data/routes/style";
import type { CityTag } from "@/data/cities";
import type {
  DietRestriction,
  TravelProfile,
} from "@/data/routes/preferences";
import type { TripDates } from "@/data/routes/duration";
import { localizedPath } from "@/lib/navigation";
import {
  useJournalStore,
  useJournalHydrated,
  type SavedTrip,
} from "@/features/travel-journal";

interface Props {
  locale: Locale;
  dict: Dictionary;
  /** Snapshot du planner courant : ce qui sera sauvegarde. */
  snapshot: {
    cities: string[];
    originSlug: string | null;
    destinationSlug: string | null;
    style: RouteStyle;
    profile: TravelProfile;
    diet: DietRestriction[];
    interests: CityTag[];
    dates: TripDates;
    pinnedEventSlugs: string[];
  };
  /** ID du trip a mettre a jour. null = nouveau trip. */
  existingTripId: string | null;
}

// Sous-composant : panneau monte uniquement quand le bouton est ouvert. Les
// valeurs initiales sont calculees lors du mount, pas via useEffect, pour
// rester compatible avec la regle react-hooks/set-state-in-effect.
interface PanelProps {
  locale: Locale;
  dict: Dictionary;
  existing: SavedTrip | null;
  snapshot: Props["snapshot"];
  onClose: () => void;
}

function SavePanel({ locale, dict, existing, snapshot, onClose }: PanelProps) {
  const saveTrip = useJournalStore((s) => s.saveTrip);
  const renameTrip = useJournalStore((s) => s.renameTrip);
  const setActiveTrip = useJournalStore((s) => s.setActiveTrip);
  const t = dict.routePlanner.saveToJournal;

  const defaultName = existing
    ? existing.name
    : snapshot.cities.length >= 2
      ? `${snapshot.cities[0]} > ${snapshot.cities[snapshot.cities.length - 1]}`
      : t.defaultName;
  const defaultBudget = existing?.plannedBudgetCNY?.toString() ?? "";

  const [name, setName] = useState(defaultName);
  const [budget, setBudget] = useState(defaultBudget);
  const [savedTrip, setSavedTrip] = useState<SavedTrip | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const plannedBudget = budget.trim() ? Number(budget) : null;
    const plannedBudgetCNY =
      plannedBudget && Number.isFinite(plannedBudget) && plannedBudget > 0
        ? plannedBudget
        : null;

    if (existing) {
      renameTrip(existing.id, trimmed);
      setSavedTrip({ ...existing, name: trimmed, plannedBudgetCNY });
    } else {
      const trip = saveTrip({
        name: trimmed,
        cities: snapshot.cities,
        originSlug: snapshot.originSlug,
        destinationSlug: snapshot.destinationSlug,
        style: snapshot.style,
        profile: snapshot.profile,
        diet: snapshot.diet,
        interests: snapshot.interests,
        dates: snapshot.dates,
        plannedBudgetCNY,
        pinnedEventSlugs: snapshot.pinnedEventSlugs,
        notes: "",
      });
      setActiveTrip(trip.id);
      setSavedTrip(trip);
    }
  }

  if (savedTrip) {
    return (
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-accent">
          <Check className="size-4" />
          <span className="font-semibold">{t.saved}</span>
        </div>
        <p className="text-muted">{t.savedHint}</p>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-muted hover:text-foreground"
          >
            {t.continue}
          </button>
          <Link
            href={localizedPath("/journal", locale)}
            className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t.openJournal}
            <ChevronRight className="size-3" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 text-sm">
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          {existing ? t.updateTitle : t.title}
        </h3>
        <p className="mt-0.5 text-xs text-muted">
          {snapshot.cities.length} {t.citiesShort}
        </p>
      </div>
      <label className="block">
        <span className="block text-xs font-medium text-muted">{t.nameLabel}</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          maxLength={80}
          className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          autoFocus
        />
      </label>
      <label className="block">
        <span className="block text-xs font-medium text-muted">{t.budgetLabel}</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder={t.budgetPlaceholder}
          className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </label>
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-muted hover:text-foreground"
        >
          {t.cancel}
        </button>
        <button
          type="submit"
          disabled={!name.trim()}
          className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BookHeart className="size-3" />
          {existing ? t.updateSubmit : t.submit}
        </button>
      </div>
    </form>
  );
}

// CTA "Sauvegarder dans mon carnet" : ouvre un panneau contextuel qui appelle
// le store Zustand pour persister le trip. Le panneau est demontre/remonte
// a chaque ouverture pour reinitialiser ses valeurs proprement (et eviter
// les set-state-in-effect liees a la pre-fill).
export function SaveToJournal({ locale, dict, snapshot, existingTripId }: Props) {
  const hydrated = useJournalHydrated();
  const trips = useJournalStore((s) => s.trips);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const existing = existingTripId
    ? (trips.find((t) => t.id === existingTripId) ?? null)
    : null;
  const t = dict.routePlanner.saveToJournal;

  // Fermer le panneau au clic exterieur. handler attache uniquement quand
  // `open` est vrai pour ne pas faire fuiter de listeners.
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const canSave = hydrated && snapshot.cities.length > 0;

  return (
    <div ref={formRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={!canSave}
        className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        <BookHeart className="size-3.5" />
        {existing ? t.updateLabel : t.label}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-80 rounded-card border border-border bg-surface p-4 shadow-xl">
          <SavePanel
            locale={locale}
            dict={dict}
            existing={existing}
            snapshot={snapshot}
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
