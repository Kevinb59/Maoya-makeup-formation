"use client";

import { useMemo, useRef, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import FormationCard from "@/components/formations/FormationCard";
import { getAllCatalogItems } from "@/data/catalog";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

const CARD_STAGGER_MS = 180;

/**
 * 5. Section catalogue des formations (Pack hybride)
 *    - Objectif : lister toutes les formations à la suite du programme hybride.
 *    - Variables clés : `sortMode` pilote l'ordre, `formations` provient du JSON.
 *    - Logique : section autonome réutilisable, ancrée via `#formations` sur `/a-distance/`.
 */
export default function FormationsCatalogSection() {
  const gridRef = useRef(null);
  const [sortMode, setSortMode] = useState("recent");
  const formations = getAllCatalogItems();

  useStaggerReveal(gridRef, CARD_STAGGER_MS);

  /* 5.1 Tri local du catalogue
     - Objectif : proposer un tri simple sans backend pour l'instant.
     - Variables clés : `sortMode` peut trier par ordre catalogue, nom ou prix.
     - Logique : liste recalculée via `useMemo` pour limiter les re-renders. */
  const sortedFormations = useMemo(() => {
    const list = [...formations];

    if (sortMode === "name") {
      return list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    }

    if (sortMode === "price-asc") {
      return list.sort((a, b) => a.price - b.price);
    }

    if (sortMode === "price-desc") {
      return list.sort((a, b) => b.price - a.price);
    }

    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  }, [formations, sortMode]);

  return (
    <>
      <section className="formations-catalog-hero section-pad compact" id="formations">
        <div className="section-intro centered reveal reveal-fade-up">
          <SectionLabel>Nos formations</SectionLabel>
          <h2>Choisissez votre formation</h2>
          <p>
            Parcourez nos formations maquillage, conseil en image et matériel essentiel. Chaque programme
            dispose d&apos;une fiche détaillée avec toutes les informations.
          </p>
        </div>
      </section>

      <section className="formations-catalog-list section-pad compact">
        <div className="formations-catalog-toolbar reveal reveal-fade-up">
          <p>{sortedFormations.length} résultats affichés</p>
          <label className="formations-catalog-sort">
            <span className="sr-only">Tri des formations</span>
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
              <option value="recent">Tri du plus récent au plus ancien</option>
              <option value="name">Tri par nom (A-Z)</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </label>
        </div>

        <div className="product-grid formations-grid" ref={gridRef}>
          {sortedFormations.map((formation) => (
            <FormationCard
              formation={formation}
              key={formation.id}
              className="stagger-reveal reveal-fade-up"
              data-stagger-reveal=""
            />
          ))}
        </div>
      </section>
    </>
  );
}
