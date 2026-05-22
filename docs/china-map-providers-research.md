# Recherche - Applications de cartographie pour la Chine

Phase de recherche technique préalable à l'intégration d'une navigation
multi-fournisseurs. Objectif : permettre à un voyageur réellement en Chine
d'ouvrir un lieu Sinora dans une application de cartographie **utilisable sur
place**, avec un point précis.

## Pourquoi Google Maps ne suffit pas

Google Maps est l'option par défaut hors de Chine, mais sur le terrain en
Chine continentale il est peu fiable :

- Le service Google est inaccessible sans VPN pour de nombreux visiteurs.
- La donnée Google en Chine est pauvre et parfois périmée (Google ne
  cartographie pas directement la Chine, il s'appuie sur un partenaire local).
- Surtout : un **décalage de coordonnées** rend les points faux si on ne
  convertit pas (voir ci-dessous).

Un produit qui cible « les voyageurs en Chine réelle » doit donc proposer
aussi les applications que les habitants utilisent : **Amap** et **Baidu
Maps**, plus **Apple Plans** (qui fonctionne bien en Chine).

## Systèmes de coordonnées - le point à vérifier en premier

C'est le piège technique central. Trois systèmes coexistent :

| Système | Description | Utilisé par |
| --- | --- | --- |
| **WGS-84** | Standard GPS international. | Données Sinora (OSM, Wikidata), Google Maps hors Chine |
| **GCJ-02** | « Coordonnées Mars ». Décalage volontaire imposé par la loi chinoise. Écart de ~300-500 m avec le WGS-84. | Amap, Tencent, Apple Plans (en Chine), Google Maps Chine |
| **BD-09** | Surcouche d'obfuscation propre à Baidu, appliquée au-dessus du GCJ-02. | Baidu Maps |

**Conséquence** : passer une coordonnée WGS-84 brute à Amap ou Baidu place le
marqueur à plusieurs centaines de mètres du lieu réel. La conversion est
obligatoire. Les algorithmes (WGS-84 → GCJ-02, GCJ-02 → BD-09) sont publics et
implémentés dans `src/lib/maps/coordinates.ts`.

Cas particulier : Hong Kong et Macao utilisent réellement le WGS-84. La
fonction `outOfChina` (rectangle large) les inclut à tort dans la zone
décalée ; l'impact reste faible car la stratégie de lien privilégie la
**recherche par nom**, la coordonnée n'étant qu'un biais de centrage.

## Stratégie de précision des liens

Le défaut le plus visible était l'ouverture d'un point générique
(`?q=lat,lng` ou `?q=Beijing`). Correctif : construire la requête **par nom**,
dans cet ordre de priorité :

1. nom exact du lieu (monument, musée, activité, événement) ;
2. adresse complète si disponible ;
3. ville ;
4. coordonnées GPS **en repli uniquement**.

Un lien `?query=Temple of Heaven Beijing China` ouvre le bon POI ; un lien
`?query=39.88,116.40` ouvre un point au milieu d'un parc. Le nom est donc
toujours envoyé en premier, la coordonnée servant de centrage et de repli.

## Fournisseurs

### Google Maps

- **Disponibilité Chine** : médiocre (accès et données limités).
- **Deep linking** : URL universelle `https://www.google.com/maps/search/?api=1&query=`.
- **Web** : oui.
- **Mobile** : l'URL universelle ouvre l'app native si installée (iOS/Android).
- **Coordonnées** : WGS-84 (pas de conversion).
- **Intégration** : triviale.
- **Limites** : peu fiable sur le terrain en Chine.
- **UX** : familière pour les voyageurs occidentaux ; à garder comme option.

### Amap / Gaode (高德地图)

- **Disponibilité Chine** : excellente. Application de référence des Chinois.
- **Deep linking** : service universel `https://uri.amap.com/marker` qui
  détecte la plateforme et propose d'ouvrir l'app.
- **Web** : oui.
- **Mobile** : ouverture de l'app native via le service `uri.amap.com`.
- **Coordonnées** : GCJ-02. Ordre `lng,lat`. Conversion requise.
- **Intégration** : simple (URL avec `position`, `name`).
- **Limites** : interface en chinois.
- **UX** : la meilleure couverture terrain en Chine.

### Baidu Maps (百度地图)

- **Disponibilité Chine** : excellente, très populaire.
- **Deep linking** : `https://api.map.baidu.com/marker` (rendu web), schéma
  applicatif `baidumap://` pour l'app.
- **Web** : oui.
- **Mobile** : le rendu web propose l'ouverture de l'app.
- **Coordonnées** : BD-09. Le paramètre `coord_type` accepte aussi `wgs84` et
  `gcj02` ; on envoie du BD-09 explicite par cohérence.
- **Intégration** : simple.
- **Limites** : interface en chinois ; lien universel moins propre qu'Amap.
- **UX** : alternative solide à Amap.

### Apple Plans

- **Disponibilité Chine** : bonne. Apple Plans fonctionne correctement en
  Chine (partenariat local AutoNavi/Amap).
- **Deep linking** : `https://maps.apple.com/?q=...&ll=...`.
- **Web** : oui (Apple Plans web).
- **Mobile** : sur iOS, ouvre l'app native ; sur Android, bascule sur le web.
- **Coordonnées** : en Chine, GCJ-02 pour le paramètre `ll`. Conversion requise.
- **Intégration** : simple.
- **Limites** : expérience optimale sur iOS uniquement.
- **UX** : excellente pour les voyageurs iPhone, nombreux.

### Tencent Maps (腾讯地图)

- **Disponibilité Chine** : bonne, troisième acteur local.
- **Deep linking** : `https://apis.map.qq.com/uri/v1/marker`.
- **Web / mobile** : oui.
- **Coordonnées** : GCJ-02.
- **Intégration** : simple.
- **Limites** : moins répandu qu'Amap et Baidu.
- **UX** : proposé en option secondaire.

## Comportement attendu

- **Mobile** : les URL `https` universelles ouvrent l'application native
  quand elle est installée (Google, Apple, Amap via `uri.amap.com`), et
  basculent proprement sur le web sinon. On évite les schémas applicatifs
  bruts (`baidumap://`...) qui échouent en silence si l'app est absente.
- **Desktop** : les mêmes URL ouvrent la version web du fournisseur.

## Décision

Implémenter un menu de navigation multi-fournisseurs (`MapNavigationMenu`) :

1. **Google Maps** - voyageurs occidentaux, hors Chine.
2. **Apple Plans** - voyageurs iPhone, fonctionne en Chine.
3. **Amap (高德地图)** - référence terrain en Chine.
4. **Baidu Maps (百度地图)** - seconde référence en Chine.
5. **Tencent Maps (腾讯地图)** - option secondaire.

Tous les liens sont construits **par nom** (précision), avec coordonnées
converties dans le bon système par fournisseur. Architecture dans
`src/lib/maps/` : `coordinates.ts` (conversion) et `providers.ts` (liens).
