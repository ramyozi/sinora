import { connections } from "./connections";
import type { Connection, RouteTotals } from "./types";

export type { Connection, RouteTotals, TransportMode } from "./types";
export { connections } from "./connections";

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
