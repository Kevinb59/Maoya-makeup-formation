import {
  Award,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MapPin,
  MessageCircle,
  PlayCircle,
  Users,
  Video,
} from "lucide-react";
import { images } from "./assets";

export const navItems = [
  { label: "Accueil", href: "https://www.maoyamakeupformation.com/" },
  { label: "Formation certifiante", href: "https://www.maoyamakeupformation.com/formation-certifiante/" },
  { label: "Formations à Lille", href: "https://www.maoyamakeupformation.com/formation-a-lille/" },
  { label: "Pack de formation hybride", href: "https://www.maoyamakeupformation.com/a-distance/" },
  { label: "Contactez-nous", href: "https://www.maoyamakeupformation.com/contact/" },
  { label: "Panier", href: "https://www.maoyamakeupformation.com/cart-2/" },
];

export const highlights = [
  {
    icon: MapPin,
    title: "Dans notre centre de Lille",
    text: "Toutes nos formations sont disponibles dans notre centre de Lille tout équipé + un studio photo pour la réalisation de votre book.",
    image: images.highlights.lille,
    href: "https://www.maoyamakeupformation.com/formation-a-lille/",
  },
  {
    icon: Award,
    title: "Éligible au CPF",
    text: "Formation de 35H : Réaliser un maquillage professionnel.",
    image: images.highlights.cpf,
    href: "https://www.maoyamakeupformation.com/formation-certifiante/",
  },
  {
    icon: Video,
    title: "À distance",
    text: "Théorie et démonstration en vidéo. Pratique en visio + 1 ou 2 jours de masterclass avec 2 grands maquilleurs parisiens.",
    image: images.highlights.distance,
    href: "https://www.maoyamakeupformation.com/a-distance/",
  },
  {
    icon: CreditCard,
    title: "Paiement en 4X",
    text: "Facilité de paiement.",
    image: images.highlights.paiement4x,
    href: "#programmes",
  },
];

export const moduleCarouselImages = images.carousel;

export const distanceSteps = [
  {
    number: "01",
    icon: PlayCircle,
    title: "Video D'apprentissage",
    text: "Accédez à l'ensemble de notre savoir-faire grâce à des vidéos pédagogiques détaillées : techniques professionnelles, conseils d'experts et démonstrations pas à pas pour progresser à votre rythme.",
    image: images.distance.video,
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Entrainement en visio",
    text: "Échangez en direct avec nos formateurs, posez toutes vos questions et bénéficiez d'un accompagnement personnalisé pendant vos entraînements, sur vous-même ou sur modèle.",
    image: images.distance.visio,
  },
  {
    number: "03",
    icon: Users,
    title: "Master class",
    text: "Participez à 1 ou 2 jours d'immersion à Lille aux côtés de professionnels qualifiés : partage d'expérience, entraînement intensif pour perfectionner votre technique, suivi d'un shooting photo dans notre studio avec photographe professionnel pour valoriser votre travail.",
    image: images.distance.masterclass,
  },
];

export const products = [
  {
    title: "Formation maquillage beauté studio",
    price: "1,180.00€",
    image: images.products.beauteStudio,
    href: "https://www.maoyamakeupformation.com/product/formation-maquillage-beaute-studio/",
  },
  {
    title: "Formation maquillage de la mariée",
    price: "590.00€",
    image: images.products.mariee,
    href: "https://www.maoyamakeupformation.com/product/formation-maquillage-de-la-mariee/",
  },
  {
    title: "Formation maquillage effets spéciaux",
    price: "1,200.00€",
    image: images.products.effetsSpeciaux,
    href: "https://www.maoyamakeupformation.com/product/formation-maquillage-effets-speciaux/",
  },
  {
    title: "Formation Maquillage Facepainting",
    price: "690.00€",
    image: images.products.facepainting,
    href: "https://www.maoyamakeupformation.com/product/formation-facepainting/",
  },
  {
    title: "Formation maquillage jour",
    price: "290.00€",
    image: images.products.maquillageJour,
    href: "https://www.maoyamakeupformation.com/product/formation-maquillage-jour/",
  },
];

export const studentGallery = images.gallery;

export const benefits = [
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    text: "Paiement en 4 fois sécurisé par le Crédit Agricole.",
  },
  {
    icon: CalendarDays,
    title: "Session sur demande",
    text: "Commencez dès maintenant, planning flexible selon vos disponibilités.",
  },
  {
    icon: Award,
    title: "Valorisation de votre parcours",
    text: "Obtenez une certification reconnue valorisant vos compétences professionnelles.",
  },
  {
    icon: CheckCircle2,
    title: "Qualité",
    text: "Nos Formations sont éligibles aux dispositifs de financement (CPF, OPCO) et conformes aux exigences Qualiopi.",
  },
];
