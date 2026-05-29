"use client";

import { useEffect } from "react";
import { MapPin, Phone, X } from "lucide-react";
import { site } from "@/data/site";

/**
 * Modale des cartes d'accès rapide — contenu dynamique selon la carte cliquée.
 */
export default function ContactQuickModal({ modal, onClose, onScrollToForm }) {
  /* 1. Fermeture clavier + verrouillage scroll
     - Objectif : comportement modal accessible (Echap) sans scroll arrière-plan.
     - Variables clés : `modal` pilote l'ouverture, `onClose` remet l'état à null.
     - Logique : écouteur keydown + overflow hidden tant que la modale est ouverte. */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!modal) {
    return null;
  }

  /* 2. Clic sur un lien interne vers le formulaire
     - Objectif : fermer la modale puis scroller vers `#formulaire`.
     - Variables clés : `onScrollToForm` déclenche le scroll côté page parente.
     - Logique : empêche la navigation brutale pour garder le contexte utilisateur. */
  const handleFormLinkClick = (event) => {
    event.preventDefault();
    onClose();
    onScrollToForm?.();
  };

  /* 3. Résolution des boutons d'action principaux
     - Objectif : lier tel / maps depuis `site.js` plutôt que des URLs en dur.
     - Variables clés : `primaryAction.type` vaut `phone` ou `maps`.
     - Logique : fallback sur `href` pour les liens internes éventuels. */
  const resolvePrimaryActionHref = (action) => {
    if (action.type === "phone") {
      return `tel:${site.phone}`;
    }

    if (action.type === "maps") {
      return site.mapsUrl;
    }

    return action.href ?? "#";
  };

  const isExternalPrimaryAction = modal.primaryAction?.type === "maps";

  return (
    <div
      className="contact-quick-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-quick-modal-title"
      onClick={onClose}
    >
      <div className="contact-quick-modal-panel" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="contact-quick-modal-close"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
        >
          <X size={20} />
        </button>

        <h2 id="contact-quick-modal-title">{modal.title}</h2>

        <div className="contact-quick-modal-body">
          {modal.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {modal.footer?.type === "phone" ? (
          <p className="contact-quick-modal-footer">
            <Phone size={18} aria-hidden />
            <a href={`tel:${site.phone}`}>{site.phone}</a>
          </p>
        ) : null}

        {modal.footer?.type === "address" ? (
          <p className="contact-quick-modal-footer">
            <MapPin size={18} aria-hidden />
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
              {site.address}
            </a>
          </p>
        ) : null}

        {modal.links?.length ? (
          <div className="contact-quick-modal-links">
            {modal.links.map((link) =>
              link.href === "#formulaire" ? (
                <a
                  key={link.label}
                  className="button ghost"
                  href={link.href}
                  onClick={handleFormLinkClick}
                >
                  {link.label}
                </a>
              ) : (
                <a key={link.label} className="button ghost" href={link.href}>
                  {link.label}
                </a>
              )
            )}
          </div>
        ) : null}

        {modal.primaryAction ? (
          <a
            className="button primary contact-quick-modal-cta"
            href={resolvePrimaryActionHref(modal.primaryAction)}
            {...(isExternalPrimaryAction
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {modal.primaryAction.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}
