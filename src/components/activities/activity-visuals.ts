import {
  Building,
  Camera,
  Clapperboard,
  Coffee,
  CupSoda,
  Drama,
  Flower2,
  Footprints,
  Gamepad2,
  GraduationCap,
  Landmark,
  Map,
  Martini,
  Mic2,
  Mountain,
  Palette,
  Sailboat,
  ShoppingBag,
  Sparkles,
  Star,
  Telescope,
  Tent,
  TrainFront,
  Trees,
  type LucideIcon,
} from "lucide-react";
import type { ActivityCategory } from "@/data/activities";

// Mappe le nom d'icone stocke dans tags.ts vers le composant lucide reel.
// Centralise ici pour que carte et page de detail partagent la meme icone.
export const categoryIcon: Record<ActivityCategory, LucideIcon> = {
  hiking: Footprints,
  viewpoint: Telescope,
  monument: Landmark,
  "historic-quarter": Building,
  food: Sparkles,
  cafe: Coffee,
  "tea-house": CupSoda,
  shopping: ShoppingBag,
  museum: Palette,
  park: Trees,
  stroll: Footprints,
  cruise: Sailboat,
  transport: TrainFront,
  show: Drama,
  "photo-spot": Camera,
  nightlife: Martini,
  zen: Flower2,
  gaming: Gamepad2,
  karaoke: Mic2,
  nature: Mountain,
  excursion: Map,
  "multi-day": Tent,
  workshop: GraduationCap,
  cinema: Clapperboard,
  spiritual: Sparkles,
  iconic: Star,
};

// Formate une plage de duree en minutes vers un libelle court et lisible.
// Ex. 180-300 -> "3-5 h" ; 45-90 -> "45-90 min" ; 480 -> "8 h".
export function formatDuration(
  minMinutes: number,
  maxMinutes: number,
  hLabel: string,
  minLabel: string,
): string {
  const toUnit = (m: number) =>
    m >= 60 && m % 30 === 0
      ? { value: m / 60, label: hLabel }
      : { value: m, label: minLabel };
  const lo = toUnit(minMinutes);
  const hi = toUnit(maxMinutes);
  if (minMinutes === maxMinutes) return `${lo.value} ${lo.label}`;
  if (lo.label === hi.label) {
    return `${lo.value}-${hi.value} ${hi.label}`;
  }
  return `${lo.value} ${lo.label} - ${hi.value} ${hi.label}`;
}
