import type { NormalizedPoi, WikidataEntity, WikiSummary } from "../types";

// ============================================================================
// Resolution de l'image de couverture
// ----------------------------------------------------------------------------
// Strategie en cascade, 100 % keyless :
//   1. Image en tete d'un article Wikipedia (URL upload.wikimedia.org directe)
//   2. Image Wikidata P18, servie via Wikimedia Commons Special:FilePath
// Une activite generee SANS image resolvable est rejetee par le filtre :
// pas de bloc vide dans l'UI.
//
// Une integration Unsplash (cle API requise) pourra completer ce module
// plus tard, derriere une variable d'environnement.
// ============================================================================

// Construit une URL d'image servie par Wikimedia Commons a partir d'un nom
// de fichier P18. Special:FilePath redirige vers le binaire reel ; le
// parametre width borne le poids transfere.
export function commonsFileUrl(fileName: string, width = 1280): string {
  const clean = fileName.replace(/^File:/i, "").trim();
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    clean,
  )}?width=${width}`;
}

// Choisit la meilleure image pour un POI a partir des resumes Wikipedia
// (priorite : fr > en > zh) et de l'image Wikidata en repli.
export function resolveCoverImage(
  summaries: Partial<Record<"fr" | "en" | "zh", WikiSummary>>,
  entity: WikidataEntity | undefined,
): { url: string; attribution: string } | null {
  for (const lang of ["fr", "en", "zh"] as const) {
    const summary = summaries[lang];
    if (summary?.imageUrl) {
      return { url: summary.imageUrl, attribution: summary.pageUrl };
    }
  }
  if (entity?.imageFile) {
    return {
      url: commonsFileUrl(entity.imageFile),
      attribution: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(
        entity.imageFile,
      )}`,
    };
  }
  return null;
}

// True si le POI dispose d'une image de couverture exploitable.
export function hasUsableImage(poi: NormalizedPoi): boolean {
  return Boolean(poi.imageUrl);
}
