import { events } from "./dataset";
import type { EventOccurrence, SinoraEvent } from "./types";

export type {
  EventCategory,
  EventCrowd,
  EventOccurrence,
  EventPriority,
  EventTravelImpact,
  SinoraEvent,
} from "./types";
export { events } from "./dataset";

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
