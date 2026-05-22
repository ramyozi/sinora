import { cached } from "../cache/activitiesCache";
import type { OverpassPoi } from "../types";

// ============================================================================
// Client Overpass API (OpenStreetMap)
// ----------------------------------------------------------------------------
// Overpass est une API ouverte, sans cle, qui interroge les donnees brutes
// d'OpenStreetMap. On ne recupere que les POIs notables : ceux portant un
// tag `wikidata`, ce qui agit comme un premier filtre qualite naturel (un
// POI reference dans Wikidata est pertinent pour un voyageur, et permet
// d'obtenir ensuite image + description multilingue).
// ============================================================================

// Plusieurs miroirs Overpass : on bascule sur le suivant en cas d'echec
// (l'instance principale renvoie parfois 406 / 504 sous charge).
const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
];

const USER_AGENT = "Sinora/1.0 (https://sinora.ramzibenmansour.com)";

// Bornes geographiques d'une ville : [sud, ouest, nord, est].
export type BBox = [number, number, number, number];

// Construit une bbox approximative autour d'un centre ville.
// rangeDeg ~0.22 couvre l'agglomeration sur environ 45 km de cote, ce qui
// capte aussi les sites peripheriques (parcs, sites historiques de banlieue).
export function bboxAround(
  lat: number,
  lng: number,
  rangeDeg = 0.22,
): BBox {
  return [lat - rangeDeg, lng - rangeDeg, lat + rangeDeg, lng + rangeDeg];
}

// Categories OSM pertinentes pour des activites de voyage. On exclut
// volontairement hotels, bureaux, commerces quelconques.
const QUERY_SELECTORS = [
  '["wikidata"]["tourism"~"^(attraction|museum|gallery|viewpoint|artwork|zoo|theme_park|aquarium)$"]',
  '["wikidata"]["historic"]',
  '["wikidata"]["leisure"~"^(park|garden|nature_reserve)$"]',
  '["wikidata"]["amenity"~"^(place_of_worship|theatre|cinema|marketplace|arts_centre)$"]',
  '["wikidata"]["natural"~"^(peak|beach)$"]',
];

interface OverpassElement {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements: OverpassElement[];
}

// Construit la requete Overpass QL pour une bbox.
function buildQuery(bbox: BBox): string {
  const b = bbox.join(",");
  const parts = QUERY_SELECTORS.map(
    (sel) => `  nwr${sel}(${b});`,
  ).join("\n");
  return `[out:json][timeout:90];\n(\n${parts}\n);\nout center tags;`;
}

// Interroge un miroir Overpass. Renvoie la reponse brute ou leve.
async function queryEndpoint(
  endpoint: string,
  query: string,
): Promise<OverpassResponse> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    },
    body: `data=${encodeURIComponent(query)}`,
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as OverpassResponse;
}

// Recupere les POIs notables d'une ville. Resultat mis en cache disque pour
// que les re-executions du pipeline ne resollicitent pas Overpass. Essaie
// les miroirs successivement en cas d'echec.
export async function fetchCityPois(
  citySlug: string,
  bbox: BBox,
): Promise<OverpassPoi[]> {
  // La bbox fait partie de la cle de cache : l'elargir invalide proprement
  // l'entree precedente.
  const cacheKey = `overpass-${citySlug}-${bbox.map((n) => n.toFixed(2)).join("_")}`;
  return cached(cacheKey, async () => {
    const query = buildQuery(bbox);
    let data: OverpassResponse | null = null;
    let lastError = "";
    for (const endpoint of ENDPOINTS) {
      try {
        data = await queryEndpoint(endpoint, query);
        break;
      } catch (error) {
        lastError = (error as Error).message;
      }
    }
    if (!data) {
      throw new Error(`Overpass indisponible pour ${citySlug} (${lastError})`);
    }
    const pois: OverpassPoi[] = [];
    for (const el of data.elements) {
      const lat = el.lat ?? el.center?.lat;
      const lng = el.lon ?? el.center?.lon;
      if (lat === undefined || lng === undefined || !el.tags) continue;
      pois.push({
        osmId: `${el.type}/${el.id}`,
        lat,
        lng,
        tags: el.tags,
      });
    }
    return pois;
  });
}
