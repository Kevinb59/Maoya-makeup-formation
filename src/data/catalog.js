import productsData from "./products.json";
import { getAllFormations, getFormationBySlug } from "./formations";

/**
 * 1. Catalogue unifié (formations + produits)
 *    - Objectif : exposer formations et articles (malette, etc.) dans une seule liste.
 *    - Variables clés : helpers formations + `productsData` alimentent le tri catalogue.
 *    - Logique : chaque entrée porte un `type` pour router vers la bonne fiche.
 */
function withFormationType(formation) {
  return { ...formation, type: "formation" };
}

function withProductType(product) {
  return { ...product, type: product.type ?? "product" };
}

export function getAllProducts() {
  return [...productsData.products].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProductBySlug(slug) {
  return getAllProducts().find((product) => product.slug === slug) ?? null;
}

export function getAllCatalogItems() {
  const formations = getAllFormations().map(withFormationType);
  const products = getAllProducts().map(withProductType);

  return [...formations, ...products].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCatalogItemBySlug(slug) {
  const product = getProductBySlug(slug);
  if (product) {
    return withProductType(product);
  }

  const formation = getFormationBySlug(slug);
  return formation ? withFormationType(formation) : null;
}

export function getCatalogSlugs() {
  return getAllCatalogItems().map((item) => item.slug);
}

export function isVariableProduct(item) {
  return item?.type === "product" && item?.productType === "variable";
}

/**
 * 2. Articles similaires (fiche produit ou formation)
 *    - Objectif : résoudre les slugs `similarSlugs` en objets catalogue complets.
 *    - Variables clés : `item.similarSlugs` liste les références croisées.
 *    - Logique : on filtre les slugs invalides pour éviter les trous dans la grille.
 */
export function getRelatedCatalogItems(item) {
  const slugs = item?.similarSlugs ?? [];

  return slugs.map((slug) => getCatalogItemBySlug(slug)).filter(Boolean);
}
