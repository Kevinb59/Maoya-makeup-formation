"use client";

import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteFooter from "@/components/layout/SiteFooter";
import SafeImage from "@/components/ui/SafeImage";
import FormationCard from "@/components/formations/FormationCard";
import { getRelatedCatalogItems } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * 7. Fiche produit variable (malette par formation)
 *    - Objectif : permettre le choix de variante avant ajout au panier.
 *    - Variables clés : `product`, `selectedVariantId`, `selectedVariant` pilotent prix et contenu.
 *    - Logique : sélecteur de formation + liste du contenu de la malette choisie.
 */
export default function ProductDetailPage({ product }) {
  const { addItem } = useCart();
  const relatedItems = getRelatedCatalogItems(product);
  const [selectedVariantId, setSelectedVariantId] = useState("");

  useScrollReveal();

  /* 7.1 Variante active
     - Objectif : retrouver la variante sélectionnée dans le JSON produit.
     - Variables clés : `selectedVariantId` correspond à l'id de variante (slug formation).
     - Logique : prix promo + contenu mis à jour dynamiquement. */
  const selectedVariant = useMemo(
    () => product.variants?.find((variant) => variant.id === selectedVariantId) ?? null,
    [product.variants, selectedVariantId],
  );

  const handleAddToCart = () => {
    if (!selectedVariant) {
      return;
    }

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      type: "product",
      variantId: selectedVariant.id,
      variantLabel: selectedVariant.label,
      price: selectedVariant.price,
      priceLabel: selectedVariant.priceLabel,
    });
  };

  return (
    <main className="maoya-page formation-detail-page product-detail-page">
      <SiteChrome />

      {/* Hero produit : visuel, sélecteur de variante et CTA panier */}
      <section className="formation-detail-hero section-pad compact">
        <div className="formation-detail-grid reveal reveal-fade-up">
          <div className="formation-detail-media">
            <SafeImage src={product.image} alt={product.name} />
            {product.promo ? <span className="formation-card-promo">Promo !</span> : null}
          </div>

          <div className="formation-detail-copy">
            <div className="formation-detail-top">
              <a className="formation-detail-back" href="/a-distance/#formations">
                <ArrowLeft size={18} /> Retour aux formations
              </a>
              <span className="formation-detail-category">{product.category}</span>
            </div>
            <h1>{product.name}</h1>
            <p className="formation-detail-price product-detail-price">
              {selectedVariant ? (
                <>
                  <del className="product-detail-price-regular">{selectedVariant.regularPriceLabel}</del>
                  <ins>{selectedVariant.priceLabel}</ins>
                </>
              ) : (
                product.priceLabel
              )}
            </p>
            {product.introText
              ? product.introText.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))
              : null}

            {/* Sélecteur de variante : malette adaptée à la formation */}
            <div className="product-variant-field">
              <label htmlFor="product-variant-select">Type de formation</label>
              <select
                id="product-variant-select"
                value={selectedVariantId}
                onChange={(event) => setSelectedVariantId(event.target.value)}
              >
                <option value="">Choisir une option</option>
                {product.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="formation-detail-actions">
              <button
                className="button primary"
                type="button"
                disabled={!selectedVariant}
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </button>
              <a className="button ghost" href="/contact/">
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Description + contenu de la malette selon la variante choisie */}
      <section className="formation-detail-content section-pad compact">
        <div className="formation-detail-panel reveal reveal-fade-up">
          <h2>Description</h2>
          {product.descriptionParagraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 50)}>{paragraph}</p>
          ))}

          {selectedVariant ? (
            <div className="product-variant-contents">
              <h3>Contenu pour {selectedVariant.label}</h3>
              <ul>
                {selectedVariant.contents.map((line, index) => (
                  <li
                    key={`${selectedVariant.id}-${index}-${line}`}
                    className={line.endsWith(" :") ? "product-variant-heading" : ""}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="product-variant-hint">
              Sélectionnez un type de formation pour afficher le contenu de la malette correspondante.
            </p>
          )}
        </div>
      </section>

      {/* Articles similaires */}
      {relatedItems.length ? (
        <section className="formation-detail-related section-pad">
          <div className="formation-detail-section-head reveal reveal-fade-up">
            <h2>Produits similaires</h2>
          </div>
          <div className="formations-catalog-grid reveal reveal-fade-up">
            {relatedItems.map((related) => (
              <FormationCard key={related.slug} formation={related} />
            ))}
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}
