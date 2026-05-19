// Métadonnées des modules de préparation au voyage.
// Chaque module devient disponible dès que sa page est livrée.

export type PretripIcon =
  | "stamp"
  | "smartphone"
  | "languages"
  | "shield-check"
  | "utensils-crossed"
  | "wallet"
  | "briefcase"
  | "calendar-clock";

export type PretripModuleSlug =
  | "visa"
  | "apps"
  | "phrases"
  | "securite"
  | "restaurants"
  | "budget"
  | "bagages"
  | "calendrier";

export interface PretripModule {
  slug: PretripModuleSlug;
  icon: PretripIcon;
  /** Le module est livré et son lien est actif. */
  available: boolean;
}

export const pretripModules: PretripModule[] = [
  { slug: "visa", icon: "stamp", available: true },
  { slug: "apps", icon: "smartphone", available: true },
  { slug: "phrases", icon: "languages", available: true },
  { slug: "securite", icon: "shield-check", available: true },
  { slug: "restaurants", icon: "utensils-crossed", available: true },
  { slug: "budget", icon: "wallet", available: true },
  { slug: "bagages", icon: "briefcase", available: false },
  { slug: "calendrier", icon: "calendar-clock", available: false },
];
