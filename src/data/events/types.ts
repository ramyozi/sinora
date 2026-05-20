import type { LocalizedText } from "@/data/cities/types";

export type EventCategory =
  | "festival"
  | "religious"
  | "food"
  | "music"
  | "sport"
  | "national"
  | "lantern"
  | "ice-snow"
  | "art"
  | "tech";

export type EventCrowd = "calme" | "modere" | "dense" | "extreme";

export type EventPriority = "low" | "medium" | "high";

export type EventTravelImpact = "none" | "detour" | "must-include";

export type EventRecurrence =
  | { kind: "annual-fixed"; month: number; day: number }
  | { kind: "annual-window"; startMonth: number; startDay: number; endMonth: number; endDay: number }
  | { kind: "lunar" }
  | { kind: "occurrences"; dates: { start: string; end: string }[] };

export interface EventOccurrence {
  start: string;
  end: string;
}

export type EventSource = "static" | "wikipedia" | "community" | "api";

export interface EventExternalLink {
  kind: "official" | "tickets" | "wiki" | "social";
  url: string;
}

export interface SinoraEvent {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  category: EventCategory;
  /** Slug de la ville hote principale (doit exister dans le dataset). */
  citySlug: string;
  /** Localisation precise dans la ville (quartier, parc...). */
  venue?: LocalizedText;
  /** Frequentation attendue. */
  crowd: EventCrowd;
  /** Priorite editoriale pour le planner. */
  eventPriority: EventPriority;
  /** Impact suggere sur l'itineraire. */
  travelImpact: EventTravelImpact;
  /** Nombre de jours minimum a ajouter au sejour pour profiter. */
  recommendedStayExtensionDays: number;
  /** Article Wikipedia pour la photo de presentation. */
  wikiTitle?: string;
  /** URL d'image directe (utilise quand wikiTitle est absent). */
  imageUrl?: string;
  /** Occurrences connues (anneees specifiques). Au moins 2026 et 2027. */
  occurrences: EventOccurrence[];
  /** Tags emotionnels pour filtrage niche. */
  niche?: string[];

  // ===== Enrichissement M4.1 PR2 =====

  /** Liens externes (site officiel, billetterie, etc.). */
  externalLinks?: EventExternalLink[];
  /** Source de l'entree pour ingestion future. */
  source?: EventSource;
  /** Date de derniere mise a jour de l'entree (ISO). */
  lastUpdated?: string;
  /** Score de popularite estime, 0-100. */
  popularityScore?: number;
  /** True si verifie par l'equipe editoriale. */
  isVerified?: boolean;
}
