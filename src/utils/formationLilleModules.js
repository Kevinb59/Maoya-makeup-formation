/**
 * Identifiant stable d’un module (section + nom).
 * - Objectif : synchroniser la sélection entre les cartes et la liste du devis.
 * - Variables clés : `categoryTitle` + `moduleName`.
 * - Logique : clé composite pour éviter les collisions entre sections.
 */
export function getLilleModuleId(categoryTitle, moduleName) {
  return `${categoryTitle}::${moduleName}`;
}
