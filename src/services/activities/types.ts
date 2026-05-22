// ============================================================================
// Types internes du pipeline d'activites
// ----------------------------------------------------------------------------
// Ces types decrivent les donnees BRUTES qui transitent dans le pipeline,
// avant normalisation vers le modele Sinora `Activity`. Ils ne sont utilises
// que cote build (script de generation), jamais a l'execution.
// ============================================================================

export type PipelineLang = "fr" | "en" | "zh";

// POI brut renvoye par Overpass (OpenStreetMap).
export interface OverpassPoi {
  /** Identifiant OSM, ex. "node/240109189". */
  osmId: string;
  lat: number;
  lng: number;
  /** Tags OSM bruts (tourism, historic, name, wikidata, etc.). */
  tags: Record<string, string>;
}

// Entite Wikidata resolue : labels multilingues, image, classification.
export interface WikidataEntity {
  id: string;
  /** Libelles fr / en / zh quand disponibles. */
  labels: Partial<Record<PipelineLang, string>>;
  /** Nom de fichier image Commons issu de P18. */
  imageFile?: string;
  /** Q-ids "nature de l'element" (P31), indices de categorie. */
  instanceOf: string[];
  /** Titres d'articles Wikipedia lies, par edition. */
  sitelinks: Partial<Record<"enwiki" | "frwiki" | "zhwiki", string>>;
}

// Resume d'article Wikipedia : description + image.
export interface WikiSummary {
  lang: PipelineLang;
  extract: string;
  imageUrl?: string;
  pageUrl: string;
}

// POI normalise : fusion OSM + Wikidata + Wikipedia, avant enrichissement.
export interface NormalizedPoi {
  osmId: string;
  wikidataId?: string;
  lat: number;
  lng: number;
  tags: Record<string, string>;
  labels: Partial<Record<PipelineLang, string>>;
  instanceOf: string[];
  /** Resumes Wikipedia par langue. */
  summaries: Partial<Record<PipelineLang, WikiSummary>>;
  /** URL d'image de couverture resolue (upload.wikimedia.org ou Commons). */
  imageUrl?: string;
  imageAttribution?: string;
}
