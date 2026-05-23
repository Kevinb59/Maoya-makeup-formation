"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { products } from "@/data/content";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

/** Délai entre l'apparition de chaque carte produit (ms). */
const CARD_STAGGER_MS = 220;

/**
 * Catalogue des formations avec prix et lien produit.
 * Les cartes apparaissent une par une au scroll.
 */
export default function ProgramsSection() {
  const gridRef = useRef(null);

  useStaggerReveal(gridRef, CARD_STAGGER_MS);

  return (
    <section className="programs-section section-pad" id="programmes">
      <div className="section-intro centered reveal reveal-fade-up">
        <SectionLabel>Formations Makeup</SectionLabel>
        <h2>Choisissez votre programme</h2>
      </div>
      <div className="product-grid" ref={gridRef}>
        {products.map((product) => (
          <article
            className="product-card stagger-reveal reveal-fade-up"
            data-stagger-reveal=""
            key={product.title}
          >
            <a href={product.href} className="product-image">
              <SafeImage src={product.image} alt={product.title} />
            </a>
            <div className="product-body">
              <p>Formation Makeup</p>
              <h3>
                <a href={product.href}>{product.title}</a>
              </h3>
              <strong>{product.price}</strong>
              <button type="button">Ajouter au panier</button>
            </div>
          </article>
        ))}
      </div>
      <div className="centered-action">
        <a className="button primary" href="https://www.maoyamakeupformation.com/a-distance/">
          Découvrir tous nos programmes <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
