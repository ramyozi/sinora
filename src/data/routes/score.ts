import type { City } from "@/data/cities";
import type { FatigueAssessment } from "./types";
import type { ResolvedSegment } from "./pathfinding";

export type RouteWarningKind = "backtrack" | "long-leg" | "fragmented";

export interface RouteWarning {
  kind: RouteWarningKind;
  /** Slugs concernés par l'alerte, dans l'ordre du parcours. */
  cities: string[];
  /** Valeur chiffrée associée si pertinente (km, heures, etc.). */
  value?: number;
}

export type RouteScoreLevel = "weak" | "fair" | "good" | "excellent";

export interface RouteScore {
  /** Score global de 0 à 100. */
  overall: number;
  /** Cohérence géographique : 0 = zigzags, 100 = parcours direct. */
  coherence: number;
  /** Confort temporel : 0 = épuisant, 100 = reposant. */
  pace: number;
  /** Diversité régionale équilibrée : pénalise stagnation et survol. */
  balance: number;
  level: RouteScoreLevel;
  warnings: RouteWarning[];
}

// Distance approximative en kilomètres entre deux paires lat/lng.
function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
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

function scoreLevel(overall: number): RouteScoreLevel {
  if (overall >= 80) return "excellent";
  if (overall >= 65) return "good";
  if (overall >= 45) return "fair";
  return "weak";
}

/**
 * Évalue la qualité d'un itinéraire selon trois axes : cohérence géographique,
 * confort temporel, équilibre régional. Renvoie aussi les anomalies repérées.
 */
export function scoreRoute(
  cities: City[],
  resolved: ResolvedSegment[],
  fatigue: FatigueAssessment,
): RouteScore | null {
  if (cities.length < 2) return null;

  // Cohérence : compare la distance parcourue à la distance entre le premier
  // et le dernier point. Un parcours direct a un ratio proche de 1, un zigzag
  // peut dépasser 2 ou 3.
  let pathKm = 0;
  for (let i = 0; i < cities.length - 1; i++) {
    pathKm += haversineKm(cities[i].coordinates, cities[i + 1].coordinates);
  }
  const startToEnd = haversineKm(
    cities[0].coordinates,
    cities[cities.length - 1].coordinates,
  );
  const ratio = startToEnd > 0 ? pathKm / startToEnd : 1;
  // Ratio 1 = 100, ratio 2 = 60, ratio 3 = 30, ratio 4+ = 10.
  const coherence = Math.max(10, Math.min(100, 100 - (ratio - 1) * 40));

  // Confort : inverse normalisé de la fatigue cumulée.
  // Total max théorique ~ (segments * 5). On normalise sur 16 (seuil exhausting).
  const fatigueNorm = Math.min(1, fatigue.total / 16);
  const pace = Math.round((1 - fatigueNorm) * 100);

  // Équilibre régional : nombre de régions distinctes / nombre d'étapes.
  // Idéal entre 0.4 et 0.7 (ni stagnation, ni survol pur).
  const regions = new Set(cities.map((c) => c.region));
  const ratioRegions = regions.size / cities.length;
  let balance: number;
  if (cities.length < 3) {
    balance = 70;
  } else if (ratioRegions >= 0.4 && ratioRegions <= 0.7) {
    balance = 90;
  } else if (ratioRegions < 0.4) {
    balance = Math.round(60 + (ratioRegions / 0.4) * 30);
  } else {
    balance = Math.round(90 - (ratioRegions - 0.7) * 100);
  }
  balance = Math.max(20, Math.min(100, balance));

  // Pondération : cohérence 45 %, pace 35 %, balance 20 %.
  const overall = Math.round(
    coherence * 0.45 + pace * 0.35 + balance * 0.2,
  );

  const warnings: RouteWarning[] = [];

  // Backtrack : si un saut consécutif revient en arrière de manière notable.
  // Heuristique : projection du vecteur i sur i-1. Cosinus < -0.3 = retour franc.
  for (let i = 1; i < cities.length - 1; i++) {
    const a = cities[i - 1].coordinates;
    const b = cities[i].coordinates;
    const c = cities[i + 1].coordinates;
    const v1 = { x: b.lng - a.lng, y: b.lat - a.lat };
    const v2 = { x: c.lng - b.lng, y: c.lat - b.lat };
    const norm1 = Math.hypot(v1.x, v1.y);
    const norm2 = Math.hypot(v2.x, v2.y);
    if (norm1 < 0.5 || norm2 < 0.5) continue;
    const cos = (v1.x * v2.x + v1.y * v2.y) / (norm1 * norm2);
    if (cos < -0.3) {
      warnings.push({
        kind: "backtrack",
        cities: [cities[i - 1].slug, cities[i].slug, cities[i + 1].slug],
      });
    }
  }

  // Long-leg : segment isolé qui dépasse 1500 km sans étape intermédiaire.
  for (let i = 0; i < resolved.length; i++) {
    const seg = resolved[i];
    if (seg.connections.length !== 1) continue;
    const conn = seg.connections[0];
    if (conn.distanceKm >= 1500) {
      warnings.push({
        kind: "long-leg",
        cities: [seg.from, seg.to],
        value: conn.distanceKm,
      });
    }
  }

  // Fragmented : itinéraire avec plus de la moitié des sauts indirects.
  const indirectCount = resolved.filter(
    (r) => !r.direct && r.connections.length > 0,
  ).length;
  if (resolved.length >= 2 && indirectCount > resolved.length / 2) {
    warnings.push({
      kind: "fragmented",
      cities: cities.map((c) => c.slug),
      value: indirectCount,
    });
  }

  return {
    overall,
    coherence: Math.round(coherence),
    pace,
    balance,
    level: scoreLevel(overall),
    warnings,
  };
}
