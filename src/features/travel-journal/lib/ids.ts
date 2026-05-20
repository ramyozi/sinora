// Generateur d'IDs locaux, sans dependance crypto. Utilise crypto.randomUUID
// quand il est disponible (navigateurs modernes) et tombe sur un fallback
// epoch + random sinon. Suffisant pour le local-first : pas de risque de
// collision a l'echelle d'un utilisateur unique.
export function makeId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  const rnd = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}_${rnd}`;
}

// Helper pratique pour les timestamps utilises dans tous les modeles.
export function nowIso(): string {
  return new Date().toISOString();
}
