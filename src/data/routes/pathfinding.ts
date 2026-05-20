import { connections } from "./connections";
import type { Connection } from "./types";

/**
 * Plus court chemin entre deux villes du graphe Sinora, par durée cumulée.
 * Algorithme : Dijkstra basique. Le graphe est petit (~50 connexions),
 * une priorité O(n^2) suffit largement et garde le code lisible.
 *
 * Renvoie la suite de connexions (orientées dans le sens du parcours)
 * reliant `from` à `to`, ou `null` si aucun chemin n'existe.
 */
export function findShortestPath(
  from: string,
  to: string,
): Connection[] | null {
  if (from === to) return [];

  const adjacency = new Map<string, Connection[]>();
  for (const c of connections) {
    if (!adjacency.has(c.from)) adjacency.set(c.from, []);
    if (!adjacency.has(c.to)) adjacency.set(c.to, []);
    adjacency.get(c.from)!.push(c);
    adjacency.get(c.to)!.push(c);
  }

  const distances = new Map<string, number>();
  const previous = new Map<
    string,
    { from: string; connection: Connection } | null
  >();
  const unvisited = new Set<string>();

  for (const slug of adjacency.keys()) {
    distances.set(slug, Number.POSITIVE_INFINITY);
    previous.set(slug, null);
    unvisited.add(slug);
  }
  if (!distances.has(from)) return null;
  distances.set(from, 0);

  while (unvisited.size > 0) {
    let current: string | null = null;
    let smallest = Number.POSITIVE_INFINITY;
    for (const slug of unvisited) {
      const d = distances.get(slug)!;
      if (d < smallest) {
        smallest = d;
        current = slug;
      }
    }
    if (current === null || smallest === Number.POSITIVE_INFINITY) break;
    if (current === to) break;

    unvisited.delete(current);
    const neighbours = adjacency.get(current) ?? [];
    for (const conn of neighbours) {
      const other = conn.from === current ? conn.to : conn.from;
      if (!unvisited.has(other)) continue;
      const alt = smallest + conn.durationHours;
      if (alt < distances.get(other)!) {
        distances.set(other, alt);
        previous.set(other, { from: current, connection: conn });
      }
    }
  }

  if (distances.get(to) === Number.POSITIVE_INFINITY) return null;

  const path: Connection[] = [];
  let cursor: string | null = to;
  while (cursor !== null && cursor !== from) {
    const step = previous.get(cursor);
    if (!step) return null;
    path.unshift(step.connection);
    cursor = step.from;
  }
  return path;
}

/**
 * Segment d'itinéraire résolu : soit une connexion directe, soit un chemin
 * indirect calculé par plus court chemin. L'UI peut alors afficher l'intégralité
 * du trajet sans laisser de trou.
 */
export interface ResolvedSegment {
  from: string;
  to: string;
  direct: boolean;
  connections: Connection[];
}

/**
 * Résout chaque saut consécutif d'un itinéraire, en cherchant un chemin
 * indirect lorsque la liaison directe est absente du graphe.
 */
export function resolveRoute(cityOrder: string[]): ResolvedSegment[] {
  if (cityOrder.length < 2) return [];
  const result: ResolvedSegment[] = [];
  for (let i = 0; i < cityOrder.length - 1; i++) {
    const from = cityOrder[i];
    const to = cityOrder[i + 1];
    const direct = connections.find(
      (c) =>
        (c.from === from && c.to === to) || (c.from === to && c.to === from),
    );
    if (direct) {
      result.push({ from, to, direct: true, connections: [direct] });
      continue;
    }
    const path = findShortestPath(from, to);
    if (path && path.length > 0) {
      result.push({ from, to, direct: false, connections: path });
    } else {
      result.push({ from, to, direct: false, connections: [] });
    }
  }
  return result;
}
