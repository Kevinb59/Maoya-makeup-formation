"use client";

import AboutSection from "@/components/home/AboutSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import DistanceSection from "@/components/home/DistanceSection";
import HeroSection from "@/components/home/HeroSection";
import HighlightsSection from "@/components/home/HighlightsSection";
import ModulesSection from "@/components/home/ModulesSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import StudentsSection from "@/components/home/StudentsSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteFooter from "@/components/layout/SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Page d'accueil Maoya Makeup Formation — orchestration des sections.
 */
export default function MaoyaHomepage() {
  useScrollReveal();

  return (
    <main className="maoya-page">
      <SiteChrome />

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
