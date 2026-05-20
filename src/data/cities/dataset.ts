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
    identity: {
      moods: ["imperial", "vibrant", "ancient"],
      pace: "balanced",
      food: [
        {
          name: { fr: "Canard laqué", en: "Peking duck", zh: "北京烤鸭" },
          hint: {
            fr: "Le plat signature, à goûter chez Da Dong ou Quanjude.",
            en: "The signature dish: try Da Dong or Quanjude.",
            zh: "招牌烤鸭,推荐大董或全聚德。",
          },
          emoji: "🦆",
        },
        {
          name: { fr: "Jianbing", en: "Jianbing", zh: "煎饼" },
          hint: {
            fr: "Crêpe salée du petit-déjeuner, croustillante et chaude.",
            en: "Savoury breakfast crepe, hot and crisp.",
            zh: "早餐街边煎饼,酥脆热烫。",
          },
          emoji: "🥞",
        },
        {
          name: { fr: "Zhajiangmian", en: "Zhajiangmian", zh: "炸酱面" },
          hint: {
            fr: "Nouilles fraîches et sauce soja noire, indémodables.",
            en: "Fresh noodles with rich black bean sauce, a classic.",
            zh: "鲜面配浓郁炸酱,经典老味。",
          },
          emoji: "🍜",
        },
      ],
      mustExperience: [
        {
          fr: "Marcher sur la Grande Muraille au lever du soleil.",
          en: "Walk the Great Wall at sunrise.",
          zh: "在长城迎接日出。",
        },
        {
          fr: "Se perdre dans les hutongs à vélo, un thé à la main.",
          en: "Cycle through the hutongs with a tea in hand.",
          zh: "骑车穿胡同,茶香相伴。",
        },
        {
          fr: "Assister à un opéra de Pékin dans un théâtre traditionnel.",
          en: "Catch a Peking opera in a traditional venue.",
          zh: "在老戏楼欣赏一场京剧。",
        },
      ],
      bestMoment: {
        fr: "Fin avril à début juin et septembre-octobre, ciel net et soirées douces.",
        en: "Late April to early June and September-October: clear skies, soft evenings.",
        zh: "4 月底至 6 月初与 9-10 月,天空通透,夜风柔和。",
      },
      dayMoments: {
        morning: {
          fr: "Brume sur la Cité interdite, exercices de tai-chi au parc Jingshan.",
          en: "Mist over the Forbidden City, tai chi at Jingshan park.",
          zh: "紫禁城薄雾,景山公园的太极。",
        },
        afternoon: {
          fr: "Thé et calligraphie dans les ruelles de Nanluoguxiang.",
          en: "Tea and calligraphy in the Nanluoguxiang alleys.",
          zh: "南锣鼓巷的茶与书法。",
        },
        evening: {
          fr: "Sanlitun pour les rooftops, Wangfujing pour la street food.",
          en: "Sanlitun for rooftops, Wangfujing for street food.",
          zh: "三里屯天台,王府井小吃。",
        },
        night: {
          fr: "Lampes rouges sur la Porte de la Paix céleste, silence imposant.",
          en: "Red lanterns above Tiananmen Gate, a quiet grandeur.",
          zh: "天安门红灯笼下的肃穆夜色。",
        },
      },
      pitfalls: [
        {
          fr: "Sous-estimer la pollution en hiver : prévoir un masque FFP2.",
          en: "Underestimating winter smog: bring an FFP2 mask.",
          zh: "低估冬季雾霾,请备 FFP2 口罩。",
        },
        {
          fr: "Réserver la Grande Muraille en haute saison : Mutianyu sature dès 10h.",
          en: "Booking the Great Wall too late: Mutianyu fills up by 10am.",
          zh: "长城预约要早,慕田峪 10 点已挤满。",
        },
        {
          fr: "Croire qu'on visite la Cité interdite en 1h : compter 3h minimum.",
          en: "Thinking the Forbidden City takes an hour: plan three minimum.",
          zh: "别低估紫禁城,至少留三小时。",
        },
      ],
    },
    pointsOfInterest: [
      {
        slug: "forbidden-city",
        name: { fr: "Cité interdite", en: "Forbidden City", zh: "紫禁城" },
        category: "monument",
        coordinates: { lat: 39.9163, lng: 116.397 },
        wikiTitle: "Forbidden City",
        description: {
          fr: "Palais impérial Ming et Qing, axe symbolique de la ville.",
          en: "Ming and Qing imperial palace, the city's symbolic axis.",
          zh: "明清两代皇宫,北京的中轴所在。",
        },
        tags: [
          { fr: "Histoire", en: "History", zh: "历史" },
          { fr: "Iconique", en: "Iconic", zh: "标志" },
        ],
      },
      {
        slug: "great-wall-mutianyu",
        name: {
          fr: "Grande Muraille (Mutianyu)",
          en: "Great Wall (Mutianyu)",
          zh: "慕田峪长城",
        },
        category: "vue",
        coordinates: { lat: 40.4319, lng: 116.5704 },
        wikiTitle: "Mutianyu",
        description: {
          fr: "Section restaurée moins touristique, panoramas vertigineux.",
          en: "Restored section, less crowded, dizzying panoramas.",
          zh: "修复段,人流较少,景色壮阔。",
        },
        tags: [
          { fr: "Trek", en: "Trek", zh: "徒步" },
          { fr: "Vue", en: "View", zh: "景观" },
        ],
      },
      {
        slug: "temple-of-heaven",
        name: { fr: "Temple du Ciel", en: "Temple of Heaven", zh: "天坛" },
        category: "monument",
        coordinates: { lat: 39.8826, lng: 116.4066 },
        wikiTitle: "Temple of Heaven",
        description: {
          fr: "Ensemble taoïste, parc vivant de tai-chi le matin.",
          en: "Taoist complex, a tai chi park at dawn.",
          zh: "道教建筑群,清晨太极胜地。",
        },
        tags: [
          { fr: "Spiritualité", en: "Spirituality", zh: "灵性" },
          { fr: "Parc", en: "Park", zh: "公园" },
        ],
      },
      {
        slug: "houhai-hutongs",
        name: {
          fr: "Houhai et hutongs",
          en: "Houhai and hutongs",
          zh: "后海与胡同",
        },
        category: "quartier",
        coordinates: { lat: 39.9381, lng: 116.3826 },
        wikiTitle: "Houhai",
        description: {
          fr: "Ruelles, lacs gelés l'hiver, bars discrets le soir.",
          en: "Alleys, frozen lakes in winter, low-key bars at night.",
          zh: "胡同与冬日冰湖,夜里安静的小酒馆。",
        },
        tags: [
          { fr: "Local", en: "Local", zh: "本地" },
          { fr: "Vélo", en: "Bike", zh: "骑行" },
        ],
      },
      {
        slug: "summer-palace",
        name: { fr: "Palais d'Été", en: "Summer Palace", zh: "颐和园" },
        category: "monument",
        coordinates: { lat: 39.9999, lng: 116.2752 },
        wikiTitle: "Summer Palace",
        description: {
          fr: "Jardins impériaux, lac Kunming, pavillons sur la colline.",
          en: "Imperial gardens, Kunming lake, hilltop pavilions.",
          zh: "皇家园林,昆明湖与山顶亭阁。",
        },
        tags: [
          { fr: "Jardins", en: "Gardens", zh: "园林" },
          { fr: "Calme", en: "Quiet", zh: "宁静" },
        ],
      },
      {
        slug: "wangfujing-market",
        name: {
          fr: "Marché de Wangfujing",
          en: "Wangfujing market",
          zh: "王府井小吃街",
        },
        category: "marche",
        coordinates: { lat: 39.9134, lng: 116.41 },
        wikiTitle: "Wangfujing",
        description: {
          fr: "Brochettes, calligraphie, animation de soirée.",
          en: "Skewers, calligraphy, evening buzz.",
          zh: "烤串、书法,夜市气氛浓厚。",
        },
        tags: [
          { fr: "Street food", en: "Street food", zh: "街头" },
          { fr: "Soirée", en: "Evening", zh: "夜晚" },
        ],
      },
    ],
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
    identity: {
      moods: ["electric", "futuristic", "vibrant"],
      pace: "fast",
      food: [
        {
          name: { fr: "Xiao long bao", en: "Xiao long bao", zh: "小笼包" },
          hint: {
            fr: "Raviolis soupe juteux, Din Tai Fung ou Jia Jia Tang Bao.",
            en: "Juicy soup dumplings: Din Tai Fung or Jia Jia Tang Bao.",
            zh: "鲜美汤包,鼎泰丰或佳家汤包。",
          },
          emoji: "🥟",
        },
        {
          name: {
            fr: "Sheng jian bao",
            en: "Sheng jian bao",
            zh: "生煎包",
          },
          hint: {
            fr: "Pains poêlés croustillants, à manger debout au comptoir.",
            en: "Pan-fried crispy buns, eaten standing at the counter.",
            zh: "底脆的生煎包,站着吃最地道。",
          },
          emoji: "🥖",
        },
        {
          name: {
            fr: "Hairy crab",
            en: "Hairy crab",
            zh: "大闸蟹",
          },
          hint: {
            fr: "Spécialité automnale, accompagnée d'un huangjiu chaud.",
            en: "Autumn specialty, paired with warm huangjiu wine.",
            zh: "秋日螃蟹配温黄酒。",
          },
          emoji: "🦀",
        },
      ],
      mustExperience: [
        {
          fr: "Voir le Bund de nuit, façades coloniales contre skyline laser.",
          en: "See the Bund at night: colonial facades against the laser skyline.",
          zh: "夜游外滩,百年洋房与浦东天际线对望。",
        },
        {
          fr: "Prendre un cocktail au sommet du Shanghai Tower.",
          en: "Sip a cocktail on top of Shanghai Tower.",
          zh: "在上海中心顶楼来杯鸡尾酒。",
        },
        {
          fr: "Flâner dans la concession française au printemps.",
          en: "Wander the French Concession in spring.",
          zh: "春日漫步法租界。",
        },
      ],
      bestMoment: {
        fr: "Mars-mai pour la douceur, octobre-novembre pour l'air sec.",
        en: "March-May for mild air, October-November for dry skies.",
        zh: "3-5 月气候宜人,10-11 月空气干爽。",
      },
      dayMoments: {
        morning: {
          fr: "Cafés indépendants à Wukang Road, croissants chinois et latte.",
          en: "Indie cafes on Wukang Road, Chinese croissants and lattes.",
          zh: "武康路独立咖啡馆,牛角包配拿铁。",
        },
        afternoon: {
          fr: "Promenade dans les jardins Yuyuan, thé à la maison de thé Huxinting.",
          en: "Stroll Yu Garden, tea at Huxinting teahouse.",
          zh: "豫园漫步,湖心亭品茶。",
        },
        evening: {
          fr: "Bund Sightseeing Tunnel ou apéritif sur un rooftop de Xintiandi.",
          en: "Bund Sightseeing Tunnel or rooftop drinks in Xintiandi.",
          zh: "外滩观光隧道或新天地天台小酌。",
        },
        night: {
          fr: "Lasers sur la Perle d'Orient, scooters silencieux et rues calmes.",
          en: "Lasers on the Oriental Pearl, silent scooters, quieted streets.",
          zh: "东方明珠的灯光,无声电瓶车,街巷静谧。",
        },
      },
      pitfalls: [
        {
          fr: "Compter sur Google Maps : préférer Amap ou Baidu Maps.",
          en: "Relying on Google Maps: use Amap or Baidu Maps instead.",
          zh: "勿迷信谷歌地图,优先高德或百度。",
        },
        {
          fr: "Sous-estimer les distances : le métro relie tout mais demande du temps.",
          en: "Underestimating distances: the metro reaches everything but takes time.",
          zh: "距离别低估,地铁四通八达但耗时。",
        },
        {
          fr: "Visiter Yu Garden un dimanche : foule étouffante.",
          en: "Visiting Yu Garden on a Sunday: oppressive crowds.",
          zh: "周日豫园人潮汹涌。",
        },
      ],
    },
    pointsOfInterest: [
      {
        slug: "the-bund",
        name: { fr: "Le Bund", en: "The Bund", zh: "外滩" },
        category: "vue",
        coordinates: { lat: 31.2397, lng: 121.4904 },
        wikiTitle: "The Bund",
        description: {
          fr: "Promenade face aux gratte-ciel illuminés du Pudong.",
          en: "Riverside walk facing the lit Pudong skyline.",
          zh: "外滩长堤,面向浦东夜景。",
        },
        tags: [
          { fr: "Skyline", en: "Skyline", zh: "天际线" },
          { fr: "Soirée", en: "Evening", zh: "夜晚" },
        ],
      },
      {
        slug: "yu-garden",
        name: { fr: "Jardin Yuyuan", en: "Yu Garden", zh: "豫园" },
        category: "monument",
        coordinates: { lat: 31.2272, lng: 121.4922 },
        wikiTitle: "Yu Garden",
        description: {
          fr: "Jardin Ming en pleine vieille ville, maison de thé Huxinting.",
          en: "Ming garden in the old town, Huxinting teahouse.",
          zh: "明代园林,湖心亭茶馆。",
        },
        tags: [
          { fr: "Jardins", en: "Gardens", zh: "园林" },
          { fr: "Thé", en: "Tea", zh: "茶" },
        ],
      },
      {
        slug: "shanghai-tower",
        name: { fr: "Shanghai Tower", en: "Shanghai Tower", zh: "上海中心大厦" },
        category: "vue",
        coordinates: { lat: 31.2336, lng: 121.5054 },
        wikiTitle: "Shanghai Tower",
        description: {
          fr: "Deuxième plus haut bâtiment du monde, observatoire 562 m.",
          en: "Second-tallest building in the world, observation deck at 562 m.",
          zh: "世界第二高建筑,562 米观景台。",
        },
        tags: [
          { fr: "Vertige", en: "Heights", zh: "高空" },
          { fr: "Photo", en: "Photo", zh: "拍照" },
        ],
      },
      {
        slug: "french-concession",
        name: {
          fr: "Concession française",
          en: "French Concession",
          zh: "法租界",
        },
        category: "quartier",
        coordinates: { lat: 31.2167, lng: 121.4571 },
        wikiTitle: "Shanghai French Concession",
        description: {
          fr: "Avenues plantées de platanes, boutiques indépendantes, cafés.",
          en: "Plane-tree avenues, indie boutiques, cafés.",
          zh: "梧桐街道,独立小店与咖啡馆。",
        },
        tags: [
          { fr: "Café", en: "Café", zh: "咖啡" },
          { fr: "Shopping", en: "Shopping", zh: "购物" },
        ],
      },
      {
        slug: "tianzifang",
        name: { fr: "Tianzifang", en: "Tianzifang", zh: "田子坊" },
        category: "quartier",
        coordinates: { lat: 31.2114, lng: 121.4683 },
        wikiTitle: "Tianzifang",
        description: {
          fr: "Lilong reconverties en ateliers et galeries.",
          en: "Lilong alleys reborn as studios and galleries.",
          zh: "里弄改造的工作室与画廊。",
        },
        tags: [
          { fr: "Art", en: "Art", zh: "艺术" },
          { fr: "Local", en: "Local", zh: "本地" },
        ],
      },
    ],
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
    identity: {
      moods: ["ancient", "spiritual", "imperial"],
      pace: "balanced",
      food: [
        {
          name: { fr: "Roujiamo", en: "Roujiamo", zh: "肉夹馍" },
          hint: {
            fr: "Burger chinois au porc braisé, le snack de rue ultime.",
            en: "Chinese burger of braised pork: the ultimate street snack.",
            zh: "酱肉夹馍,街头之王。",
          },
          emoji: "🍔",
        },
        {
          name: {
            fr: "Biang biang noodles",
            en: "Biang biang noodles",
            zh: "biangbiang 面",
          },
          hint: {
            fr: "Larges nouilles plates, sauce piquante et vinaigre noir.",
            en: "Wide flat noodles, chili sauce and black vinegar.",
            zh: "宽扁面,辣油黑醋。",
          },
          emoji: "🍝",
        },
        {
          name: { fr: "Yangrou paomo", en: "Yangrou paomo", zh: "羊肉泡馍" },
          hint: {
            fr: "Soupe d'agneau et pain effrité, plat des nuits froides.",
            en: "Lamb soup with crumbled flatbread, perfect for cold nights.",
            zh: "羊肉泡馍,寒夜暖身。",
          },
          emoji: "🍲",
        },
      ],
      mustExperience: [
        {
          fr: "Faire du vélo sur les remparts Ming au coucher du soleil.",
          en: "Cycle the Ming walls at sunset.",
          zh: "傍晚骑车环城墙。",
        },
        {
          fr: "Découvrir l'armée de terre cuite tôt le matin (avant les bus).",
          en: "Visit the Terracotta Army early (before tour buses).",
          zh: "清晨拜访兵马俑,避开旅游团。",
        },
        {
          fr: "Manger halal dans le Muslim Quarter à la tombée de la nuit.",
          en: "Eat halal in the Muslim Quarter at dusk.",
          zh: "傍晚的回民街,清真小吃飘香。",
        },
      ],
      bestMoment: {
        fr: "Octobre offre des journées dorées et des soirées fraîches idéales.",
        en: "October gives golden days and crisp evenings.",
        zh: "10 月白日金黄,夜晚清爽。",
      },
      dayMoments: {
        morning: {
          fr: "Pagode de la Grande Oie, lumière douce et touristes encore absents.",
          en: "Great Wild Goose Pagoda, soft light and few visitors yet.",
          zh: "晨光的大雁塔,游客未至。",
        },
        afternoon: {
          fr: "Calligraphes et libraires dans la Forest of Stelae.",
          en: "Calligraphers and bookshops near the Forest of Stelae.",
          zh: "碑林博物馆周边的书法与古籍。",
        },
        evening: {
          fr: "Muslim Quarter, fumée de brochettes et lampions colorés.",
          en: "Muslim Quarter, smoke from skewers, coloured lanterns.",
          zh: "回民街烟火气与彩灯。",
        },
        night: {
          fr: "Tour de la Cloche illuminée, vélo le long des remparts.",
          en: "Lit Bell Tower, late ride along the walls.",
          zh: "钟楼夜灯,城墙骑行。",
        },
      },
      pitfalls: [
        {
          fr: "Acheter les billets de l'armée de terre cuite sur place : queue d'une heure.",
          en: "Buying Terracotta Army tickets on site: an hour queue.",
          zh: "现场购票兵马俑,排队一小时。",
        },
        {
          fr: "Confondre Muslim Quarter et touristique : les vraies adresses sont en retrait.",
          en: "Confusing Muslim Quarter for touristy: real spots are tucked away.",
          zh: "回民街别只走主街,深巷才有真味。",
        },
        {
          fr: "Sous-estimer la fraîcheur des soirées d'automne.",
          en: "Underestimating autumn evening chill.",
          zh: "低估秋夜寒意。",
        },
      ],
    },
    pointsOfInterest: [
      {
        slug: "terracotta-army",
        name: {
          fr: "Armée de terre cuite",
          en: "Terracotta Army",
          zh: "兵马俑",
        },
        category: "monument",
        coordinates: { lat: 34.3848, lng: 109.2734 },
        wikiTitle: "Terracotta Army",
        description: {
          fr: "Mausolée de l'empereur Qin Shi Huang, milliers de soldats sculptés.",
          en: "Mausoleum of Emperor Qin Shi Huang, thousands of sculpted soldiers.",
          zh: "秦始皇陵兵马俑,千军万马。",
        },
        tags: [
          { fr: "UNESCO", en: "UNESCO", zh: "世遗" },
          { fr: "Histoire", en: "History", zh: "历史" },
        ],
      },
      {
        slug: "city-walls",
        name: {
          fr: "Remparts Ming",
          en: "Ming city walls",
          zh: "明代城墙",
        },
        category: "vue",
        coordinates: { lat: 34.2607, lng: 108.9415 },
        wikiTitle: "Fortifications of Xi'an",
        description: {
          fr: "14 km de remparts, à parcourir à vélo au coucher du soleil.",
          en: "14 km of walls, best cycled at sunset.",
          zh: "14 公里城墙,夕阳骑行最佳。",
        },
        tags: [
          { fr: "Vélo", en: "Bike", zh: "骑行" },
          { fr: "Sunset", en: "Sunset", zh: "日落" },
        ],
      },
      {
        slug: "muslim-quarter",
        name: {
          fr: "Muslim Quarter",
          en: "Muslim Quarter",
          zh: "回民街",
        },
        category: "marche",
        coordinates: { lat: 34.265, lng: 108.937 },
        wikiTitle: "Muslim Quarter (Xi'an)",
        description: {
          fr: "Allées halal, biangbiang, brochettes d'agneau et lampions.",
          en: "Halal alleys, biangbiang, lamb skewers and lanterns.",
          zh: "清真小吃街,biangbiang 面与羊肉串。",
        },
        tags: [
          { fr: "Halal", en: "Halal", zh: "清真" },
          { fr: "Soirée", en: "Evening", zh: "夜晚" },
        ],
      },
      {
        slug: "big-wild-goose-pagoda",
        name: {
          fr: "Pagode de la Grande Oie",
          en: "Big Wild Goose Pagoda",
          zh: "大雁塔",
        },
        category: "monument",
        coordinates: { lat: 34.2197, lng: 108.9594 },
        wikiTitle: "Giant Wild Goose Pagoda",
        description: {
          fr: "Pagode Tang, fontaines musicales le soir.",
          en: "Tang dynasty pagoda, musical fountains at night.",
          zh: "唐代大雁塔,夜间音乐喷泉。",
        },
        tags: [
          { fr: "Spirituel", en: "Spiritual", zh: "灵性" },
          { fr: "Photo", en: "Photo", zh: "拍照" },
        ],
      },
      {
        slug: "forest-of-stelae",
        name: {
          fr: "Forêt de Stèles",
          en: "Forest of Stelae",
          zh: "碑林博物馆",
        },
        category: "experience",
        coordinates: { lat: 34.2517, lng: 108.9494 },
        wikiTitle: "Stele Forest",
        description: {
          fr: "Musée de calligraphie, plus de 3000 stèles gravées.",
          en: "Calligraphy museum, over 3000 engraved stelae.",
          zh: "碑林博物馆,3000 余通石碑。",
        },
        tags: [
          { fr: "Calligraphie", en: "Calligraphy", zh: "书法" },
          { fr: "Calme", en: "Quiet", zh: "宁静" },
        ],
      },
    ],
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
    identity: {
      moods: ["cozy", "spicy", "contemplative"],
      pace: "slow",
      food: [
        {
          name: { fr: "Hotpot", en: "Hotpot", zh: "火锅" },
          hint: {
            fr: "Bouillon piquant rouge feu, soirée garantie chez Shu Jiu Xiang.",
            en: "Fiery red broth: try Shu Jiu Xiang for a memorable night.",
            zh: "麻辣红汤,推荐蜀九香。",
          },
          emoji: "🌶️",
        },
        {
          name: { fr: "Mapo tofu", en: "Mapo tofu", zh: "麻婆豆腐" },
          hint: {
            fr: "Tofu soyeux dans une sauce poivre du Sichuan, plat signature.",
            en: "Silky tofu in Sichuan pepper sauce: the signature dish.",
            zh: "嫩豆腐入麻辣酱,正宗川味。",
          },
          emoji: "🍛",
        },
        {
          name: { fr: "Dan dan noodles", en: "Dan dan noodles", zh: "担担面" },
          hint: {
            fr: "Nouilles fines, sauce sésame et porc émincé, simple et addictif.",
            en: "Thin noodles, sesame sauce, minced pork: simple and addictive.",
            zh: "细面配芝麻肉末,简单上瘾。",
          },
          emoji: "🍜",
        },
      ],
      mustExperience: [
        {
          fr: "Voir les pandas géants à Dujiangyan tôt le matin.",
          en: "See the giant pandas at Dujiangyan early morning.",
          zh: "清晨去都江堰看大熊猫。",
        },
        {
          fr: "Prendre le thé dans le parc du Peuple, ambiance locale.",
          en: "Take tea at People's Park: pure local atmosphere.",
          zh: "在人民公园喝茶,纯正本地味。",
        },
        {
          fr: "Goûter au mala lorsqu'il pleut : c'est encore meilleur.",
          en: "Eat mala in the rain: it tastes even better.",
          zh: "雨天吃麻辣,更过瘾。",
        },
      ],
      bestMoment: {
        fr: "Mars-mai et septembre-novembre. Évitez le bouillonnant été humide.",
        en: "March-May and September-November. Skip the muggy summers.",
        zh: "3-5 月与 9-11 月最佳,夏季湿热可避。",
      },
      dayMoments: {
        morning: {
          fr: "Tai-chi dans Wenshu Temple, encens et silence.",
          en: "Tai chi at Wenshu Temple, incense and quiet.",
          zh: "文殊院晨练,香烟缭绕。",
        },
        afternoon: {
          fr: "Quartiers Kuan et Zhai, snacks et démonstrations de visages changeants.",
          en: "Kuan and Zhai alleys, snacks and face-changing shows.",
          zh: "宽窄巷子小吃与变脸表演。",
        },
        evening: {
          fr: "Jinli Street au crépuscule, lampions et calligraphes.",
          en: "Jinli Street at dusk, lanterns and calligraphers.",
          zh: "锦里黄昏,灯笼与书法。",
        },
        night: {
          fr: "Hotpot tardif sur Jiuyanqiao, scooters et néons sur la rivière.",
          en: "Late-night hotpot on Jiuyanqiao, scooters and neons by the river.",
          zh: "九眼桥夜火锅,电瓶车与霓虹。",
        },
      },
      pitfalls: [
        {
          fr: "Prévoir une seule journée pandas : ajouter Dujiangyan vaut la peine.",
          en: "Planning a single panda day: Dujiangyan deserves its own trip.",
          zh: "熊猫只安排一日太赶,都江堰值得加一天。",
        },
        {
          fr: "Demander un hotpot 'pas trop épicé' : précisez le niveau exact.",
          en: "Ordering hotpot 'not too spicy': specify the exact level.",
          zh: "火锅别只说不太辣,要标明具体等级。",
        },
        {
          fr: "Sous-estimer l'humidité : le tonneau de bain de la maison de thé est culte.",
          en: "Underestimating humidity: the teahouse foot soak is iconic.",
          zh: "低估湿气,茶馆泡脚很经典。",
        },
      ],
    },
    pointsOfInterest: [
      {
        slug: "dujiangyan-pandas",
        name: {
          fr: "Base des pandas de Dujiangyan",
          en: "Dujiangyan Panda Base",
          zh: "都江堰熊猫基地",
        },
        category: "experience",
        coordinates: { lat: 30.9933, lng: 103.5856 },
        wikiTitle: "Dujiangyan",
        description: {
          fr: "Base de conservation des pandas géants, programmes de volontariat.",
          en: "Giant panda conservation base with volunteer programs.",
          zh: "大熊猫保护研究中心,可参加志愿者项目。",
        },
        tags: [
          { fr: "Pandas", en: "Pandas", zh: "熊猫" },
          { fr: "Matin", en: "Morning", zh: "清晨" },
        ],
      },
      {
        slug: "wenshu-monastery",
        name: {
          fr: "Monastère de Wenshu",
          en: "Wenshu Monastery",
          zh: "文殊院",
        },
        category: "monument",
        coordinates: { lat: 30.6789, lng: 104.0775 },
        wikiTitle: "Wenshu Monastery",
        description: {
          fr: "Plus grand monastère bouddhiste de Chengdu, salon de thé attenant.",
          en: "Chengdu's largest Buddhist monastery, with adjacent teahouse.",
          zh: "成都最大佛教寺院,旁边的茶馆值得停留。",
        },
        tags: [
          { fr: "Spirituel", en: "Spiritual", zh: "灵性" },
          { fr: "Calme", en: "Quiet", zh: "宁静" },
        ],
      },
      {
        slug: "jinli-street",
        name: { fr: "Rue Jinli", en: "Jinli Street", zh: "锦里" },
        category: "marche",
        coordinates: { lat: 30.6463, lng: 104.0521 },
        wikiTitle: "Jinli",
        description: {
          fr: "Rue piétonne traditionnelle, snacks, lampions, théâtre d'ombres.",
          en: "Traditional pedestrian street, snacks, lanterns, shadow puppets.",
          zh: "锦里步行街,小吃、灯笼与皮影戏。",
        },
        tags: [
          { fr: "Street food", en: "Street food", zh: "街头" },
          { fr: "Photo", en: "Photo", zh: "拍照" },
        ],
      },
      {
        slug: "peoples-park",
        name: {
          fr: "Parc du Peuple",
          en: "People's Park",
          zh: "人民公园",
        },
        category: "quartier",
        coordinates: { lat: 30.6633, lng: 104.0635 },
        wikiTitle: "People's Park, Chengdu",
        description: {
          fr: "Salons de thé en plein air, danses, mahjong et chansons.",
          en: "Open-air teahouses, dancing, mahjong and singing.",
          zh: "露天茶馆,舞蹈、麻将与歌声。",
        },
        tags: [
          { fr: "Local", en: "Local", zh: "本地" },
          { fr: "Thé", en: "Tea", zh: "茶" },
        ],
      },
      {
        slug: "kuan-zhai-alleys",
        name: {
          fr: "Ruelles Kuan et Zhai",
          en: "Kuan and Zhai alleys",
          zh: "宽窄巷子",
        },
        category: "quartier",
        coordinates: { lat: 30.6722, lng: 104.0526 },
        wikiTitle: "Kuan-Zhai Alley",
        description: {
          fr: "Trois ruelles Qing restaurées : cours, boutiques, démos visage changeant.",
          en: "Three restored Qing alleys: courtyards, shops, face-changing shows.",
          zh: "宽巷子、窄巷子与井巷子:庭院与变脸表演。",
        },
        tags: [
          { fr: "Architecture", en: "Architecture", zh: "建筑" },
          { fr: "Spectacle", en: "Show", zh: "表演" },
        ],
      },
    ],
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
  {
    slug: "datong",
    name: { fr: "Datong", en: "Datong", zh: "大同" },
    region: "nord",
    coordinates: { lat: 40.0768, lng: 113.301 },
    population: 3.4,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [1, 2],
    tags: ["culture", "histoire"],
    tagline: {
      fr: "Grottes de Yungang et monastère suspendu",
      en: "Yungang Grottoes and Hanging Monastery",
      zh: "云冈石窟与悬空寺",
    },
    summary: {
      fr: "Capitale de l'éphémère dynastie Wei du Nord, Datong garde les bouddhas géants de Yungang taillés dans la falaise et le vertigineux monastère suspendu de Hengshan.",
      en: "Capital of the short-lived Northern Wei dynasty, Datong holds the giant rock-cut buddhas of Yungang and the dizzying Hanging Monastery of Hengshan.",
      zh: "曾为北魏短暂之都,大同保留着云冈石窟的巨型佛雕与悬空寺的奇险风貌。",
    },
    highlights: [
      {
        name: { fr: "Grottes de Yungang", en: "Yungang Grottoes", zh: "云冈石窟" },
        kind: "monument",
      },
      {
        name: { fr: "Monastère suspendu", en: "Hanging Monastery", zh: "悬空寺" },
        kind: "monument",
      },
      {
        name: { fr: "Remparts de Datong", en: "Datong city wall", zh: "大同城墙" },
        kind: "monument",
      },
    ],
    airport: "DAT",
    wikiTitle: "Datong",
    featured: false,
  },
  {
    slug: "pingyao",
    name: { fr: "Pingyao", en: "Pingyao", zh: "平遥" },
    region: "nord",
    coordinates: { lat: 37.1856, lng: 112.1747 },
    population: 0.5,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [1, 2],
    tags: ["histoire", "culture"],
    tagline: {
      fr: "Cité fortifiée Ming-Qing préservée",
      en: "Preserved Ming-Qing walled town",
      zh: "明清完整古城",
    },
    summary: {
      fr: "Inscrite à l'Unesco, Pingyao conserve l'intégralité de ses remparts Ming, ses ruelles pavées et les premières banques privées de Chine.",
      en: "UNESCO-listed, Pingyao keeps its full Ming walls, paved alleys and China's earliest private banks intact.",
      zh: "世界文化遗产平遥古城保留完整明代城墙、青石街巷与中国早期票号。",
    },
    highlights: [
      {
        name: { fr: "Remparts de Pingyao", en: "Pingyao city wall", zh: "平遥城墙" },
        kind: "monument",
      },
      {
        name: { fr: "Vieille ville", en: "Old town", zh: "古城" },
        kind: "quartier",
      },
      {
        name: { fr: "Temple Shuanglin", en: "Shuanglin Temple", zh: "双林寺" },
        kind: "monument",
      },
    ],
    airport: "TYN",
    wikiTitle: "Pingyao",
    featured: false,
  },
  {
    slug: "luoyang",
    name: { fr: "Luoyang", en: "Luoyang", zh: "洛阳" },
    region: "centre",
    coordinates: { lat: 34.6197, lng: 112.4544 },
    population: 7.1,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [1, 2],
    tags: ["histoire", "culture"],
    tagline: {
      fr: "Capitale antique et grottes de Longmen",
      en: "Ancient capital and Longmen Grottoes",
      zh: "古都与龙门石窟",
    },
    summary: {
      fr: "Treize fois capitale dans l'histoire chinoise, Luoyang conserve les grottes bouddhiques de Longmen, sanctuaire taillé dans la falaise de la rivière Yi.",
      en: "Capital thirteen times in Chinese history, Luoyang holds the Longmen Buddhist grottoes carved into the Yi River cliffs.",
      zh: "曾十三朝古都,洛阳因依河岩开凿的龙门石窟而著称。",
    },
    highlights: [
      {
        name: { fr: "Grottes de Longmen", en: "Longmen Grottoes", zh: "龙门石窟" },
        kind: "monument",
      },
      {
        name: { fr: "Temple Shaolin", en: "Shaolin Temple", zh: "少林寺" },
        kind: "monument",
      },
      {
        name: { fr: "Festival des pivoines", en: "Peony Festival", zh: "牡丹花会" },
        kind: "nature",
      },
    ],
    airport: "LYA",
    wikiTitle: "Luoyang",
    featured: false,
  },
  {
    slug: "yangshuo",
    name: { fr: "Yangshuo", en: "Yangshuo", zh: "阳朔" },
    region: "sud",
    coordinates: { lat: 24.7783, lng: 110.4944 },
    population: 0.3,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [2, 3],
    tags: ["nature", "panorama", "aventure"],
    tagline: {
      fr: "Cœur karstique de la rivière Li",
      en: "Karst heart of the Li River",
      zh: "漓江畔的喀斯特核心",
    },
    summary: {
      fr: "À une heure de Guilin, Yangshuo concentre les paysages karstiques iconiques : croisière sur la Li, descente en bambou, escalade et villages perchés.",
      en: "An hour from Guilin, Yangshuo packs in the iconic karst landscapes: Li River cruise, bamboo rafting, climbing and hill villages.",
      zh: "距桂林一小时,阳朔汇聚了漓江游船、竹筏漂流、攀岩与山村等经典喀斯特景观。",
    },
    highlights: [
      {
        name: { fr: "Croisière sur la Li", en: "Li River cruise", zh: "漓江游船" },
        kind: "nature",
      },
      {
        name: { fr: "Pic de la Lune", en: "Moon Hill", zh: "月亮山" },
        kind: "nature",
      },
      {
        name: { fr: "Rue Ouest", en: "West Street", zh: "西街" },
        kind: "quartier",
      },
    ],
    airport: "KWL",
    wikiTitle: "Yangshuo_County",
    featured: false,
  },
  {
    slug: "lijiang",
    name: { fr: "Lijiang", en: "Lijiang", zh: "丽江" },
    region: "sud-ouest",
    coordinates: { lat: 26.8722, lng: 100.2253 },
    population: 1.3,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [2, 3],
    tags: ["culture", "nature", "histoire"],
    tagline: {
      fr: "Vieille ville Naxi entre canaux et neiges",
      en: "Naxi old town between canals and snow",
      zh: "纳西古城,水巷与雪山相伴",
    },
    summary: {
      fr: "Inscrite à l'Unesco, la vieille ville Naxi entrelace canaux, ponts de pierre et toits courbes, posés au pied du mont du Dragon de Jade.",
      en: "UNESCO-listed, the Naxi old town weaves canals, stone bridges and curved roofs at the foot of Jade Dragon Snow Mountain.",
      zh: "世界遗产纳西古城,水巷、石桥与翘檐相互交织,雪山屹立其后。",
    },
    highlights: [
      {
        name: {
          fr: "Vieille ville de Lijiang",
          en: "Lijiang Old Town",
          zh: "丽江古城",
        },
        kind: "quartier",
      },
      {
        name: {
          fr: "Mont du Dragon de Jade",
          en: "Jade Dragon Snow Mountain",
          zh: "玉龙雪山",
        },
        kind: "nature",
      },
      {
        name: { fr: "Lac Lashi", en: "Lashi Lake", zh: "拉市海" },
        kind: "nature",
      },
    ],
    airport: "LJG",
    wikiTitle: "Lijiang",
    featured: false,
  },
  {
    slug: "dali",
    name: { fr: "Dali", en: "Dali", zh: "大理" },
    region: "sud-ouest",
    coordinates: { lat: 25.6066, lng: 100.2675 },
    population: 3.4,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [1, 2],
    tags: ["culture", "nature", "histoire"],
    tagline: {
      fr: "Lac Erhai et culture Bai",
      en: "Erhai Lake and Bai culture",
      zh: "洱海与白族文化",
    },
    summary: {
      fr: "Au bord du grand lac Erhai, Dali a conservé sa vieille ville Bai, ses remparts Ming et le panorama des Trois Pagodes sous les Cangshan.",
      en: "On the shores of Erhai Lake, Dali keeps its Bai old town, Ming walls and the Three Pagodas backed by the Cangshan range.",
      zh: "洱海之畔,大理保留白族古城、明代城墙与背靠苍山的崇圣寺三塔。",
    },
    highlights: [
      {
        name: { fr: "Lac Erhai", en: "Erhai Lake", zh: "洱海" },
        kind: "nature",
      },
      {
        name: { fr: "Vieille ville de Dali", en: "Dali old town", zh: "大理古城" },
        kind: "quartier",
      },
      {
        name: { fr: "Trois Pagodes", en: "Three Pagodas", zh: "崇圣寺三塔" },
        kind: "monument",
      },
    ],
    airport: "DLU",
    wikiTitle: "Dali_City",
    featured: false,
  },
  {
    slug: "huangshan",
    name: { fr: "Huangshan", en: "Huangshan", zh: "黄山" },
    region: "est",
    coordinates: { lat: 30.1295, lng: 118.166 },
    population: 1.4,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [2, 3],
    tags: ["nature", "panorama", "aventure"],
    tagline: {
      fr: "Pics granitiques mythiques de la Montagne Jaune",
      en: "Legendary granite peaks of the Yellow Mountain",
      zh: "黄山奇峰云海",
    },
    summary: {
      fr: "Le mont Huangshan inspire la peinture chinoise depuis des siècles : pins tourmentés, mers de nuages et levers de soleil au-dessus des pics de granite.",
      en: "Mount Huangshan has inspired Chinese painting for centuries: gnarled pines, seas of clouds and sunrises above granite peaks.",
      zh: "黄山数百年来为中国画之灵感:奇松、云海与花岗岩峰间的日出。",
    },
    highlights: [
      {
        name: { fr: "Pics de Huangshan", en: "Huangshan peaks", zh: "黄山诸峰" },
        kind: "nature",
      },
      {
        name: { fr: "Village de Hongcun", en: "Hongcun village", zh: "宏村" },
        kind: "quartier",
      },
      {
        name: { fr: "Village de Xidi", en: "Xidi village", zh: "西递" },
        kind: "quartier",
      },
    ],
    airport: "TXN",
    wikiTitle: "Mount_Huangshan",
    featured: false,
  },
  {
    slug: "dunhuang",
    name: { fr: "Dunhuang", en: "Dunhuang", zh: "敦煌" },
    region: "ouest",
    coordinates: { lat: 40.1421, lng: 94.662 },
    population: 0.2,
    bestSeasons: ["ete", "automne"],
    budgetTier: "modere",
    recommendedStay: [2, 3],
    tags: ["histoire", "culture", "aventure"],
    tagline: {
      fr: "Grottes de Mogao et oasis de la route de la soie",
      en: "Mogao Caves and Silk Road oasis",
      zh: "莫高窟与丝路绿洲",
    },
    summary: {
      fr: "Oasis du désert de Gobi, Dunhuang abrite les milliers de fresques bouddhiques des grottes de Mogao et borde les dunes chantantes de Mingsha.",
      en: "A Gobi desert oasis, Dunhuang holds the thousands of Buddhist frescoes of the Mogao Caves and borders the singing sands of Mingsha.",
      zh: "戈壁绿洲敦煌,藏有莫高窟数千幅佛教壁画,毗邻鸣沙山。",
    },
    highlights: [
      {
        name: { fr: "Grottes de Mogao", en: "Mogao Caves", zh: "莫高窟" },
        kind: "monument",
      },
      {
        name: {
          fr: "Dunes de Mingsha",
          en: "Mingsha singing sand dunes",
          zh: "鸣沙山",
        },
        kind: "nature",
      },
      {
        name: { fr: "Lac du Croissant", en: "Crescent Lake", zh: "月牙泉" },
        kind: "nature",
      },
    ],
    airport: "DNH",
    wikiTitle: "Dunhuang",
    featured: false,
  },
  {
    slug: "lhassa",
    name: { fr: "Lhassa", en: "Lhasa", zh: "拉萨" },
    region: "ouest",
    coordinates: { lat: 29.652, lng: 91.1721 },
    population: 0.9,
    bestSeasons: ["printemps", "ete", "automne"],
    budgetTier: "modere",
    recommendedStay: [3, 4],
    tags: ["culture", "histoire", "panorama", "aventure"],
    tagline: {
      fr: "Toit du monde et palais du Potala",
      en: "Roof of the world and Potala Palace",
      zh: "世界屋脊与布达拉宫",
    },
    summary: {
      fr: "Capitale du Tibet à 3 650 m, Lhassa s'organise autour du palais du Potala et du Jokhang. L'accès aux étrangers nécessite un permis spécial à arranger en amont.",
      en: "Capital of Tibet at 3,650 m, Lhasa centres on the Potala Palace and Jokhang Temple. Foreign visitors need a special permit arranged in advance.",
      zh: "拉萨海拔 3650 米,以布达拉宫与大昭寺为中心。外国游客须提前办理特别许可证。",
    },
    highlights: [
      {
        name: { fr: "Palais du Potala", en: "Potala Palace", zh: "布达拉宫" },
        kind: "monument",
      },
      {
        name: { fr: "Temple du Jokhang", en: "Jokhang Temple", zh: "大昭寺" },
        kind: "monument",
      },
      {
        name: { fr: "Quartier du Barkhor", en: "Barkhor", zh: "八廓街" },
        kind: "quartier",
      },
    ],
    airport: "LXA",
    wikiTitle: "Lhasa",
    featured: false,
  },
  {
    slug: "zhangjiajie",
    name: { fr: "Zhangjiajie", en: "Zhangjiajie", zh: "张家界" },
    region: "centre",
    coordinates: { lat: 29.117, lng: 110.479 },
    population: 1.5,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "modere",
    recommendedStay: [2, 3],
    tags: ["nature", "panorama", "aventure"],
    tagline: {
      fr: "Piliers de grès et brumes du Wulingyuan",
      en: "Sandstone pillars and Wulingyuan mists",
      zh: "武陵源砂岩石柱与云海",
    },
    summary: {
      fr: "Le parc national de Zhangjiajie a inspiré les montagnes flottantes d'Avatar. Sentiers vertigineux, téléphérique et pont de verre.",
      en: "Zhangjiajie National Forest Park inspired Avatar's floating mountains. Vertiginous trails, cable cars and glass bridge.",
      zh: "张家界国家森林公园,《阿凡达》悬浮山的灵感地。栈道、索道与玻璃桥。",
    },
    highlights: [
      {
        name: {
          fr: "Pilier Avatar Hallelujah",
          en: "Avatar Hallelujah Mountain",
          zh: "阿凡达哈利路亚山",
        },
        kind: "nature",
      },
      {
        name: {
          fr: "Pont de verre du Grand Canyon",
          en: "Glass Bridge",
          zh: "大峡谷玻璃桥",
        },
        kind: "nature",
      },
      {
        name: {
          fr: "Mont Tianzi",
          en: "Tianzi Mountain",
          zh: "天子山",
        },
        kind: "nature",
      },
    ],
    airport: "DYG",
    wikiTitle: "Zhangjiajie National Forest Park",
    featured: false,
  },
  {
    slug: "fenghuang",
    name: { fr: "Fenghuang", en: "Fenghuang", zh: "凤凰古城" },
    region: "centre",
    coordinates: { lat: 27.948, lng: 109.594 },
    population: 0.37,
    bestSeasons: ["printemps", "automne"],
    budgetTier: "eco",
    recommendedStay: [1, 2],
    tags: ["culture", "histoire", "panorama"],
    tagline: {
      fr: "Cité ancienne au bord de la rivière Tuojiang",
      en: "Ancient town along the Tuojiang river",
      zh: "沱江畔的湘西古城",
    },
    summary: {
      fr: "Maisons sur pilotis Miao, ruelles pavées, lampions le soir. La nuit, la rivière reflète les façades comme une scène de film.",
      en: "Miao stilt houses, cobbled lanes, lanterns at night. The river mirrors the facades like a film set.",
      zh: "苗族吊脚楼,石板小巷,夜晚灯笼倒映河面如电影场景。",
    },
    highlights: [
      {
        name: {
          fr: "Tour Nord (Beimen)",
          en: "North Gate Tower",
          zh: "北门城楼",
        },
        kind: "monument",
      },
      {
        name: {
          fr: "Ponts de pierre Tuojiang",
          en: "Tuojiang stone bridges",
          zh: "沱江跳岩",
        },
        kind: "monument",
      },
      {
        name: {
          fr: "Ruelles anciennes",
          en: "Old town alleys",
          zh: "古城小巷",
        },
        kind: "quartier",
      },
    ],
    airport: "DYG",
    wikiTitle: "Fenghuang County",
    featured: false,
  },
];
