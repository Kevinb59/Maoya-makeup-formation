"use client";

import SafeImage from "@/components/ui/SafeImage";
import { isVariableProduct } from "@/data/catalog";
import { useCart } from "@/context/CartContext";

/**
 * 4. Carte catalogue (formation ou produit)
 *    - Objectif : afficher image, catégorie, nom, prix et CTA adapté au type d'article.
 *    - Variables clés : `formation` contient formation ou produit, `addItem` gère le panier.
 *    - Logique : produits variables → « Choix des options », formations → ajout direct.
 */
export default function FormationCard({ formation, className = "", ...cardProps }) {
  const { addItem } = useCart();
  const detailHref = `/formations/${formation.slug}/`;
  const isVariable = isVariableProduct(formation);

  return (
    <article className={`product-card formation-card ${className}`.trim()} {...cardProps}>
      <a href={detailHref} className="product-image formation-card-image">
        <SafeImage src={formation.image} alt={formation.name} />
        {formation.promo ? <span className="formation-card-promo">Promo !</span> : null}
        <span className="formation-card-tag">{isVariable ? "Choix des options" : "En savoir plus"}</span>
      </a>
      <div className="product-body">
        <p>{formation.category}</p>
        <h3>
          <a href={detailHref}>{formation.name}</a>
        </h3>
        <strong>{formation.priceLabel}</strong>
        {isVariable ? (
          <a className="button secondary formation-card-options" href={detailHref}>
            Choix des options
          </a>
        ) : (
          <button type="button" onClick={() => addItem(formation)}>
            Ajouter au panier
          </button>
        )}
      </div>
    </article>
  );
}
