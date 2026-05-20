import type { CrowdedPeriod } from "./types";

/**
 * Fenêtres calendaires des pics touristiques en Chine.
 * Dates exprimées dans le fuseau de référence Asie/Shanghai.
 * Les périodes Spring Festival changent chaque année avec le calendrier lunaire,
 * on stocke les fenêtres connues pour 2026 et 2027 (semaine de Nouvel An lunaire).
 */
export interface PeakWindow {
  kind: CrowdedPeriod;
  /** Inclusif, format AAAA-MM-JJ. */
  start: string;
  /** Inclusif, format AAAA-MM-JJ. */
  end: string;
  /** Année du pic, pour le rendu UI. */
  year: number;
}

export const peakWindows: PeakWindow[] = [
  { kind: "spring-festival", start: "2026-02-15", end: "2026-02-22", year: 2026 },
  { kind: "spring-festival", start: "2027-02-04", end: "2027-02-11", year: 2027 },
  { kind: "summer-peak", start: "2026-07-01", end: "2026-08-31", year: 2026 },
  { kind: "summer-peak", start: "2027-07-01", end: "2027-08-31", year: 2027 },
  { kind: "national-day", start: "2026-10-01", end: "2026-10-01", year: 2026 },
  { kind: "national-day", start: "2027-10-01", end: "2027-10-01", year: 2027 },
  { kind: "golden-week", start: "2026-10-01", end: "2026-10-07", year: 2026 },
  { kind: "golden-week", start: "2027-10-01", end: "2027-10-07", year: 2027 },
];

function dateKey(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Retourne les fenêtres pic qui chevauchent l'intervalle [from, to].
 * Si `to` est omis, on regarde from + 90 jours par défaut.
 */
export function peakWindowsBetween(
  from: Date,
  to?: Date,
): PeakWindow[] {
  const start = dateKey(from);
  const end = to ? dateKey(to) : dateKey(new Date(from.getTime() + 90 * 86_400_000));
  return peakWindows.filter((w) => w.end >= start && w.start <= end);
}

/**
 * Vrai si la date donnée tombe à l'intérieur d'une fenêtre pic.
 */
export function isPeakDate(date: Date): PeakWindow | null {
  const key = dateKey(date);
  return peakWindows.find((w) => key >= w.start && key <= w.end) ?? null;
}

/**
 * Filtre les fenêtres pertinentes pour un itinéraire selon les périodes
 * d'affluence déclarées par ses segments.
 */
export function peakWindowsRelevant(
  segmentPeriods: CrowdedPeriod[],
  from: Date,
  to?: Date,
): PeakWindow[] {
  const set = new Set(segmentPeriods);
  return peakWindowsBetween(from, to).filter((w) => set.has(w.kind));
}
