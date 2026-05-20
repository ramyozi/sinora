import { connections } from "./connections";
import { resolveRoute } from "./pathfinding";
import type {
  Connection,
  FatigueAssessment,
  FatigueLevel,
  RouteTotals,
} from "./types";

export type {
  Connection,
  CrowdedPeriod,
  FatigueAssessment,
  FatigueLevel,
  LocalizedNote,
  RouteTotals,
  ScoreLevel,
  TransportMode,
} from "./types";
export { connections } from "./connections";
export {
  findShortestPath,
  resolveRoute,
  type ResolvedSegment,
} from "./pathfinding";
export {
  optimizeRouteOrder,
  scoreRoute,
  type RouteScore,
  type RouteScoreLevel,
  type RouteWarning,
  type RouteWarningKind,
} from "./score";
export {
  isPeakDate,
  peakWindows,
  peakWindowsBetween,
  peakWindowsRelevant,
  type PeakWindow,
} from "./calendar";
export { niches, type NichePreset, type NicheSlug } from "./niches";
export {
  densityFromBudget,
  durationAdvice,
  durationBudget,
  tripDurationDays,
  type DensityLevel,
  type DensityScore,
  type DurationAdvice,
  type DurationAdviceKind,
  type DurationBudget,
  type TripDates,
} from "./duration";

// Connexions impliquant la ville donnée, peu importe le sens du graphe.
export function getConnections(citySlug: string): Connection[] {
  return connections.filter(
    (c) => c.from === citySlug || c.to === citySlug,
  );
}

// Liste des slugs voisins immédiats d'une ville.
export function getNeighbours(citySlug: string): string[] {
  return getConnections(citySlug).map((c) =>
    c.from === citySlug ? c.to : c.from,
  );
}

// Trouve la connexion directe entre deux villes, dans n'importe quel sens.
export function findConnection(
  a: string,
  b: string,
): Connection | undefined {
  return connections.find(
    (c) => (c.from === a && c.to === b) || (c.from === b && c.to === a),
  );
}

/**
 * Découpe un itinéraire en segments consécutifs.
 * Renvoie `undefined` pour les sauts sans connexion directe : ils
 * peuvent être traités plus tard par un algorithme de plus court chemin.
 */
export function segmentsForRoute(
  cityOrder: string[],
): (Connection | undefined)[] {
  if (cityOrder.length < 2) return [];
  const segments: (Connection | undefined)[] = [];
  for (let i = 0; i < cityOrder.length - 1; i++) {
    segments.push(findConnection(cityOrder[i], cityOrder[i + 1]));
  }
  return segments;
}

/**
 * Évalue la fatigue cumulée d'un itinéraire à partir des scores par segment.
 * Les segments sans signal connu reçoivent une fatigue par défaut modérée (2).
 */
export function assessRouteFatigue(cityOrder: string[]): FatigueAssessment {
  const segments = segmentsForRoute(cityOrder);
  let total = 0;
  const heavySegments: string[] = [];
  for (const seg of segments) {
    if (!seg) continue;
    const f = seg.fatigue ?? 2;
    total += f;
    if (f >= 4) heavySegments.push(`${seg.from}-${seg.to}`);
  }
  let level: FatigueLevel = "calm";
  if (total >= 16) level = "exhausting";
  else if (total >= 11) level = "intense";
  else if (total >= 6) level = "moderate";
  return { total, level, heavySegments };
}

// Totaux de l'itinéraire, en ignorant les segments manquants pour les sommes.
export function routeTotals(cityOrder: string[]): RouteTotals {
  const segments = segmentsForRoute(cityOrder);
  const present = segments.filter((s): s is Connection => Boolean(s));
  return {
    distanceKm: present.reduce((sum, s) => sum + s.distanceKm, 0),
    durationHours: present.reduce((sum, s) => sum + s.durationHours, 0),
    priceMin: present.reduce((sum, s) => sum + s.priceCNY[0], 0),
    priceMax: present.reduce((sum, s) => sum + s.priceCNY[1], 0),
    missingSegments: segments.length - present.length,
  };
}

/**
 * Totaux d'itinéraire enrichis : utilise le plus court chemin pour combler
 * les sauts sans liaison directe, et expose le nombre de sauts indirects.
 */
export function routeTotalsResolved(cityOrder: string[]): RouteTotals & {
  indirectSegments: number;
} {
  const resolved = resolveRoute(cityOrder);
  let distanceKm = 0;
  let durationHours = 0;
  let priceMin = 0;
  let priceMax = 0;
  let missingSegments = 0;
  let indirectSegments = 0;
  for (const seg of resolved) {
    if (seg.connections.length === 0) {
      missingSegments += 1;
      continue;
    }
    if (!seg.direct) indirectSegments += 1;
    for (const c of seg.connections) {
      distanceKm += c.distanceKm;
      durationHours += c.durationHours;
      priceMin += c.priceCNY[0];
      priceMax += c.priceCNY[1];
    }
  }
  return {
    distanceKm,
    durationHours,
    priceMin,
    priceMax,
    missingSegments,
    indirectSegments,
  };
}
