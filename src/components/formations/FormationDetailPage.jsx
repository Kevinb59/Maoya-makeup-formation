"use client";

import { ArrowLeft } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteFooter from "@/components/layout/SiteFooter";
import SafeImage from "@/components/ui/SafeImage";
import FormationCard from "@/components/formations/FormationCard";
import PrerequisiteItem from "@/components/formations/PrerequisiteItem";
import { useCart } from "@/context/CartContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getRelatedCatalogItems } from "@/data/catalog";

/**
 * 6. Page détail d'une formation
 *    - Objectif : afficher le contenu complet issu du JSON (intro, programme, includes, etc.).
 *    - Variables clés : `formation` contient toutes les sections produit de l'ancien site.
 *    - Logique : hero + blocs descriptifs + formations similaires en bas de page.
 */
export default function FormationDetailPage({ formation }) {
  const { addItem } = useCart();
  const relatedFormations = getRelatedCatalogItems(formation);

  useScrollReveal();

  return (
    <main className="maoya-page formation-detail-page">
      <SiteChrome />

      {/* Hero produit : visuel, prix, intro courte et CTA panier */}
      <section className="formation-detail-hero section-pad compact">
        <div className="formation-detail-grid reveal reveal-fade-up">
          <div className="formation-detail-media">
            <SafeImage src={formation.image} alt={formation.name} />
            {formation.promo ? <span className="formation-card-promo">Promo !</span> : null}
          </div>

          <div className="formation-detail-copy">
            <div className="formation-detail-top">
              <a className="formation-detail-back" href="/a-distance/#formations">
                <ArrowLeft size={18} /> Retour aux formations
              </a>
              <span className="formation-detail-category">{formation.category}</span>
            </div>
            <h1>{formation.name}</h1>
            {formation.subtitle ? <p className="formation-detail-subtitle">{formation.subtitle}</p> : null}
            <p className="formation-detail-price">{formation.priceLabel}</p>
            {formation.introTitle ? <h2 className="formation-detail-intro-title">{formation.introTitle}</h2> : null}
            {formation.introText
              ? formation.introText.split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))
              : null}
            {formation.highlights?.length ? (
              <ul className="formation-detail-highlights">
                {formation.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
            <div className="formation-detail-actions">
              <button className="button primary" type="button" onClick={() => addItem(formation)}>
                Ajouter au panier
              </button>
              <a className="button ghost" href="/contact/">
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Description longue : paragraphes détaillés de l'onglet produit */}
      {formation.descriptionParagraphs?.length ? (
        <section className="formation-detail-content section-pad compact">
          <div className="formation-detail-panel reveal reveal-fade-up">
            <h2>{formation.subtitle ?? formation.name}</h2>
            {formation.introTitle ? <h3>{formation.introTitle}</h3> : null}
            {formation.descriptionParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 50)}>{paragraph}</p>
            ))}
            {formation.highlights?.length ? (
              <ul>
                {formation.highlights.map((highlight) => (
                  <li key={`desc-${highlight}`}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Contenu inclus : vidéos, visio, centre Lille, masterclass, shooting */}
      {formation.includes?.length ? (
        <section className="formation-detail-includes section-pad compact">
          <div className="formation-detail-section-head reveal reveal-fade-up">
            <h2>Une formation complète</h2>
          </div>
          <div className="formation-detail-includes-grid reveal reveal-fade-up">
            {formation.includes.map((item, index) => (
              <article
                key={item.title ?? `include-group-${index}`}
                className={`formation-detail-include-card${item.items?.length ? " formation-detail-include-card-grouped" : ""}`}
              >
                {/* Carte groupée : plusieurs blocs titre + texte dans la même carte */}
                {item.items?.length
                  ? item.items.map((entry) => (
                      <div key={entry.title} className="formation-detail-include-entry">
                        <h3>{entry.title}</h3>
                        {entry.text.split("\n\n").map((paragraph) => (
                          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                      </div>
                    ))
                  : null}

                {/* Carte simple : un seul titre et un seul contenu */}
                {!item.items?.length ? (
                  <>
                    <h3>{item.title}</h3>
                    {item.text.split("\n\n").map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Programme pédagogique : modules et points techniques */}
      {formation.program?.length ? (
        <section className="formation-detail-program section-pad compact">
          <div className="formation-detail-panel reveal reveal-fade-up">
            <h2>Programme de la formation</h2>
            <div className="formation-detail-program-grid">
              {formation.program.map((module, moduleIndex) => (
                <article
                  key={`${moduleIndex}-${module.title}`}
                  className="formation-detail-program-block"
                >
                  <h3>{module.title}</h3>
                  <ul>
                    {module.items.map((item, itemIndex) => (
                      <li key={`${moduleIndex}-${itemIndex}-${item}`}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Certification, prérequis et témoignages pédagogiques */}
      <section className="formation-detail-meta section-pad compact">
        <div className="formation-detail-meta-grid reveal reveal-fade-up">
          {formation.certification ? (
            <article className="formation-detail-panel">
              <h2>Certification</h2>
              <p>{formation.certification}</p>
            </article>
          ) : null}

          {formation.prerequisites?.length ? (
            <article className="formation-detail-panel">
              <h2>Prérequis / Obligations</h2>
              <ul className="formation-detail-prerequisites">
                {formation.prerequisites.map((item, index) => (
                  <PrerequisiteItem key={typeof item === "string" ? item : `${index}-${item.text}`} item={item} />
                ))}
              </ul>
            </article>
          ) : null}

          {formation.whyStudentsLove?.length ? (
            <article className="formation-detail-panel">
              <h2>Pourquoi nos élèves aiment cette formation</h2>
              <ul className="formation-detail-checklist">
                {formation.whyStudentsLove.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>

        {formation.objective ? (
          <div className="formation-detail-objective reveal reveal-fade-up">
            <p>{formation.objective}</p>
          </div>
        ) : null}
      </section>

      {/* Formations similaires : cross-sell depuis similarSlugs */}
      {relatedFormations.length ? (
        <section className="formation-detail-related section-pad">
          <div className="formation-detail-section-head reveal reveal-fade-up">
            <h2>Formations similaires</h2>
          </div>
          <div className="formations-catalog-grid reveal reveal-fade-up">
            {relatedFormations.map((related) => (
              <FormationCard key={related.slug} formation={related} />
            ))}
          </div>
        </section>
      ) : null}

      <SiteFooter />
    </main>
  );
}
