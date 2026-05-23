"use client";

import { useState } from "react";
import AboutSection from "@/components/home/AboutSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import DistanceSection from "@/components/home/DistanceSection";
import HeroSection from "@/components/home/HeroSection";
import HighlightsSection from "@/components/home/HighlightsSection";
import ModulesSection from "@/components/home/ModulesSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import StudentsSection from "@/components/home/StudentsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CartDrawer from "@/components/layout/CartDrawer";
import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Page d'accueil Maoya Makeup Formation — orchestration des sections.
 */
export default function MaoyaHomepage() {
  const [cartOpen, setCartOpen] = useState(false);

  // Active les animations reveal au scroll
  useScrollReveal();

  return (
    <main className="maoya-page">
      <Header cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <div
        className={`page-overlay ${cartOpen ? "visible" : ""}`}
        onClick={() => setCartOpen(false)}
        role="presentation"
      />

      <HeroSection />
      <HighlightsSection />
      <ModulesSection />
      <AboutSection />
      <DistanceSection />
      <ProgramsSection />
      <TestimonialSection />
      <StudentsSection />
      <BenefitsSection />
      <SiteFooter />
    </main>
  );
}
