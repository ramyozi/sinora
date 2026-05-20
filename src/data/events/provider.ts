import type { SinoraEvent } from "./types";

/**
 * Interface plug-in : tout provider d'evenements (static, API, scraper)
 * doit exposer ce contrat. Le registre interne agrege plusieurs providers
 * pour offrir une vue unifiee au reste de l'app.
 */
export interface EventProvider {
  /** Identifiant stable, utilise dans event.source. */
  id: string;
  /** Recupere tous les events connus du provider. */
  fetchAll(): Promise<SinoraEvent[]>;
  /** Recupere les events d'une ville donnee. */
  fetchByCity(citySlug: string): Promise<SinoraEvent[]>;
}

/**
 * Implementation par defaut : lit un dataset statique livre avec l'app.
 * Le code appelant fournit explicitement les events pour eviter une dependance
 * circulaire avec le barrel index.
 */
export class StaticEventProvider implements EventProvider {
  id = "static";
  private readonly data: SinoraEvent[];

  constructor(data: SinoraEvent[]) {
    this.data = data.map((e) => ({
      source: e.source ?? "static",
      isVerified: e.isVerified ?? true,
      lastUpdated: e.lastUpdated ?? "2026-05-20",
      popularityScore: e.popularityScore ?? defaultPopularity(e),
      ...e,
    }));
  }

  async fetchAll(): Promise<SinoraEvent[]> {
    return this.data;
  }

  async fetchByCity(citySlug: string): Promise<SinoraEvent[]> {
    return this.data.filter((e) => e.citySlug === citySlug);
  }
}

/** Popularity score derive de la priorite editoriale quand non specifie. */
export function defaultPopularity(event: SinoraEvent): number {
  switch (event.eventPriority) {
    case "high":
      return 85;
    case "medium":
      return 60;
    case "low":
      return 35;
  }
}

// Registre simple : tableau de providers, deduplication par slug a l'agregation.
const registry: EventProvider[] = [];

/** Enregistre un nouveau provider (utile pour test ou ingestion future). */
export function registerEventProvider(provider: EventProvider): void {
  if (registry.some((p) => p.id === provider.id)) return;
  registry.push(provider);
}

/**
 * Recupere tous les evenements de tous les providers enregistres, dedupliques
 * par slug (premiere occurrence gagne). Le static provider est toujours prioritaire.
 */
export async function fetchGlobalEvents(): Promise<SinoraEvent[]> {
  const seen = new Map<string, SinoraEvent>();
  for (const provider of registry) {
    const list = await provider.fetchAll();
    for (const e of list) {
      if (!seen.has(e.slug)) seen.set(e.slug, e);
    }
  }
  return Array.from(seen.values());
}

/** Recupere les evenements d'une ville via tous les providers. */
export async function fetchCityEvents(
  citySlug: string,
): Promise<SinoraEvent[]> {
  const seen = new Map<string, SinoraEvent>();
  for (const provider of registry) {
    const list = await provider.fetchByCity(citySlug);
    for (const e of list) {
      if (!seen.has(e.slug)) seen.set(e.slug, e);
    }
  }
  return Array.from(seen.values());
}

/**
 * Normalise une entree brute (par exemple en provenance d'une API future).
 * Garantit que les champs nouveaux PR2 ont des valeurs raisonnables.
 */
export function normalizeEvents(raw: SinoraEvent[]): SinoraEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  return raw.map((e) => ({
    ...e,
    source: e.source ?? "api",
    isVerified: e.isVerified ?? false,
    lastUpdated: e.lastUpdated ?? today,
    popularityScore: e.popularityScore ?? defaultPopularity(e),
  }));
}
