// ============================================================================
// Conversion de systemes de coordonnees pour les cartes en Chine
// ----------------------------------------------------------------------------
// La Chine impose un decalage volontaire des coordonnees. Trois systemes
// coexistent :
//
//  - WGS-84  : standard GPS international. C'est ce que stocke Sinora
//              (donnees OSM, Wikidata, saisies a la main).
//  - GCJ-02  : "coordonnees Mars", systeme obfusque obligatoire en Chine.
//              Utilise par Amap (Gaode), Tencent, Apple Plans en Chine, et
//              Google Maps Chine. Decalage de ~300-500 m par rapport au WGS-84.
//  - BD-09   : surcouche d'obfuscation propre a Baidu, appliquee au-dessus
//              du GCJ-02.
//
// Sans conversion, un point WGS-84 affiche dans Amap ou Baidu tombe a
// plusieurs centaines de metres du lieu reel. Ces fonctions appliquent les
// algorithmes publics standards.
//
// Note : Hong Kong et Macao utilisent en realite le WGS-84. L'algorithme
// `outOfChina` ci-dessous, base sur un rectangle large, les inclut a tort
// dans la zone decalee. L'impact est limite car la strategie de lien
// privilegie la recherche par NOM, la coordonnee n'etant qu'un biais.
// ============================================================================

export interface LatLng {
  lat: number;
  lng: number;
}

// Demi-grand axe de l'ellipsoide Krasovsky 1940 et carre de l'excentricite.
const KRASOVSKY_A = 6378245.0;
const KRASOVSKY_EE = 0.006693421622965943;
const X_PI = (Math.PI * 3000.0) / 180.0;

// Hors de Chine continentale : aucun decalage GCJ-02 n'est applique.
function outOfChina(lat: number, lng: number): boolean {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271;
}

function transformLat(x: number, y: number): number {
  let ret =
    -100 +
    2 * x +
    3 * y +
    0.2 * y * y +
    0.1 * x * y +
    0.2 * Math.sqrt(Math.abs(x));
  ret += ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2) / 3;
  ret += ((20 * Math.sin(y * Math.PI) + 40 * Math.sin((y / 3) * Math.PI)) * 2) / 3;
  ret +=
    ((160 * Math.sin((y / 12) * Math.PI) + 320 * Math.sin((y * Math.PI) / 30)) *
      2) /
    3;
  return ret;
}

function transformLng(x: number, y: number): number {
  let ret =
    300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2) / 3;
  ret += ((20 * Math.sin(x * Math.PI) + 40 * Math.sin((x / 3) * Math.PI)) * 2) / 3;
  ret +=
    ((150 * Math.sin((x / 12) * Math.PI) + 300 * Math.sin((x / 30) * Math.PI)) *
      2) /
    3;
  return ret;
}

// WGS-84 -> GCJ-02. Pour Amap, Tencent, Apple Plans (Chine), Google Chine.
export function wgs84ToGcj02({ lat, lng }: LatLng): LatLng {
  if (outOfChina(lat, lng)) return { lat, lng };
  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);
  const radLat = (lat / 180.0) * Math.PI;
  let magic = Math.sin(radLat);
  magic = 1 - KRASOVSKY_EE * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat =
    (dLat * 180.0) /
    (((KRASOVSKY_A * (1 - KRASOVSKY_EE)) / (magic * sqrtMagic)) * Math.PI);
  dLng =
    (dLng * 180.0) /
    ((KRASOVSKY_A / sqrtMagic) * Math.cos(radLat) * Math.PI);
  return { lat: lat + dLat, lng: lng + dLng };
}

// GCJ-02 -> BD-09. Surcouche d'obfuscation propre a Baidu.
export function gcj02ToBd09({ lat, lng }: LatLng): LatLng {
  const z =
    Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * X_PI);
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * X_PI);
  return {
    lat: z * Math.sin(theta) + 0.006,
    lng: z * Math.cos(theta) + 0.0065,
  };
}

// WGS-84 -> BD-09. Raccourci : WGS-84 -> GCJ-02 -> BD-09.
export function wgs84ToBd09(point: LatLng): LatLng {
  return gcj02ToBd09(wgs84ToGcj02(point));
}

// Arrondit a 6 decimales : suffisant (~0,1 m) et evite les URLs verbeuses.
export function round6(point: LatLng): LatLng {
  return {
    lat: Math.round(point.lat * 1e6) / 1e6,
    lng: Math.round(point.lng * 1e6) / 1e6,
  };
}
