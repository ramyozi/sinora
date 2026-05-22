import type { LocalizedText } from "../../data/cities/types";
import type { Activity } from "../../data/activities/types";
import { bboxAround, fetchCityPois, type BBox } from "./api/overpass";
import { fetchEntities } from "./api/wikidata";
import { fetchSummaries } from "./api/wikipedia";
import { normalizePoi } from "./pipeline/normalize";
import { filterPois } from "./pipeline/filter";
import { enrichPoi } from "./pipeline/enrich";
import type { NormalizedPoi, PipelineLang, WikiSummary } from "./types";

// ============================================================================
// Orchestrateur du pipeline d'activites
// ----------------------------------------------------------------------------
// Enchaine fetch -> normalisation -> filtrage -> enrichissement pour une
// ville, et retourne des activites Sinora "generated" pretes a etre fusionnees
// avec le dataset curated. Utilise uniquement cote build par le script de
// generation.
// ============================================================================

export { bboxAround, type BBox } from "./api/overpass";

// Normalise un nom pour la deduplication contre le dataset curated.
function nameKey(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Reference d'activite curated, pour la deduplication du tier genere.
export interface CuratedRef {
  name: string;
  lat: number;
  lng: number;
}

export interface GenerateOptions {
  citySlug: string;
  cityName: LocalizedText;
  /** Centre de la ville pour construire la bbox. */
  center: { lat: number; lng: number };
  /** Plafond d'activites generees retenues pour la ville. */
  limit?: number;
  /** Activites curated de la ville, pour eviter les doublons (nom + position). */
  curatedRefs?: CuratedRef[];
  /** Logger optionnel pour suivre l'avancement. */
  onProgress?: (message: string) => void;
}

// Distance approximative en metres (equirectangulaire).
function distanceMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat = ((a.lat + b.lat) / 2) * (Math.PI / 180);
  const x = dLng * Math.cos(lat);
  return Math.sqrt(dLat * dLat + x * x) * R;
}

// Genere les activites d'une ville via le pipeline complet.
export async function generateCityActivities(
  options: GenerateOptions,
): Promise<Activity[]> {
  const {
    citySlug,
    cityName,
    center,
    limit = 120,
    curatedRefs = [],
    onProgress = () => {},
  } = options;

  const bbox: BBox = bboxAround(center.lat, center.lng);

  onProgress(`[${citySlug}] requete Overpass...`);
  const pois = await fetchCityPois(citySlug, bbox);
  onProgress(`[${citySlug}] ${pois.length} POIs bruts`);

  // Resolution Wikidata groupee (labels multilingues + liens Wikipedia).
  const wikidataIds = pois
    .map((p) => p.tags.wikidata)
    .filter((id): id is string => Boolean(id));
  onProgress(`[${citySlug}] resolution de ${wikidataIds.length} entites Wikidata...`);
  const entities = await fetchEntities(wikidataIds);

  // Collecte des titres d'articles Wikipedia, regroupes par edition, pour un
  // fetch en lot (et non page par page).
  const enTitles: string[] = [];
  const frTitles: string[] = [];
  const zhTitles: string[] = [];
  for (const poi of pois) {
    const entity = poi.tags.wikidata
      ? entities.get(poi.tags.wikidata)
      : undefined;
    if (!entity) continue;
    if (entity.sitelinks.enwiki) enTitles.push(entity.sitelinks.enwiki);
    if (entity.sitelinks.frwiki) frTitles.push(entity.sitelinks.frwiki);
    if (entity.sitelinks.zhwiki) zhTitles.push(entity.sitelinks.zhwiki);
  }
  onProgress(
    `[${citySlug}] resumes Wikipedia (en:${enTitles.length} fr:${frTitles.length} zh:${zhTitles.length})...`,
  );
  const [enMap, frMap, zhMap] = await Promise.all([
    fetchSummaries("en", enTitles),
    fetchSummaries("fr", frTitles),
    fetchSummaries("zh", zhTitles),
  ]);

  // Normalisation : un POI = OSM + Wikidata + resumes Wikipedia.
  const normalized: NormalizedPoi[] = pois.map((poi) => {
    const entity = poi.tags.wikidata
      ? entities.get(poi.tags.wikidata)
      : undefined;
    const summaries: Partial<Record<PipelineLang, WikiSummary>> = {};
    if (entity) {
      const en = entity.sitelinks.enwiki
        ? enMap.get(entity.sitelinks.enwiki)
        : undefined;
      const fr = entity.sitelinks.frwiki
        ? frMap.get(entity.sitelinks.frwiki)
        : undefined;
      const zh = entity.sitelinks.zhwiki
        ? zhMap.get(entity.sitelinks.zhwiki)
        : undefined;
      if (en) summaries.en = en;
      if (fr) summaries.fr = fr;
      if (zh) summaries.zh = zh;
    }
    return normalizePoi(poi, entity, summaries);
  });

  // Filtrage qualite.
  const filtered = filterPois(normalized);
  onProgress(`[${citySlug}] ${filtered.length} POIs apres filtrage`);

  // Enrichissement + anti-doublon contre le dataset curated. Un POI genere
  // est ecarte si, par rapport a une activite curated de la ville :
  //  - les noms normalises se contiennent l'un l'autre (ex. "Temple of
  //    Heaven" est contenu dans "Morning rituals at the Temple of Heaven"),
  //  - ou il se trouve a moins de 400 m (meme lieu, deux cartographies).
  const curatedKeys = curatedRefs.map((r) => nameKey(r.name));
  const activities: Activity[] = [];
  const seenSlugs = new Set<string>();
  for (const poi of filtered) {
    const activity = enrichPoi({ poi, citySlug, cityName });
    if (!activity) continue;
    const genKey = nameKey(activity.title.en);
    const nameClash = curatedKeys.some((ck) => {
      if (ck === genKey) return true;
      const [short, long] =
        ck.length < genKey.length ? [ck, genKey] : [genKey, ck];
      return short.length >= 8 && long.includes(short);
    });
    if (nameClash) continue;
    const nearCurated = curatedRefs.some(
      (ref) => distanceMeters(ref, activity.coordinates) < 400,
    );
    if (nearCurated) continue;
    if (seenSlugs.has(activity.slug)) continue;
    seenSlugs.add(activity.slug);
    activities.push(activity);
  }

  // Tri par score editorial decroissant, plafonnement.
  activities.sort(
    (a, b) => (b.editorialScore ?? 0) - (a.editorialScore ?? 0),
  );
  const capped = activities.slice(0, limit);
  onProgress(`[${citySlug}] ${capped.length} activites generees retenues`);
  return capped;
}
