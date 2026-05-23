// Architecture de filtres URL-driven : la source de verite est l'URL,
// l'etat React est derive a chaque rendu. Browser back/forward et partage
// de lien fonctionnent naturellement.
export { useUrlFilters, type UrlFiltersAPI } from "./use-url-filters";
