import type { City, CityTag } from "@/data/cities";
import { findConnection } from "./index";

export type RecommendationReason = "corridor" | "extension";

export interface RouteRecommendation {
  city: City;
  /** Index dans l'ordre courant où insérer la ville (entre `insertAfterIndex` et son successeur). */
  insertAfterIndex: number;
  /** Score interne 0–1, plus élevé = plus pertinent. */
  score: number;
  reason: RecommendationReason;
  /** Slugs de villes voisines justifiant la suggestion (ex. les deux extrémités du segment). */
  bridges: string[];
}

interface ScoringContext {
  selected: string[];
  cities: City[];
  /** Tags à favoriser pour adapter les suggestions au style de voyage. */
  tagBoost?: CityTag[];
}

// Bonus accordé à une ville selon ses tags par rapport au biais de style.
function tagBoostFor(city: City, boost?: CityTag[]): number {
  if (!boost || boost.length === 0) return 0;
  const matches = city.tags.filter((t) => boost.includes(t)).length;
  return matches * 0.2;
}

// Score d'une ville candidate pour un segment a → b :
// - 1.0 si elle est connectée aux deux endpoints (vraie ville intermédiaire)
// - 0.5 si elle est connectée à un seul des deux (extension du segment)
// - 0   sinon
function scoreCandidate(
  candidate: City,
  a: string,
  b: string,
): { score: number; reason: RecommendationReason; bridges: string[] } | null {
  const linksA = Boolean(findConnection(candidate.slug, a));
  const linksB = Boolean(findConnection(candidate.slug, b));
  if (linksA && linksB) {
    return { score: 1, reason: "corridor", bridges: [a, b] };
  }
  if (linksA) return { score: 0.5, reason: "extension", bridges: [a] };
  if (linksB) return { score: 0.5, reason: "extension", bridges: [b] };
  return null;
}

/**
 * Suggère des villes à insérer dans un itinéraire.
 * Pour chaque segment a → b du tracé courant, on cherche les villes
 * candidates dont la position constitue un détour ou une extension cohérente.
 * Pour un tracé d'une seule ville, on suggère ses voisins directs.
 */
export function suggestIntermediates(
  ctx: ScoringContext,
  limit = 5,
): RouteRecommendation[] {
  const { selected, cities, tagBoost } = ctx;
  if (selected.length === 0) return [];

  const selectedSet = new Set(selected);
  const candidates = cities.filter((c) => !selectedSet.has(c.slug));
  const results: RouteRecommendation[] = [];

  // Cas un seul point : suggérer les voisins comme extensions.
  if (selected.length === 1) {
    const a = selected[0];
    for (const candidate of candidates) {
      const direct = findConnection(candidate.slug, a);
      if (!direct) continue;
      results.push({
        city: candidate,
        insertAfterIndex: 0,
        score: 0.8 + tagBoostFor(candidate, tagBoost),
        reason: "extension",
        bridges: [a],
      });
    }
  } else {
    // Cas général : scanner chaque segment consécutif.
    for (let i = 0; i < selected.length - 1; i++) {
      const a = selected[i];
      const b = selected[i + 1];
      for (const candidate of candidates) {
        const scored = scoreCandidate(candidate, a, b);
        if (!scored) continue;
        results.push({
          city: candidate,
          insertAfterIndex: i,
          ...scored,
          score: scored.score + tagBoostFor(candidate, tagBoost),
        });
      }
    }
  }

  // Dédoublonner par slug en gardant le meilleur score, puis trier décroissant.
  const bestBySlug = new Map<string, RouteRecommendation>();
  for (const r of results) {
    const prev = bestBySlug.get(r.city.slug);
    if (!prev || r.score > prev.score) bestBySlug.set(r.city.slug, r);
  }
  return Array.from(bestBySlug.values())
    .sort((x, y) => y.score - x.score)
    .slice(0, limit);
}
