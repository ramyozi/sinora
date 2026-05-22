import type { LocalizedText, Season } from "../../../data/cities/types";
import type { DayMoment } from "../../../data/cities/types";
import type {
  Activity,
  ActivityBadge,
  ActivityBudget,
  ActivityCategory,
  ActivityCrowd,
  ActivityDifficulty,
  ActivitySetting,
  ActivityTouristLevel,
  WeatherSensitivity,
} from "../../../data/activities/types";
import type { NormalizedPoi, PipelineLang } from "../types";

// ============================================================================
// Etape 3 du pipeline : enrichissement editorial
// ----------------------------------------------------------------------------
// Transforme un POI normalise en activite Sinora "generated" : categorie,
// sous-categorie, valeurs pratiques par defaut (coherentes par categorie),
// badges, score editorial. Le contenu reste leger : pas de sections
// immersives inventees, on ne fabrique pas d'editorial.
// ============================================================================

// --- Mapping categorie ------------------------------------------------------

// Deduit la categorie Sinora a partir des tags OSM.
function mapCategory(tags: Record<string, string>): ActivityCategory {
  const { historic, tourism, amenity, leisure, natural } = tags;
  if (historic) {
    if (historic === "building" || historic === "district") {
      return "historic-quarter";
    }
    return "monument";
  }
  if (tourism === "museum" || tourism === "gallery") return "museum";
  if (tourism === "viewpoint") return "viewpoint";
  if (tourism === "artwork") return "photo-spot";
  if (tourism === "zoo" || tourism === "theme_park" || tourism === "aquarium") {
    return "iconic";
  }
  if (amenity === "place_of_worship") return "spiritual";
  if (amenity === "theatre") return "show";
  if (amenity === "cinema") return "cinema";
  if (amenity === "marketplace") return "shopping";
  if (amenity === "arts_centre") return "museum";
  if (leisure === "park" || leisure === "garden") return "park";
  if (leisure === "nature_reserve") return "nature";
  if (natural === "peak") return "viewpoint";
  if (natural === "beach") return "nature";
  if (tourism === "attraction" && (leisure === "park" || leisure === "garden")) {
    return "park";
  }
  return "monument";
}

// --- Valeurs pratiques par defaut, par categorie ----------------------------

interface CategoryDefaults {
  difficulty: ActivityDifficulty;
  budget: ActivityBudget;
  duration: { minMinutes: number; maxMinutes: number };
  bestTime: DayMoment[];
  seasons: Season[];
  crowd: ActivityCrowd;
  touristLevel: ActivityTouristLevel;
  localAuthenticity: number;
  setting: ActivitySetting;
  weather: WeatherSensitivity;
  family: boolean;
  solo: boolean;
  night: boolean;
  rain: boolean;
}

const ALL_SEASONS: Season[] = ["printemps", "ete", "automne", "hiver"];
const MILD_SEASONS: Season[] = ["printemps", "automne"];

const BASE: CategoryDefaults = {
  difficulty: "easy",
  budget: "low",
  duration: { minMinutes: 90, maxMinutes: 150 },
  bestTime: ["morning", "afternoon"],
  seasons: MILD_SEASONS,
  crowd: "moderate",
  touristLevel: "mixed",
  localAuthenticity: 55,
  setting: "outdoor",
  weather: "moderate",
  family: true,
  solo: true,
  night: false,
  rain: false,
};

// Surcharges ciblees par categorie ; les categories absentes prennent BASE.
const CATEGORY_DEFAULTS: Partial<Record<ActivityCategory, Partial<CategoryDefaults>>> =
  {
    museum: {
      setting: "indoor",
      weather: "none",
      rain: true,
      seasons: ALL_SEASONS,
      duration: { minMinutes: 90, maxMinutes: 150 },
    },
    monument: { duration: { minMinutes: 60, maxMinutes: 120 } },
    "historic-quarter": {
      duration: { minMinutes: 60, maxMinutes: 150 },
      localAuthenticity: 60,
    },
    viewpoint: {
      duration: { minMinutes: 30, maxMinutes: 75 },
      bestTime: ["evening"],
      weather: "high",
    },
    hiking: {
      difficulty: "moderate",
      duration: { minMinutes: 180, maxMinutes: 300 },
      weather: "high",
      seasons: MILD_SEASONS,
    },
    nature: {
      difficulty: "moderate",
      duration: { minMinutes: 180, maxMinutes: 360 },
      weather: "high",
    },
    park: { duration: { minMinutes: 60, maxMinutes: 120 }, localAuthenticity: 65 },
    spiritual: {
      weather: "low",
      localAuthenticity: 72,
      seasons: ALL_SEASONS,
    },
    show: {
      setting: "indoor",
      weather: "none",
      rain: true,
      night: true,
      seasons: ALL_SEASONS,
      duration: { minMinutes: 90, maxMinutes: 150 },
    },
    cinema: {
      setting: "indoor",
      weather: "none",
      rain: true,
      night: true,
      seasons: ALL_SEASONS,
    },
    shopping: {
      setting: "mixed",
      rain: true,
      duration: { minMinutes: 60, maxMinutes: 120 },
      seasons: ALL_SEASONS,
    },
    "photo-spot": {
      duration: { minMinutes: 30, maxMinutes: 60 },
      weather: "high",
    },
    iconic: {
      touristLevel: "iconic",
      duration: { minMinutes: 120, maxMinutes: 240 },
      localAuthenticity: 40,
    },
  };

function defaultsFor(category: ActivityCategory): CategoryDefaults {
  return { ...BASE, ...(CATEGORY_DEFAULTS[category] ?? {}) };
}

// --- Sous-categorie ---------------------------------------------------------

// Libelles trilingues pour les valeurs OSM les plus courantes.
const SUBCATEGORY_LABELS: Record<string, LocalizedText> = {
  temple: { fr: "Temple", en: "Temple", zh: "寺庙" },
  monastery: { fr: "Monastere", en: "Monastery", zh: "寺院" },
  church: { fr: "Eglise", en: "Church", zh: "教堂" },
  mosque: { fr: "Mosquee", en: "Mosque", zh: "清真寺" },
  pagoda: { fr: "Pagode", en: "Pagoda", zh: "宝塔" },
  museum: { fr: "Musee", en: "Museum", zh: "博物馆" },
  gallery: { fr: "Galerie d'art", en: "Art gallery", zh: "美术馆" },
  memorial: { fr: "Memorial", en: "Memorial", zh: "纪念馆" },
  monument: { fr: "Monument", en: "Monument", zh: "纪念碑" },
  castle: { fr: "Forteresse", en: "Castle", zh: "城堡" },
  ruins: { fr: "Ruines", en: "Ruins", zh: "遗址" },
  archaeological_site: {
    fr: "Site archeologique",
    en: "Archaeological site",
    zh: "考古遗址",
  },
  park: { fr: "Parc", en: "Park", zh: "公园" },
  garden: { fr: "Jardin", en: "Garden", zh: "园林" },
  viewpoint: { fr: "Point de vue", en: "Viewpoint", zh: "观景点" },
  attraction: { fr: "Site touristique", en: "Attraction", zh: "景点" },
  artwork: { fr: "Oeuvre d'art", en: "Public artwork", zh: "公共艺术" },
  marketplace: { fr: "Marche", en: "Market", zh: "市场" },
  theatre: { fr: "Theatre", en: "Theatre", zh: "剧院" },
  zoo: { fr: "Parc animalier", en: "Zoo", zh: "动物园" },
  peak: { fr: "Sommet", en: "Mountain peak", zh: "山峰" },
};

function subCategoryFor(tags: Record<string, string>): LocalizedText {
  const raw =
    tags.religion === "buddhist" && tags.amenity === "place_of_worship"
      ? "temple"
      : tags.building === "pagoda"
        ? "pagoda"
        : tags.historic ??
          tags.tourism ??
          tags.leisure ??
          tags.amenity ??
          tags.natural ??
          "attraction";
  const known = SUBCATEGORY_LABELS[raw];
  if (known) return known;
  const humanized = raw.replace(/_/g, " ");
  return { fr: humanized, en: humanized, zh: humanized };
}

// --- Helpers texte ----------------------------------------------------------

// Tronque proprement un texte a la limite, sur une frontiere de mot.
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : max).trim()}…`;
}

// Met une majuscule a la premiere lettre (les libelles Wikidata sont
// souvent en minuscule, surtout en francais).
function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Construit un LocalizedText avec chaine de repli en -> fr/zh.
function localized(labels: Partial<Record<PipelineLang, string>>): LocalizedText {
  const en = labels.en ?? labels.zh ?? labels.fr ?? "";
  return {
    en: capitalize(en),
    fr: capitalize(labels.fr ?? en),
    zh: labels.zh ?? en,
  };
}

// --- Slug -------------------------------------------------------------------

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

// --- Badges -----------------------------------------------------------------

function badgesFor(
  poi: NormalizedPoi,
  category: ActivityCategory,
  defaults: CategoryDefaults,
): ActivityBadge[] {
  const badges: ActivityBadge[] = [];
  const heritage = poi.tags["heritage:operator"] ?? poi.tags.heritage ?? "";
  if (/whc|unesco/i.test(heritage) || poi.instanceOf.includes("Q9259")) {
    badges.push("unesco");
  }
  if (poi.tags.fee === "no") badges.push("free-entry");
  if (category === "viewpoint" || category === "photo-spot") {
    badges.push("great-for-photos");
  }
  if (defaults.night) badges.push("night-owl");
  return badges.slice(0, 3);
}

// --- Score editorial --------------------------------------------------------

// Score 0-100 pour le tier generated, plafonne pour rester sous les
// activites curated (signal qualite : richesse multilingue, notabilite).
function generatedScore(
  poi: NormalizedPoi,
  badges: ActivityBadge[],
  category: ActivityCategory,
): number {
  let score = 45;
  const langCount = (["fr", "en", "zh"] as const).filter(
    (l) => poi.labels[l],
  ).length;
  score += langCount * 3;
  const summaryCount = (["fr", "en", "zh"] as const).filter(
    (l) => poi.summaries[l],
  ).length;
  score += summaryCount * 4;
  const sitelinkCount = Object.keys(poi.summaries).length;
  if (sitelinkCount >= 2) score += 4;
  if (badges.includes("unesco")) score += 8;
  if (category === "iconic") score += 4;
  return Math.max(0, Math.min(74, Math.round(score)));
}

// --- Enrichissement principal ----------------------------------------------

export interface EnrichInput {
  poi: NormalizedPoi;
  citySlug: string;
  cityName: LocalizedText;
}

// Convertit un POI normalise en activite Sinora "generated", ou null si le
// POI ne peut pas produire une fiche correcte (titre manquant).
export function enrichPoi(input: EnrichInput): Activity | null {
  const { poi, citySlug, cityName } = input;
  const title = localized(poi.labels);
  if (!title.en) return null;

  const category = mapCategory(poi.tags);
  const defaults = defaultsFor(category);
  const subCategory = subCategoryFor(poi.tags);

  // Quartier : tag d'adresse OSM, sinon nom de ville.
  const districtRaw =
    poi.tags["addr:suburb"] ??
    poi.tags["addr:district"] ??
    poi.tags["addr:quarter"];
  const district: LocalizedText = districtRaw
    ? { fr: districtRaw, en: districtRaw, zh: districtRaw }
    : cityName;

  // Resume : extrait Wikipedia tronque, sinon synthese sous-categorie + ville.
  const summary: LocalizedText = {
    fr: poi.summaries.fr
      ? truncate(poi.summaries.fr.extract, 180)
      : `${subCategory.fr} - ${cityName.fr}`,
    en: poi.summaries.en
      ? truncate(poi.summaries.en.extract, 180)
      : `${subCategory.en} - ${cityName.en}`,
    zh: poi.summaries.zh
      ? truncate(poi.summaries.zh.extract, 90)
      : `${subCategory.zh} · ${cityName.zh}`,
  };

  // Description longue : extrait complet, uniquement si disponible.
  const hasLongText = Boolean(
    poi.summaries.fr ?? poi.summaries.en ?? poi.summaries.zh,
  );
  const longDescription: LocalizedText | undefined = hasLongText
    ? {
        fr: truncate(
          (poi.summaries.fr ?? poi.summaries.en ?? poi.summaries.zh)!.extract,
          620,
        ),
        en: truncate(
          (poi.summaries.en ?? poi.summaries.zh ?? poi.summaries.fr)!.extract,
          620,
        ),
        zh: truncate(
          (poi.summaries.zh ?? poi.summaries.en ?? poi.summaries.fr)!.extract,
          320,
        ),
      }
    : undefined;

  const badges = badgesFor(poi, category, defaults);
  const shortId = poi.osmId.replace(/[^0-9]/g, "").slice(-7);
  const slug = `gen-${slugify(title.en)}-${shortId}`;

  return {
    slug,
    source: "generated",
    title,
    summary,
    longDescription,
    citySlug,
    district,
    coordinates: { lat: poi.lat, lng: poi.lng },
    category,
    subCategory,
    difficulty: defaults.difficulty,
    budget: poi.tags.fee === "no" ? "free" : defaults.budget,
    duration: defaults.duration,
    bestTime: defaults.bestTime,
    recommendedSeasons: defaults.seasons,
    crowd: defaults.crowd,
    touristLevel: defaults.touristLevel,
    localAuthenticity: defaults.localAuthenticity,
    setting: defaults.setting,
    weatherSensitivity: defaults.weather,
    familyFriendly: defaults.family,
    soloFriendly: defaults.solo,
    nightActivity: defaults.night,
    rainCompatible: defaults.rain,
    rating: 0,
    reviewCount: 0,
    editorialScore: generatedScore(poi, badges, category),
    badges,
    coverImageUrl: poi.imageUrl,
    coverImageAttribution: poi.imageAttribution,
    isVerified: false,
    lastUpdated: new Date().toISOString().slice(0, 10),
  };
}
