"use client";

import { useEffect } from "react";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteFooter from "@/components/layout/SiteFooter";
import DistanceSection from "@/components/home/DistanceSection";
import FormationsCatalogSection from "@/components/formations/FormationsCatalogSection";
import { formationHybrideContent as content } from "@/data/formationHybride";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Page Pack de formation hybride — hero plein écran + étapes du programme à distance.
 */
export default function FormationHybridePage() {
  useScrollReveal();

  /* 0. Ancre #formations — scroll vers le catalogue après navigation interne */
  useEffect(() => {
    if (window.location.hash !== "#formations") {
      return;
    }

    const target = document.getElementById("formations");
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="maoya-page hybride-page">
      <SiteChrome />

      {/* 1. Hero plein écran avec image de fond fixe
          - Objectif : première section en 100vh, alignée sur les pages certifiante et Lille.
          - Variables clés : titre + sous-titre depuis `formationHybrideContent`.
          - Logique : overlay sombre + texte centré blanc avec ombres portées. */}
      <section className="hybride-hero" aria-labelledby="hybride-title">
        <div className="hybride-hero-inner section-pad compact reveal reveal-fade-up">
          <h1 id="hybride-title">{content.hero.title}</h1>
          <p className="hybride-hero-subtitle">{content.hero.subtitle}</p>
        </div>
      </section>

      {/* 2. Trois piliers du programme hybride (vidéo, visio, masterclass) */}
      <DistanceSection showIntro={false} />

      {/* 3. Catalogue des formations — suite du pack hybride, ancré #formations */}
      <FormationsCatalogSection />

      <SiteFooter />
    </main>
  );
}
