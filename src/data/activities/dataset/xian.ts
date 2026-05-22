import type { Activity } from "../types";

// ============================================================================
// Activites - Xi'an (citySlug: "xian")
// ============================================================================

export const xianActivities: Activity[] = [
  {
    slug: "terracotta-army-visit",
    title: {
      fr: "Face a l'Armee de terre cuite",
      en: "Facing the Terracotta Army",
      zh: "直面兵马俑",
    },
    summary: {
      fr: "Huit mille soldats d'argile en ordre de bataille, figes depuis 2200 ans.",
      en: "Eight thousand clay soldiers in battle order, frozen for 2,200 years.",
      zh: "八千陶俑列阵,凝固两千两百年。",
    },
    longDescription: {
      fr: "Decouverte en 1974 par des paysans creusant un puits, l'Armee de terre cuite garde le mausolee du premier empereur Qin. Trois fosses abritent pres de huit mille soldats, chevaux et chars, chacun au visage unique. La fosse 1, immense halle voutee, aligne les rangs au cordeau : un choc d'echelle et d'histoire que la photo ne prepare pas.",
      en: "Discovered in 1974 by farmers digging a well, the Terracotta Army guards the mausoleum of the first Qin emperor. Three pits hold nearly eight thousand soldiers, horses and chariots, each with a unique face. Pit 1, a vast vaulted hall, lines up the ranks string-straight: a shock of scale and history that no photo prepares you for.",
      zh: "1974年由打井的农民发现,兵马俑守护着秦始皇陵。三座坑容纳近八千名士兵、战马与战车,每张面孔各不相同。一号坑是宏大的拱顶大厅,军阵笔直排开:那种规模与历史的震撼,照片无法预先传达。",
    },
    citySlug: "xian",
    district: { fr: "District de Lintong", en: "Lintong District", zh: "临潼区" },
    coordinates: { lat: 34.3853, lng: 109.2785 },
    category: "iconic",
    subCategory: {
      fr: "Site archeologique",
      en: "Archaeological site",
      zh: "考古遗址",
    },
    difficulty: "easy",
    budget: "moderate",
    duration: { minMinutes: 150, maxMinutes: 240 },
    bestTime: ["morning"],
    recommendedSeasons: ["printemps", "automne"],
    crowd: "packed",
    touristLevel: "iconic",
    localAuthenticity: 30,
    setting: "indoor",
    weatherSensitivity: "low",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: true,
    accessibility: {
      wheelchairAccessible: true,
      notes: {
        fr: "Passerelles accessibles autour des fosses ; navettes sur le site.",
        en: "Accessible walkways around the pits; shuttles on site.",
        zh: "坑周设无障碍栈道;园区有接驳车。",
      },
    },
    transportTips: {
      fr: "Bus touristique 5 (306) depuis la gare de Xi'an, environ 1h.",
      en: "Tourist bus 5 (306) from Xi'an railway station, about 1h.",
      zh: "西安火车站乘游5(306)路,约1小时。",
    },
    openingHours: {
      fr: "8h30-17h30 (mi-mars a mi-novembre), 8h30-17h le reste de l'annee.",
      en: "8:30am-5:30pm (mid-Mar to mid-Nov), 8:30am-5pm otherwise.",
      zh: "8:30-17:30(3月中至11月中),其余时段8:30-17:00。",
    },
    pricing: {
      fr: "120 CNY ; reservation en ligne obligatoire.",
      en: "120 CNY; online booking mandatory.",
      zh: "120元;须在线预约。",
    },
    rating: 4.7,
    reviewCount: 4480,
    badges: ["must-see", "unesco", "rainy-day"],
    coverWikiTitle: "Terracotta Army",
    galleryWikiTitles: ["Mausoleum of the First Qin Emperor"],
    immersion: {
      whyGo: [
        {
          fr: "L'une des plus grandes decouvertes archeologiques du XXe siecle.",
          en: "One of the greatest archaeological discoveries of the 20th century.",
          zh: "20世纪最伟大的考古发现之一。",
        },
        {
          fr: "Chaque visage de soldat est unique : un detail vertigineux a hauteur d'homme.",
          en: "Every soldier's face is unique: a dizzying detail at human scale.",
          zh: "每名士兵面孔各异:人尺度上令人目眩的细节。",
        },
      ],
      avoid: [
        {
          fr: "Commencer par la fosse 1 : gardez-la pour la fin, en apotheose.",
          en: "Starting with Pit 1: save it for last, as the climax.",
          zh: "先看一号坑:留到最后,作为高潮。",
        },
      ],
      localTip: {
        fr: "Visitez les fosses 2 et 3, puis le musee, et terminez par la fosse 1 a l'heure du dejeuner, plus calme.",
        en: "See Pits 2 and 3, then the museum, and finish with Pit 1 at lunchtime, when it is calmer.",
        zh: "先看二、三号坑与博物馆,午餐时段再看较清静的一号坑。",
      },
      idealMoment: {
        fr: "A l'ouverture ou vers 12h30, les deux creux de frequentation.",
        en: "At opening or around 12:30pm, the two attendance lulls.",
        zh: "开馆时或约12:30,两个人流低谷。",
      },
      ambiance: {
        fr: "Halle voutee, silence respectueux, poussiere d'argile millenaire.",
        en: "A vaulted hall, respectful silence, the dust of millennial clay.",
        zh: "拱顶大厅、肃穆静默、千年陶土之尘。",
      },
      perfectFor: [
        { fr: "Passionnes d'histoire", en: "History lovers", zh: "历史爱好者" },
        { fr: "Familles", en: "Families", zh: "家庭" },
      ],
    },
    warnings: [
      {
        fr: "Faux guides a l'entree : ne prenez qu'un guide officiel agree.",
        en: "Fake guides at the gate: only hire an official accredited guide.",
        zh: "入口有冒牌导游:只聘官方持证导游。",
      },
    ],
    reviews: [
      {
        id: "terracotta-r1",
        author: "Sinora",
        rating: 5,
        highlight: {
          fr: "Aucune photo ne prepare au choc d'echelle.",
          en: "No photo prepares you for the shock of scale.",
          zh: "没有照片能为这规模的震撼做好准备。",
        },
        body: {
          fr: "On a garde la fosse 1 pour la fin : entrer dans cette halle apres les deux autres, c'est un veritable crescendo.",
          en: "We saved Pit 1 for last: entering that hall after the other two is a true crescendo.",
          zh: "我们把一号坑留到最后:在另两坑之后步入那座大厅,是真正的渐强。",
        },
        crowdInsight: {
          fr: "La fosse 1 se vide nettement entre 12h et 13h30.",
          en: "Pit 1 clearly empties between noon and 1:30pm.",
          zh: "一号坑在12:00至13:30明显空旷。",
        },
        visitedSeason: "automne",
      },
    ],
    relatedActivities: ["xian-city-wall-bike-ride"],
    nearbySpots: ["terracotta-army"],
    recommendedForNiches: ["photography"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "xian-city-wall-bike-ride",
    title: {
      fr: "Tour des remparts de Xi'an a velo",
      en: "Cycling the Xi'an city wall",
      zh: "骑行西安城墙",
    },
    summary: {
      fr: "14 km de remparts Ming parcourus a velo, au-dessus de la ville.",
      en: "14 km of Ming ramparts cycled above the city.",
      zh: "骑行14公里明代城墙,凌驾城市之上。",
    },
    longDescription: {
      fr: "Xi'an conserve l'enceinte urbaine la plus complete de Chine : 14 km de remparts Ming, larges de douze metres au sommet. Les louer un velo et en faire le tour, c'est embrasser la ville ancienne d'un seul mouvement : tours de garde, douves, toits gris en contrebas, gratte-ciel a l'horizon. Une boucle d'environ 1h30, simple et exaltante.",
      en: "Xi'an keeps the most complete city wall in China: 14 km of Ming ramparts, twelve metres wide on top. Renting a bike and riding the loop means embracing the old city in one motion: guard towers, moats, grey roofs below, skyscrapers on the horizon. A loop of about 1h30, simple and exhilarating.",
      zh: "西安保有中国最完整的城垣:14公里明代城墙,顶部宽12米。租辆自行车绕行一圈,便以一个动作拥抱古城:角楼、护城河、脚下灰瓦、天际摩天楼。环线约1小时30分,简单而振奋。",
    },
    citySlug: "xian",
    district: { fr: "Centre (intra-muros)", en: "City centre (within walls)", zh: "城内中心" },
    coordinates: { lat: 34.2614, lng: 108.9418 },
    category: "transport",
    subCategory: {
      fr: "Balade a velo patrimoniale",
      en: "Heritage bike ride",
      zh: "遗产骑行",
    },
    difficulty: "easy",
    budget: "low",
    duration: { minMinutes: 90, maxMinutes: 150 },
    bestTime: ["morning", "afternoon"],
    recommendedSeasons: ["printemps", "automne"],
    crowd: "moderate",
    touristLevel: "touristy",
    localAuthenticity: 50,
    setting: "outdoor",
    weatherSensitivity: "high",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: false,
      notes: {
        fr: "Acces au sommet par des rampes ; le revetement est inegal pour un fauteuil.",
        en: "Ramps reach the top; the surface is uneven for a wheelchair.",
        zh: "坡道可达城墙顶;路面对轮椅而言不平。",
      },
    },
    transportTips: {
      fr: "Metro ligne 2 station Yongningmen (porte sud), point de location principal.",
      en: "Metro line 2 to Yongningmen (south gate), the main rental point.",
      zh: "地铁2号线永宁门站(南门),主要租车点。",
    },
    openingHours: {
      fr: "8h-19h (avril-octobre), 8h-18h (novembre-mars).",
      en: "8am-7pm (Apr-Oct), 8am-6pm (Nov-Mar).",
      zh: "8:00-19:00(4-10月),8:00-18:00(11-3月)。",
    },
    pricing: {
      fr: "Acces remparts 54 CNY ; location velo 45 CNY les 2h.",
      en: "Wall access 54 CNY; bike rental 45 CNY for 2h.",
      zh: "城墙门票54元;自行车租赁45元/2小时。",
    },
    rating: 4.6,
    reviewCount: 1920,
    badges: ["great-for-photos", "family-pick"],
    coverWikiTitle: "Fortifications of Xi'an",
    immersion: {
      whyGo: [
        {
          fr: "Aucune autre ville chinoise ne permet ce tour complet a velo.",
          en: "No other Chinese city allows this full loop by bike.",
          zh: "再无别的中国城市能这样完整骑行一圈。",
        },
        {
          fr: "Une vue plongeante constante sur la vieille ville et ses toits gris.",
          en: "A constant overhead view of the old town and its grey roofs.",
          zh: "对古城与灰瓦屋顶持续的俯瞰。",
        },
      ],
      avoid: [
        {
          fr: "Partir en plein apres-midi d'ete : aucune ombre sur les remparts.",
          en: "Setting off mid-afternoon in summer: no shade on the ramparts.",
          zh: "夏日午后出发:城墙上毫无遮荫。",
        },
      ],
      localTip: {
        fr: "Roulez dans le sens antihoraire depuis la porte sud : le vent est plus souvent dans le dos.",
        en: "Ride counter-clockwise from the south gate: the wind is more often at your back.",
        zh: "从南门逆时针骑行:风多在背后。",
      },
      idealMoment: {
        fr: "En fin d'apres-midi, quand la lumiere dore les briques.",
        en: "Late afternoon, when the light gilds the bricks.",
        zh: "傍晚时分,光线为砖石镀金。",
      },
      ambiance: {
        fr: "Cliquetis de la chaine, vent sur les creneaux, rumeur de la ville en bas.",
        en: "The click of the chain, wind over the battlements, the city's hum below.",
        zh: "链条声、城垛上的风、城下市声。",
      },
      perfectFor: [
        { fr: "Familles actives", en: "Active families", zh: "活力家庭" },
        { fr: "Couples", en: "Couples", zh: "情侣" },
      ],
    },
    reviews: [
      {
        id: "wall-r1",
        author: "Sinora",
        rating: 5,
        highlight: {
          fr: "La meilleure facon de saisir Xi'an d'un coup.",
          en: "The best way to grasp Xi'an at once.",
          zh: "一举读懂西安的最佳方式。",
        },
        body: {
          fr: "Boucle faite en 1h20 sans se presser, avec arrets photo a chaque tour de garde. Le velo est le bon choix.",
          en: "Loop done in 1h20 without rushing, with photo stops at every guard tower. The bike is the right call.",
          zh: "不赶时间1小时20分完成环线,每座角楼皆停下拍照。骑车是正确选择。",
        },
        visitedSeason: "printemps",
      },
    ],
    relatedActivities: ["terracotta-army-visit", "muslim-quarter-food-crawl"],
    nearbySpots: ["city-walls"],
    recommendedForNiches: ["photography"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "muslim-quarter-food-crawl",
    title: {
      fr: "Tournee gourmande du quartier musulman",
      en: "Muslim Quarter food crawl",
      zh: "回民街美食巡游",
    },
    summary: {
      fr: "La table hui de Xi'an : agneau, pain au cumin et nouilles tirees a la main.",
      en: "Xi'an's Hui table: lamb, cumin bread and hand-pulled noodles.",
      zh: "西安回民的餐桌:羊肉、孜然饼与手工拉面。",
    },
    longDescription: {
      fr: "Le quartier musulman, coeur de la communaute hui depuis plus de mille ans, est une enfilade de ruelles ou la cuisine se fait sous les yeux. On y goute le 'roujiamo' (sandwich d'agneau effiloche), le 'biang biang' (large nouille tiree a la main), les brochettes au cumin, les fruits secs et les douceurs au sesame. Une immersion gourmande, halal de bout en bout.",
      en: "The Muslim Quarter, heart of the Hui community for over a thousand years, is a string of lanes where cooking happens before your eyes. You taste 'roujiamo' (pulled-lamb sandwich), 'biang biang' (wide hand-pulled noodle), cumin skewers, dried fruit and sesame sweets. A delicious immersion, halal from end to end.",
      zh: "回民街是回族社区逾千年的中心,一连串小巷中烹饪就在眼前进行。你可品尝肉夹馍、biangbiang面、孜然串、干果与芝麻甜点。这是一场美味的沉浸,全程清真。",
    },
    citySlug: "xian",
    district: { fr: "Quartier musulman (Beiyuanmen)", en: "Muslim Quarter (Beiyuanmen)", zh: "回民街(北院门)" },
    coordinates: { lat: 34.2675, lng: 108.9419 },
    category: "food",
    subCategory: {
      fr: "Cuisine de rue halal",
      en: "Halal street food",
      zh: "清真街头美食",
    },
    difficulty: "none",
    budget: "low",
    duration: { minMinutes: 75, maxMinutes: 150 },
    bestTime: ["afternoon", "evening"],
    recommendedSeasons: ["printemps", "ete", "automne", "hiver"],
    crowd: "packed",
    touristLevel: "touristy",
    localAuthenticity: 65,
    setting: "outdoor",
    weatherSensitivity: "low",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: true,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: false,
      notes: {
        fr: "Ruelles tres denses et etroites, difficiles en fauteuil aux heures de pointe.",
        en: "Very dense, narrow lanes, hard for wheelchairs at peak hours.",
        zh: "巷道极密极窄,高峰时段轮椅难行。",
      },
    },
    transportTips: {
      fr: "Metro ligne 2 station Bell Tower, sortie nord-ouest puis 5 min de marche.",
      en: "Metro line 2 to Bell Tower, north-west exit then a 5-min walk.",
      zh: "地铁2号线钟楼站,西北口步行5分钟。",
    },
    openingHours: {
      fr: "Echoppes 10h-minuit ; affluence maximale 18h-21h.",
      en: "Stalls 10am-midnight; busiest 6pm-9pm.",
      zh: "摊位10:00至午夜;18:00-21:00最旺。",
    },
    pricing: {
      fr: "Comptez 50-90 CNY pour une vraie tournee de degustation.",
      en: "Budget 50-90 CNY for a proper tasting crawl.",
      zh: "尽兴试吃约需50-90元。",
    },
    rating: 4.4,
    reviewCount: 2670,
    badges: ["night-owl", "local-favorite"],
    coverWikiTitle: "Great Mosque of Xi'an",
    immersion: {
      whyGo: [
        {
          fr: "La meilleure street food halal de Chine, concentree en quelques ruelles.",
          en: "China's best halal street food, packed into a few lanes.",
          zh: "中国最好的清真街头美食,集中于数条小巷。",
        },
        {
          fr: "Voir les nouilles 'biang biang' tirees et claquees a la main.",
          en: "Watch 'biang biang' noodles pulled and slapped by hand.",
          zh: "亲眼看biangbiang面被手工拉扯、摔打。",
        },
      ],
      avoid: [
        {
          fr: "Rester sur la rue principale : les ruelles laterales sont meilleures et moins cheres.",
          en: "Staying on the main drag: the side lanes are better and cheaper.",
          zh: "只逛主街:侧巷更好且更便宜。",
        },
      ],
      localTip: {
        fr: "Enfoncez-vous dans la rue Beiyuanmen vers le nord : moins de touristes, plus de Hui.",
        en: "Push north up Beiyuanmen street: fewer tourists, more Hui locals.",
        zh: "沿北院门往北深入:游客更少,回民更多。",
      },
      idealMoment: {
        fr: "En debut de soiree, quand les grills s'allument et que la rue s'anime.",
        en: "Early evening, when the grills fire up and the street comes alive.",
        zh: "傍晚时分,烤架点燃,街道活跃起来。",
      },
      ambiance: {
        fr: "Cumin grille, martelement des nouilles, appels des marchands.",
        en: "Grilled cumin, the pounding of noodles, vendors' calls.",
        zh: "孜然焦香、面条拍案声、商贩吆喝。",
      },
      perfectFor: [
        { fr: "Gourmands", en: "Foodies", zh: "美食爱好者" },
        {
          fr: "Voyageurs en quete de halal",
          en: "Travellers seeking halal food",
          zh: "寻找清真美食的旅人",
        },
      ],
    },
    localEtiquette: [
      {
        fr: "Quartier musulman pratiquant : tenue correcte appreciee, surtout pres de la mosquee.",
        en: "A practising Muslim quarter: modest dress is appreciated, especially near the mosque.",
        zh: "回民信教街区:着装得体受欢迎,清真寺附近尤甚。",
      },
    ],
    reviews: [
      {
        id: "muslim-r1",
        author: "Sinora",
        rating: 4,
        highlight: {
          fr: "Un festin debout, du roujiamo aux nouilles biang biang.",
          en: "A standing feast, from roujiamo to biang biang noodles.",
          zh: "一场站着的盛宴,从肉夹馍到biangbiang面。",
        },
        body: {
          fr: "La rue principale est saturee, mais des qu'on bifurque, les saveurs montent d'un cran. Venez le ventre vide.",
          en: "The main street is jammed, but as soon as you turn off, flavours rise a notch. Come hungry.",
          zh: "主街拥挤,但一拐进侧巷,风味便提升一档。空腹前来。",
        },
        crowdInsight: {
          fr: "Avant 17h, la rue principale est deja praticable.",
          en: "Before 5pm the main street is already walkable.",
          zh: "17点前,主街已可顺畅通行。",
        },
        visitedSeason: "automne",
      },
    ],
    relatedActivities: ["xian-city-wall-bike-ride", "big-wild-goose-pagoda"],
    nearbySpots: ["muslim-quarter"],
    recommendedForNiches: ["food-hunter"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "big-wild-goose-pagoda",
    title: {
      fr: "Pagode de la Grande Oie sauvage",
      en: "Giant Wild Goose Pagoda",
      zh: "大雁塔",
    },
    summary: {
      fr: "Une pagode Tang du VIIe siecle, gardienne des soutras rapportes d'Inde.",
      en: "A 7th-century Tang pagoda, keeper of sutras brought from India.",
      zh: "建于7世纪的唐代佛塔,守护自印度取回的经卷。",
    },
    longDescription: {
      fr: "Erigee en 652 pour abriter les ecrits rapportes d'Inde par le moine Xuanzang, la pagode de la Grande Oie sauvage domine le sud de Xi'an de ses sept etages de brique. Le temple qui l'entoure reste actif ; au sud, une vaste place a fontaines accueille chaque soir un spectacle d'eau et de lumiere. Histoire, foi et vie urbaine s'y superposent.",
      en: "Raised in 652 to house the texts the monk Xuanzang brought from India, the Giant Wild Goose Pagoda crowns southern Xi'an with seven storeys of brick. The surrounding temple remains active; to the south, a vast fountain square hosts a nightly water-and-light show. History, faith and city life layer here.",
      zh: "大雁塔建于652年,用以收藏玄奘自印度取回的经文,七层砖塔俯瞰西安南郊。环绕的寺院至今鲜活;塔南一片宽阔的喷泉广场每晚上演水舞灯光秀。历史、信仰与城市生活在此叠合。",
    },
    citySlug: "xian",
    district: { fr: "District de Yanta", en: "Yanta District", zh: "雁塔区" },
    coordinates: { lat: 34.2228, lng: 108.9647 },
    category: "monument",
    subCategory: {
      fr: "Pagode bouddhiste",
      en: "Buddhist pagoda",
      zh: "佛塔",
    },
    difficulty: "easy",
    budget: "low",
    duration: { minMinutes: 75, maxMinutes: 150 },
    bestTime: ["afternoon", "evening"],
    recommendedSeasons: ["printemps", "automne", "hiver"],
    crowd: "busy",
    touristLevel: "touristy",
    localAuthenticity: 55,
    setting: "mixed",
    weatherSensitivity: "moderate",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: true,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: true,
      notes: {
        fr: "Enceinte et place accessibles ; la montee de la pagode se fait par des escaliers.",
        en: "Grounds and square accessible; climbing the pagoda is by stairs.",
        zh: "院落与广场无障碍;登塔须走楼梯。",
      },
    },
    transportTips: {
      fr: "Metro ligne 3 ou 4 station Big Wild Goose Pagoda.",
      en: "Metro line 3 or 4 to Big Wild Goose Pagoda.",
      zh: "地铁3或4号线大雁塔站。",
    },
    openingHours: {
      fr: "Temple 8h-17h ; spectacle de fontaines en general 20h30-21h.",
      en: "Temple 8am-5pm; fountain show usually 8:30pm-9pm.",
      zh: "寺院8:00-17:00;喷泉表演通常20:30-21:00。",
    },
    pricing: {
      fr: "Enceinte 50 CNY, montee de la pagode 30 CNY ; spectacle de fontaines gratuit.",
      en: "Grounds 50 CNY, pagoda climb 30 CNY; fountain show free.",
      zh: "院落50元,登塔30元;喷泉表演免费。",
    },
    rating: 4.4,
    reviewCount: 1510,
    badges: ["great-for-photos", "free-entry"],
    coverWikiTitle: "Giant Wild Goose Pagoda",
    immersion: {
      whyGo: [
        {
          fr: "Un monument Tang authentique, lie a l'epopee de Xuanzang.",
          en: "An authentic Tang monument, tied to the epic of Xuanzang.",
          zh: "一座真正的唐代建筑,关联玄奘的传奇。",
        },
        {
          fr: "Le spectacle de fontaines du soir, gratuit et populaire.",
          en: "The evening fountain show, free and beloved.",
          zh: "夜晚的喷泉表演,免费而受欢迎。",
        },
      ],
      localTip: {
        fr: "Visitez le temple en fin d'apres-midi, puis restez pour le spectacle de fontaines a la nuit.",
        en: "Visit the temple late afternoon, then stay for the fountain show after dark.",
        zh: "傍晚游寺,再留下观赏入夜后的喷泉表演。",
      },
      idealMoment: {
        fr: "A la tombee de la nuit, entre les lampes du temple et les jets d'eau de la place.",
        en: "At nightfall, between the temple lamps and the square's water jets.",
        zh: "入夜时分,在寺灯与广场水柱之间。",
      },
      ambiance: {
        fr: "Brique chaude, cloche de temple, musique de la fontaine au loin.",
        en: "Warm brick, a temple bell, the fountain's music in the distance.",
        zh: "暖砖、寺钟、远处喷泉的乐声。",
      },
      perfectFor: [
        { fr: "Familles", en: "Families", zh: "家庭" },
        {
          fr: "Amateurs d'histoire bouddhiste",
          en: "Lovers of Buddhist history",
          zh: "佛教历史爱好者",
        },
      ],
    },
    reviews: [
      {
        id: "goose-r1",
        author: "Sinora",
        rating: 4,
        highlight: {
          fr: "Le combo temple de jour, fontaines de nuit fonctionne tres bien.",
          en: "The day-temple, night-fountain combo works very well.",
          zh: "白日游寺、夜赏喷泉的组合非常奏效。",
        },
        body: {
          fr: "On a visite le temple vers 16h puis pique-nique sur la place en attendant le spectacle d'eau. Soiree reussie.",
          en: "We toured the temple around 4pm then picnicked on the square waiting for the water show. A fine evening.",
          zh: "我们16点左右游寺,再在广场野餐等待水秀。愉快的一晚。",
        },
        visitedSeason: "automne",
      },
    ],
    relatedActivities: ["muslim-quarter-food-crawl"],
    nearbySpots: ["big-wild-goose-pagoda"],
    recommendedForNiches: ["spiritual", "photography"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "mount-hua-day-excursion",
    title: {
      fr: "Excursion d'une journee au mont Hua",
      en: "Day excursion to Mount Hua",
      zh: "华山一日远足",
    },
    summary: {
      fr: "L'une des cinq montagnes sacrees de Chine, ses cretes vertigineuses et son sentier mythique.",
      en: "One of China's five sacred mountains, its dizzying ridges and legendary trail.",
      zh: "中国五岳之一,险峻山脊与传奇栈道。",
    },
    longDescription: {
      fr: "A deux heures de Xi'an, le mont Hua dresse cinq pics de granit relies par des aretes effilees. Telepheriques et escaliers tailles dans la roche menent aux sommets, d'ou la vue plonge sur la plaine du Wei. Le sentier le plus connu, la 'passerelle dans le ciel', longe une falaise sur des planches de bois : sensations garanties pour les randonneurs aguerris.",
      en: "Two hours from Xi'an, Mount Hua raises five granite peaks linked by knife-edge ridges. Cable cars and rock-cut stairs lead to the summits, where the view drops over the Wei plain. The best-known trail, the 'plank walk in the sky', skirts a cliff on wooden boards: guaranteed thrills for seasoned hikers.",
      zh: "距西安两小时,华山耸起五座花岗岩峰,以刀刃般的山脊相连。索道与凿岩石阶通向各峰,可俯瞰渭河平原。最著名的长空栈道沿崖铺木板而行:为资深徒步者带来十足的刺激。",
    },
    citySlug: "xian",
    district: { fr: "Huayin (province du Shaanxi)", en: "Huayin (Shaanxi province)", zh: "华阴市(陕西省)" },
    coordinates: { lat: 34.4772, lng: 110.0838 },
    category: "hiking",
    subCategory: {
      fr: "Randonnee de montagne sacree",
      en: "Sacred mountain hike",
      zh: "圣山徒步",
    },
    difficulty: "challenging",
    budget: "moderate",
    duration: { minMinutes: 480, maxMinutes: 720 },
    bestTime: ["morning"],
    recommendedSeasons: ["printemps", "automne"],
    crowd: "busy",
    touristLevel: "mixed",
    localAuthenticity: 50,
    setting: "outdoor",
    weatherSensitivity: "high",
    familyFriendly: false,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: false,
      notes: {
        fr: "Terrain de montagne escarpe ; non adapte aux fauteuils ni a la mobilite reduite.",
        en: "Steep mountain terrain; not suitable for wheelchairs or reduced mobility.",
        zh: "陡峭山地;不适合轮椅或行动不便者。",
      },
    },
    transportTips: {
      fr: "Train a grande vitesse Xi'an Nord vers Huashan Nord (30 min), puis navette.",
      en: "High-speed train from Xi'an North to Huashan North (30 min), then a shuttle.",
      zh: "高铁西安北至华山北(30分钟),再转接驳车。",
    },
    openingHours: {
      fr: "Site accessible 7h-19h ; prevoir une journee entiere.",
      en: "Site open 7am-7pm; allow a full day.",
      zh: "景区7:00-19:00开放;请预留整日。",
    },
    pricing: {
      fr: "Entree 160 CNY (haute saison) ; telepheriques 80-140 CNY chacun.",
      en: "Entry 160 CNY (peak season); cable cars 80-140 CNY each.",
      zh: "门票160元(旺季);索道每条80-140元。",
    },
    rating: 4.7,
    reviewCount: 2240,
    badges: ["great-for-photos", "off-the-beaten-path"],
    coverWikiTitle: "Mount Hua",
    immersion: {
      whyGo: [
        {
          fr: "Des panoramas de granit parmi les plus spectaculaires de Chine.",
          en: "Some of China's most spectacular granite panoramas.",
          zh: "中国最壮观的花岗岩全景之一。",
        },
        {
          fr: "La passerelle dans le ciel : un frisson rare et legendaire.",
          en: "The plank walk in the sky: a rare, legendary thrill.",
          zh: "长空栈道:罕见而传奇的刺激。",
        },
      ],
      avoid: [
        {
          fr: "Tenter les cinq pics en une journee : choisissez-en deux ou trois.",
          en: "Attempting all five peaks in a day: pick two or three.",
          zh: "一天挑战五峰:选择两三峰即可。",
        },
        {
          fr: "Monter par mauvais temps : brouillard et pluie rendent les aretes dangereuses.",
          en: "Climbing in bad weather: fog and rain make the ridges dangerous.",
          zh: "恶劣天气登山:雾雨令山脊危险。",
        },
      ],
      localTip: {
        fr: "Montez en telecabine au pic nord, randonnez vers les pics est et sud, redescendez avant 16h.",
        en: "Cable car up to the north peak, hike to the east and south peaks, descend before 4pm.",
        zh: "乘索道上北峰,徒步至东峰、南峰,16点前下山。",
      },
      idealMoment: {
        fr: "Un matin clair d'automne, avant que la brume de l'apres-midi ne monte.",
        en: "A clear autumn morning, before the afternoon haze rises.",
        zh: "晴朗的秋日清晨,趁午后雾气未起。",
      },
      ambiance: {
        fr: "Granit froid, vide sous les planches, vent des cretes.",
        en: "Cold granite, the void beneath the planks, ridge wind.",
        zh: "冰冷花岗岩、栈道下的虚空、山脊之风。",
      },
      perfectFor: [
        {
          fr: "Randonneurs aguerris",
          en: "Seasoned hikers",
          zh: "资深徒步者",
        },
        {
          fr: "Chercheurs de sensations",
          en: "Thrill seekers",
          zh: "寻求刺激者",
        },
      ],
    },
    warnings: [
      {
        fr: "La passerelle dans le ciel exige un harnais et n'est pas pour les sujets au vertige.",
        en: "The plank walk requires a harness and is not for those afraid of heights.",
        zh: "长空栈道须系安全带,恐高者不宜。",
      },
      {
        fr: "Verifiez la meteo la veille : le site ferme les sentiers exposes par grand vent.",
        en: "Check the forecast the day before: the site closes exposed trails in high wind.",
        zh: "提前一天查看天气:大风时景区关闭暴露栈道。",
      },
    ],
    reviews: [
      {
        id: "huashan-r1",
        author: "Sinora",
        rating: 5,
        highlight: {
          fr: "Eprouvant, vertigineux, inoubliable.",
          en: "Demanding, dizzying, unforgettable.",
          zh: "艰辛、令人目眩、难忘。",
        },
        body: {
          fr: "Une vraie journee de montagne. On a fait trois pics sans se presser ; les jambes s'en souviennent encore.",
          en: "A real mountain day. We did three peaks without rushing; our legs still remember.",
          zh: "真正的登山一日。我们不赶时间登了三峰;双腿至今记得。",
        },
        crowdInsight: {
          fr: "La file du telepherique nord explose apres 10h : partez du premier train.",
          en: "The north cable car queue explodes after 10am: take the first train.",
          zh: "北峰索道排队在10点后暴增:乘首班车。",
        },
        visitedSeason: "automne",
      },
    ],
    relatedActivities: ["xian-city-wall-bike-ride"],
    recommendedForNiches: ["nature", "photography", "backpacker"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "shaanxi-history-museum",
    title: {
      fr: "Musee d'histoire du Shaanxi",
      en: "Shaanxi History Museum",
      zh: "陕西历史博物馆",
    },
    summary: {
      fr: "Un parcours en or, bronze et fresques, de la prehistoire a la dynastie Tang.",
      en: "A journey through gold, bronze and frescoes, from prehistory to the Tang.",
      zh: "一段穿越金器、青铜与壁画的旅程,自史前至唐代。",
    },
    longDescription: {
      fr: "Le musee d'histoire du Shaanxi raconte le berceau de la civilisation chinoise, region de treize dynasties imperiales. Bronzes rituels, sceaux d'or, ceramiques sancai aux trois couleurs, fresques de tombes Tang : la collection deroule plus d'un million d'annees. Gratuit mais a quota, il se merite par une reservation anticipee et une matinee calme.",
      en: "The Shaanxi History Museum tells the cradle of Chinese civilisation, a region of thirteen imperial dynasties. Ritual bronzes, gold seals, three-colour sancai ceramics, Tang tomb frescoes: the collection unfurls over a million years. Free but capped, it is earned with an early booking and a quiet morning.",
      zh: "陕西历史博物馆讲述中华文明的摇篮,这一地区曾是十三朝古都。礼器青铜、黄金印玺、三彩陶瓷、唐墓壁画:藏品铺展逾百万年。免费但限额,需提前预约并选一个清静的上午。",
    },
    citySlug: "xian",
    district: { fr: "District de Yanta", en: "Yanta District", zh: "雁塔区" },
    coordinates: { lat: 34.2219, lng: 108.9486 },
    category: "museum",
    subCategory: {
      fr: "Musee d'histoire",
      en: "History museum",
      zh: "历史博物馆",
    },
    difficulty: "easy",
    budget: "free",
    duration: { minMinutes: 120, maxMinutes: 210 },
    bestTime: ["morning"],
    recommendedSeasons: ["printemps", "ete", "automne", "hiver"],
    crowd: "busy",
    touristLevel: "mixed",
    localAuthenticity: 60,
    setting: "indoor",
    weatherSensitivity: "none",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: true,
    accessibility: {
      wheelchairAccessible: true,
      notes: {
        fr: "Musee entierement accessible, ascenseurs entre les niveaux.",
        en: "Fully accessible museum, elevators between floors.",
        zh: "博物馆全程无障碍,各层设电梯。",
      },
    },
    transportTips: {
      fr: "Metro ligne 2 station Xiaozhai, puis 12 min de marche.",
      en: "Metro line 2 to Xiaozhai, then a 12-min walk.",
      zh: "地铁2号线小寨站,步行约12分钟。",
    },
    openingHours: {
      fr: "9h-17h30 (ferme le lundi) ; derniere entree 16h.",
      en: "9am-5:30pm (closed Mondays); last entry 4pm.",
      zh: "9:00-17:30(周一闭馆);最后入场16:00。",
    },
    pricing: {
      fr: "Collection permanente gratuite (reservation obligatoire) ; expositions speciales 30 CNY.",
      en: "Permanent collection free (booking mandatory); special exhibitions 30 CNY.",
      zh: "常设展免费(须预约);特展30元。",
    },
    rating: 4.6,
    reviewCount: 1340,
    badges: ["rainy-day", "free-entry"],
    coverWikiTitle: "Shaanxi History Museum",
    immersion: {
      whyGo: [
        {
          fr: "Mettre en perspective tout ce que l'on voit a Xi'an, des Qin aux Tang.",
          en: "Put everything you see in Xi'an in perspective, from the Qin to the Tang.",
          zh: "为在西安所见的一切提供背景,从秦到唐。",
        },
        {
          fr: "Une collection de bronzes et de fresques de premier plan mondial.",
          en: "A world-class collection of bronzes and frescoes.",
          zh: "世界一流的青铜与壁画藏品。",
        },
      ],
      avoid: [
        {
          fr: "Venir sans reservation : le quota gratuit part plusieurs jours a l'avance.",
          en: "Coming without a booking: the free quota goes days ahead.",
          zh: "未预约前来:免费名额提前数日告罄。",
        },
      ],
      localTip: {
        fr: "Visitez-le en debut de sejour : tout le reste de Xi'an se lit ensuite mieux.",
        en: "Visit early in your stay: the rest of Xi'an reads better afterwards.",
        zh: "在行程之初参观:此后西安的一切更易读懂。",
      },
      idealMoment: {
        fr: "A l'ouverture, ou un jour de pluie quand on cherche l'interieur.",
        en: "At opening, or on a rainy day when you want to be indoors.",
        zh: "开馆时,或雨天想待在室内之时。",
      },
      ambiance: {
        fr: "Lumiere tamisee, eclat de l'or, silence des vitrines.",
        en: "Soft light, the gleam of gold, the silence of display cases.",
        zh: "柔和灯光、黄金光泽、展柜的静默。",
      },
      perfectFor: [
        { fr: "Passionnes d'histoire", en: "History lovers", zh: "历史爱好者" },
        { fr: "Visiteurs un jour de pluie", en: "Rainy-day visitors", zh: "雨天访客" },
      ],
    },
    reviews: [
      {
        id: "shaanxi-museum-r1",
        author: "Sinora",
        rating: 5,
        highlight: {
          fr: "A faire en premier : il eclaire tout le sejour.",
          en: "Do it first: it lights up the whole stay.",
          zh: "先来这里:它点亮整趟行程。",
        },
        body: {
          fr: "Apres ce musee, l'Armee de terre cuite et les remparts ont pris une profondeur nouvelle. Reservez tot, vraiment.",
          en: "After this museum, the Terracotta Army and the walls gained new depth. Book early, truly.",
          zh: "看过这座博物馆后,兵马俑与城墙有了新的深度。务必尽早预约。",
        },
        visitedSeason: "hiver",
      },
    ],
    relatedActivities: ["terracotta-army-visit", "big-wild-goose-pagoda"],
    nearbySpots: ["forest-of-stelae"],
    recommendedForNiches: ["photography"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },
];
