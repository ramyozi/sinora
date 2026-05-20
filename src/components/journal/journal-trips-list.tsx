"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Archive,
  ArchiveRestore,
  Calendar,
  Copy,
  MapPin,
  MoreHorizontal,
  Pencil,
  Play,
  Trash2,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import { localizedPath } from "@/lib/navigation";
import {
  useJournalStore,
  type SavedTrip,
  type TripStatus,
} from "@/features/travel-journal";

interface Props {
  locale: Locale;
  dict: Dictionary;
  /** Liste des villes pour traduire les slugs en noms localises. */
  cities: City[];
}

// Construit l'URL de reprise vers /route-planner avec tout l'etat necessaire.
// Le planner side-server desencode et seed l'etat du builder a l'identique.
function buildResumeUrl(trip: SavedTrip, locale: Locale): string {
  const params = new URLSearchParams();
  if (trip.cities.length) params.set("cities", trip.cities.join(","));
  if (trip.style) params.set("style", trip.style);
  if (trip.originSlug) params.set("origin", trip.originSlug);
  if (trip.destinationSlug) params.set("destination", trip.destinationSlug);
  if (trip.profile) params.set("profile", trip.profile);
  if (trip.diet.length) params.set("diet", trip.diet.join(","));
  if (trip.interests.length) params.set("interests", trip.interests.join(","));
  if (trip.dates.start) params.set("eventStart", trip.dates.start);
  if (trip.dates.end) params.set("eventEnd", trip.dates.end);
  params.set("tripId", trip.id);
  return `${localizedPath("/route-planner", locale)}?${params.toString()}`;
}

const STATUS_TONES: Record<TripStatus, string> = {
  planning: "border-accent/30 bg-accent/10 text-accent",
  ongoing: "border-emerald-300/40 bg-emerald-300/10 text-emerald-500",
  completed: "border-blue-300/40 bg-blue-300/10 text-blue-500",
  archived: "border-border bg-surface-muted text-muted",
};

// Carte trip : nom editable, statut, dates, villes, budget. Actions : reprise,
// renommer, dupliquer, archiver, supprimer. UX simple sans modal pour rester
// fluide ; la suppression demande une confirmation pour eviter l'accident.
function TripCard({
  trip,
  locale,
  dict,
  cityNameMap,
}: {
  trip: SavedTrip;
  locale: Locale;
  dict: Dictionary;
  cityNameMap: Map<string, string>;
}) {
  const j = dict.journal.trips;
  const statusLabels = dict.journal.tripStatuses;
  const renameTrip = useJournalStore((s) => s.renameTrip);
  const duplicateTrip = useJournalStore((s) => s.duplicateTrip);
  const archiveTrip = useJournalStore((s) => s.archiveTrip);
  const unarchiveTrip = useJournalStore((s) => s.unarchiveTrip);
  const removeTrip = useJournalStore((s) => s.removeTrip);

  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(trip.name);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const cityNames = trip.cities.map((slug) => cityNameMap.get(slug) ?? slug);
  // Pour le mode boucle, on retire le doublon de queue dans le resume affiche.
  const uniqueCityNames = (() => {
    if (
      trip.cities.length > 1 &&
      trip.cities[0] === trip.cities[trip.cities.length - 1]
    ) {
      return cityNames.slice(0, -1);
    }
    return cityNames;
  })();
  const cityPreview = uniqueCityNames.slice(0, 4).join(" - ");
  const overflowCount = uniqueCityNames.length - 4;

  const dateRange = (() => {
    if (!trip.dates.start && !trip.dates.end) return null;
    if (trip.dates.start && trip.dates.end) {
      return `${trip.dates.start} > ${trip.dates.end}`;
    }
    return trip.dates.start ?? trip.dates.end;
  })();

  function commitRename() {
    const trimmed = draftName.trim();
    if (trimmed && trimmed !== trip.name) {
      renameTrip(trip.id, trimmed);
    } else {
      setDraftName(trip.name);
    }
    setEditing(false);
  }

  return (
    <article className="group relative rounded-card border border-border bg-surface p-4 transition-colors hover:border-accent/40">
      {/* Statut */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${STATUS_TONES[trip.status]}`}
        >
          {statusLabels[trip.status]}
        </span>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={j.actionsMenu}
            className="grid size-7 place-items-center rounded-full text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <MoreHorizontal className="size-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
              <button
                type="button"
                onClick={() => {
                  duplicateTrip(trip.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-foreground hover:bg-surface-muted"
              >
                <Copy className="size-3.5" /> {j.duplicate}
              </button>
              {trip.status === "archived" ? (
                <button
                  type="button"
                  onClick={() => {
                    unarchiveTrip(trip.id);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-foreground hover:bg-surface-muted"
                >
                  <ArchiveRestore className="size-3.5" /> {j.unarchive}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    archiveTrip(trip.id);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-foreground hover:bg-surface-muted"
                >
                  <Archive className="size-3.5" /> {j.archive}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setConfirmDelete(true);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-accent hover:bg-accent/10"
              >
                <Trash2 className="size-3.5" /> {j.remove}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nom : double-clic pour editer. Le bouton crayon a cote suffit pour le tactile. */}
      <div className="mt-3 flex items-center gap-2">
        {editing ? (
          <input
            autoFocus
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitRename();
              if (e.key === "Escape") {
                setDraftName(trip.name);
                setEditing(false);
              }
            }}
            className="flex-1 rounded-md border border-accent/40 bg-background px-2 py-1 text-base font-semibold text-foreground focus:outline-none"
            maxLength={80}
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex flex-1 items-center gap-1 text-left text-base font-semibold text-foreground hover:text-accent"
          >
            <span>{trip.name}</span>
            <Pencil className="size-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        )}
      </div>

      {/* Metadata : villes + dates */}
      <div className="mt-2 space-y-1 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <MapPin className="size-3.5" />
          <span className="truncate">
            {cityPreview}
            {overflowCount > 0 ? ` (+${overflowCount})` : ""}
          </span>
        </div>
        {dateRange && (
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span>{dateRange}</span>
          </div>
        )}
        {trip.plannedBudgetCNY !== null && (
          <div className="text-foreground/80">
            {j.budgetLabel}: {trip.plannedBudgetCNY.toLocaleString(locale)} CNY
          </div>
        )}
      </div>

      {/* Confirmation suppression */}
      {confirmDelete && (
        <div className="mt-3 rounded-lg border border-accent/40 bg-accent/5 p-3 text-xs">
          <p className="text-foreground">{j.removeConfirm}</p>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="text-muted hover:text-foreground"
            >
              {j.cancel}
            </button>
            <button
              type="button"
              onClick={() => removeTrip(trip.id)}
              className="rounded-full bg-accent px-3 py-1 font-semibold text-accent-foreground hover:bg-accent/90"
            >
              {j.confirmRemove}
            </button>
          </div>
        </div>
      )}

      {/* CTA reprendre */}
      <div className="mt-4 flex items-center justify-end">
        <Link
          href={buildResumeUrl(trip, locale)}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Play className="size-3" />
          {j.resume}
        </Link>
      </div>
    </article>
  );
}

export function JournalTripsList({ locale, dict, cities }: Props) {
  const trips = useJournalStore((s) => s.trips);
  const j = dict.journal.trips;
  const cityNameMap = new Map(cities.map((c) => [c.slug, c.name[locale]]));

  if (trips.length === 0) return null;

  // Trier : voyages actifs (planning/ongoing) > completed > archived ; dans
  // chaque groupe, plus recemment modifie en premier.
  const order: TripStatus[] = ["planning", "ongoing", "completed", "archived"];
  const sorted = [...trips].sort((a, b) => {
    const sa = order.indexOf(a.status);
    const sb = order.indexOf(b.status);
    if (sa !== sb) return sa - sb;
    return b.updatedAt.localeCompare(a.updatedAt);
  });

  return (
    <section className="rounded-card border border-border bg-surface p-5 sm:p-6">
      <header>
        <h2 className="text-lg font-semibold text-foreground">{j.title}</h2>
        <p className="mt-1 text-sm text-muted">{j.subtitle}</p>
      </header>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {sorted.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            locale={locale}
            dict={dict}
            cityNameMap={cityNameMap}
          />
        ))}
      </div>
    </section>
  );
}
