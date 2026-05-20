import type { City } from "@/data/cities";
import type { ResolvedSegment } from "./pathfinding";

export interface TripDates {
  start: string | null;
  end: string | null;
}

export interface DurationBudget {
  /** Nombre total de jours sur place (inclus). null si aucune date renseignee. */
  totalDays: number | null;
  /** Jours conseilles cumules selon recommendedStay min de chaque ville. */
  minStayDays: number;
  /** Jours conseilles cumules selon recommendedStay max. */
  maxStayDays: number;
  /** Jours consommes par les trajets longs (HSR > 4h, vol). */
  transitDays: number;
  /** Reste de jours libres apres villes + transit (au plan min). */
  freeDaysMin: number;
  /** Reste de jours libres apres villes + transit (au plan max). */
  freeDaysMax: number;
}

export type DensityLevel = "rushed" | "tight" | "balanced" | "spacious" | "empty";

export interface DensityScore {
  score: number;
  level: DensityLevel;
  /** Difference normalisee : positive = trop dense, negative = trop vide. */
  pressure: number;
}

const TRANSIT_DAY_THRESHOLD_HOURS = 4;

export function tripDurationDays(dates: TripDates): number | null {
  if (!dates.start || !dates.end) return null;
  const start = Date.parse(`${dates.start}T00:00:00Z`);
  const end = Date.parse(`${dates.end}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  if (end < start) return null;
  return Math.round((end - start) / 86_400_000) + 1;
}

/**
 * Calcule un budget temps pour l'itineraire selectionne.
 * Cumule les recommendedStay des villes, retire les trajets longs (qui consomment
 * une demi-journee a une journee pleine selon la duree).
 */
export function durationBudget(
  cities: City[],
  resolved: ResolvedSegment[],
  dates: TripDates,
): DurationBudget {
  const minStayDays = cities.reduce((s, c) => s + c.recommendedStay[0], 0);
  const maxStayDays = cities.reduce((s, c) => s + c.recommendedStay[1], 0);

  let transitDays = 0;
  for (const seg of resolved) {
    for (const conn of seg.connections) {
      if (conn.durationHours >= TRANSIT_DAY_THRESHOLD_HOURS) {
        transitDays += conn.durationHours >= 8 ? 1 : 0.5;
      }
    }
  }

  const totalDays = tripDurationDays(dates);
  const freeDaysMin =
    totalDays != null ? totalDays - minStayDays - transitDays : 0;
  const freeDaysMax =
    totalDays != null ? totalDays - maxStayDays - transitDays : 0;

  return {
    totalDays,
    minStayDays,
    maxStayDays,
    transitDays,
    freeDaysMin,
    freeDaysMax,
  };
}

/**
 * Densite du sejour : compare le total de jours disponibles a la
 * fourchette de jours conseilles.
 */
export function densityFromBudget(budget: DurationBudget): DensityScore | null {
  if (budget.totalDays == null || budget.totalDays <= 0) return null;
  const requiredAverage = (budget.minStayDays + budget.maxStayDays) / 2 + budget.transitDays;
  if (requiredAverage === 0) return null;

  // pressure > 0 : voyage trop dense (cities exigent plus que disponible)
  // pressure < 0 : voyage trop spacieux
  const pressure = (requiredAverage - budget.totalDays) / requiredAverage;

  let level: DensityLevel;
  if (pressure >= 0.35) level = "rushed";
  else if (pressure >= 0.1) level = "tight";
  else if (pressure >= -0.15) level = "balanced";
  else if (pressure >= -0.4) level = "spacious";
  else level = "empty";

  const score = Math.max(0, Math.min(100, Math.round(100 - Math.abs(pressure) * 120)));
  return { score, level, pressure };
}

/**
 * Suggestions d'action basees sur la pression du sejour :
 * - rushed : retirer une ville lointaine
 * - tight : reduire le nombre de jours par ville ou couper l'extension la plus distante
 * - spacious : ajouter une excursion proche
 * - empty : suggerer plusieurs ajouts ou allonger les sejours
 */
export type DurationAdviceKind = "trim" | "cut" | "extend" | "explore";

export interface DurationAdvice {
  kind: DurationAdviceKind;
  /** Slug recommande pour ajout, ou slug a retirer. */
  citySlug?: string;
}

export function durationAdvice(
  cities: City[],
  density: DensityScore | null,
  available: City[],
  resolved: ResolvedSegment[],
): DurationAdvice[] {
  if (!density) return [];
  const advice: DurationAdvice[] = [];

  if (density.level === "rushed" || density.level === "tight") {
    // Retirer la ville la plus eloignee du barycentre, ponderee par recommendedStay max.
    if (cities.length >= 3) {
      const centerLat =
        cities.reduce((s, c) => s + c.coordinates.lat, 0) / cities.length;
      const centerLng =
        cities.reduce((s, c) => s + c.coordinates.lng, 0) / cities.length;
      let worst: { slug: string; score: number } | null = null;
      for (const c of cities) {
        const dLat = c.coordinates.lat - centerLat;
        const dLng = c.coordinates.lng - centerLng;
        const dist = Math.sqrt(dLat * dLat + dLng * dLng);
        const score = dist * c.recommendedStay[1];
        if (!worst || score > worst.score) worst = { slug: c.slug, score };
      }
      if (worst) advice.push({ kind: "cut", citySlug: worst.slug });
    }
    advice.push({ kind: "trim" });
  }

  if (density.level === "spacious" || density.level === "empty") {
    // Suggerer une excursion : ville voisine non encore selectionnee.
    const visited = new Set(cities.map((c) => c.slug));
    const candidates = available.filter((c) => !visited.has(c.slug));
    if (candidates.length > 0 && cities.length > 0) {
      let best: { slug: string; score: number } | null = null;
      for (const cand of candidates) {
        let minDist = Infinity;
        for (const c of cities) {
          const dLat = cand.coordinates.lat - c.coordinates.lat;
          const dLng = cand.coordinates.lng - c.coordinates.lng;
          const dist = Math.sqrt(dLat * dLat + dLng * dLng);
          if (dist < minDist) minDist = dist;
        }
        // Privilégier les courtes étapes (stay min <= 2 jours).
        const compactness = cand.recommendedStay[0] <= 2 ? 1 : 1.5;
        const score = minDist * compactness;
        if (!best || score < best.score) best = { slug: cand.slug, score };
      }
      if (best) advice.push({ kind: "explore", citySlug: best.slug });
    }
    if (density.level === "empty") advice.push({ kind: "extend" });
  }

  return advice;
}
