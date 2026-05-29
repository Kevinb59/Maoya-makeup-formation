/** Contenu de la page Contact — textes corrigés par rapport à l’ancien site. */
export const contactContent = {
  hero: {
    title: "Contactez-nous",
    subtitle: "Rencontrons-nous",
    /* Encarts ronds du hero — `type` sert à résoudre le href depuis `site.js`. */
    actions: [
      { id: "phone", label: "Téléphone", type: "phone" },
      { id: "email", label: "E-mail", type: "email" },
      { id: "location", label: "Localisation", type: "maps" },
    ],
  },
  quickLinks: [
    {
      id: "call",
      label: "Appelez-nous",
      description: "Parlez directement avec notre équipe pour vos questions.",
      behavior: "modal",
      modalId: "call",
    },
    {
      id: "visit",
      label: "Rendez-nous visite",
      description: "Découvrez notre centre de formation et studio photo à Lille.",
      behavior: "modal",
      modalId: "visit",
    },
    {
      id: "quote",
      label: "Demander un devis",
      description: "Expliquez-nous votre projet, nous vous répondons rapidement.",
      behavior: "modal",
      modalId: "quote",
    },
    {
      id: "model",
      label: "Service de modèle",
      description: "Vous souhaitez poser pour nos sessions de pratique ? Contactez-nous.",
      behavior: "scroll-form",
      formTopic: "Service de modèle",
    },
  ],
  /* Contenu des modales ouvertes depuis les cartes d'accès rapide. */
  modals: {
    call: {
      title: "Appelez-nous",
      paragraphs: [
        "N'hésitez pas à nous appeler pour toute question, précision ou autre demande. Notre équipe se fera un plaisir de vous répondre et de vous orienter vers la formation la plus adaptée à votre projet.",
      ],
      footer: { type: "phone" },
      primaryAction: { label: "Appeler maintenant", type: "phone" },
    },
    visit: {
      title: "Rendez-nous visite",
      paragraphs: [
        "Venez découvrir notre centre de formation entièrement équipé, avec son studio photo intégré. Nous vous accueillons sur place pour visiter les locaux et échanger sur nos programmes maquillage et conseil en image.",
      ],
      footer: { type: "address" },
      primaryAction: { label: "Visitez notre centre", type: "maps" },
    },
    quote: {
      title: "Demander un devis",
      paragraphs: [
        "Pour obtenir un devis personnalisé, rendez-vous sur la page Formations à Lille : choisissez les modules qui vous intéressent, remplissez le formulaire et recevez une proposition adaptée à votre projet.",
        "Vous pouvez aussi parcourir le pack de formation hybride, sélectionner une formation puis cliquer sur « Demander un devis » pour recevoir un devis par e-mail.",
        "Vous pouvez également utiliser le formulaire de contact ci-dessous pour nous exposer votre projet : nous vous répondrons dans les meilleurs délais.",
      ],
      links: [
        { label: "Formations à Lille", href: "/formation-a-lille/" },
        { label: "Pack formation hybride", href: "/a-distance/" },
        { label: "Formulaire de contact", href: "#formulaire" },
      ],
    },
  },
  meet: {
    label: "Rencontrons-nous",
    title: "Venez nous rencontrer à Lille",
    text: "Passez nous voir sur place pour découvrir notre centre de formation entièrement équipé, avec son studio photo intégré. Nous serons ravis de répondre à toutes vos questions sur nos programmes maquillage et conseil en image.",
    emailLabel: "Envoyer un e-mail",
    visitLabel: "Visitez notre centre",
    socialLabel: "Retrouvez-nous",
  },
  form: {
    label: "Écrivez-nous",
    title: "Demande de renseignements ou de devis",
    intro:
      "Remplissez le formulaire ci-dessous. Nous vous recontactons dans les meilleurs délais pour vous accompagner dans votre projet de formation.",
    submitLabel: "Envoyer",
    successMessage:
      "Merci pour votre message. Notre équipe vous recontactera très prochainement.",
    privacyNotice:
      "Les informations recueillies via ce formulaire sont utilisées pour traiter votre demande et vous recontacter à ce sujet.",
    subjectOptions: [
      "Demande de renseignements",
      "Demande de devis",
      "Service de modèle",
      "Visite du centre",
      "Autre",
    ],
    otherSubjectValue: "Autre",
    customSubjectLabel: "Précisez votre sujet",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};
