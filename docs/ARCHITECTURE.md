# Architecture

## Vue d'ensemble

Sinora est une application Next.js 16 rendue principalement côté serveur. La majorité des
pages sont statiques ou rendues à la demande ; l'interactivité client est limitée aux
composants qui en ont besoin (sélecteur de langue, bascule de thème).

## Internationalisation

Trois langues : français, anglais, chinois simplifié.

- Toutes les routes vivent sous le segment dynamique `app/[locale]`.
- Le fichier `src/proxy.ts` détecte la langue (cookie `NEXT_LOCALE`, puis `Accept-Language`)
  et redirige les chemins sans préfixe de langue.
- Les contenus sont stockés dans des dictionnaires JSON (`src/i18n/dictionaries/`), chargés
  paresseusement côté serveur. Le type `Dictionary` est dérivé du dictionnaire français.
- `generateStaticParams` prérend les trois langues au build.
- Les métadonnées SEO (`alternates.languages`, `openGraph`) et le `sitemap` sont multilingues.

## Design system

- Tailwind CSS v4, configuration par tokens CSS dans `globals.css`.
- Palette sémantique exposée à Tailwind via `@theme inline` : `background`, `surface`,
  `foreground`, `muted`, `accent`, `jade`, `gold`...
- Mode sombre piloté par la classe `.dark` sur `<html>`, appliqué avant le premier rendu par
  un script en ligne afin d'éviter tout flash.
- Composants organisés en trois familles : `ui/` (primitifs), `layout/` (structure de page),
  `home/` (sections de la page d'accueil).

## Couches prévues

L'architecture est pensée pour accueillir, par incréments :

- une **couche API modulaire** : chaque fournisseur (météo, trains, cartes, change...)
  derrière une interface commune, avec cache, retry et repli ;
- un **back-office** et une base de données pour les contenus dynamiques (villes, événements) ;
- un **espace utilisateur** (favoris, voyages, checklists) ;
- un **moteur de recommandations** adapté aux profils de voyageur.

## Déploiement

Cible : Vercel. Build statique pour les pages de contenu, rendu à la demande pour les pages
dépendant de données externes. Sous-domaine envisagé : `china.ramzibenmansour.com`.
