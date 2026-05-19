// Catégories synthétiques dérivées de l'indice européen de qualité de l'air.
export type AqiBand =
  | "very-good"
  | "good"
  | "moderate"
  | "poor"
  | "very-poor"
  | "extreme";

// Échelle de l'indice européen (EEA / Open-Meteo).
export function aqiBandFromIndex(index: number): AqiBand {
  if (index < 20) return "very-good";
  if (index < 40) return "good";
  if (index < 60) return "moderate";
  if (index < 80) return "poor";
  if (index < 100) return "very-poor";
  return "extreme";
}
