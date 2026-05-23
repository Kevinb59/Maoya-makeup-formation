import SafeImage from "@/components/ui/SafeImage";
import { moduleCarouselImages } from "@/data/content";

function ModuleCarouselSlide({ src, index }) {
  return (
    <div className="module-carousel-slide">
      <SafeImage src={src} alt={`Ambiance formation module ${index + 1}`} />
    </div>
  );
}

/**
 * Section modules avec carrousel d'images et liens vers les formations.
 */
export default function ModulesSection() {
  const carouselSlides = [...moduleCarouselImages, ...moduleCarouselImages];

  return (
    <section className="modules-section">
      <div className="modules-layout">
        <div
          className="module-carousel reveal reveal-fade-left"
          aria-label="Galerie des modules de formation"
        >
          <div className="module-carousel-track">
            {carouselSlides.map((src, index) => (
              <ModuleCarouselSlide
                key={`${src}-${index}`}
                src={src}
                index={index % moduleCarouselImages.length}
              />
            ))}
          </div>
        </div>

        <div className="module-copy reveal reveal-fade-right">
          <h2>Construisez une formation adaptée à votre rythme</h2>
          <div className="module-tabs">
            <a href="https://www.maoyamakeupformation.com/formation-a-lille/">
              Formation à Lille
            </a>
            <a href="https://www.maoyamakeupformation.com/a-distance/">
              Formation à distance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
