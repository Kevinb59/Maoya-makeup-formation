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
                <span className="card-icon">
                  <Icon size={19} />
                </span>
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
