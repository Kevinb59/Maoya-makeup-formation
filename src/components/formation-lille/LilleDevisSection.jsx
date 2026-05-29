"use client";

import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { getLilleModuleId } from "@/utils/formationLilleModules";

const initialFormState = {
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  city: "",
  objective: "",
  availability: "",
  funding: "",
};

export default function LilleDevisSection({
  categories,
  config,
  selectedModuleIds,
  onToggleModule,
}) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * 1. Mise à jour contrôlée des champs du formulaire
   *    - Objectif : centraliser la saisie utilisateur dans `formData`.
   *    - Variables clés : `name` (clé du champ), `value` (contenu saisi).
   *    - Logique : on propage la modification champ par champ via le spread operator.
   */
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  /**
   * 2. Soumission du devis
   *    - Objectif : valider les champs obligatoires et confirmer l’envoi côté client.
   *    - Variables clés : `selectedModuleIds` (modules cochés), `formData` (coordonnées).
   *    - Logique : pas d’API backend pour l’instant ; message de confirmation après validation HTML5.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="section-pad lille-devis" id="devis">
      <div className="section-intro centered reveal reveal-fade-up">
        <SectionLabel>{config.label}</SectionLabel>
        <h2>{config.title}</h2>
        <p>{config.intro}</p>
      </div>

      <div className="lille-devis-layout reveal reveal-fade-up">
        {/* 3. Liste des 6 sections et modules sélectionnables
            - Objectif : afficher toute l’offre modulaire avec cases à cocher synchronisées.
            - Variables clés : `selectedModuleIds` + `onToggleModule`.
            - Logique : chaque case pilote la même sélection que le bouton des cartes. */}
        <div className="lille-devis-modules">
          {categories.map((category) => (
            <article className="lille-devis-category" key={category.title}>
              <h3>{category.title}</h3>
              <ul>
                {category.modules.map((module) => {
                  const moduleId = getLilleModuleId(category.title, module.name);
                  const isChecked = selectedModuleIds.has(moduleId);

                  return (
                    <li key={moduleId}>
                      <label className={`lille-devis-module-option${isChecked ? " is-checked" : ""}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleModule(moduleId)}
                        />
                        <span className="lille-devis-module-name">{module.name}</span>
                        <span className="lille-devis-module-duration">{module.duration}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>

        {/* 4. Formulaire de demande de devis
            - Objectif : collecter les informations de contact et le projet de formation.
            - Variables clés : `formData`, champs requis (`lastName`, `firstName`, `email`).
            - Logique : champs texte + zones libres pour objectif, disponibilités et financement. */}
        <form className="lille-devis-form" onSubmit={handleSubmit}>
          <div className="lille-devis-form-grid">
            <label className="lille-devis-field">
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

            <label className="lille-devis-field">
              <span>
                Prénom <abbr title="obligatoire">*</abbr>
              </span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFieldChange}
                required
                autoComplete="given-name"
              />
            </label>

            <label className="lille-devis-field">
              <span>
                Email <abbr title="obligatoire">*</abbr>
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

            <label className="lille-devis-field">
              <span>Téléphone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFieldChange}
                autoComplete="tel"
              />
            </label>

            <label className="lille-devis-field lille-devis-field-full">
              <span>Ville</span>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleFieldChange}
                autoComplete="address-level2"
              />
            </label>

            <label className="lille-devis-field lille-devis-field-full">
              <span>Objectif de formation</span>
              <textarea
                name="objective"
                rows={3}
                value={formData.objective}
                onChange={handleFieldChange}
              />
            </label>

            <label className="lille-devis-field lille-devis-field-full">
              <span>Disponibilités</span>
              <textarea
                name="availability"
                rows={3}
                value={formData.availability}
                onChange={handleFieldChange}
              />
            </label>

            <label className="lille-devis-field lille-devis-field-full">
              <span>Financement souhaité</span>
              <textarea
                name="funding"
                rows={3}
                value={formData.funding}
                onChange={handleFieldChange}
              />
            </label>
          </div>

          {isSubmitted && (
            <p className="lille-devis-success" role="status">
              {config.successMessage}
            </p>
          )}

          {/* 5. Mention d’information sur les données personnelles
              - Objectif : informer l’utilisateur avant l’envoi, sans case de consentement pour l’instant.
              - Variables clés : `config.privacyNotice` (texte neutre côté données).
              - Logique : affichage discret juste au-dessus du bouton de soumission. */}
          <p className="lille-devis-privacy-notice">{config.privacyNotice}</p>

          <button type="submit" className="button primary lille-devis-submit">
            {config.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
