# Feuille de route

Projet pensé sur 1,5 à 2 mois, par incréments livrables.

## M0 — Fondation _(en cours)_

- [x] Scaffolding Next.js 16, TypeScript, Tailwind v4
- [x] i18n native fr/en/zh (segment `[locale]`, dictionnaires, proxy)
- [x] Design system : tokens, mode sombre, primitifs
- [x] Layout : en-tête, pied de page, sélecteurs langue et thème
- [x] Page d'accueil premium
- [x] SEO de base : métadonnées, sitemap, robots
- [ ] Déploiement continu sur Vercel

## M1 — Destinations

- Pages de villes détaillées (aperçu, météo, transports, gastronomie, sécurité)
- Index des destinations avec filtres
- Photothèque réelle et optimisation des images

## M2 — Préparation au départ

- Guides interactifs : visa, douane, santé, internet
- Checklists et timelines avant départ
- Section applications indispensables (WeChat, Alipay, cartes...)

## M3 — Réseau ferroviaire

- Carte ferroviaire interactive
- Estimations temps et prix, types de trains et classes
- Explication de la réservation et des QR codes

## M4 — Cartes interactives

- Couche cartographique MapLibre réutilisable
- Cartes thématiques : météo, sécurité, transports, halal

## M5 — Générateur de séjour

- Formulaire de profil voyageur
- Génération d'itinéraire : timeline, budget, étapes
- Profils dédiés (halal, famille, backpacker...)

## M6 — Espace utilisateur

- Authentification
- Favoris, voyages sauvegardés, checklists, notes
- Moteur de recommandations

## Transverse

- Couche API modulaire (cache, retry, repli, monitoring)
- Accessibilité et performance (Lighthouse, Core Web Vitals)
- Tests et intégration continue
