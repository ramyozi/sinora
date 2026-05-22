import { resolveCoverImage } from "../api/images";
import type {
  NormalizedPoi,
  OverpassPoi,
  PipelineLang,
  WikidataEntity,
  WikiSummary,
} from "../types";

// ============================================================================
// Etape 1 du pipeline : normalisation
// ----------------------------------------------------------------------------
// Fusionne les trois sources (OSM, Wikidata, Wikipedia) en un POI normalise
// unique. Aucune logique editoriale ici : on assemble, on resout l'image.
// ============================================================================

// Fusionne un POI Overpass avec son entite Wikidata et ses resumes Wikipedia.
export function normalizePoi(
  poi: OverpassPoi,
  entity: WikidataEntity | undefined,
  summaries: Partial<Record<PipelineLang, WikiSummary>>,
): NormalizedPoi {
  const cover = resolveCoverImage(summaries, entity);
  // Les libelles viennent de Wikidata ; en repli, le nom OSM (souvent local).
  const labels: NormalizedPoi["labels"] = { ...(entity?.labels ?? {}) };
  if (!labels.en && poi.tags["name:en"]) labels.en = poi.tags["name:en"];
  if (!labels.zh && poi.tags["name:zh"]) labels.zh = poi.tags["name:zh"];
  if (!labels.fr && poi.tags["name:fr"]) labels.fr = poi.tags["name:fr"];
  // Dernier repli : le tag `name` generique.
  const fallbackName = poi.tags.name;
  if (fallbackName) {
    if (!labels.en) labels.en = fallbackName;
    if (!labels.zh) labels.zh = fallbackName;
    if (!labels.fr) labels.fr = fallbackName;
  }

  return {
    osmId: poi.osmId,
    wikidataId: poi.tags.wikidata,
    lat: poi.lat,
    lng: poi.lng,
    tags: poi.tags,
    labels,
    instanceOf: entity?.instanceOf ?? [],
    summaries,
    imageUrl: cover?.url,
    imageAttribution: cover?.attribution,
  };
}
