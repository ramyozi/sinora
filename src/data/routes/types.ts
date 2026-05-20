// Modèle de données du moteur de planification d'itinéraire.

export type TransportMode = "hsr" | "train" | "flight" | "bus";

export type ScoreLevel = 1 | 2 | 3 | 4 | 5;

// Périodes de très forte affluence touristique en Chine.
export type CrowdedPeriod =
  | "golden-week" // semaine du 1er octobre
  | "spring-festival" // nouvel an chinois
  | "summer-peak" // juillet-août
  | "national-day"; // 1er octobre

export type LocalizedNote = { fr: string; en: string; zh: string };

/**
 * Connexion réaliste entre deux villes du graphe Sinora.
 * Bidirectionnelle : `from` et `to` sont interchangeables côté résolveur.
 *
 * Les champs M3.6 (signaux d'intelligence) sont optionnels : seules les
 * connexions clés sont enrichies dans un premier temps.
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

  // — Signaux M3.6 —

  /** Niveau d'engagement logistique (1 = très simple, 5 = exigeant). */
  difficulty?: ScoreLevel;
  /** Fatigue physique attendue (1 = reposant, 5 = épuisant). */
  fatigue?: ScoreLevel;
  /** Intérêt paysager (1 = peu d'intérêt, 5 = exceptionnel). */
  scenic?: ScoreLevel;
  /** Un train de nuit est disponible sur ce trajet. */
  overnightCapable?: boolean;
  /** Périodes où la réservation devient ardue. */
  crowdedPeriods?: CrowdedPeriod[];
  /** Note saisonnière ou contextuelle à mettre en avant. */
  note?: LocalizedNote;
}

export interface RouteTotals {
  distanceKm: number;
  durationHours: number;
  priceMin: number;
  priceMax: number;
  /** Nombre de segments sans connexion directe trouvée. */
  missingSegments: number;
}

export type FatigueLevel = "calm" | "moderate" | "intense" | "exhausting";

export interface FatigueAssessment {
  /** Somme des scores de fatigue des segments connus. */
  total: number;
  level: FatigueLevel;
  /** Couples `from-to` des segments les plus fatigants (≥ 4). */
  heavySegments: string[];
}
