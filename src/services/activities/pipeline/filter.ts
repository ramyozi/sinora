import { hasUsableImage } from "../api/images";
import type { NormalizedPoi } from "../types";

// ============================================================================
// Etape 2 du pipeline : filtrage qualite
// ----------------------------------------------------------------------------
// Retire les POIs sans interet voyage, les doublons et ceux sans image.
// L'objectif : garantir que chaque activite generee soit visuelle, nommable
// et pertinente, jamais une ligne de donnee brute.
// ============================================================================

// Q-ids Wikidata d'elements a exclure : entites administratives, gares,
// etablissements purement fonctionnels.
const EXCLUDED_INSTANCE_OF = new Set<string>([
  "Q1549591", // grande ville
  "Q515", // ville
  "Q15284", // municipalite
  "Q55488", // gare ferroviaire
  "Q928830", // station de metro
  "Q11707", // restaurant (trop volatil sans avis)
  "Q3918", // universite
  "Q16917", // hopital
]);

// Valeurs OSM dont on ne veut pas, meme avec un wikidata.
function isExcludedByTags(tags: Record<string, string>): boolean {
  if (tags.tourism === "hotel" || tags.tourism === "hostel") return true;
  if (tags.tourism === "information") return true;
  if (tags.amenity === "hospital" || tags.amenity === "school") return true;
  return false;
}

// Normalise un nom pour la detection de doublons.
function nameKey(poi: NormalizedPoi): string {
  const name = poi.labels.en ?? poi.labels.zh ?? poi.labels.fr ?? "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Distance approximative en metres entre deux POIs (equirectangulaire).
function distanceMeters(a: NormalizedPoi, b: NormalizedPoi): number {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat = ((a.lat + b.lat) / 2) * (Math.PI / 180);
  const x = dLng * Math.cos(lat);
  return Math.sqrt(dLat * dLat + x * x) * R;
}

// Applique le filtrage qualite complet.
export function filterPois(pois: NormalizedPoi[]): NormalizedPoi[] {
  // 1. Rejets unitaires : pas de nom, pas d'image, type exclu.
  const kept: NormalizedPoi[] = [];
  for (const poi of pois) {
    const hasName = Boolean(
      poi.labels.en ?? poi.labels.zh ?? poi.labels.fr,
    );
    if (!hasName) continue;
    if (!hasUsableImage(poi)) continue;
    if (isExcludedByTags(poi.tags)) continue;
    if (poi.instanceOf.some((q) => EXCLUDED_INSTANCE_OF.has(q))) continue;
    kept.push(poi);
  }

  // 2. Dedoublonnage : meme identifiant Wikidata, ou meme nom a moins de
  //    150 m (le meme lieu cartographie deux fois en node + way).
  const seenWikidata = new Set<string>();
  const deduped: NormalizedPoi[] = [];
  for (const poi of kept) {
    if (poi.wikidataId) {
      if (seenWikidata.has(poi.wikidataId)) continue;
      seenWikidata.add(poi.wikidataId);
    }
    const key = nameKey(poi);
    const twin = deduped.find(
      (other) =>
        nameKey(other) === key && distanceMeters(other, poi) < 150,
    );
    if (twin) continue;
    deduped.push(poi);
  }

  return deduped;
}
