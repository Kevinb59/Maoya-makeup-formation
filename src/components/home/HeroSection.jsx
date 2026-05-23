import { ArrowRight } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { site } from "@/data/site";

/**
 * Section hero plein écran avec logo, titre et appels à l'action.
 */
export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content reveal reveal-zoom">
        <a className="hero-logo" href={site.baseUrl} aria-label="Maoya Makeup Formation">
          <SafeImage src={site.logo} alt="Logo Maoya Make Up Formation" loading="eager" />
        </a>
        <p className="hero-eyebrow">Beauté & artistique</p>
        <h1>Formation en maquillage</h1>
        <p className="hero-subtitle">& conseil en image</p>
        <p className="hero-note">Individuelle et Personnalisée</p>
        <div className="hero-actions">
          <a className="button primary" href="#programmes">
            Choisissez vos modules <ArrowRight size={18} />
          </a>
          <a className="button ghost" href="https://www.maoyamakeupformation.com/contact/">
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
}
