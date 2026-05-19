import type { City } from "./types";

// Jeu de données des destinations. Coordonnées et populations d'aire urbaine
// d'après GeoNames ; contenus rédigés pour Sinora.
export const cities: City[] = [
  {
    slug: "pekin",
    name: { fr: "Pékin", en: "Beijing", zh: "北京" },
    region: "nord",
    coordinates: { lat: 39.9042, lng: 116.4074 },
    population: 21.9,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [3, 5],
    tags: ["histoire", "culture", "gastronomie"],
    tagline: {
      fr: "Capitale impériale et politique",
      en: "Imperial and political capital",
      zh: "帝都与政治中心",
    },
    summary: {
      fr: "Pékin condense des siècles d'histoire impériale, de la Cité interdite à la Grande Muraille, au cœur d'une mégapole en perpétuel mouvement.",
      en: "Beijing distils centuries of imperial history, from the Forbidden City to the Great Wall, at the heart of a megacity in constant motion.",
      zh: "北京汇聚数百年帝王历史,从紫禁城到万里长城,坐落于一座生生不息的大都会之中。",
    },
    highlights: [
      {
        name: { fr: "Cité interdite", en: "Forbidden City", zh: "紫禁城" },
        kind: "monument",
      },
      {
        name: { fr: "Grande Muraille", en: "Great Wall", zh: "万里长城" },
        kind: "monument",
      },
      {
        name: { fr: "Temple du Ciel", en: "Temple of Heaven", zh: "天坛" },
        kind: "monument",
      },
      {
        name: { fr: "Hutongs", en: "Hutongs", zh: "胡同" },
        kind: "quartier",
      },
    ],
    airport: "PEK",
    wikiTitle: "Beijing",
    featured: true,
  },
  {
    slug: "shanghai",
    name: { fr: "Shanghai", en: "Shanghai", zh: "上海" },
    region: "est",
    coordinates: { lat: 31.2304, lng: 121.4737 },
    population: 29.2,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [3, 4],
    tags: ["modernite", "culture", "shopping", "gastronomie"],
    tagline: {
      fr: "Métropole financière et avant-gardiste",
      en: "Avant-garde financial metropolis",
      zh: "前卫的金融大都会",
    },
    summary: {
      fr: "Entre le Bund colonial et la skyline de Pudong, Shanghai marie héritage cosmopolite et modernité spectaculaire.",
      en: "Between the colonial Bund and Pudong's skyline, Shanghai blends cosmopolitan heritage with spectacular modernity.",
      zh: "外滩的殖民建筑与浦东的天际线交相辉映,上海融合了世界主义底蕴与璀璨的现代气息。",
    },
    highlights: [
      {
        name: { fr: "Le Bund", en: "The Bund", zh: "外滩" },
        kind: "quartier",
      },
      {
        name: { fr: "Jardin Yu", en: "Yu Garden", zh: "豫园" },
        kind: "nature",
      },
      {
        name: { fr: "Tour de Shanghai", en: "Shanghai Tower", zh: "上海中心大厦" },
        kind: "monument",
      },
      {
        name: {
          fr: "Concession française",
          en: "French Concession",
          zh: "法租界",
        },
        kind: "quartier",
      },
    ],
    airport: "PVG",
    wikiTitle: "Shanghai",
    featured: true,
  },
  {
    slug: "xian",
    name: { fr: "Xi'an", en: "Xi'an", zh: "西安" },
    region: "centre",
    coordinates: { lat: 34.3416, lng: 108.9398 },
    population: 12.9,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [2, 3],
    tags: ["histoire", "culture", "halal", "gastronomie"],
    tagline: {
      fr: "Berceau de la Chine et route de la soie",
      en: "Cradle of China and the Silk Road",
      zh: "华夏摇篮与丝路起点",
    },
    summary: {
      fr: "Ancienne capitale de treize dynasties, Xi'an veille sur l'armée de terre cuite et conserve des remparts Ming intacts.",
      en: "Ancient capital of thirteen dynasties, Xi'an guards the Terracotta Army and keeps its Ming walls intact.",
      zh: "作为十三朝古都,西安守护着兵马俑,保存着完整的明代城墙。",
    },
    highlights: [
      {
        name: {
          fr: "Armée de terre cuite",
          en: "Terracotta Army",
          zh: "兵马俑",
        },
        kind: "monument",
      },
      {
        name: { fr: "Remparts de Xi'an", en: "Xi'an City Wall", zh: "西安城墙" },
        kind: "monument",
      },
      {
        name: {
          fr: "Grande Pagode de l'oie sauvage",
          en: "Giant Wild Goose Pagoda",
          zh: "大雁塔",
        },
        kind: "monument",
      },
      {
        name: { fr: "Quartier musulman", en: "Muslim Quarter", zh: "回民街" },
        kind: "quartier",
      },
    ],
    airport: "XIY",
    wikiTitle: "Xi'an",
    featured: true,
  },
  {
    slug: "chengdu",
    name: { fr: "Chengdu", en: "Chengdu", zh: "成都" },
    region: "sud-ouest",
    coordinates: { lat: 30.5728, lng: 104.0668 },
    population: 20.9,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [2, 4],
    tags: ["nature", "gastronomie", "famille", "culture"],
    tagline: {
      fr: "Pandas géants et art de vivre",
      en: "Giant pandas and the good life",
      zh: "大熊猫与慢生活",
    },
    summary: {
      fr: "Capitale du Sichuan, Chengdu cultive la douceur de vivre, sa cuisine épicée et sa base de recherche sur les pandas géants.",
      en: "Sichuan's capital, Chengdu cultivates a relaxed lifestyle, fiery cuisine and its giant panda research base.",
      zh: "四川省会成都,以悠闲的生活、麻辣美食与大熊猫繁育研究基地闻名。",
    },
    highlights: [
      {
        name: {
          fr: "Base des pandas géants",
          en: "Giant Panda Base",
          zh: "大熊猫繁育研究基地",
        },
        kind: "nature",
      },
      {
        name: { fr: "Rue Jinli", en: "Jinli Street", zh: "锦里" },
        kind: "quartier",
      },
      {
        name: { fr: "Temple de Wuhou", en: "Wuhou Shrine", zh: "武侯祠" },
        kind: "monument",
      },
      {
        name: { fr: "Mont Qingcheng", en: "Mount Qingcheng", zh: "青城山" },
        kind: "nature",
      },
    ],
    airport: "CTU",
    wikiTitle: "Chengdu",
    featured: true,
  },
  {
    slug: "guilin",
    name: { fr: "Guilin", en: "Guilin", zh: "桂林" },
    region: "sud",
    coordinates: { lat: 25.2736, lng: 110.29 },
    population: 5.4,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [2, 3],
    tags: ["nature", "panorama", "aventure"],
    tagline: {
      fr: "Pics karstiques et rizières en terrasses",
      en: "Karst peaks and rice terraces",
      zh: "喀斯特峰林与梯田",
    },
    summary: {
      fr: "Sur la rivière Li, Guilin déroule des pitons karstiques mythiques, des grottes illuminées et les rizières en terrasses de Longji.",
      en: "Along the Li River, Guilin unfurls legendary karst peaks, lit caves and the Longji rice terraces.",
      zh: "漓江之畔,桂林铺展着传奇的喀斯特峰林、灯火璀璨的溶洞与龙脊梯田。",
    },
    highlights: [
      {
        name: { fr: "Rivière Li", en: "Li River", zh: "漓江" },
        kind: "nature",
      },
      {
        name: {
          fr: "Rizières de Longji",
          en: "Longji rice terraces",
          zh: "龙脊梯田",
        },
        kind: "nature",
      },
      {
        name: {
          fr: "Grotte de la flûte de roseau",
          en: "Reed Flute Cave",
          zh: "芦笛岩",
        },
        kind: "nature",
      },
      {
        name: { fr: "Yangshuo", en: "Yangshuo", zh: "阳朔" },
        kind: "quartier",
      },
    ],
    airport: "KWL",
    wikiTitle: "Guilin",
    featured: true,
  },
  {
    slug: "hong-kong",
    name: { fr: "Hong Kong", en: "Hong Kong", zh: "香港" },
    region: "sud",
    coordinates: { lat: 22.3193, lng: 114.1694 },
    population: 7.5,
    bestSeasons: ["automne", "hiver", "printemps"],
    budgetTier: "confort",
    recommendedStay: [3, 4],
    tags: ["modernite", "shopping", "gastronomie", "panorama"],
    tagline: {
      fr: "Baie électrique entre gratte-ciels et collines",
      en: "Electric bay between skyscrapers and hills",
      zh: "摩天楼与山峦间的活力海湾",
    },
    summary: {
      fr: "Ville-monde dense et verticale, Hong Kong superpose finance, marchés de rue et sentiers de randonnée à flanc de collines.",
      en: "A dense, vertical world city, Hong Kong layers finance, street markets and ridge-line hiking trails.",
      zh: "高密度的垂直都会,香港将金融、街市与山脊步道层层叠加。",
    },
    highlights: [
      {
        name: { fr: "Victoria Peak", en: "Victoria Peak", zh: "太平山顶" },
        kind: "nature",
      },
      {
        name: { fr: "Tsim Sha Tsui", en: "Tsim Sha Tsui", zh: "尖沙咀" },
        kind: "quartier",
      },
      {
        name: {
          fr: "Temple Wong Tai Sin",
          en: "Wong Tai Sin Temple",
          zh: "黄大仙祠",
        },
        kind: "monument",
      },
      {
        name: { fr: "Marché de Mong Kok", en: "Mong Kok markets", zh: "旺角" },
        kind: "quartier",
      },
    ],
    airport: "HKG",
    wikiTitle: "Hong_Kong",
    featured: true,
  },
  {
    slug: "hangzhou",
    name: { fr: "Hangzhou", en: "Hangzhou", zh: "杭州" },
    region: "est",
    coordinates: { lat: 30.2741, lng: 120.1551 },
    population: 12.2,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [2, 3],
    tags: ["nature", "culture", "gastronomie"],
    tagline: {
      fr: "Le lac de l'Ouest et les jardins de thé",
      en: "West Lake and the tea gardens",
      zh: "西湖与茶园",
    },
    summary: {
      fr: "Célébrée depuis des siècles pour son lac de l'Ouest, Hangzhou cultive pagodes, plantations de thé Longjing et quiétude classique.",
      en: "Famed for centuries for its West Lake, Hangzhou nurtures pagodas, Longjing tea plantations and classical calm.",
      zh: "西湖名扬千年,杭州孕育着古塔、龙井茶园与古典的宁静。",
    },
    highlights: [
      {
        name: { fr: "Lac de l'Ouest", en: "West Lake", zh: "西湖" },
        kind: "nature",
      },
      {
        name: {
          fr: "Plantations de Longjing",
          en: "Longjing tea fields",
          zh: "龙井茶园",
        },
        kind: "nature",
      },
      {
        name: { fr: "Temple Lingyin", en: "Lingyin Temple", zh: "灵隐寺" },
        kind: "monument",
      },
      {
        name: { fr: "Pagode Leifeng", en: "Leifeng Pagoda", zh: "雷峰塔" },
        kind: "monument",
      },
    ],
    airport: "HGH",
    wikiTitle: "Hangzhou",
    featured: false,
  },
  {
    slug: "suzhou",
    name: { fr: "Suzhou", en: "Suzhou", zh: "苏州" },
    region: "est",
    coordinates: { lat: 31.299, lng: 120.5853 },
    population: 13.4,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [1, 2],
    tags: ["culture", "histoire", "nature"],
    tagline: {
      fr: "Jardins classiques et canaux",
      en: "Classical gardens and canals",
      zh: "古典园林与水巷",
    },
    summary: {
      fr: "« Venise de l'Orient », Suzhou aligne jardins classés au patrimoine mondial, canaux paisibles et ateliers de soie.",
      en: "The 'Venice of the East', Suzhou lines up World Heritage gardens, quiet canals and silk workshops.",
      zh: "素有“东方威尼斯”之称,苏州坐拥世界遗产园林、静谧水巷与丝绸作坊。",
    },
    highlights: [
      {
        name: {
          fr: "Jardin de l'Humble Administrateur",
          en: "Humble Administrator's Garden",
          zh: "拙政园",
        },
        kind: "nature",
      },
      {
        name: {
          fr: "Vieille ville de Pingjiang",
          en: "Pingjiang old town",
          zh: "平江路",
        },
        kind: "quartier",
      },
      {
        name: { fr: "Colline du Tigre", en: "Tiger Hill", zh: "虎丘" },
        kind: "nature",
      },
      {
        name: {
          fr: "Jardin du Maître des filets",
          en: "Master of the Nets Garden",
          zh: "网师园",
        },
        kind: "nature",
      },
    ],
    airport: "SHA",
    wikiTitle: "Suzhou",
    featured: false,
  },
  {
    slug: "chongqing",
    name: { fr: "Chongqing", en: "Chongqing", zh: "重庆" },
    region: "sud-ouest",
    coordinates: { lat: 29.4316, lng: 106.9123 },
    population: 32.1,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [2, 3],
    tags: ["modernite", "gastronomie", "panorama"],
    tagline: {
      fr: "Mégapole verticale sur le Yangtsé",
      en: "Vertical megacity on the Yangtze",
      zh: "长江畔的立体山城",
    },
    summary: {
      fr: "Accrochée aux collines au confluent du Yangtsé, Chongqing fascine par son urbanisme vertical, ses marmites épicées et ses départs de croisière des Trois Gorges.",
      en: "Clinging to hills at the Yangtze confluence, Chongqing astonishes with vertical urbanism, fiery hotpot and Three Gorges cruise departures.",
      zh: "重庆依山而建,坐落于长江交汇处,以立体城市、麻辣火锅与三峡游轮起点令人着迷。",
    },
    highlights: [
      {
        name: { fr: "Hongya Dong", en: "Hongya Cave", zh: "洪崖洞" },
        kind: "quartier",
      },
      {
        name: {
          fr: "Croisière des Trois Gorges",
          en: "Three Gorges cruise",
          zh: "长江三峡",
        },
        kind: "nature",
      },
      {
        name: {
          fr: "Cité antique de Ciqikou",
          en: "Ciqikou old town",
          zh: "磁器口古镇",
        },
        kind: "quartier",
      },
      {
        name: { fr: "Grottes de Dazu", en: "Dazu Rock Carvings", zh: "大足石刻" },
        kind: "monument",
      },
    ],
    airport: "CKG",
    wikiTitle: "Chongqing",
    featured: false,
  },
  {
    slug: "kunming",
    name: { fr: "Kunming", en: "Kunming", zh: "昆明" },
    region: "sud-ouest",
    coordinates: { lat: 25.0389, lng: 102.7183 },
    population: 8.5,
    bestSeasons: ["printemps", "ete", "automne", "hiver"],
    budgetTier: "eco",
    recommendedStay: [2, 3],
    tags: ["nature", "aventure", "culture"],
    tagline: {
      fr: "La cité du printemps éternel",
      en: "The city of eternal spring",
      zh: "四季如春的春城",
    },
    summary: {
      fr: "Au climat doux toute l'année, Kunming ouvre la porte du Yunnan, de sa Forêt de pierre aux villages des minorités.",
      en: "Mild all year round, Kunming opens the gateway to Yunnan, from its Stone Forest to minority villages.",
      zh: "气候四季温和,昆明是通往云南的门户,从石林到少数民族村寨。",
    },
    highlights: [
      {
        name: { fr: "Forêt de pierre", en: "Stone Forest", zh: "石林" },
        kind: "nature",
      },
      {
        name: { fr: "Lac Dian", en: "Dian Lake", zh: "滇池" },
        kind: "nature",
      },
      {
        name: { fr: "Temple d'or", en: "Golden Temple", zh: "金殿" },
        kind: "monument",
      },
      {
        name: { fr: "Collines de l'Ouest", en: "Western Hills", zh: "西山" },
        kind: "nature",
      },
    ],
    airport: "KMG",
    wikiTitle: "Kunming",
    featured: false,
  },
  {
    slug: "harbin",
    name: { fr: "Harbin", en: "Harbin", zh: "哈尔滨" },
    region: "nord",
    coordinates: { lat: 45.8038, lng: 126.534 },
    population: 10.0,
    bestSeasons: ["hiver"],
    budgetTier: "eco",
    recommendedStay: [2, 3],
    tags: ["aventure", "famille", "culture"],
    tagline: {
      fr: "Glace, neige et héritage russe",
      en: "Ice, snow and Russian heritage",
      zh: "冰雪与俄式风情",
    },
    summary: {
      fr: "À l'extrême nord-est, Harbin brille l'hiver avec son festival international de sculptures de glace et son architecture russe.",
      en: "In the far north-east, Harbin shines in winter with its international ice sculpture festival and Russian architecture.",
      zh: "地处东北边陲,哈尔滨在冬季因国际冰雪节与俄式建筑而熠熠生辉。",
    },
    highlights: [
      {
        name: {
          fr: "Festival de glace et de neige",
          en: "Ice and Snow Festival",
          zh: "冰雪大世界",
        },
        kind: "nature",
      },
      {
        name: { fr: "Rue centrale", en: "Central Street", zh: "中央大街" },
        kind: "quartier",
      },
      {
        name: {
          fr: "Cathédrale Sainte-Sophie",
          en: "Saint Sophia Cathedral",
          zh: "圣索菲亚教堂",
        },
        kind: "monument",
      },
      {
        name: { fr: "Île du Soleil", en: "Sun Island", zh: "太阳岛" },
        kind: "nature",
      },
    ],
    airport: "HRB",
    wikiTitle: "Harbin",
    featured: false,
  },
  {
    slug: "kachgar",
    name: { fr: "Kachgar", en: "Kashgar", zh: "喀什" },
    region: "ouest",
    coordinates: { lat: 39.4704, lng: 75.9898 },
    population: 1.0,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [2, 3],
    tags: ["halal", "histoire", "culture"],
    tagline: {
      fr: "Carrefour millénaire de la route de la soie",
      en: "Millennia-old Silk Road crossroads",
      zh: "千年丝路十字路口",
    },
    summary: {
      fr: "Aux confins du Xinjiang, Kachgar conserve l'âme de la route de la soie : vieille ville de terre, grand bazar et culture ouïghoure.",
      en: "On the edge of Xinjiang, Kashgar keeps the soul of the Silk Road: an earthen old town, a grand bazaar and Uyghur culture.",
      zh: "地处新疆边陲,喀什保留着丝绸之路的灵魂:土黄色的老城、大巴扎与维吾尔文化。",
    },
    highlights: [
      {
        name: {
          fr: "Vieille ville de Kachgar",
          en: "Kashgar old town",
          zh: "喀什老城",
        },
        kind: "quartier",
      },
      {
        name: {
          fr: "Grand bazar du dimanche",
          en: "Sunday Grand Bazaar",
          zh: "大巴扎",
        },
        kind: "quartier",
      },
      {
        name: { fr: "Mosquée Id Kah", en: "Id Kah Mosque", zh: "艾提尕尔清真寺" },
        kind: "monument",
      },
      {
        name: {
          fr: "Mausolée d'Apak Khoja",
          en: "Apak Khoja Mausoleum",
          zh: "香妃墓",
        },
        kind: "monument",
      },
    ],
    airport: "KHG",
    wikiTitle: "Kashgar",
    featured: false,
  },
];
