"use client";

import { useRef } from "react";
import SafeImage from "@/components/ui/SafeImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { highlights } from "@/data/content";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

/** Délai entre l'apparition de chaque carte (ms). */
const CARD_STAGGER_MS = 220;

/**
 * Grille des 4 points forts (Lille, CPF, distance, paiement).
 * Les cartes apparaissent une par une au scroll.
 */
export default function HighlightsSection() {
  const gridRef = useRef(null);

  useStaggerReveal(gridRef, CARD_STAGGER_MS);

  return (
    <section className="highlights-section section-pad">
      <div className="section-intro centered reveal reveal-fade-up">
        <SectionLabel>Choisir Maoya</SectionLabel>
        <h2>Accessible à tous</h2>
      </div>
      <div className="highlight-grid" ref={gridRef}>
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <a
              className="highlight-card stagger-reveal reveal-fade-up"
              data-stagger-reveal=""
              href={item.href}
              key={item.title}
            >
              <div className="highlight-image">
                <SafeImage src={item.image} alt={item.title} />
              </div>
              <div className="highlight-body">
                {/* 1. Ligne d'action visuelle
                    - Objectif : afficher l'icône métier à gauche et un faux bouton d'information à droite.
                    - Variables clés : `Icon` pour l'illustration, `highlight-fake-button` pour le repère visuel.
                    - Logique : on place les deux éléments sur une même ligne afin de renforcer l'appel visuel sans ajouter un second lien réel. */}
                <div className="highlight-meta">
                  <span className="card-icon">
                    <Icon size={19} />
                  </span>
                  <span className="highlight-fake-button">En savoir plus</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
