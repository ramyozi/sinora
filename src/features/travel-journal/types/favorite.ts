// "Mes envies" : raccourci vers une ressource du site qu'on veut retrouver
// plus tard. Refere a une entite Sinora (ville, POI, event...) par slug ou id,
// sans dupliquer ses donnees. Si l'entite disparait du dataset, le favori
// devient simplement obsolete (UI peut le marquer "indisponible").
export type FavoriteKind = "city" | "poi" | "event" | "experience" | "restaurant";

export interface Favorite {
  id: string;
  kind: FavoriteKind;
  /** Slug ou ID de la ressource cible : city.slug, event.slug, poi.id, etc. */
  refId: string;
  /** Slug de la ville parente pour les POI / restaurants (facultatif sinon). */
  parentCitySlug: string | null;
  /** Trip dans lequel on veut absolument inclure ce favori (facultatif). */
  tripId: string | null;
  /** Note libre attachee au favori (memo court). */
  note: string;
  createdAt: string;
}
