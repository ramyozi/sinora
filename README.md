# Sinora

Plateforme web dédiée aux voyageurs qui préparent, vivent et prolongent un voyage en Chine.
Séjours sur mesure, formalités décryptées, réseau ferroviaire, cartes interactives et conseils
locaux — le tout multilingue (français, anglais, chinois simplifié).

## Stack

- **Next.js 16** (App Router, Server Components, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** — design system par tokens, mode sombre par classe
- **i18n native** — segment `[locale]`, dictionnaires typés, détection via `proxy`
- **Déploiement** — Vercel

## Démarrage

```bash
pnpm install
pnpm dev
```

L'application est servie sur `http://localhost:3000`. La racine `/` redirige vers la langue
détectée (`/fr`, `/en`, `/zh`).

## Scripts

| Commande      | Rôle                                  |
| ------------- | ------------------------------------- |
| `pnpm dev`    | Serveur de développement              |
| `pnpm build`  | Build de production                   |
| `pnpm start`  | Serveur de production                 |
| `pnpm lint`   | Analyse statique ESLint               |

## Structure

```
src/
  app/[locale]/       Routes localisées (layout racine, page d'accueil)
  components/         layout/ · ui/ · home/
  i18n/               Configuration et dictionnaires fr · en · zh
  lib/                Utilitaires (classes, navigation)
  proxy.ts            Détection de langue et redirection
docs/                 Architecture, décisions (ADR), feuille de route
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Feuille de route](docs/ROADMAP.md)
- [Décisions d'architecture (ADR)](docs/adr)
