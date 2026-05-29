"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import FormationCard from "@/components/formations/FormationCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { getAllFormations } from "@/data/formations";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

/** Délai entre l'apparition de chaque carte produit (ms). */
const CARD_STAGGER_MS = 220;

/** Nombre de formations mises en avant sur l'accueil. */
const FEATURED_COUNT = 5;

/**
 * Catalogue des formations avec prix et lien produit.
 * Les cartes apparaissent une par une au scroll.
 */
export default function ProgramsSection() {
  const gridRef = useRef(null);
  const featuredFormations = getAllFormations().slice(0, FEATURED_COUNT);

  useStaggerReveal(gridRef, CARD_STAGGER_MS);

  return (
    <section className="programs-section section-pad" id="programmes">
      <div className="section-intro centered reveal reveal-fade-up">
        <SectionLabel>Formations Makeup</SectionLabel>
        <h2>Choisissez votre programme</h2>
      </div>
      <div className="product-grid formations-grid" ref={gridRef}>
        {featuredFormations.map((formation) => (
          <FormationCard
            formation={formation}
            key={formation.id}
            className="stagger-reveal reveal-fade-up"
            data-stagger-reveal=""
          />
        ))}
      </div>
      <div className="centered-action">
        <a className="button primary" href="/a-distance/#formations">
          Découvrir tous nos programmes <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
