# Maoya Makeup Formation

Site vitrine de **Maoya Makeup Formation** — formation en maquillage et conseil en image à Lille et à distance.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- CSS global (styles extraits du prototype ChatGPT Canvas)
- [Lucide React](https://lucide.dev/) pour les icônes

## Structure du projet

```
src/
├── app/
│   ├── globals.css      # Styles globaux (variables, composants, responsive)
│   ├── layout.jsx       # Layout racine + metadata SEO
│   └── page.jsx         # Page d'accueil
├── components/
│   ├── home/            # Sections de la homepage
│   ├── layout/          # Header, footer, panier
│   └── ui/              # Composants réutilisables
├── data/                # Contenu statique (navigation, produits, etc.)
│   └── assets.js        # Chemins des images et logos (public/)
├── hooks/               # Hooks React (scroll reveal, header)
└── utils/               # Utilitaires (délais d'animation)
public/
├── logos/               # Logos du site (header, footer, favicon…)
└── images/
    ├── backgrounds/     # Fonds hero, modules, témoignages
    ├── highlights/      # Cartes « Accessible à tous »
    ├── carousel/        # Carrousel modules
    ├── about/           # Section à propos
    ├── distance/        # Programme hybride
    ├── products/        # Formations / produits
    └── gallery/         # Réalisations élèves
```

## Images et logos

Les fichiers statiques sont dans `public/`. Pour remplacer une image, déposez le fichier dans le bon sous-dossier puis mettez à jour le chemin dans `src/data/assets.js` si le nom change.

Exemple : logo principal → `public/logos/logo-maoya.svg` → référencé par `/logos/logo-maoya.svg`.

## Démarrage local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Déploiement Vercel

1. Pousser le dépôt sur GitHub
2. Importer le projet dans [Vercel](https://vercel.com/new)
3. Vercel détecte automatiquement Next.js — aucune configuration supplémentaire requise

## Scripts

| Commande        | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Serveur de développement |
| `npm run build` | Build de production      |
| `npm run start` | Serveur de production    |
| `npm run lint`  | Vérification ESLint      |
