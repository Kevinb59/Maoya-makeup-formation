import formationsData from "./formations.json";

/**
 * 1. Accès aux formations (source JSON)
 *    - Objectif : centraliser la lecture des données avant migration Firebase.
 *    - Variables clés : `formationsData.formations` contient le catalogue formations.
 *    - Logique : helpers dédiés aux formations (produits → voir `catalog.js`).
 */
export function getAllFormations() {
  return [...formationsData.formations].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFormationBySlug(slug) {
  return getAllFormations().find((formation) => formation.slug === slug) ?? null;
}

export function getFormationSlugs() {
  return getAllFormations().map((formation) => formation.slug);
}

/**
 * 2. Formations similaires (fiche formation)
 *    - Objectif : résoudre les slugs `similarSlugs` en objets formation complets.
 *    - Variables clés : `formation.similarSlugs` liste les références croisées.
 *    - Logique : on filtre les slugs invalides pour éviter les trous dans la grille.
 */
export function getRelatedFormations(formation) {
  const slugs = formation?.similarSlugs ?? [];

  return slugs.map((slug) => getFormationBySlug(slug)).filter(Boolean);
}
