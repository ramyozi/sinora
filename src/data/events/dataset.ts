import type { SinoraEvent } from "./types";

// Calendrier d'evenements majeurs de Chine, peuples sur 2026 et 2027.
// Quelques fetes lunaires sont approximees a leur date gregorienne reelle.
export const events: SinoraEvent[] = [
  // ===== HIVER =====
  {
    slug: "harbin-ice-snow",
    title: {
      fr: "Festival international de la glace et de la neige de Harbin",
      en: "Harbin International Ice and Snow Festival",
      zh: "哈尔滨国际冰雪节",
    },
    summary: {
      fr: "Plus grand festival de sculptures de glace au monde, palais geants illumines et patinage sur la riviere Songhua.",
      en: "The world's largest ice-sculpture festival, giant illuminated palaces and Songhua river skating.",
      zh: "全球最大的冰雪艺术节,巨型冰宫亮灯,松花江滑冰。",
    },
    category: "ice-snow",
    citySlug: "harbin",
    venue: {
      fr: "Sun Island et Ice and Snow World",
      en: "Sun Island and Ice and Snow World",
      zh: "太阳岛与冰雪大世界",
    },
    crowd: "dense",
    eventPriority: "high",
    travelImpact: "must-include",
    recommendedStayExtensionDays: 2,
    wikiTitle: "Harbin International Ice and Snow Sculpture Festival",
    occurrences: [
      { start: "2026-01-05", end: "2026-02-25" },
      { start: "2027-01-05", end: "2027-02-25" },
    ],
    niche: ["photography", "nature"],
    longDescription: {
      fr: "Chaque hiver, Harbin se transforme en capitale mondiale de la glace. Des blocs decoupes dans la riviere Songhua gelee servent a batir des palais, des tours et des temples a taille reelle, illumines de l'interieur a la tombee de la nuit. Le parc Ice and Snow World s'etend sur des dizaines d'hectares ; l'ile du Soleil voisine accueille les sculptures de neige monumentales. Le froid est extreme, souvent sous les -20 C, mais le spectacle nocturne est sans equivalent.",
      en: "Every winter, Harbin becomes the world capital of ice. Blocks cut from the frozen Songhua river are carved into full-scale palaces, towers and temples, lit from within after dark. The Ice and Snow World park stretches over dozens of hectares; neighbouring Sun Island hosts the monumental snow sculptures. The cold is extreme, often below -20 C, but the night spectacle has no equal.",
      zh: "每年冬季,哈尔滨成为世界冰雪之都。从冰封的松花江切割出的冰块,被雕琢成与真实建筑等大的宫殿、塔楼与庙宇,入夜后由内部点亮。冰雪大世界园区绵延数十公顷,邻近的太阳岛则陈列巨型雪雕。气温极低,常在零下20度以下,但夜间的景象举世无双。",
    },
    highlights: [
      {
        fr: "Palais de glace grandeur nature illumines de neon multicolore",
        en: "Life-size ice palaces lit with multicolour neon",
        zh: "霓虹点亮的真实尺寸冰宫",
      },
      {
        fr: "Sculptures de neige monumentales de l'ile du Soleil",
        en: "Monumental snow sculptures on Sun Island",
        zh: "太阳岛的巨型雪雕",
      },
      {
        fr: "Toboggans de glace et patinage sur la riviere gelee",
        en: "Ice slides and skating on the frozen river",
        zh: "冰滑梯与江面滑冰",
      },
      {
        fr: "Baignade hivernale et sculpture sur glace en direct",
        en: "Winter swimming and live ice carving",
        zh: "冬泳与现场冰雕表演",
      },
    ],
    practicalTips: [
      {
        fr: "Visez la tombee de la nuit : les structures s'illuminent vers 16h30.",
        en: "Aim for nightfall: the structures light up around 4:30pm.",
        zh: "瞄准入夜时分:冰建筑约16:30亮灯。",
      },
      {
        fr: "Equipement grand froid indispensable : bottes, sous-couches, protege-visage.",
        en: "Extreme-cold gear is essential: boots, base layers, face cover.",
        zh: "必备极寒装备:雪地靴、保暖内衣、面罩。",
      },
      {
        fr: "Gardez la batterie du telephone au chaud, elle se vide tres vite.",
        en: "Keep your phone battery warm, it drains very fast.",
        zh: "手机电池需保暖,低温下耗电极快。",
      },
    ],
    coordinates: { lat: 45.7717, lng: 126.5944 },
    address: {
      fr: "Ice and Snow World, district de Songbei, Harbin, Heilongjiang",
      en: "Ice and Snow World, Songbei District, Harbin, Heilongjiang",
      zh: "黑龙江省哈尔滨市松北区冰雪大世界",
    },
    priceInfo: {
      fr: "Ice and Snow World environ 330 CNY ; tarifs reduits en soiree.",
      en: "Ice and Snow World around 330 CNY; reduced evening rates.",
      zh: "冰雪大世界约330元;夜场票价较低。",
    },
    durationHint: {
      fr: "Prevoir 3 a 4 heures, de prefere en soiree.",
      en: "Allow 3 to 4 hours, ideally in the evening.",
      zh: "建议预留3至4小时,夜间为佳。",
    },
    galleryWikiTitles: ["Sun Island", "Songhua River"],
  },
  {
    slug: "spring-festival",
    title: {
      fr: "Nouvel An lunaire (Spring Festival)",
      en: "Spring Festival (Lunar New Year)",
      zh: "春节",
    },
    summary: {
      fr: "Fete la plus importante de l'annee : retrouvailles familiales, lampions rouges, feux d'artifice. Affluence record dans les gares.",
      en: "China's biggest holiday: family reunions, red lanterns, fireworks. Record crowds in train stations.",
      zh: "中国最重要节日:阖家团圆、红灯笼、烟花。火车站人潮汹涌。",
    },
    category: "festival",
    citySlug: "pekin",
    crowd: "extreme",
    eventPriority: "high",
    travelImpact: "detour",
    recommendedStayExtensionDays: 0,
    occurrences: [
      { start: "2026-02-17", end: "2026-02-23" },
      { start: "2027-02-06", end: "2027-02-12" },
    ],
    niche: ["spiritual"],
    longDescription: {
      fr: "Le Nouvel An lunaire est le moment le plus intense de l'annee en Chine. Des centaines de millions de personnes voyagent pour retrouver leur famille : c'est la plus grande migration humaine du monde. Les rues se parent de lampions rouges et de couplets calligraphies, les temples se remplissent pour les premieres prieres de l'annee, et les nuits resonnent de feux d'artifice. Pour le voyageur, c'est une plongee saisissante dans la Chine intime, a condition d'accepter une logistique de transport sous tension.",
      en: "The Lunar New Year is the most intense moment of the year in China. Hundreds of millions of people travel to reunite with family in the world's largest human migration. Streets fill with red lanterns and calligraphed couplets, temples crowd for the year's first prayers, and nights echo with fireworks. For the traveller it is a striking immersion into intimate China, provided you accept transport logistics under heavy strain.",
      zh: "农历新年是中国一年中最热烈的时刻。数以亿计的人返乡团聚,形成全球最大的人口迁徙。街巷挂满红灯笼与手写春联,寺庙因新年首次祈福而人潮涌动,夜空回荡烟花。对旅行者而言,这是深入中国日常的震撼体验,但须接受紧张的交通安排。",
    },
    highlights: [
      {
        fr: "Reveillon en famille et plats porte-bonheur",
        en: "Family reunion dinner and lucky dishes",
        zh: "年夜饭与吉祥菜肴",
      },
      {
        fr: "Temples bondes pour les premieres prieres de l'annee",
        en: "Temples packed for the year's first prayers",
        zh: "寺庙挤满新年首次祈福的人群",
      },
      {
        fr: "Danses du lion et du dragon dans les rues",
        en: "Lion and dragon dances in the streets",
        zh: "街头舞狮舞龙",
      },
      {
        fr: "Feux d'artifice et marches du Nouvel An",
        en: "Fireworks and New Year markets",
        zh: "烟花与春节庙会",
      },
    ],
    practicalTips: [
      {
        fr: "Reservez trains et hotels des l'ouverture des ventes, 30 a 60 jours avant.",
        en: "Book trains and hotels the moment sales open, 30 to 60 days ahead.",
        zh: "车票与酒店一开售即预订,提前30至60天。",
      },
      {
        fr: "Beaucoup de petits commerces ferment plusieurs jours : prevoyez en consequence.",
        en: "Many small shops close for several days: plan accordingly.",
        zh: "许多小店歇业数日,需提前安排。",
      },
      {
        fr: "Les grandes villes se vident, les zones rurales s'animent : un bon moment pour les metropoles plus calmes.",
        en: "Big cities empty out while rural areas come alive: a good time for calmer metropolises.",
        zh: "大城市变得冷清,乡村则热闹起来:适合体验更安静的都市。",
      },
    ],
    priceInfo: {
      fr: "Festivites de rue gratuites ; certains temples appliquent un droit d'entree.",
      en: "Street festivities are free; some temples charge an entrance fee.",
      zh: "街头庆典免费;部分寺庙收取门票。",
    },
    durationHint: {
      fr: "Le pic d'intensite dure environ une semaine.",
      en: "The peak intensity lasts about a week.",
      zh: "最热烈的阶段约持续一周。",
    },
  },
  {
    slug: "datong-lantern",
    title: {
      fr: "Festival des Lanternes de Datong",
      en: "Datong Lantern Festival",
      zh: "大同灯会",
    },
    summary: {
      fr: "Lampions geants dans la vieille ville fortifiee, illuminations Tang et Ming. Cloture du Nouvel An lunaire.",
      en: "Giant lanterns in the walled old town, Tang and Ming illuminations. Closes the Lunar New Year.",
      zh: "大同古城内的大型灯笼,唐明风格灯光,元宵收官。",
    },
    category: "lantern",
    citySlug: "datong",
    crowd: "dense",
    eventPriority: "medium",
    travelImpact: "detour",
    recommendedStayExtensionDays: 1,
    occurrences: [
      { start: "2026-02-28", end: "2026-03-08" },
      { start: "2027-02-17", end: "2027-02-26" },
    ],
    niche: ["photography", "spiritual"],
  },

  // ===== PRINTEMPS =====
  {
    slug: "qingming",
    title: {
      fr: "Qingming (Fete des Morts)",
      en: "Qingming Festival",
      zh: "清明节",
    },
    summary: {
      fr: "Hommage aux ancetres dans les cimetieres, cerisiers en fleurs et excursions familiales. Affluence dans les transports.",
      en: "Ancestor remembrance at cemeteries, cherry blossoms and family outings. Crowded transport.",
      zh: "祭祖扫墓,樱花盛开,家庭出游;公共交通拥挤。",
    },
    category: "religious",
    citySlug: "hangzhou",
    crowd: "dense",
    eventPriority: "medium",
    travelImpact: "detour",
    recommendedStayExtensionDays: 1,
    occurrences: [
      { start: "2026-04-04", end: "2026-04-06" },
      { start: "2027-04-04", end: "2027-04-06" },
    ],
    niche: ["spiritual"],
  },
  {
    slug: "luoyang-peony",
    title: {
      fr: "Festival des Pivoines de Luoyang",
      en: "Luoyang Peony Festival",
      zh: "洛阳牡丹文化节",
    },
    summary: {
      fr: "Capitale des pivoines : champs flamboyants, costumes Tang et processions. Symbole de la prosperite.",
      en: "Peony capital: blazing fields, Tang costumes and processions. A symbol of prosperity.",
      zh: "牡丹之都:花海绚烂,唐装巡游,寓意富贵。",
    },
    category: "festival",
    citySlug: "luoyang",
    crowd: "dense",
    eventPriority: "medium",
    travelImpact: "detour",
    recommendedStayExtensionDays: 1,
    wikiTitle: "Luoyang Peony",
    occurrences: [
      { start: "2026-04-05", end: "2026-05-05" },
      { start: "2027-04-05", end: "2027-05-05" },
    ],
    niche: ["photography", "nature"],
  },
  {
    slug: "labour-day",
    title: {
      fr: "Fete du Travail (semaine ferie)",
      en: "Labour Day Holiday",
      zh: "劳动节假期",
    },
    summary: {
      fr: "5 jours de conges nationaux : sites touristiques satures, billets de train quasi introuvables. A planifier en consequence.",
      en: "5-day national holiday: tourist sites packed, train tickets near-impossible. Plan accordingly.",
      zh: "五一长假:景点爆满,火车票一票难求,需提前规划。",
    },
    category: "national",
    citySlug: "shanghai",
    crowd: "extreme",
    eventPriority: "high",
    travelImpact: "detour",
    recommendedStayExtensionDays: 0,
    occurrences: [
      { start: "2026-05-01", end: "2026-05-05" },
      { start: "2027-05-01", end: "2027-05-05" },
    ],
  },

  // ===== ETE =====
  {
    slug: "dragon-boat",
    title: {
      fr: "Fete du Bateau-Dragon (Duanwu)",
      en: "Dragon Boat Festival (Duanwu)",
      zh: "端午节",
    },
    summary: {
      fr: "Courses de bateaux-dragons, zongzi (riz gluant en feuilles) et hommage au poete Qu Yuan. Atmospheres fluviales electriques.",
      en: "Dragon boat races, zongzi (sticky rice in leaves) and homage to poet Qu Yuan. Electric riverside vibes.",
      zh: "龙舟竞渡、粽子飘香,纪念屈原。江畔气氛热烈。",
    },
    category: "festival",
    citySlug: "guilin",
    crowd: "dense",
    eventPriority: "medium",
    travelImpact: "detour",
    recommendedStayExtensionDays: 1,
    wikiTitle: "Dragon Boat Festival",
    occurrences: [
      { start: "2026-06-19", end: "2026-06-21" },
      { start: "2027-06-09", end: "2027-06-11" },
    ],
    niche: ["spiritual"],
  },
  {
    slug: "shanghai-pride-arts",
    title: {
      fr: "Shanghai International Film Festival",
      en: "Shanghai International Film Festival",
      zh: "上海国际电影节",
    },
    summary: {
      fr: "Festival de cinema A-list : premieres asiatiques, soirees au Bund, conferences industrie.",
      en: "A-list film festival: Asian premieres, Bund parties, industry talks.",
      zh: "A 级国际电影节:亚洲首映、外滩夜场与行业论坛。",
    },
    category: "art",
    citySlug: "shanghai",
    crowd: "modere",
    eventPriority: "medium",
    travelImpact: "detour",
    recommendedStayExtensionDays: 2,
    wikiTitle: "Shanghai International Film Festival",
    occurrences: [
      { start: "2026-06-13", end: "2026-06-22" },
      { start: "2027-06-12", end: "2027-06-21" },
    ],
    niche: ["nightlife", "art"],
  },

  // ===== AUTOMNE =====
  {
    slug: "mid-autumn",
    title: {
      fr: "Fete de la Mi-Automne",
      en: "Mid-Autumn Festival",
      zh: "中秋节",
    },
    summary: {
      fr: "Pleine lune, gateaux mooncakes et reunions familiales. Eclairages traditionnels sur les lacs.",
      en: "Full moon, mooncakes and family gatherings. Traditional lights over the lakes.",
      zh: "圆月、月饼与家庭团聚,湖畔点亮传统灯火。",
    },
    category: "festival",
    citySlug: "suzhou",
    crowd: "dense",
    eventPriority: "high",
    travelImpact: "detour",
    recommendedStayExtensionDays: 1,
    wikiTitle: "Mid-Autumn Festival",
    occurrences: [
      { start: "2026-09-25", end: "2026-09-27" },
      { start: "2027-09-14", end: "2027-09-16" },
    ],
    niche: ["spiritual", "photography"],
  },
  {
    slug: "golden-week",
    title: {
      fr: "Golden Week (Fete nationale)",
      en: "Golden Week (National Day)",
      zh: "国庆黄金周",
    },
    summary: {
      fr: "7 jours feries autour du 1er octobre. Cite interdite et Grande Muraille saturees, billets de train explosent.",
      en: "7-day holiday around October 1st. Forbidden City and Great Wall packed, train tickets surge.",
      zh: "10 月 1 日前后 7 天长假,故宫与长城爆满,火车票紧张。",
    },
    category: "national",
    citySlug: "pekin",
    crowd: "extreme",
    eventPriority: "high",
    travelImpact: "detour",
    recommendedStayExtensionDays: 0,
    wikiTitle: "Golden Week (China)",
    occurrences: [
      { start: "2026-10-01", end: "2026-10-07" },
      { start: "2027-10-01", end: "2027-10-07" },
    ],
  },
  {
    slug: "qingdao-beer",
    title: {
      fr: "Festival de la Biere de Qingdao",
      en: "Qingdao International Beer Festival",
      zh: "青岛国际啤酒节",
    },
    summary: {
      fr: "Oktoberfest chinois au bord de la mer Jaune : tentes de brasseurs internationaux, concerts et fruits de mer.",
      en: "Chinese Oktoberfest by the Yellow Sea: international brewer tents, concerts and seafood.",
      zh: "黄海之畔的中国啤酒节:国际酒商帐篷、演唱会与海鲜。",
    },
    category: "food",
    citySlug: "qingdao",
    crowd: "dense",
    eventPriority: "medium",
    travelImpact: "detour",
    recommendedStayExtensionDays: 2,
    wikiTitle: "Qingdao International Beer Festival",
    occurrences: [
      { start: "2026-07-25", end: "2026-08-23" },
      { start: "2027-07-24", end: "2027-08-22" },
    ],
    niche: ["nightlife", "food-hunter"],
  },
  {
    slug: "shanghai-tech-summit",
    title: {
      fr: "World Artificial Intelligence Conference (Shanghai)",
      en: "World Artificial Intelligence Conference",
      zh: "世界人工智能大会",
    },
    summary: {
      fr: "Rendez-vous annuel IA et innovation, Pudong en effervescence : robotique, vehicules autonomes, talks executifs.",
      en: "Annual AI and innovation gathering, Pudong buzzing: robotics, autonomous vehicles, exec talks.",
      zh: "年度人工智能与创新大会,浦东热闹非凡:机器人、自动驾驶、行业演讲。",
    },
    category: "tech",
    citySlug: "shanghai",
    crowd: "modere",
    eventPriority: "medium",
    travelImpact: "detour",
    recommendedStayExtensionDays: 2,
    occurrences: [
      { start: "2026-07-08", end: "2026-07-10" },
      { start: "2027-07-07", end: "2027-07-09" },
    ],
    niche: ["otaku"],
  },
  {
    slug: "shaolin-kungfu",
    title: {
      fr: "Festival international d'arts martiaux de Shaolin",
      en: "Shaolin International Martial Arts Festival",
      zh: "少林国际武术节",
    },
    summary: {
      fr: "Demonstrations Shaolin, competitions de wushu, ceremonies au temple. Acces depuis Zhengzhou ou Luoyang.",
      en: "Shaolin demonstrations, wushu competitions, temple ceremonies. Access via Zhengzhou or Luoyang.",
      zh: "少林表演、武术竞赛与寺庙仪式,从郑州或洛阳可达。",
    },
    category: "sport",
    citySlug: "zhengzhou",
    crowd: "modere",
    eventPriority: "medium",
    travelImpact: "detour",
    recommendedStayExtensionDays: 2,
    occurrences: [
      { start: "2026-10-15", end: "2026-10-20" },
      { start: "2027-10-14", end: "2027-10-19" },
    ],
    niche: ["spiritual"],
  },
  {
    slug: "chengdu-panda-fest",
    title: {
      fr: "Festival du Panda de Chengdu",
      en: "Chengdu Panda Festival",
      zh: "成都熊猫文化节",
    },
    summary: {
      fr: "Animations autour de la base des pandas : programmes pedagogiques, parc de Wangjianglou en illumination, gastronomie Sichuan.",
      en: "Programs around the panda base: educational tracks, illuminated Wangjianglou park, Sichuan food fair.",
      zh: "围绕熊猫基地的活动:科普环节、望江楼灯光与川味市集。",
    },
    category: "festival",
    citySlug: "chengdu",
    crowd: "modere",
    eventPriority: "low",
    travelImpact: "none",
    recommendedStayExtensionDays: 1,
    occurrences: [
      { start: "2026-10-01", end: "2026-10-10" },
      { start: "2027-10-01", end: "2027-10-10" },
    ],
    niche: ["nature", "food-hunter"],
  },
];
