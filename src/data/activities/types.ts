import type { LocalizedText, Season } from "@/data/cities/types";
import type { DayMoment } from "@/data/cities/types";

// ============================================================================
// Module Activites & Experiences immersives
// ----------------------------------------------------------------------------
// Les activites sont permanentes ou semi-permanentes, par opposition aux
// evenements (datees, calendaires). Le modele est volontairement riche pour
// supporter une densite future de 100+ activites par ville sans refonte.
// ============================================================================

// Categories couvrant tout le spectre d'exploration : randos, monuments, food,
// nightlife, zen, transport, etc. Chaque categorie porte ses metadonnees
// visuelles dans tags.ts (emoji, icone, teinte).
export type ActivityCategory =
  | "hiking"
  | "viewpoint"
  | "monument"
  | "historic-quarter"
  | "food"
  | "cafe"
  | "tea-house"
  | "shopping"
  | "museum"
  | "park"
  | "stroll"
  | "cruise"
  | "transport"
  | "show"
  | "photo-spot"
  | "nightlife"
  | "zen"
  | "gaming"
  | "karaoke"
  | "nature"
  | "excursion"
  | "multi-day"
  | "workshop"
  | "cinema"
  | "spiritual"
  | "iconic";

// Niveau d'effort physique. "none" pour les activites sans marche notable.
export type ActivityDifficulty =
  | "none"
  | "easy"
  | "moderate"
  | "challenging"
  | "expert";

// Echelle de budget unifiee pour le filtrage. "free" = gratuit.
export type ActivityBudget = "free" | "low" | "moderate" | "high" | "premium";

// Affluence ressentie sur place.
export type ActivityCrowd = "quiet" | "moderate" | "busy" | "packed";

// Degre de frequentation touristique : de "hidden" (pepite locale) a "iconic"
// (incontournable mondial). Sert au filtre "authenticite".
export type ActivityTouristLevel =
  | "hidden"
  | "local"
  | "mixed"
  | "touristy"
  | "iconic";

// Cadre physique : interieur, exterieur, ou mixte.
export type ActivitySetting = "indoor" | "outdoor" | "mixed";

// Sensibilite a la meteo : pilote les recommandations "jour de pluie".
export type WeatherSensitivity = "none" | "low" | "moderate" | "high";

// Badges editoriaux mis en avant sur les cartes (chips immersifs).
export type ActivityBadge =
  | "must-see"
  | "hidden-gem"
  | "local-favorite"
  | "great-for-photos"
  | "family-pick"
  | "romantic"
  | "rainy-day"
  | "sunset-spot"
  | "off-the-beaten-path"
  | "unesco"
  | "free-entry"
  | "night-owl";

// Plage de duree conseillee, en minutes. Permet un filtre "temps disponible".
export interface ActivityDuration {
  minMinutes: number;
  maxMinutes: number;
}

// Note d'accessibilite. Volontairement simple : un booleen + une note libre.
export interface ActivityAccessibility {
  wheelchairAccessible: boolean;
  notes?: LocalizedText;
}

// Avis editorial immersif. Au demarrage les avis sont rediges par l'equipe ;
// le modele est pret a accueillir des avis communautaires plus tard.
export interface ActivityReview {
  id: string;
  /** Persona editoriale ou pseudo communautaire. */
  author: string;
  /** Note sur 5, pas de 0.5. */
  rating: number;
  /** Phrase d'accroche courte. */
  highlight: LocalizedText;
  /** Corps de l'avis. */
  body: LocalizedText;
  /** Observation sur l'affluence (heure creuse, periode a eviter...). */
  crowdInsight?: LocalizedText;
  /** Astuce locale livree par l'auteur de l'avis. */
  localTip?: LocalizedText;
  /** Saison de la visite, pour contextualiser. */
  visitedSeason?: Season;
}

// Bloc "immersion" : sections editoriales chaleureuses qui distinguent Sinora
// d'une liste plate. Toutes optionnelles pour permettre un remplissage
// progressif du dataset.
export interface ActivityImmersion {
  /** "Pourquoi y aller" : 2-4 raisons fortes. */
  whyGo: LocalizedText[];
  /** "A eviter" : pieges, erreurs de visite. */
  avoid?: LocalizedText[];
  /** "Conseil local" : une astuce d'initie. */
  localTip?: LocalizedText;
  /** "Moment ideal" : quand venir pour le meilleur ressenti. */
  idealMoment?: LocalizedText;
  /** "Ambiance" : description sensorielle courte. */
  ambiance?: LocalizedText;
  /** "Parfait pour" : profils de voyageurs. */
  perfectFor?: LocalizedText[];
}

// Origine d'une activite dans le modele hybride :
// - "curated" : ecrite a la main par l'equipe editoriale, qualite maximale,
//   trilingue complet, sections immersives remplies.
// - "generated" : produite par le pipeline (Overpass / Wikidata / Wikipedia),
//   tier d'enrichissement plus leger qui permet de scaler a 100+ / ville.
export type ActivitySource = "curated" | "generated";

// Modele principal d'une activite.
//
// Les champs marques optionnels ne sont pas toujours disponibles pour les
// activites "generated" : le pipeline remplit ce qu'il peut depuis les
// sources ouvertes, l'UI degrade proprement quand un champ manque. Les
// activites "curated" remplissent tout.
export interface Activity {
  // --- Identite ---
  slug: string;
  /** Origine : curated (defaut) ou generated. */
  source?: ActivitySource;
  title: LocalizedText;
  summary: LocalizedText;
  /** Description longue : optionnelle pour le tier generated. */
  longDescription?: LocalizedText;

  // --- Localisation ---
  /** Slug de la ville hote (doit exister dans le dataset villes). */
  citySlug: string;
  /** Quartier / zone precise. */
  district: LocalizedText;
  coordinates: { lat: number; lng: number };

  // --- Classification ---
  category: ActivityCategory;
  /** Sous-categorie libre ("temple bouddhiste", "rooftop bar"...). */
  subCategory: LocalizedText;

  // --- Caracteristiques pratiques ---
  difficulty: ActivityDifficulty;
  budget: ActivityBudget;
  duration: ActivityDuration;
  /** Moments de la journee conseilles. */
  bestTime: DayMoment[];
  recommendedSeasons: Season[];
  crowd: ActivityCrowd;
  touristLevel: ActivityTouristLevel;
  /** Score d'authenticite locale 0-100 (100 = tres local). */
  localAuthenticity: number;
  setting: ActivitySetting;
  weatherSensitivity: WeatherSensitivity;

  // --- Convient pour ---
  familyFriendly: boolean;
  soloFriendly: boolean;
  /** Activite qui prend tout son sens de nuit. */
  nightActivity: boolean;
  /** Reste agreable / faisable sous la pluie. */
  rainCompatible: boolean;

  // --- Infos visiteur (optionnelles pour le tier generated) ---
  accessibility?: ActivityAccessibility;
  /** Conseils pour s'y rendre (metro, ligne, arret...). */
  transportTips?: LocalizedText;
  /** Horaires d'ouverture, format libre. */
  openingHours?: LocalizedText;
  /** Tarification, format libre ("Gratuit", "60 CNY", ...). */
  pricing?: LocalizedText;

  // --- Reputation ---
  /** Note moyenne sur 5. */
  rating: number;
  /** Nombre d'avis (editoriaux + communautaires simules). */
  reviewCount: number;
  /** Score editorial 0-100, calcule par scoring.ts si absent. */
  editorialScore?: number;
  badges: ActivityBadge[];

  // --- Medias ---
  /** Titre d'article Wikipedia (anglais) pour l'image de couverture. */
  coverWikiTitle?: string;
  /** URL d'image directe (tier generated : resolue par le pipeline). */
  coverImageUrl?: string;
  /** Page d'attribution de l'image (Wikipedia / Wikimedia Commons). */
  coverImageAttribution?: string;
  /** Galerie : titres Wikipedia additionnels. */
  galleryWikiTitles?: string[];

  // --- Contenu editorial (immersion optionnelle pour le tier generated) ---
  immersion?: ActivityImmersion;
  /** Conseils de voyage divers. */
  travelTips?: LocalizedText[];
  /** Regles d'etiquette locale specifiques au lieu. */
  localEtiquette?: LocalizedText[];
  /** Avertissements (arnaques, securite, contraintes). */
  warnings?: LocalizedText[];
  reviews?: ActivityReview[];

  // --- Liens produit ---
  /** Slugs d'autres activites liees. */
  relatedActivities?: string[];
  /** Slugs de POI ville proches (pointsOfInterest des villes). */
  nearbySpots?: string[];
  /** Niches voyageur pour lesquelles l'activite est recommandee. */
  recommendedForNiches?: string[];
  /** True si verifie editorialement. */
  isVerified?: boolean;
  /** Derniere mise a jour (ISO yyyy-mm-dd). */
  lastUpdated?: string;
}
