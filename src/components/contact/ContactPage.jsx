"use client";

import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteFooter from "@/components/layout/SiteFooter";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactQuickModal from "@/components/contact/ContactQuickModal";
import { contactContent as content } from "@/data/contact";
import { site } from "@/data/site";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const initialFormState = {
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  topic: "",
  customTopic: "",
  message: "",
};

/* 1. Icônes des encarts ronds du hero
   - Objectif : associer chaque action (tel, mail, maps) à son pictogramme Lucide.
   - Variables clés : `id` de l’action dans `content.hero.actions`.
   - Logique : lookup statique pour garder le rendu JSX simple. */
const heroActionIcons = {
  phone: Phone,
  email: Mail,
  location: MapPin,
};

/* 2. Liens natifs des encarts hero
   - Objectif : ouvrir l’app téléphone, le client mail ou l’app cartes au clic.
   - Variables clés : `site.phone`, `site.email`, `site.mapsUrl`.
   - Logique : `tel:` / `mailto:` pour actions directes, Google Maps pour la localisation. */
const heroActionHrefs = {
  phone: `tel:${site.phone}`,
  email: `mailto:${site.email}`,
  maps: site.mapsUrl,
};

/**
 * Page Contact — hero plein écran + accès rapides + formulaire.
 */
export default function ContactPage() {
  const [activeModalId, setActiveModalId] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useScrollReveal();

  const isOtherTopic = formData.topic === content.form.otherSubjectValue;
  const activeModal = activeModalId ? content.modals[activeModalId] : null;

  /* 1. Mise à jour contrôlée des champs du formulaire
     - Objectif : centraliser la saisie utilisateur dans `formData`.
     - Variables clés : `name` (clé du champ), `value` (contenu saisi).
     - Logique : si le sujet n'est plus « Autre », on efface le sujet personnalisé. */
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => {
      const next = { ...current, [name]: value };

      if (name === "topic" && value !== content.form.otherSubjectValue) {
        next.customTopic = "";
      }

      return next;
    });
  };

  /* 2. Scroll vers le formulaire avec sujet pré-sélectionné
     - Objectif : depuis la carte « Service de modèle », amener l'utilisateur au bon champ.
     - Variables clés : `topic` alimente la selectbox sujet du formulaire.
     - Logique : mise à jour d'état puis scroll fluide vers `#formulaire`. */
  const scrollToForm = (topic = "") => {
    if (topic) {
      setFormData((current) => ({
        ...current,
        topic,
        customTopic: topic === content.form.otherSubjectValue ? current.customTopic : "",
      }));
    }

    document.getElementById("formulaire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* 3. Clic sur une carte d'accès rapide
     - Objectif : ouvrir une modale ou scroller vers le formulaire selon la carte.
     - Variables clés : `behavior` et `modalId` / `formTopic` dans `content.quickLinks`.
     - Logique : modale pour call/visit/quote, scroll + sujet pour service de modèle. */
  const handleQuickLinkClick = (link) => {
    if (link.behavior === "modal" && link.modalId) {
      setActiveModalId(link.modalId);
      return;
    }

    if (link.behavior === "scroll-form") {
      scrollToForm(link.formTopic ?? "");
    }
  };

  /* 4. Soumission du formulaire contact
     - Objectif : valider les champs obligatoires et confirmer l’envoi côté client.
     - Variables clés : `formData` contient nom, e-mail, sujet et message requis.
     - Logique : pas d’API backend pour l’instant ; confirmation après validation HTML5. */
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="maoya-page contact-page">
      <SiteChrome />

      {/* Hero plein écran — image de fond fixe, titre centré + encarts contact */}
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero-inner section-pad compact reveal reveal-fade-up">
          <h1 id="contact-title">{content.hero.title}</h1>
          <p className="contact-hero-subtitle">{content.hero.subtitle}</p>

          {/* Encarts ronds — appel, e-mail, ouverture carte */}
          <div className="contact-hero-actions" role="list" aria-label="Contact rapide">
            {content.hero.actions.map((action) => {
              const Icon = heroActionIcons[action.id];
              const href = heroActionHrefs[action.type];
              const isExternal = action.type === "maps";

              return (
                <a
                  key={action.id}
                  className="contact-hero-chip"
                  href={href}
                  role="listitem"
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={`${action.label}${action.type === "phone" ? ` : ${site.phone}` : action.type === "email" ? ` : ${site.email}` : ` : ${site.address}`}`}
                >
                  <span className="contact-hero-chip-icon" aria-hidden="true">
                    {Icon ? <Icon size={26} strokeWidth={1.75} /> : null}
                  </span>
                  <span className="contact-hero-chip-label">{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accès rapides — ouverture modale ou scroll formulaire */}
      <section className="contact-quick section-pad compact" aria-label="Accès rapides">
        <div className="contact-quick-grid reveal reveal-fade-up">
          {content.quickLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className="contact-quick-card"
              onClick={() => handleQuickLinkClick(link)}
            >
              <h2>{link.label}</h2>
              <p>{link.description}</p>
              <span>
                En savoir plus <ArrowRight size={16} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {activeModal ? (
        <ContactQuickModal
          modal={activeModal}
          onClose={() => setActiveModalId(null)}
          onScrollToForm={() => scrollToForm()}
        />
      ) : null}

      {/* Présentation + coordonnées */}
      <section className="contact-meet section-pad compact" id="rencontrons-nous">
        <div className="contact-meet-grid reveal reveal-fade-up">
          <div className="contact-meet-copy">
            <SectionLabel>{content.meet.label}</SectionLabel>
            <h2>{content.meet.title}</h2>
            <p>{content.meet.text}</p>
            <div className="contact-meet-actions">
              <button
                type="button"
                className="button primary"
                onClick={() => scrollToForm()}
              >
                <Mail size={18} /> {content.meet.emailLabel}
              </button>
              <a
                className="button ghost"
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={18} /> {content.meet.visitLabel}
              </a>
            </div>
          </div>

          <aside className="contact-meet-details">
            <a className="contact-detail-card" href={`tel:${site.phone}`}>
              <Phone size={22} aria-hidden />
              <div>
                <strong>Téléphone</strong>
                <span>{site.phone}</span>
              </div>
            </a>
            <a className="contact-detail-card" href={`mailto:${site.email}`}>
              <Mail size={22} aria-hidden />
              <div>
                <strong>E-mail</strong>
                <span>{site.email}</span>
              </div>
            </a>
            <a
              className="contact-detail-card"
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={22} aria-hidden />
              <div>
                <strong>Adresse</strong>
                <span>{site.address}</span>
              </div>
            </a>
            <div className="contact-social">
              <span className="contact-social-label">{content.meet.socialLabel}</span>
              <div className="contact-social-links">
                {content.social.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="contact-form-section section-pad compact" id="formulaire">
        <div className="section-intro centered reveal reveal-fade-up">
          <SectionLabel>{content.form.label}</SectionLabel>
          <h2>{content.form.title}</h2>
          <p>{content.form.intro}</p>
        </div>

        <form className="contact-form reveal reveal-fade-up" onSubmit={handleSubmit}>
          <div className="contact-form-grid">
            <label className="contact-field">
              <span>
                Nom <abbr title="obligatoire">*</abbr>
              </span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFieldChange}
                required
                autoComplete="family-name"
              />
            </label>

            <label className="contact-field">
              <span>Prénom</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFieldChange}
                autoComplete="given-name"
              />
            </label>

            <label className="contact-field">
              <span>
                E-mail <abbr title="obligatoire">*</abbr>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFieldChange}
                required
                autoComplete="email"
              />
            </label>

            <label className="contact-field">
              <span>Téléphone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFieldChange}
                autoComplete="tel"
              />
            </label>

            <label className="contact-field contact-field-full">
              <span>
                Sujet <abbr title="obligatoire">*</abbr>
              </span>
              <select name="topic" value={formData.topic} onChange={handleFieldChange} required>
                <option value="">Choisir un sujet</option>
                {content.form.subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            {isOtherTopic ? (
              <label className="contact-field contact-field-full">
                <span>
                  {content.form.customSubjectLabel} <abbr title="obligatoire">*</abbr>
                </span>
                <input
                  type="text"
                  name="customTopic"
                  value={formData.customTopic}
                  onChange={handleFieldChange}
                  required
                />
              </label>
            ) : null}

            <label className="contact-field contact-field-full">
              <span>
                Message <abbr title="obligatoire">*</abbr>
              </span>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleFieldChange}
                required
              />
            </label>
          </div>

          {isSubmitted ? (
            <p className="contact-form-success" role="status">
              {content.form.successMessage}
            </p>
          ) : null}

          <p className="contact-form-privacy">{content.form.privacyNotice}</p>

          <button type="submit" className="button primary contact-form-submit">
            {content.form.submitLabel}
          </button>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
