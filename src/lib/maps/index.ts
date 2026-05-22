// Point d'entree du module cartographie : conversion de coordonnees et
// generation de liens vers les applications de navigation.
export {
  wgs84ToGcj02,
  gcj02ToBd09,
  wgs84ToBd09,
  round6,
  type LatLng,
} from "./coordinates";

export {
  mapProviders,
  buildMapUrl,
  type MapPlace,
  type MapProvider,
  type MapProviderId,
} from "./providers";
