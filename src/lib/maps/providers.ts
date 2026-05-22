import {
  round6,
  wgs84ToBd09,
  wgs84ToGcj02,
  type LatLng,
} from "./coordinates";

// ============================================================================
// Generation de liens vers les applications de cartographie
// ----------------------------------------------------------------------------
// Principe de precision : le lieu est toujours recherche PAR NOM, pas par
// coordonnee brute. Un lien `?query=Temple of Heaven Beijing` ouvre le bon
// POI ; un lien `?query=39.88,116.40` ouvre un point generique. La
// coordonnee ne sert que de centrage et de repli, convertie dans le systeme
// attendu par chaque fournisseur.
// ============================================================================

export type MapProviderId =
  | "google"
  | "apple"
  | "amap"
  | "baidu"
  | "tencent";

// Lieu a ouvrir. Les coordonnees sont en WGS-84 (donnees Sinora).
export interface MapPlace {
  /** Nom exact du lieu (monument, musee, activite, evenement). */
  name: string;
  /** Ville hote. */
  city: string;
  /** Adresse complete si connue. */
  address?: string;
  /** Latitude WGS-84. */
  lat: number;
  /** Longitude WGS-84. */
  lng: number;
}

// Construit la requete de recherche : nom d'abord, puis adresse si connue,
// sinon ville + pays. C'est le coeur du correctif de precision.
function searchQuery(place: MapPlace): string {
  const parts = place.address
    ? [place.name, place.address]
    : [place.name, place.city, "China"];
  return parts.filter(Boolean).join(" ");
}

// --- Constructeurs de liens par fournisseur ---------------------------------

// Google Maps : URL universelle, recherche par nom (WGS-84, pas de conversion).
function buildGoogle(place: MapPlace): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    searchQuery(place),
  )}`;
}

// Apple Plans : `q` pour la recherche par nom, `ll` pour le centrage. En
// Chine, `ll` doit etre en GCJ-02.
function buildApple(place: MapPlace): string {
  const gcj = round6(wgs84ToGcj02({ lat: place.lat, lng: place.lng }));
  return `https://maps.apple.com/?q=${encodeURIComponent(
    searchQuery(place),
  )}&ll=${gcj.lat},${gcj.lng}`;
}

// Amap (Gaode) : service universel `uri.amap.com`. Coordonnees GCJ-02,
// ordre lng,lat. `callnative=1` tente d'ouvrir l'application native.
function buildAmap(place: MapPlace): string {
  const gcj: LatLng = round6(wgs84ToGcj02({ lat: place.lat, lng: place.lng }));
  return (
    `https://uri.amap.com/marker?position=${gcj.lng},${gcj.lat}` +
    `&name=${encodeURIComponent(place.name)}` +
    `&src=sinora&coordinate=gaode&callnative=1`
  );
}

// Baidu Maps : API marker, coordonnees BD-09, ordre lat,lng.
function buildBaidu(place: MapPlace): string {
  const bd: LatLng = round6(wgs84ToBd09({ lat: place.lat, lng: place.lng }));
  return (
    `https://api.map.baidu.com/marker?location=${bd.lat},${bd.lng}` +
    `&title=${encodeURIComponent(place.name)}` +
    `&content=${encodeURIComponent(place.address ?? place.city)}` +
    `&output=html&coord_type=bd09ll&src=sinora`
  );
}

// Tencent Maps : service URI marker, coordonnees GCJ-02, ordre lat,lng.
function buildTencent(place: MapPlace): string {
  const gcj = round6(wgs84ToGcj02({ lat: place.lat, lng: place.lng }));
  const marker =
    `coord:${gcj.lat},${gcj.lng}` +
    `;title:${encodeURIComponent(place.name)}` +
    `;addr:${encodeURIComponent(place.address ?? place.city)}`;
  return `https://apis.map.qq.com/uri/v1/marker?marker=${marker}&referer=sinora`;
}

// Metadonnees d'un fournisseur de cartographie.
export interface MapProvider {
  id: MapProviderId;
  /** Nom affiche (marque, non traduit). */
  label: string;
  /** True si l'application est pertinente pour un usage en Chine. */
  chinaReady: boolean;
  build: (place: MapPlace) => string;
}

// Liste ordonnee des fournisseurs proposes a l'utilisateur. Google et Apple
// en tete (voyageurs internationaux), puis les references locales chinoises.
export const mapProviders: MapProvider[] = [
  { id: "google", label: "Google Maps", chinaReady: false, build: buildGoogle },
  { id: "apple", label: "Apple Plans", chinaReady: true, build: buildApple },
  { id: "amap", label: "Amap 高德地图", chinaReady: true, build: buildAmap },
  { id: "baidu", label: "Baidu Maps 百度地图", chinaReady: true, build: buildBaidu },
  {
    id: "tencent",
    label: "Tencent 腾讯地图",
    chinaReady: true,
    build: buildTencent,
  },
];

// Construit le lien d'un fournisseur donne pour un lieu.
export function buildMapUrl(provider: MapProviderId, place: MapPlace): string {
  const entry = mapProviders.find((p) => p.id === provider);
  return entry ? entry.build(place) : buildGoogle(place);
}
