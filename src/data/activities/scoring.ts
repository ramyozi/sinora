import type { Activity } from "./types";

// ============================================================================
// Scoring editorial des activites
// ----------------------------------------------------------------------------
// Le score editorial (0-100) agrege plusieurs signaux pour classer les
// activites dans l'explorateur. Il est calcule a la volee : pas besoin de le
// stocker dans le dataset, mais le champ `editorialScore` peut le surcharger
// si l'equipe veut forcer une mise en avant.
// ============================================================================

const CROWD_PENALTY: Record<Activity["crowd"], number> = {
  quiet: 0,
  moderate: -2,
  busy: -5,
  packed: -9,
};

// Calcule le score editorial d'une activite. Pondere : note des visiteurs,
// volume d'avis (confiance), authenticite locale, richesse editoriale et
// quelques bonus de badges. Penalise legerement la foule extreme.
export function computeEditorialScore(activity: Activity): number {
  if (typeof activity.editorialScore === "number") {
    return clamp(activity.editorialScore);
  }

  // Note visiteurs : 0-5 -> 0-45.
  const ratingPart = (activity.rating / 5) * 45;

  // Confiance liee au volume d'avis : courbe log plafonnee a 15 points.
  const reviewPart = Math.min(15, Math.log10(activity.reviewCount + 1) * 7);

  // Authenticite locale : 0-100 -> 0-15.
  const authenticityPart = (activity.localAuthenticity / 100) * 15;

  // Richesse du contenu editorial : sections immersives remplies. Les
  // activites "generated" n'ont pas de bloc immersion : leur score repose
  // donc surtout sur la note, le volume d'avis et l'authenticite.
  const im = activity.immersion;
  let contentPart = 0;
  if (im) {
    contentPart += Math.min(8, im.whyGo.length * 2.5);
    if (im.localTip) contentPart += 3;
    if (im.idealMoment) contentPart += 2;
    if (im.ambiance) contentPart += 2;
  }
  if (activity.reviews && activity.reviews.length > 0) contentPart += 3;
  contentPart = Math.min(15, contentPart);

  // Bonus badges editoriaux forts.
  let badgeBonus = 0;
  if (activity.badges.includes("must-see")) badgeBonus += 4;
  if (activity.badges.includes("unesco")) badgeBonus += 3;
  if (activity.badges.includes("hidden-gem")) badgeBonus += 3;
  badgeBonus = Math.min(10, badgeBonus);

  const crowdPenalty = CROWD_PENALTY[activity.crowd];

  return clamp(
    ratingPart +
      reviewPart +
      authenticityPart +
      contentPart +
      badgeBonus +
      crowdPenalty,
  );
}

// Tri par score editorial decroissant. Stable sur le slug en cas d'egalite.
export function sortByEditorialScore(activities: Activity[]): Activity[] {
  return [...activities].sort((a, b) => {
    const diff = computeEditorialScore(b) - computeEditorialScore(a);
    if (Math.abs(diff) > 0.01) return diff;
    return a.slug.localeCompare(b.slug);
  });
}

// Selectionne les meilleures activites "coups de coeur" pour la mise en avant.
export function pickFeatured(activities: Activity[], count: number): Activity[] {
  return sortByEditorialScore(activities).slice(0, count);
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
