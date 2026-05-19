// Modèle de données du moteur de planification d'itinéraire.

export type TransportMode = "hsr" | "train" | "flight" | "bus";

/**
 * Connexion réaliste entre deux villes du graphe Sinora.
 * Bidirectionnelle : `from` et `to` sont interchangeables côté résolveur.
 */
export interface Connection {
  from: string;
  to: string;
  mode: TransportMode;
  /** Durée typique en heures. */
  durationHours: number;
  /** Distance approximative en kilomètres. */
  distanceKm: number;
  /** Fourchette de prix en yuans (économique → confort). */
  priceCNY: [number, number];
}

export interface RouteTotals {
  distanceKm: number;
  durationHours: number;
  priceMin: number;
  priceMax: number;
  /** Nombre de segments sans connexion directe trouvée. */
  missingSegments: number;
}
