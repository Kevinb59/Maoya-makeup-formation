"use client";

import { useEffect, useState } from "react";
import SafeImage from "@/components/ui/SafeImage";
import SectionLabel from "@/components/ui/SectionLabel";
import { studentGallery } from "@/data/content";
import { revealDelayStyle } from "@/utils/reveal";

/**
 * Galerie masonry des réalisations élèves.
 */
function buildVerticalSlides(items, slideSize) {
  const slides = [];

  /* 1. Découpage des images en slides mobiles
     - Objectif : grouper la galerie par paires pour construire un carrousel vertical lisible sur petits écrans.
     - Variables clés : `items` contient toutes les images, `slideSize` fixe le nombre d'images par slide.
     - Logique : on parcourt la liste par pas de `slideSize` afin de générer des groupes stables de 2 visuels. */
  for (let index = 0; index < items.length; index += slideSize) {
    slides.push(items.slice(index, index + slideSize));
  }

  return slides;
}

export default function StudentsSection() {
  const mobileSlides = buildVerticalSlides(studentGallery, 2);
  const [activeImage, setActiveImage] = useState(null);
  /* 2. Durée de défilement mobile
     - Objectif : ralentir nettement le carrousel vertical pour un rendu plus élégant et plus lisible.
     - Variables clés : `mobileSlides.length` adapte la durée au volume de contenu, le minimum évite un défilement trop nerveux.
     - Logique : plus il y a de slides, plus la boucle est longue, tout en gardant une base lente sur les petits lots d'images. */
  const mobileLoopDurationSeconds = Math.max(28, mobileSlides.length * 6);

  useEffect(() => {
    /* 3. Gestion de la lightbox
       - Objectif : fermer l'image agrandie avec la touche Echap et bloquer le scroll de page pendant l'ouverture.
       - Variables clés : `activeImage` déclenche l'état modal, `handleKeyDown` écoute le clavier, `document.body.style.overflow` verrouille l'arrière-plan.
       - Logique : tant qu'une image est ouverte, on attache l'écouteur clavier et on gèle le scroll; au nettoyage, on restaure le comportement normal. */
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    if (activeImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage]);

  return (
    <section className="students-section section-pad">
      <div className="section-intro centered reveal reveal-fade-up">
        <SectionLabel>Portfolio élèves</SectionLabel>
        <h2>Réalisations de nos élèves</h2>
      </div>
      {/* 2. Galerie desktop
          - Objectif : conserver le rendu masonry sur les écrans larges.
          - Variables clés : `studentGallery` alimente chaque image, `revealDelayStyle` garde le décalage d'apparition.
          - Logique : cette version reste visible tant que la mise en page ne bascule pas sur le mode compact. */}
      <div className="student-gallery student-gallery-desktop">
        {studentGallery.map((src, index) => {
          const alt = `Réalisation élève ${index + 1}`;

          return (
            <button
              type="button"
              key={src}
              className="student-gallery-trigger reveal reveal-zoom"
              style={revealDelayStyle(index % 6, 70)}
              onClick={() => setActiveImage({ src, alt })}
              aria-label={`Ouvrir ${alt} en grand`}
            >
              <SafeImage src={src} alt={alt} />
            </button>
          );
        })}
      </div>
      {/* 3. Carrousel vertical mobile
          - Objectif : remplacer la galerie 2 colonnes par un défilement vertical à partir du breakpoint mobile.
          - Variables clés : `mobileSlides` contient les paires d'images, chaque slide représente un écran de consultation.
          - Logique : on rend une liste verticale snapée pour que l'utilisateur fasse défiler les groupes de 2 images proprement. */}
      <div
        className="student-gallery-mobile"
        role="region"
        aria-label="Carrousel vertical des réalisations de nos élèves"
        style={{ "--student-gallery-duration": `${mobileLoopDurationSeconds}s` }}
      >
        {/* 3.1 Piste du carrousel mobile
            - Objectif : faire défiler automatiquement les slides verticalement sans scrollbar native.
            - Variables clés : `mobileSlides` fournit les slides source, la seconde boucle sert à créer une continuité visuelle.
            - Logique : on duplique la liste une seconde fois dans la même piste afin d'obtenir une animation fluide en boucle. */}
        <div className={`student-gallery-mobile-track${activeImage ? " is-paused" : ""}`}>
          {[...mobileSlides, ...mobileSlides].map((slide, slideIndex) => (
            <div
              className="student-gallery-slide"
              key={`student-slide-${slideIndex + 1}`}
              aria-hidden={slideIndex >= mobileSlides.length}
            >
              {slide.map((src, imageIndex) => {
                const galleryIndex = slideIndex % mobileSlides.length;
                const altIndex = galleryIndex * 2 + imageIndex;

                return (
                  <button
                    type="button"
                    key={`${src}-${slideIndex + 1}`}
                    className="student-gallery-trigger student-gallery-mobile-trigger"
                    onClick={() =>
                      setActiveImage({
                        src,
                        alt: `Réalisation élève ${altIndex + 1}`,
                      })
                    }
                    aria-label={`Ouvrir Réalisation élève ${altIndex + 1} en grand`}
                  >
                    <SafeImage
                      src={src}
                      alt={`Réalisation élève ${altIndex + 1}`}
                      className="student-gallery-mobile-image"
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* 4. Lightbox plein écran
          - Objectif : afficher l'image sélectionnée en grand avec un fond assombri et une fermeture simple.
          - Variables clés : `activeImage` contient la source et l'alternative, l'overlay gère la fermeture au clic extérieur.
          - Logique : la modale n'est rendue que lorsqu'une image est active; le panneau central stoppe la propagation pour éviter une fermeture involontaire. */}
      {activeImage ? (
        <div
          className="student-gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={() => setActiveImage(null)}
        >
          <div className="student-gallery-modal-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="student-gallery-modal-close"
              onClick={() => setActiveImage(null)}
              aria-label="Fermer l'image agrandie"
            >
              Fermer
            </button>
            <SafeImage
              src={activeImage.src}
              alt={activeImage.alt}
              className="student-gallery-modal-image"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
