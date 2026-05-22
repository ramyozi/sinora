import type {
  ActivityBadge,
  ActivityBudget,
  ActivityCategory,
  ActivityCrowd,
  ActivityDifficulty,
  ActivitySetting,
  ActivityTouristLevel,
} from "./types";

// Regroupement des categories pour l'UI de filtrage : evite une rangee de 26
// chips en organisant l'exploration par grande famille.
export type CategoryGroup =
  | "outdoor"
  | "culture"
  | "food"
  | "leisure"
  | "experience";

// Metadonnees visuelles d'une categorie. L'emoji sert de repere rapide,
// `icon` reference une icone lucide (mappee dans le composant carte), et
// `group` pilote le rangement dans les filtres.
export interface CategoryMeta {
  group: CategoryGroup;
  emoji: string;
  /** Nom d'icone lucide-react, resolu cote composant. */
  icon: string;
}

export const categoryMeta: Record<ActivityCategory, CategoryMeta> = {
  hiking: { group: "outdoor", emoji: "🥾", icon: "Footprints" },
  viewpoint: { group: "outdoor", emoji: "🌄", icon: "Telescope" },
  monument: { group: "culture", emoji: "🏯", icon: "Landmark" },
  "historic-quarter": { group: "culture", emoji: "🏮", icon: "Building" },
  food: { group: "food", emoji: "🍜", icon: "UtensilsCrossed" },
  cafe: { group: "food", emoji: "☕", icon: "Coffee" },
  "tea-house": { group: "food", emoji: "🍵", icon: "CupSoda" },
  shopping: { group: "leisure", emoji: "🛍️", icon: "ShoppingBag" },
  museum: { group: "culture", emoji: "🎨", icon: "Palette" },
  park: { group: "outdoor", emoji: "🌿", icon: "Trees" },
  stroll: { group: "outdoor", emoji: "🚶", icon: "Footprints" },
  cruise: { group: "experience", emoji: "🛶", icon: "Sailboat" },
  transport: { group: "experience", emoji: "🚄", icon: "TrainFront" },
  show: { group: "leisure", emoji: "🎭", icon: "Drama" },
  "photo-spot": { group: "leisure", emoji: "📸", icon: "Camera" },
  nightlife: { group: "leisure", emoji: "🌃", icon: "Martini" },
  zen: { group: "experience", emoji: "🧘", icon: "Flower2" },
  gaming: { group: "leisure", emoji: "🎮", icon: "Gamepad2" },
  karaoke: { group: "leisure", emoji: "🎤", icon: "Mic2" },
  nature: { group: "outdoor", emoji: "🏔️", icon: "Mountain" },
  excursion: { group: "experience", emoji: "🏞️", icon: "Map" },
  "multi-day": { group: "experience", emoji: "🏕️", icon: "Tent" },
  workshop: { group: "culture", emoji: "🎓", icon: "GraduationCap" },
  cinema: { group: "leisure", emoji: "🎬", icon: "Clapperboard" },
  spiritual: { group: "culture", emoji: "🛕", icon: "Sparkles" },
  iconic: { group: "culture", emoji: "🐼", icon: "Star" },
};

// Degrade de couverture par groupe : assure des cartes visuelles meme avant
// le chargement de l'image (jamais de bloc gris fade).
export const groupGradient: Record<CategoryGroup, string> = {
  outdoor: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
  culture: "from-amber-500/30 via-orange-500/20 to-red-500/30",
  food: "from-rose-500/30 via-pink-500/20 to-orange-500/30",
  leisure: "from-violet-500/30 via-purple-500/20 to-fuchsia-500/30",
  experience: "from-sky-500/30 via-blue-500/20 to-indigo-500/30",
};

// Ordre stable des categories par groupe, pour les filtres.
export const categoriesByGroup: Record<CategoryGroup, ActivityCategory[]> = {
  outdoor: ["hiking", "viewpoint", "nature", "park", "stroll"],
  culture: [
    "monument",
    "museum",
    "historic-quarter",
    "spiritual",
    "workshop",
    "iconic",
  ],
  food: ["food", "cafe", "tea-house"],
  leisure: [
    "shopping",
    "show",
    "nightlife",
    "photo-spot",
    "gaming",
    "karaoke",
    "cinema",
  ],
  experience: ["cruise", "transport", "excursion", "multi-day", "zen"],
};

export const categoryGroups: CategoryGroup[] = [
  "outdoor",
  "culture",
  "food",
  "leisure",
  "experience",
];

// Listes ordonnees pour les selecteurs de filtres.
export const difficulties: ActivityDifficulty[] = [
  "none",
  "easy",
  "moderate",
  "challenging",
  "expert",
];

export const budgets: ActivityBudget[] = [
  "free",
  "low",
  "moderate",
  "high",
  "premium",
];

export const crowds: ActivityCrowd[] = [
  "quiet",
  "moderate",
  "busy",
  "packed",
];

export const touristLevels: ActivityTouristLevel[] = [
  "hidden",
  "local",
  "mixed",
  "touristy",
  "iconic",
];

export const settings: ActivitySetting[] = ["indoor", "outdoor", "mixed"];

// Toutes les categories a plat, pour l'iteration generique.
export const allCategories: ActivityCategory[] = categoryGroups.flatMap(
  (g) => categoriesByGroup[g],
);

// Badges ordonnes : utilise pour un affichage stable.
export const allBadges: ActivityBadge[] = [
  "must-see",
  "hidden-gem",
  "local-favorite",
  "great-for-photos",
  "family-pick",
  "romantic",
  "rainy-day",
  "sunset-spot",
  "off-the-beaten-path",
  "unesco",
  "free-entry",
  "night-owl",
];

// Echelle numerique du budget : sert au tri et aux comparaisons de filtre.
export const budgetRank: Record<ActivityBudget, number> = {
  free: 0,
  low: 1,
  moderate: 2,
  high: 3,
  premium: 4,
};

// Echelle numerique de difficulte.
export const difficultyRank: Record<ActivityDifficulty, number> = {
  none: 0,
  easy: 1,
  moderate: 2,
  challenging: 3,
  expert: 4,
};
