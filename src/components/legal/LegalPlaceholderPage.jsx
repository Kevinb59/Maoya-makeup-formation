"use client";

import SiteChrome from "@/components/layout/SiteChrome";
import SiteFooter from "@/components/layout/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Gabarit provisoire pour les pages légales — contenu à compléter ultérieurement.
 */
export default function LegalPlaceholderPage({ title, intro }) {
  useScrollReveal();

  return (
    <main className="maoya-page legal-page">
      <SiteChrome />

      {/* Contenu placeholder — titre + message en attendant la rédaction juridique */}
      <section className="legal-content section-pad compact">
        <div className="legal-content-inner reveal reveal-fade-up">
          <SectionLabel>Informations légales</SectionLabel>
          <h1>{title}</h1>
          <p>{intro}</p>
          <p className="legal-placeholder-note">
            Cette page sera complétée prochainement. Pour toute question, contactez-nous via la
            page <a href="/contact/">Contactez-nous</a>.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
