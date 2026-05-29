"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteFooter from "@/components/layout/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import SafeImage from "@/components/ui/SafeImage";
import LilleDevisSection from "@/components/formation-lille/LilleDevisSection";
import { formationLilleContent as content } from "@/data/formationLille";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getLilleModuleId } from "@/utils/formationLilleModules";

function AnimatedStatValue({ value, durationMs = 3000 }) {
  const [displayValue, setDisplayValue] = useState(0);

  /**
   * 3. Animation compteur des statistiques
   *    - Objectif : faire monter chaque chiffre depuis 0 jusqu'à sa valeur finale en 5 secondes.
   *    - Variables clés : `targetNumber` (valeur cible), `hasPercent` / `hasPlus` (préfixe/suffixe), `durationMs`.
   *    - Logique : on utilise `requestAnimationFrame` pour interpoler la progression, puis on applique
   *      le format visuel d'origine (`95%`, `+50`, `100%`) sans modifier le contenu métier.
   */
  useEffect(() => {
    const numericValue = Number.parseInt(String(value).replace(/[^\d]/g, ""), 10) || 0;
    const startTime = performance.now();
    let frameId = null;

    const update = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const current = Math.round(numericValue * progress);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    frameId = window.requestAnimationFrame(update);
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [value, durationMs]);

  const hasPercent = String(value).includes("%");
  const hasPlus = String(value).trim().startsWith("+");

  return (
    <>
      {hasPlus ? "+" : ""}
      {displayValue}
      {hasPercent ? "%" : ""}
    </>
  );
}

function LilleFadeSlideshow({ images, intervalMs = 4500 }) {
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * 4. Diaporama avec fondu entre deux visuels
   *    - Objectif : alterner les images 026/027 avec une transition douce.
   *    - Variables clés : `activeIndex` pilote l’opacité, `intervalMs` règle la vitesse.
   *    - Logique : boucle automatique tant qu’il y a au moins deux images.
   */
  useEffect(() => {
    if (images.length <= 1) return undefined;

    const timerId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(timerId);
  }, [images, intervalMs]);

  return (
    <div className="lille-fade-slideshow">
      {images.map((src, index) => (
        <SafeImage
          key={src}
          src={src}
          alt=""
          role="presentation"
          className={index === activeIndex ? "is-active" : ""}
        />
      ))}
    </div>
  );
}

export default function FormationLillePage() {
  const [uniformStatCardWidth, setUniformStatCardWidth] = useState(null);
  const [selectedModuleIds, setSelectedModuleIds] = useState(() => new Set());
  const statsContainerRef = useRef(null);
  useScrollReveal();

  /**
   * 6. Bascule de sélection d’un module (cartes ↔ liste devis)
   *    - Objectif : garder une sélection unique synchronisée entre les deux interfaces.
   *    - Variables clés : `moduleId` (clé stable section + nom de module).
   *    - Logique : ajout/suppression dans un `Set` immuable pour déclencher le re-render React.
   */
  const toggleModule = useCallback((moduleId) => {
    setSelectedModuleIds((current) => {
      const next = new Set(current);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    /**
     * 5. Harmonisation des largeurs de cartes stats
     *    - Objectif : caler les 3 cartes sur la largeur réelle de la plus large.
     *    - Variables clés : `statsContainerRef`, `uniformStatCardWidth`.
     *    - Logique : on retire temporairement la contrainte uniforme, on mesure en `max-content`,
     *      puis on applique le max (y compris après la fin de l’animation des chiffres).
     */
    const container = statsContainerRef.current;
    if (!container) return undefined;

    let frameId = null;
    let animationTimeoutId = null;

    const measureWidestCard = () => {
      const cards = Array.from(container.querySelectorAll(".lille-stat-card"));
      if (cards.length === 0) return;

      container.style.removeProperty("--lille-stat-card-width");
      cards.forEach((card) => {
        card.style.width = "max-content";
      });

      frameId = window.requestAnimationFrame(() => {
        frameId = window.requestAnimationFrame(() => {
          const maxWidth = Math.max(
            ...cards.map((card) => card.getBoundingClientRect().width)
          );

          cards.forEach((card) => {
            card.style.width = "";
          });

          setUniformStatCardWidth(Math.ceil(maxWidth));
        });
      });
    };

    measureWidestCard();

    const resizeObserver = new ResizeObserver(measureWidestCard);
    resizeObserver.observe(container);

    animationTimeoutId = window.setTimeout(measureWidestCard, 3200);

    return () => {
      resizeObserver.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
      if (animationTimeoutId) window.clearTimeout(animationTimeoutId);
    };
  }, []);

  /* 1. Galerie hero basée sur les vrais fichiers importés
     - Objectif : éviter les 404 liées à une extension imposée (.webp).
     - Variables clés : liste explicite des fichiers réellement présents dans `imported/`.
     - Logique : on référence directement les noms exacts (png/jpg mix) détectés après import. */
  const heroImages = [
    `${content.importedImageBase}/002.jpg`,
    `${content.importedImageBase}/003.png`,
    `${content.importedImageBase}/004.jpg`,
    `${content.importedImageBase}/005.jpg`,
  ];

  return (
    <main className="maoya-page formation-lille-page">
      <SiteChrome />

      <section className="lille-hero">
        <div className="lille-hero-overlay" />
        <div className="section-pad lille-hero-content reveal reveal-fade-up">
          <SectionLabel>{content.hero.eyebrow}</SectionLabel>
          <h1>{content.hero.title}</h1>
          <p className="lille-hero-subtitle">{content.hero.subtitle}</p>
          <p>{content.hero.description}</p>

          {/* 4. Bloc stats + formateurs intégré au hero
             - Objectif : placer les chiffres clés et la preuve d'expertise dans la première section.
             - Variables clés : `content.stats` (données des 3 indicateurs) + texte "Nos Formateurs".
             - Logique : les cartes de stats apparaissent juste après l'accroche hero, puis le texte
               formateurs vient en dessous pour garder la hiérarchie demandée. */}
          <div
            className={`lille-stats-in-hero${uniformStatCardWidth ? " is-synced" : ""}`}
            ref={statsContainerRef}
            style={
              uniformStatCardWidth
                ? { "--lille-stat-card-width": `${uniformStatCardWidth}px` }
                : undefined
            }
          >
            {content.stats.map((item) => (
              <article className="lille-stat-card reveal reveal-fade-up" key={item.label}>
                <strong>
                  <AnimatedStatValue value={item.value} durationMs={3000} />
                </strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>

          <div className="lille-trainers-note reveal reveal-fade-up">
            <h3>Nos Formateurs</h3>
            <p>
              Tous nos formateurs ont suivi une formation en maquillage artistique et en conseil en
              image.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad lille-hero-gallery">
        <div className="lille-gallery-grid">
          {heroImages.map((src, index) => (
            <article key={src} className="lille-gallery-card reveal reveal-zoom">
              <SafeImage src={src} alt={`Formation à Lille visuel ${index + 1}`} />
            </article>
          ))}
        </div>
      </section>

      {/* 7. Section centre : vidéo à gauche, texte à droite, alignement vertical centré */}
      <section className="section-pad lille-centre">
        <div className="lille-centre-grid">
          <div className="lille-centre-visual reveal reveal-fade-left">
            {/* 8. Vidéo décorative sans contrôles
               - Objectif : lecture en boucle silencieuse, sans barre ni icônes.
               - Variables clés : pas d’attribut `controls`, `muted` + `playsInline` pour l’autoplay mobile.
               - Logique : la vidéo tourne en continu ; le CSS masque tout résidu de contrôles natifs. */}
            <video
              className="lille-centre-video"
              src="/videos/formation-lille-centre.mov"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              controlsList="nodownload noplaybackrate noremoteplayback"
              aria-hidden="true"
            />
          </div>

          <div className="lille-centre-copy reveal reveal-fade-right">
            <SectionLabel>Le centre Maoya</SectionLabel>
            <h2>{content.centre.title}</h2>
            {content.centre.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section programme : intro sur fond image pleine largeur, puis liste des modules
         - Objectif : afficher le visuel derrière le texte « Modules personnalisables », pas en dessous.
         - Variables clés : `content.programmeIntro.banner` en calque arrière, texte clair par-dessus.
         - Logique : image en position absolue, texte au-dessus, modules en dessous sans fond. */}
      <section className="lille-programme">
        <div className="lille-programme-intro reveal reveal-fade-up">
          <div className="lille-programme-intro-bg" aria-hidden="true">
            <SafeImage
              src={content.programmeIntro.banner}
              alt=""
              role="presentation"
            />
          </div>
          <div className="section-pad">
            <div className="section-intro centered">
              <SectionLabel>Modules personnalisables</SectionLabel>
              <h2>{content.programmeIntro.title}</h2>
              <p>
                {content.programmeIntro.text[0]}
                <br />
                {content.programmeIntro.text[1]}
              </p>
            </div>
          </div>
        </div>

        <div className="section-pad">
        {content.categories.map((category, categoryIndex) => {
          /* 6. Variantes visuelles par section de modules
             - Objectif : appliquer un rendu dédié selon `category.layout` (centré ou split image/texte).
             - Variables clés : `layout`, `hideSectionIndex`, `heroImage`, `details`.
             - Logique : on centralise le header dans un bloc réutilisable, puis on adapte la structure. */
          const layout = category.layout ?? "default";
          const isSplitLayout = layout === "split" || layout === "split-reverse";
          const isFeatured =
            layout === "centered" ||
            isSplitLayout ||
            layout === "showcase" ||
            layout === "banner";
          const hideSectionIndex = category.hideSectionIndex ?? false;

          /* 14. Contenu textuel réutilisable (sans titre de section)
             - Objectif : factoriser description, détails et programme pour les layouts custom.
             - Variables clés : `category.description`, `details`, `programmeItems`.
             - Logique : le titre est rendu séparément selon le layout choisi. */
          const categoryBody = (
            <>
              {category.description && (
                <p className={isFeatured ? "lille-featured-lead" : ""}>{category.description}</p>
              )}
              {category.details && <p className="lille-category-details">{category.details}</p>}
              {category.programmeItems?.length > 0 && (
                <div className="lille-category-programme">
                  {category.programmeLabel && <p>{category.programmeLabel}</p>}
                  <ul>
                    {category.programmeItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          );

          const categoryHeader = (
            <div className="lille-category-header">
              {!hideSectionIndex && (
                <p className="lille-category-index">Section {categoryIndex + 1}</p>
              )}
              <h3>{category.title}</h3>
              {categoryBody}
            </div>
          );

          return (
          <article
            className={`lille-category reveal reveal-fade-up${isFeatured ? " is-featured" : ""}${layout === "centered" ? " is-centered" : ""}${isSplitLayout ? " is-split" : ""}${layout === "split-reverse" ? " is-split-reverse" : ""}${layout === "showcase" ? " is-showcase" : ""}${layout === "banner" ? " is-banner" : ""}`}
            key={category.title}
          >
            {layout === "banner" ? (
              /* 16. Layout banner : titre centré, image, puis textes centrés
                 - Objectif : structure de la section 6 SFX (titre + visuel 038 + contenu).
                 - Variables clés : `bannerImage` + `categoryBody` sous la bannière.
                 - Logique : empilement vertical centré avant la grille de cartes. */
              <div className="lille-category-banner-layout">
                <h3>{category.title}</h3>
                <div className="lille-category-banner">
                  <SafeImage src={category.bannerImage} alt={category.title} />
                </div>
                <div className="lille-category-header">{categoryBody}</div>
              </div>
            ) : layout === "showcase" ? (
              /* 15. Layout showcase : titre centré, bannière, diaporame + textes
                 - Objectif : structure spécifique de la section 4 (artistique & transformations).
                 - Variables clés : `bannerImage`, `slideshowImages`, `categoryBody`.
                 - Logique : titre + image 025 en haut, puis diapo 026/027 à gauche et textes à droite. */
              <>
                <div className="lille-category-showcase-top">
                  <h3>{category.title}</h3>
                  <div className="lille-category-banner">
                    <SafeImage src={category.bannerImage} alt={category.title} />
                  </div>
                </div>
                <div className="lille-category-showcase-body">
                  <LilleFadeSlideshow images={category.slideshowImages} />
                  <div className="lille-category-header">{categoryBody}</div>
                </div>
              </>
            ) : isSplitLayout ? (
              /* 12. En-tête split : visuel + textes côte à côte (gauche ou droite selon layout)
                 - Objectif : réutiliser la même structure pour `split` et `split-reverse`.
                 - Variables clés : ordre DOM inversé quand `layout === "split-reverse"`.
                 - Logique : texte à gauche + image à droite pour la 3e section. */
              <div className="lille-category-split">
                {layout === "split-reverse" ? (
                  <>
                    <div className="reveal reveal-fade-left">{categoryHeader}</div>
                    <div className="lille-category-visual reveal reveal-fade-right">
                      <SafeImage src={category.heroImage} alt={category.title} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="lille-category-visual reveal reveal-fade-left">
                      <SafeImage src={category.heroImage} alt={category.title} />
                    </div>
                    <div className="reveal reveal-fade-right">{categoryHeader}</div>
                  </>
                )}
              </div>
            ) : (
              categoryHeader
            )}
            <div className="lille-module-grid">
              {category.modules.map((module) => {
                const moduleId = getLilleModuleId(category.title, module.name);
                const isModuleSelected = selectedModuleIds.has(moduleId);

                return (
                <div
                  className={`lille-module-card${isModuleSelected ? " is-selected" : ""}`}
                  key={module.name}
                >
                  {/* 7. Visuel optionnel des cartes modules
                     - Objectif : afficher les images dédiées sur les modules qui en possèdent.
                     - Variables clés : `module.image` active ou non le rendu du bloc image.
                     - Logique : un rendu conditionnel évite d'affecter les autres catégories sans image. */}
                  {module.image && (
                    <div className="lille-module-card-image">
                      <SafeImage src={module.image} alt={module.name} />
                      {/* 11. Badge durée sur le visuel
                         - Objectif : positionner la durée en bas à droite de l'image.
                         - Variables clés : classe `is-on-image` pour un style overlay dédié.
                         - Logique : le badge reste dans le flux de la carte, mais son rendu est piloté par CSS. */}
                      <span className="is-on-image">{module.duration}</span>
                    </div>
                  )}
                  {/* 9. En-tête titre + durée
                     - Objectif : placer la durée sur la droite de la carte, centrée par rapport au titre.
                     - Variables clés : wrapper `lille-module-card-top` pour gérer l'alignement horizontal.
                     - Logique : le titre occupe l'espace disponible, le tag durée reste collé à droite. */}
                  <div className="lille-module-card-top">
                    <h4>{module.name}</h4>
                    {!module.image && <span>{module.duration}</span>}
                  </div>
                  {/* 8. Action de sélection synchronisée avec la section devis
                     - Objectif : cocher/décocher le module dans la liste du formulaire.
                     - Variables clés : `moduleId`, `toggleModule`, état `isModuleSelected`.
                     - Logique : bouton toggle local sans redirection externe. */}
                  <button
                    type="button"
                    className={`lille-module-select-btn${isModuleSelected ? " is-selected" : ""}`}
                    onClick={() => toggleModule(moduleId)}
                    aria-pressed={isModuleSelected}
                  >
                    {isModuleSelected ? (
                      <>
                        <span>Module</span>
                        <span>sélectionné</span>
                      </>
                    ) : (
                      <>
                        <span>Selectionner</span>
                        <span>ce module</span>
                      </>
                    )}
                  </button>
                </div>
                );
              })}
            </div>
          </article>
          );
        })}
        </div>
      </section>

      <section className="section-pad lille-notes">
        <div className="lille-notes-card reveal reveal-fade-up">
          <SectionLabel>Informations pratiques</SectionLabel>
          <ul>
            {content.footerNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <LilleDevisSection
        categories={content.categories}
        config={content.devisSection}
        selectedModuleIds={selectedModuleIds}
        onToggleModule={toggleModule}
      />

      <SiteFooter />
    </main>
  );
}
