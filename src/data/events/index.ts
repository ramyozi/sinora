import { events as core } from "./dataset";
import { eventsAdditions } from "./dataset-additions";
import {
  registerEventProvider,
  StaticEventProvider,
} from "./provider";
import type { EventOccurrence, SinoraEvent } from "./types";

export type {
  EventCategory,
  EventCrowd,
  EventOccurrence,
  EventPriority,
  EventTravelImpact,
  EventSource,
  EventExternalLink,
  SinoraEvent,
} from "./types";

// Catalogue complet : noyau initial + expansion massive M4.1 PR2.
export const events: SinoraEvent[] = [...core, ...eventsAdditions];

// Auto-enregistrement du provider statique avec le catalogue complet.
// Les futurs providers (API) s'ajoutent via registerEventProvider.
registerEventProvider(new StaticEventProvider(events));

export {
  fetchGlobalEvents,
  fetchCityEvents,
  normalizeEvents,
  registerEventProvider,
  StaticEventProvider,
  type EventProvider,
} from "./provider";

export function getAllEvents(): SinoraEvent[] {
  return events;
}

export function getEventBySlug(slug: string): SinoraEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventsByCity(citySlug: string): SinoraEvent[] {
  return events.filter((e) => e.citySlug === citySlug);
}

/**
 * Evenements similaires a un evenement donne, pour la section "a decouvrir
 * aussi" de la page detail. Score : meme ville (+3), meme categorie (+2),
 * occurrence proche dans le temps (+1). Trie par score decroissant.
 */
export function getSimilarEvents(
  event: SinoraEvent,
  limit = 3,
): SinoraEvent[] {
  const earliest = (e: SinoraEvent): string =>
    e.occurrences.map((o) => o.start).sort()[0] ?? "";
  const ref = earliest(event);

  const scored = events
    .filter((e) => e.slug !== event.slug)
    .map((e) => {
      let score = 0;
      if (e.citySlug === event.citySlug) score += 3;
      if (e.category === event.category) score += 2;
      // Proximite temporelle : meme mois de demarrage.
      if (ref && earliest(e).slice(0, 7) === ref.slice(0, 7)) score += 1;
      return { event: e, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.event);
}

/**
 * Trouve les occurrences d'evenements qui chevauchent une fenetre de dates.
 * Retourne les paires { event, occurrence } pour un traitement aval.
 */
export function eventsBetween(
  from: Date,
  to: Date,
): Array<{ event: SinoraEvent; occurrence: EventOccurrence }> {
  const start = dateKey(from);
  const end = dateKey(to);
  const out: Array<{ event: SinoraEvent; occurrence: EventOccurrence }> = [];
  for (const event of events) {
    for (const occ of event.occurrences) {
      if (occ.end >= start && occ.start <= end) {
        out.push({ event, occurrence: occ });
      }
    }
  }
  return out;
}

/**
 * Occurrences a venir pour une ville donnee, dans une fenetre de N jours.
 */
export function upcomingEventsForCity(
  citySlug: string,
  windowDays = 365,
  from: Date = new Date(),
): Array<{ event: SinoraEvent; occurrence: EventOccurrence }> {
  const to = new Date(from.getTime() + windowDays * 86_400_000);
  return eventsBetween(from, to).filter((e) => e.event.citySlug === citySlug);
}

function dateKey(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
