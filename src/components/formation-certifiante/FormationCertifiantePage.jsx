"use client";

import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteFooter from "@/components/layout/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import { formationCertifianteContent as content } from "@/data/formationCertifiante";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { revealDelayStyle } from "@/utils/reveal";

const SKILLS_STAGGER_MS = 120;

/**
 * Page Formation certifiante — disposition proche du site d’origine,
 * avec le design system Maoya (couleurs, typo, boutons).
 */
export default function FormationCertifiantePage() {
  const skillsGridRef = useRef(null);

  useScrollReveal();
  useStaggerReveal(skillsGridRef, SKILLS_STAGGER_MS);

  return (
    <main className="maoya-page certif-page">
      <SiteChrome />

      {/* 1. En-tête de page (titre + accroche CPF), sans reprendre le hero logo de l’accueil */}
      <section className="certif-hero" aria-labelledby="certif-title">
        <div className="certif-hero-inner section-pad compact reveal reveal-fade-up">
          <SectionLabel>{content.hero.eyebrow}</SectionLabel>
          <h1 id="certif-title">{content.hero.title}</h1>
          <p className="certif-hero-subtitle">{content.hero.subtitle}</p>
        </div>
      </section>

      {/* 2. Intro certification + programme + tarif (2 colonnes comme l’original) */}
      <section className="certif-intro section-pad" id="programme">
        <div className="certif-intro-grid">
          <div className="certif-intro-copy reveal reveal-fade-left">
            <h2>{content.certification.title}</h2>
            <p>{content.certification.description}</p>
          </div>

          <aside className="certif-programme reveal reveal-fade-right">
            <h3>{content.programme.title}</h3>
            <ul className="certif-checklist">
              {content.programme.items.map((item) => (
                <li key={item}>
                  <Check size={18} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="certif-price-card">
              <p className="certif-price-duration">{content.programme.duration}</p>
              <p className="certif-price-amount">{content.programme.price}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. Compétences enseignées (5 cartes) */}
      <section className="certif-skills">
        {/* 6. Conteneur de contenu interne
           - Objectif : garder les largeurs/espacements cohérents avec les autres sections (`section-pad`).
           - Variables clés : `section-pad` pour le container, `skillsGridRef` pour le stagger reveal.
           - Logique : le fond photo vit sur la section pleine largeur, le contenu reste centré dans un container. */}
        <div className="section-pad">
          <div className="section-intro centered reveal reveal-fade-up">
            <SectionLabel>{content.competences.eyebrow}</SectionLabel>
            <h2>{content.competences.title}</h2>
          </div>
          <div className="certif-skills-grid" ref={skillsGridRef}>
            {content.competences.items.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <article
                  key={skill.title}
                  className="certif-skill-card stagger-reveal reveal-fade-up"
                  data-stagger-reveal=""
                  style={revealDelayStyle(index % 5, 60)}
                >
                  <span className="card-icon">
                    <Icon size={20} />
                  </span>
                  <h3>{skill.title}</h3>
                  <p>{skill.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Financement CPF (bloc centré + CTA) */}
      <section className="certif-cpf section-pad" id="cpf">
        <div className="certif-cpf-panel reveal reveal-zoom">
          <SectionLabel>{content.cpf.eyebrow}</SectionLabel>
          <h2>{content.cpf.title}</h2>
          <p className="certif-cpf-lead">{content.cpf.lead}</p>
          <p>{content.cpf.description}</p>
          <a className="button primary" href={content.cpf.ctaHref}>
            {content.cpf.ctaLabel} <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* 5. Certification reconnue (texte + puces + encadré objectifs) */}
      <section className="certif-quality section-pad">
        <div className="certif-quality-grid">
          <div className="certif-quality-copy reveal reveal-fade-left">
            <SectionLabel>{content.quality.eyebrow}</SectionLabel>
            <h2>{content.quality.title}</h2>
            <p>{content.quality.intro}</p>
            <p className="certif-quality-note">
              Certification active, reconnue nationalement et valorisable dans votre parcours
              professionnel.
            </p>
            <ul className="certif-quality-list">
              {content.quality.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="certif-success-badge">{content.quality.badge}</p>
          </div>

          <aside className="certif-quality-details reveal reveal-fade-right">
            <p className="certif-quality-label">Intitulé</p>
            <h3>{content.quality.details.title}</h3>
            <p className="certif-quality-label">Objectifs</p>
            <p>{content.quality.details.objectives}</p>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};
