# ADR 0001 — Choix de la stack technique

- **Statut** : accepté
- **Date** : 2026-05-19

## Contexte

Sinora doit être une plateforme web premium, très visuelle, multilingue (fr/en/zh), avec un
fort enjeu SEO et de performance. Le contenu est en grande partie statique (guides de villes,
préparation au départ) mais certaines parties dépendront d'API externes (météo, trains).

## Décision

- **Next.js 16, App Router.** Rendu serveur et composants serveur par défaut : bon SEO,
  bundle client réduit, prérendu statique des pages de contenu. Le routage par segment
  dynamique gère nativement le multilingue.
- **TypeScript.** Sûreté de typage sur l'ensemble du code, dictionnaires i18n typés.
- **Tailwind CSS v4.** Design system par tokens, itération rapide, pas de CSS mort.
- **i18n native plutôt qu'une librairie.** Le segment `[locale]` et des dictionnaires JSON
  couvrent le besoin sans dépendance supplémentaire ni risque de compatibilité avec
  Next.js 16. La couche reste remplaçable si le besoin se complexifie.
- **MapLibre GL (prévu).** Cartes interactives open source, sans clé propriétaire imposée.
- **Vercel.** Déploiement, previews et edge alignés avec Next.js.

## Conséquences

- Les pages de contenu sont rapides et bien indexées dans les trois langues.
- Les fournisseurs d'API seront isolés derrière une couche dédiée pour rester interchangeables.
- L'absence de librairie i18n implique de maintenir nous-mêmes le chargement des dictionnaires
  et, plus tard, les URLs traduites.
