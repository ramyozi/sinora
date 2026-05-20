# Audit UX : CTA et interactions

Document de référence du jalon M3.7 : recense toutes les interactions visibles
du site, catégorise leur état (critique / secondaire / futur) et trace les
décisions prises pendant le cycle de stabilisation.

## Règle de base

Toute interaction visible doit avoir :
- une action réelle, ou
- un état `disabled` explicite, ou
- un libellé "Bientôt".

Jamais un bouton mort.

## Audit initial (point de départ M3.7)

### Critiques corrigés dans PR 1

| Emplacement | Avant | Après |
| --- | --- | --- |
| Hero homepage, CTA principal "Créer mon séjour" | `localizedPath("/", locale)` (recharge la home) | `localizedPath("/route-planner", locale)` |
| Bandeau de fin homepage, CTA "Créer mon séjour" | idem | idem |
| Header desktop, bouton "Planifier mon voyage" | idem | idem |
| Menu mobile, bouton "Planifier mon voyage" | idem | idem |
| Header nav "Trains" | `#features` (ancre cassée hors home) | Entrée supprimée (le planner couvre les trains) |
| Footer (toutes colonnes) | `<span>` non cliquables | `<Link>` vers la route quand elle existe, sinon `<span>` + badge "Bientôt" |

### Mapping des liens du footer

Slug vers route, défini dans `src/components/layout/footer.tsx`.

| Slug | Cible |
| --- | --- |
| `destinations` | `/destinations` |
| `route-planner` | `/route-planner` |
| `trains` | Bientôt |
| `events` | Bientôt |
| `visa` | `/preparer/visa` |
| `esim` | `/preparer/apps` |
| `apps` | `/preparer/apps` |
| `payments` | `/preparer/budget` |
| `about` | Bientôt |
| `privacy` | Bientôt |
| `contact` | Bientôt |

### Interactions OK avant M3.7 (rappel)

- Logo Sinora vers home
- Lien header `Destinations` vers `/destinations`
- Lien header `Préparer` vers `/preparer`
- Lien header `Séjours` vers `/route-planner`
- Sélecteur de langue (LocaleSwitcher) avec navigation effective
- Toggle de thème
- Sélecteur de saison du module bagages
- Marqueurs cliquables du route planner
- Réordonnancement et suppression dans le panneau itinéraire
- Suggestions cliquables ("Ajouter") avec insertion à la bonne position
- Templates d'itinéraires (chargement d'un clic)
- Cartes plateformes de réservation (lien externe)

### Futur identifié pour des cycles ultérieurs

- Page `/preparer/calendrier` ne synchronise pas encore les `moduleSlug` d'une tâche au moment du clic
- Carrousel Cities sur la home n'a pas encore d'animation au passage (CTA déjà bons)
- Hero secondaire "Explorer les villes" pointe sur `#cities` (anchor) : fonctionnel sur la home, à revoir si un usage hors home apparaît
- Les `_next/image` sur les hero de pages ville peuvent encore tirer Wikipedia en runtime ; à mettre derrière un fallback statique pour M4

## Bonnes pratiques retenues

1. **Slug d'abord, label ensuite** : pour toute nouvelle liste de liens, structurer les entrées par slug pour pouvoir basculer entre route et état "Bientôt" sans changer la copie.
2. **Pas d'ancre `#xxx` dans la nav globale** : seules les anchors locales à une page (ex. table des matières d'une page longue) sont acceptables.
3. **CTA fort vers `/route-planner`** : c'est le funnel principal du produit. Tout bouton principal hors page produit doit y mener.
4. **Badge "Bientôt"** : libellé clair, jamais d'élément cliquable sans destination réelle.

## Maintenance

Ce document doit être mis à jour à chaque nouveau parcours utilisateur :
- Ajout d'un module ? Vérifier les CTAs dans le hub et les liens du footer.
- Refonte d'une page ? Vérifier qu'aucune ancre `#xxx` ne traîne en nav globale.
- Ajout d'un nouveau type de carte cliquable ? Le brancher ou indiquer "Bientôt".
