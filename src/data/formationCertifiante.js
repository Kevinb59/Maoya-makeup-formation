import { Brush, Droplet, Eye, Heart, Layers } from "lucide-react";

/** Contenu de la page Formation certifiante (structure alignée sur le site d’origine). */
export const formationCertifianteContent = {
  hero: {
    eyebrow: "Éligible au CPF",
    title: "Formation certifiante",
    subtitle: "Devenez maquilleur professionnel",
  },
  certification: {
    title: "Réaliser un maquillage professionnel complet",
    description:
      "Elle permet d’attester des compétences nécessaires pour réaliser un maquillage beauté complet adapté à chaque visage, ainsi qu’un choix de compétences adaptées à vos besoins et votre projet.",
  },
  programme: {
    title: "Un programme complet",
    items: [
      "30 heures de pratique",
      "5 heures de théorie",
      "Accompagnement personnalisé",
      "Préparation à la certification",
      "15h de modules au choix : maquillage artistique, coiffure, conseil en image",
    ],
    duration: "35 heures",
    price: "2 500€",
  },
  competences: {
    eyebrow: "Devenez maquilleur(se)",
    title: "Les compétences enseignées",
    items: [
      {
        icon: Droplet,
        title: "Fond de teint",
        text: "Apprenez à choisir la texture, la tonalité et la technique d’application adaptée à chaque type de peau.",
      },
      {
        icon: Eye,
        title: "Les Yeux",
        text: "Sourcils, paupières, eye liner, faux cils : maîtrisez toutes les techniques pour sublimer le regard.",
      },
      {
        icon: Heart,
        title: "Les Lèvres",
        text: "Rouge à lèvres, gloss, contouring des lèvres : découvrez l’art de mettre en valeur la bouche.",
      },
      {
        icon: Brush,
        title: "Pinceaux et Outils",
        text: "Maîtrisez les différents pinceaux et autres accessoires indispensables au métier de maquilleur professionnel.",
      },
      {
        icon: Layers,
        title: "Modules aux choix",
        text: "Composez votre parcours avec 15 heures de formation personnalisée parmi une sélection de modules.",
      },
    ],
  },
  cpf: {
    eyebrow: "Éligible au CPF",
    title: "Financer votre formation avec votre CPF",
    lead: "Formation éligible au CPF jusqu’à 1 500 €",
    description:
      "Bénéficiez également d’un co-financement grâce aux aides de l’État pour réduire votre reste à charge.",
    ctaLabel: "Utiliser mon CPF",
    ctaHref:
      "https://www.moncompteformation.gouv.fr/espace-prive/html/#/formation/recherche/95212221600015_EURICOLOUR/95212221600015_EURICOLOUR?contexteFormation=ACTIVITE_PROFESSIONNELLE",
  },
  quality: {
    eyebrow: "Qualité",
    title: "Une certification reconnue",
    intro:
      "Cette formation prépare à la certification : Réaliser un maquillage professionnel complet. Enregistrée au Répertoire Spécifique de France Compétences sous le numéro RS6487.",
    bullets: [
      "Une reconnaissance officielle de vos compétences",
      "Un atout professionnel pour votre activité",
      "Un gage de qualité pour vos clientes",
    ],
    badge: "100% de réussite !",
    details: {
      title: "Réaliser un maquillage professionnel complet",
      objectives:
        "La certification permet d’attester des compétences concrètes permettant de « réaliser un maquillage professionnel complet », allant du choix du fond de teint, à la prise en compte du type de peau ou encore à l’application d’un fard à paupière. L’ensemble des étapes permettant de réaliser un maquillage complet sont acquises.",
    },
  },
};
