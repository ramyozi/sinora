# Veille technique - APIs et données

Ce document recense les sources de données et APIs retenues pour Sinora, avec les
critères de choix. Il est mis à jour au fil des intégrations.

## Critères

Une source est retenue si elle est : maintenue, à licence claire, gratuite ou
abordable à l'échelle du projet, couvrante sur la Chine, et techniquement stable.

## Météo et qualité de l'air

**Retenu : Open-Meteo.** Pas de clé API, pas d'inscription. Prévisions météo et
qualité de l'air (PM2.5, PM10, O3, NO2, indice UV). Données sous licence CC BY 4.0,
réutilisation commerciale autorisée avec attribution. Agrège plusieurs services
nationaux (NOAA, DWD, ECMWF, JMA...).

- Météo : <https://open-meteo.com/>
- Qualité de l'air : <https://open-meteo.com/en/docs/air-quality-api>

Avantage décisif : aucune clé à gérer, donc aucun secret côté déploiement.

## Géographie et villes

**Retenu : GeoNames** comme référence de coordonnées et populations. Base ouverte,
plus de huit millions de lieux. La base agrégée `dr5hn/countries-states-cities-database`
fournit les mêmes données en JSON/CSV prêts à l'emploi.

- GeoNames : <https://www.geonames.org/>
- Base agrégée : <https://github.com/dr5hn/countries-states-cities-database>

Le jeu de données des 12 villes de Sinora a été constitué manuellement à partir de
ces sources, puis enrichi de contenus rédactionnels trilingues.

## Réseau ferroviaire

**Pistes pour le jalon M3.** Le réseau à grande vitesse chinois dispose de jeux de
données académiques exploitables.

- Dataset *Nature Scientific Data* : 727 gares, 3 399 trains à grande vitesse,
  données d'exploitation et localisation des gares -
  <https://www.nature.com/articles/s41597-022-01349-8>
- `transportation_networks_of_china` : temps de trajet entre préfectures (route et
  rail, 1994–2024) - <https://github.com/malin84/transportation_networks_of_china>

## Cartographie

**Orientation : MapLibre GL + tuiles OpenStreetMap.** Open source, sans clé
propriétaire imposée.

Point d'attention important : la Chine impose le référentiel géodésique **GCJ-02**.
Les coordonnées GPS standard (**WGS-84**) apparaissent décalées sur les fonds de
carte chinois (Baidu, AMap). OpenStreetMap utilise le WGS-84 : en associant des
tuiles OSM à nos coordonnées WGS-84, l'affichage reste cohérent. Il faudra éviter de
mélanger des fonds de carte chinois GCJ-02 avec nos coordonnées sans conversion.

## À explorer

- Change monétaire : API de taux ouverts
- Jours fériés chinois et périodes de forte affluence
- Restaurants halal et mosquées : sources ouvertes à qualifier
- eSIM et couverture internet : données à structurer manuellement
