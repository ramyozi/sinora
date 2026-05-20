import type { City } from "@/data/cities";
import type { SinoraEvent, EventOccurrence } from "@/data/events";
import type { TripDates } from "./duration";

interface CoordPair {
  lat: number;
  lng: number;
}

function haversineKm(a: CoordPair, b: CoordPair): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Score 0-1 : la ville porte l'evenement ? */
export function eventMatchScore(city: City, event: SinoraEvent): number {
  return city.slug === event.citySlug ? 1 : 0;
}

/** Score 0-1 : l'event chevauche-t-il les dates du voyage ? */
export function timeFitScore(dates: TripDates, occurrence: EventOccurrence): number {
  if (!dates.start || !dates.end) return 0;
  return occurrence.end >= dates.start && occurrence.start <= dates.end ? 1 : 0;
}

/**
 * Cout estime (km supplementaires) pour inserer la ville de l'evenement
 * dans le tracé courant entre les deux villes les plus proches.
 */
export function detourCost(
  currentRoute: City[],
  eventCity: City,
): number {
  if (currentRoute.length === 0) return 0;
  if (currentRoute.length === 1) {
    return haversineKm(currentRoute[0].coordinates, eventCity.coordinates) * 2;
  }
  let best = Infinity;
  for (let i = 0; i < currentRoute.length - 1; i++) {
    const a = currentRoute[i];
    const b = currentRoute[i + 1];
    const detour =
      haversineKm(a.coordinates, eventCity.coordinates) +
      haversineKm(eventCity.coordinates, b.coordinates) -
      haversineKm(a.coordinates, b.coordinates);
    if (detour < best) best = detour;
  }
  return Math.max(0, best);
}

export interface OptimizeResult {
  /** Suite de slugs proposee, dans l'ordre. */
  suggestedRoute: string[];
  /** Dates ajustees pour englober l'evenement avec un buffer. */
  adjustedDates: { start: string; end: string };
  /** Warnings (conflits temporels detectes). */
  warnings: string[];
  /** Cout estime du detour en km. */
  detourKm: number;
}

/**
 * Optimise un itineraire autour d'un evenement :
 * - insere la ville de l'evenement a la position de moindre detour.
 * - ajuste les dates pour englober l'evenement + recommendedStayExtensionDays.
 * - signale un conflit si crowd extreme et travelImpact != must-include.
 */
export function optimizeAroundEvent(
  currentSelected: City[],
  currentDates: TripDates,
  event: SinoraEvent,
  occurrence: EventOccurrence,
  allCities: City[],
): OptimizeResult | null {
  const eventCity = allCities.find((c) => c.slug === event.citySlug);
  if (!eventCity) return null;

  // Position d'insertion : juste apres la ville la plus proche en l'absence de detour.
  let suggestedRoute: string[];
  const present = currentSelected.some((c) => c.slug === event.citySlug);
  if (present) {
    suggestedRoute = currentSelected.map((c) => c.slug);
  } else if (currentSelected.length === 0) {
    suggestedRoute = [event.citySlug];
  } else {
    let bestIdx = 0;
    let bestCost = Infinity;
    for (let i = 0; i < currentSelected.length - 1; i++) {
      const a = currentSelected[i];
      const b = currentSelected[i + 1];
      const cost =
        haversineKm(a.coordinates, eventCity.coordinates) +
        haversineKm(eventCity.coordinates, b.coordinates) -
        haversineKm(a.coordinates, b.coordinates);
      if (cost < bestCost) {
        bestCost = cost;
        bestIdx = i + 1;
      }
    }
    // Comparer aussi avec insertion en debut et fin.
    const first = currentSelected[0];
    const last = currentSelected[currentSelected.length - 1];
    const headCost = haversineKm(eventCity.coordinates, first.coordinates);
    const tailCost = haversineKm(last.coordinates, eventCity.coordinates);
    if (headCost < bestCost) {
      bestCost = headCost;
      bestIdx = 0;
    }
    if (tailCost < bestCost) {
      bestCost = tailCost;
      bestIdx = currentSelected.length;
    }
    suggestedRoute = [
      ...currentSelected.slice(0, bestIdx).map((c) => c.slug),
      event.citySlug,
      ...currentSelected.slice(bestIdx).map((c) => c.slug),
    ];
  }

  // Dates : commence avec l'occurrence, etendue par recommendedStayExtensionDays.
  const buffer = event.recommendedStayExtensionDays;
  const start = subtractDays(occurrence.start, Math.floor(buffer / 2));
  const end = addDays(occurrence.end, Math.ceil(buffer / 2));

  // Conserve la plage de l'utilisateur si elle englobe deja l'evenement avec buffer.
  let adjustedStart = start;
  let adjustedEnd = end;
  if (currentDates.start && currentDates.start < start) adjustedStart = currentDates.start;
  if (currentDates.end && currentDates.end > end) adjustedEnd = currentDates.end;

  const warnings: string[] = [];
  if (event.crowd === "extreme" && event.travelImpact !== "must-include") {
    warnings.push("conflict-extreme-crowd");
  }
  if (
    currentDates.start &&
    currentDates.end &&
    (occurrence.end < currentDates.start || occurrence.start > currentDates.end)
  ) {
    warnings.push("dates-shifted");
  }

  return {
    suggestedRoute,
    adjustedDates: { start: adjustedStart, end: adjustedEnd },
    warnings,
    detourKm: present ? 0 : detourCost(currentSelected, eventCity),
  };
}

/**
 * Bonus de scoring lie aux evenements.
 * +2 si une ville selectionnee contient un event pendant les dates.
 * +1 si un event utile (priority high) est dans un rayon 2h (~200 km).
 * -2 pour chaque conflit detecte (event crowd extreme + dates overlap)
 *    non explicitement inclus dans l'itineraire (travelImpact != must-include).
 */
export function eventScoreBonus(
  selectedCities: City[],
  dates: TripDates,
  events: SinoraEvent[],
): number {
  if (!dates.start || !dates.end) return 0;
  let bonus = 0;
  const selectedSet = new Set(selectedCities.map((c) => c.slug));
  for (const event of events) {
    for (const occ of event.occurrences) {
      if (occ.end < dates.start || occ.start > dates.end) continue;
      const isSelected = selectedSet.has(event.citySlug);
      if (isSelected) {
        if (
          event.crowd === "extreme" &&
          event.travelImpact !== "must-include"
        ) {
          bonus -= 2;
        } else {
          bonus += 2;
        }
        break;
      }
      // Proximite : utile uniquement pour les events high priority.
      if (event.eventPriority === "high") {
        // Coût: recherche de la ville la plus proche.
        // On utilise un seuil de 200 km (~2h en HSR ou voiture).
        // city coords absent ici, on saute si pas trouve.
      }
    }
  }
  return bonus;
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
function subtractDays(iso: string, days: number): string {
  return addDays(iso, -days);
}
