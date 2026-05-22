# Recherche API - Enrichissement des événements

Phase de recherche technique préalable à l'enrichissement du module Événements.
Objectif : déterminer s'il existe une API externe capable d'alimenter Sinora en
événements culturels, festivals, concerts, expositions et food events **couvrant
réellement la Chine continentale**, avec images et géolocalisation.

## Méthode

Chaque API est évaluée sur dix critères : tarification, quota, qualité des
données sur la Chine, géolocalisation, images, avis, licence, facilité
d'intégration Next.js, limitations, verdict. La couverture Chine est le critère
décisif : une API riche mais vide sur la Chine est sans valeur ici.

---

## APIs d'événements

### Ticketmaster Discovery API

- **Tarification** : gratuite.
- **Quota** : 5 000 requêtes/jour, 5 req/s.
- **Données Chine** : quasi inexistantes. Ticketmaster n'opère pas en Chine
  continentale ; le catalogue couvre Amérique du Nord, Europe, Océanie.
- **Géolocalisation** : oui (lat/lng, rayon).
- **Images** : oui, multiples ratios.
- **Avis** : non.
- **Licence** : usage via clé, attribution requise.
- **Intégration Next.js** : simple (REST + clé en query).
- **Limitations** : périmètre géographique rédhibitoire.
- **Verdict** : ❌ inutilisable pour la Chine.

### Eventbrite API

- **Tarification** : gratuite.
- **Quota** : 1 000 req/h.
- **Données Chine** : négligeables. Depuis 2020, Eventbrite a retiré la
  recherche publique d'événements de l'API : on n'accède qu'aux événements de
  sa propre organisation. Présence Chine quasi nulle de toute façon.
- **Géolocalisation** : oui (sur ses propres événements).
- **Images** : oui.
- **Avis** : non.
- **Licence** : clé OAuth.
- **Intégration Next.js** : simple, mais sans recherche publique l'API n'a pas
  d'intérêt ici.
- **Limitations** : pas de découverte d'événements tiers.
- **Verdict** : ❌ inutilisable.

### PredictHQ

- **Tarification** : payante, orientée entreprise. Pas de palier gratuit réel
  (essai limité sur demande commerciale).
- **Quota** : selon contrat.
- **Données Chine** : partielles mais réelles. Agrège sport, concerts,
  expositions, observances, jours fériés, perturbations. La Chine est couverte
  sur les grands événements et les observances.
- **Géolocalisation** : excellente (lat/lng, rang d'impact local "PHQ rank").
- **Images** : non.
- **Avis** : non.
- **Licence** : commerciale, redistribution encadrée.
- **Intégration Next.js** : REST propre, bonne documentation.
- **Limitations** : coût, absence d'images, granularité culturelle locale
  limitée.
- **Verdict** : 🟡 meilleure option payante pour la largeur de couverture, mais
  pas pour l'immersion visuelle. Candidat à un adaptateur optionnel futur.

### Meetup API

- **Tarification** : API complète réservée à Meetup Pro (payant).
- **Quota** : selon offre.
- **Données Chine** : négligeables. Meetup est très peu implanté en Chine.
- **Géolocalisation** : oui.
- **Images** : oui.
- **Avis** : non.
- **Licence** : OAuth, GraphQL.
- **Intégration Next.js** : GraphQL, un peu plus lourde.
- **Limitations** : périmètre Chine vide.
- **Verdict** : ❌ inutilisable.

---

## APIs de lieux (enrichissement, pas événements)

### Google Places API (New)

- **Tarification** : compte de facturation obligatoire ; crédit mensuel offert,
  facturation à l'usage au-delà.
- **Quota** : élevé, lié au budget.
- **Données Chine** : présentes mais à nuancer. Les coordonnées en Chine
  continentale utilisent le système GCJ-02 (décalage volontaire de ~100-500 m
  par rapport au WGS-84) : un point Google Maps ne s'aligne pas sur une carte
  WGS-84 standard sans conversion.
- **Géolocalisation** : oui, mais décalage GCJ-02.
- **Images** : oui, excellentes (Place Photos).
- **Avis** : oui.
- **Licence** : commerciale, restrictions de cache (30 jours max sur certains
  champs).
- **Intégration Next.js** : simple côté serveur.
- **Limitations** : facturation, décalage de coordonnées, lieux et non
  événements.
- **Verdict** : 🟡 utile pour photos/adresses/avis de lieux, mais facturé et non
  centré événements. Le décalage GCJ-02 impose une conversion.

### Foursquare Places API

- **Tarification** : palier gratuit généreux.
- **Quota** : confortable.
- **Données Chine** : faibles. Foursquare est peu dense en Chine continentale.
- **Géolocalisation** : oui.
- **Images** : oui (limitées).
- **Avis** : tips communautaires.
- **Licence** : clé, restrictions de cache.
- **Intégration Next.js** : simple.
- **Limitations** : densité Chine insuffisante, lieux et non événements.
- **Verdict** : ❌ trop pauvre sur la Chine.

### TripAdvisor Content API

- **Tarification** : gratuite jusqu'à 5 000 appels/mois.
- **Quota** : 5 000/mois.
- **Données Chine** : correctes sur les grands sites touristiques (attractions,
  restaurants, hôtels). Pas un catalogue d'événements.
- **Géolocalisation** : oui.
- **Images** : oui.
- **Avis** : oui, c'est le point fort.
- **Licence** : clé, logo et attribution TripAdvisor obligatoires à l'affichage.
- **Intégration Next.js** : simple côté serveur.
- **Limitations** : centré lieux touristiques, pas événements ; contraintes
  d'attribution visuelle.
- **Verdict** : 🟡 pertinent pour enrichir des lieux en avis/photos, hors
  périmètre événementiel.

### Tiqets API

- **Tarification** : accès partenaire B2B (validation de partenariat requise).
- **Données Chine** : faibles.
- **Verdict** : ❌ non accessible sans accord partenaire ; couverture Chine
  insuffisante.

### Amadeus for Developers

- **Tarification** : palier de test gratuit, production payante.
- **Données Chine** : l'API "Tours and Activities" dépend de partenaires
  (GetYourGuide...) à couverture Chine mince. Le reste (vols, hôtels) est hors
  sujet.
- **Verdict** : ❌ hors périmètre événementiel culturel.

---

## Plateformes chinoises (là où vivent réellement les données)

Le catalogue réel des concerts, spectacles, expositions et festivals chinois
est détenu par des plateformes locales : **Damai (大麦)**, **Maoyan (猫眼)**,
**Meituan / Dianping (美团 / 大众点评)**, **Trip.com / Ctrip**.

- Damai et Maoyan n'exposent **aucune API publique** de développeur.
- L'API Dianping est en accès partenaire fermé, fortement restreinte.
- Trip.com propose un programme d'affiliation, sans données événementielles
  détaillées exploitables.

**Conséquence** : les données les plus riches sur l'événementiel chinois sont
verrouillées derrière des plateformes fermées, sans voie d'intégration ouverte.

---

## Sources ouvertes (approche actuelle de Sinora)

### Wikidata + Wikipedia

- **Tarification** : gratuite, sans clé.
- **Quota** : usage raisonnable toléré (User-Agent requis, requêtes en lot).
- **Données Chine** : bonnes sur les festivals culturels récurrents et les
  événements à notoriété encyclopédique (fêtes traditionnelles, grands
  festivals). Multilingue fr / en / zh.
- **Géolocalisation** : via les entités liées.
- **Images** : oui (Wikimedia Commons, P18 + image en tête d'article).
- **Avis** : non.
- **Licence** : CC BY-SA / CC0 selon le contenu, réutilisation libre avec
  attribution.
- **Intégration Next.js** : déjà en place (provider `wiki-image`, pipeline
  d'activités).
- **Limitations** : pas d'événements ponctuels datés à la billetterie ; couvre
  surtout le récurrent et le notoire.
- **Verdict** : ✅ meilleure source ouverte, déjà intégrée.

---

## Synthèse et décision

Aucune API externe ne fournit, sur un palier gratuit ou raisonnablement
accessible, un catalogue **riche, illustré et spécifiquement chinois**
d'événements culturels. Les API occidentales (Ticketmaster, Eventbrite, Meetup)
sont vides sur la Chine ; les données réelles sont sur des plateformes
chinoises fermées.

**Décision retenue :**

1. **Le dataset éditorial curated reste la base.** Il garantit la qualité, la
   pertinence voyage et la cohérence trilingue, comme pour les activités.
2. **Wikipedia / Wikidata reste la couche d'enrichissement** (descriptions
   longues, images, galerie) : gratuite, multilingue, déjà intégrée.
3. **PredictHQ** est identifié comme la seule option payante crédible pour
   élargir la couverture (sport, concerts, observances). Un adaptateur pourra
   être ajouté plus tard derrière une variable d'environnement
   (`PREDICTHQ_TOKEN`), sans dépendance au runtime, sur le modèle build-time du
   pipeline d'activités. Non implémenté à ce stade (coût).
4. **TripAdvisor Content API** reste une piste pour enrichir des lieux en avis,
   hors périmètre événementiel immédiat.

Cette décision privilégie l'immersion réelle et la fiabilité offline plutôt que
le volume brut : conforme à l'objectif produit (« rendre Sinora vivant », pas
« avoir beaucoup d'événements »).
