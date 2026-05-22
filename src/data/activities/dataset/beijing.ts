import type { Activity } from "../types";

// ============================================================================
// Activites - Pekin (citySlug: "pekin")
// Dataset editorial. Architecture prevue pour 100+ entrees par ville ; ce
// premier lot couvre les experiences signature de la capitale.
// ============================================================================

export const beijingActivities: Activity[] = [
  {
    slug: "mutianyu-great-wall-hike",
    title: {
      fr: "Randonnee sur la Grande Muraille a Mutianyu",
      en: "Great Wall hike at Mutianyu",
      zh: "慕田峪长城徒步",
    },
    summary: {
      fr: "Le troncon le plus spectaculaire et le moins bonde, entre tours de guet et collines boisees.",
      en: "The most scenic, least crowded stretch, winding between watchtowers and wooded hills.",
      zh: "最壮观且人流较少的一段长城,蜿蜒于敌楼与林木山丘之间。",
    },
    longDescription: {
      fr: "Mutianyu deroule pres de 2 km de remparts restaures sur une crete forestiere a 70 km de Pekin. Vingt-deux tours de guet ponctuent la marche ; la pente est franche par endroits mais des telecabines evitent la montee initiale. Loin de la foule de Badaling, on prend le temps d'ecouter le vent dans les pins et de photographier la muraille qui ondule jusqu'a l'horizon.",
      en: "Mutianyu unrolls nearly 2 km of restored ramparts along a forested ridge 70 km from Beijing. Twenty-two watchtowers punctuate the walk; the gradient is sharp in places but a cable car skips the initial climb. Away from the Badaling crowds, you can actually hear the wind in the pines and photograph the wall rippling to the horizon.",
      zh: "慕田峪在距北京70公里的林岭上绵延近2公里的修复城墙,沿途22座敌楼。部分路段坡度较陡,但缆车可省去最初的攀登。远离八达岭的人潮,你能真正听见松涛,拍下长城起伏至天际的画面。",
    },
    citySlug: "pekin",
    district: { fr: "District de Huairou", en: "Huairou District", zh: "怀柔区" },
    coordinates: { lat: 40.4319, lng: 116.5704 },
    category: "hiking",
    subCategory: {
      fr: "Randonnee patrimoniale",
      en: "Heritage hike",
      zh: "遗产徒步",
    },
    difficulty: "moderate",
    budget: "moderate",
    duration: { minMinutes: 180, maxMinutes: 300 },
    bestTime: ["morning"],
    recommendedSeasons: ["printemps", "automne"],
    crowd: "moderate",
    touristLevel: "iconic",
    localAuthenticity: 45,
    setting: "outdoor",
    weatherSensitivity: "high",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: false,
      notes: {
        fr: "Telecabine jusqu'a la muraille, mais les remparts comportent de nombreuses marches.",
        en: "Cable car reaches the wall, but the ramparts involve many steps.",
        zh: "缆车可达城墙,但城墙段有大量台阶。",
      },
    },
    transportTips: {
      fr: "Bus 916 express depuis Dongzhimen puis navette, ou excursion organisee a la demi-journee.",
      en: "Bus 916 express from Dongzhimen then a shuttle, or a booked half-day tour.",
      zh: "东直门乘916快车再转接驳车,或参加半日游。",
    },
    openingHours: {
      fr: "7h30-17h30 (avril-octobre), 8h-17h (novembre-mars).",
      en: "7:30am-5:30pm (Apr-Oct), 8am-5pm (Nov-Mar).",
      zh: "7:30-17:30(4-10月),8:00-17:00(11-3月)。",
    },
    pricing: {
      fr: "Entree 45 CNY, telecabine 100-140 CNY aller-retour.",
      en: "Entry 45 CNY, cable car 100-140 CNY round trip.",
      zh: "门票45元,缆车往返100-140元。",
    },
    rating: 4.8,
    reviewCount: 2140,
    badges: ["must-see", "great-for-photos", "unesco"],
    coverWikiTitle: "Mutianyu",
    galleryWikiTitles: ["Great Wall of China"],
    immersion: {
      whyGo: [
        {
          fr: "Le panorama de muraille le plus photogenique pres de Pekin.",
          en: "The most photogenic stretch of wall near Beijing.",
          zh: "北京附近最上镜的长城段。",
        },
        {
          fr: "Restauration soignee mais foule bien plus legere qu'a Badaling.",
          en: "Carefully restored yet far less crowded than Badaling.",
          zh: "修复精良,人流远少于八达岭。",
        },
        {
          fr: "Une luge toboggan permet une descente ludique en fin de visite.",
          en: "A toboggan ride offers a playful way back down.",
          zh: "滑道为下山增添趣味。",
        },
      ],
      avoid: [
        {
          fr: "Les week-ends de Golden Week : meme Mutianyu sature alors.",
          en: "Golden Week weekends, when even Mutianyu fills up.",
          zh: "黄金周周末,此时慕田峪也会拥挤。",
        },
      ],
      localTip: {
        fr: "Montez en telecabine, marchez jusqu'a la tour 20, redescendez en luge : le meilleur ratio effort/vue.",
        en: "Take the cable car up, walk to tower 20, ride the toboggan down: the best effort-to-view ratio.",
        zh: "缆车上行,步行至20号敌楼,滑道下行:体力与风景的最佳平衡。",
      },
      idealMoment: {
        fr: "A l'ouverture, quand la brume matinale s'accroche encore aux cretes.",
        en: "At opening time, when morning mist still clings to the ridges.",
        zh: "开门时分,晨雾仍萦绕山脊。",
      },
      ambiance: {
        fr: "Vent dans les pins, pierre chaude, silhouette infinie de la muraille.",
        en: "Wind in the pines, warm stone, the endless silhouette of the wall.",
        zh: "松间风、暖石、无尽的长城剪影。",
      },
      perfectFor: [
        {
          fr: "Marcheurs en quete de panoramas",
          en: "Walkers chasing panoramas",
          zh: "追逐全景的徒步者",
        },
        {
          fr: "Familles avec ados",
          en: "Families with teens",
          zh: "带青少年的家庭",
        },
      ],
    },
    travelTips: [
      {
        fr: "Prevoyez de l'eau et de bonnes chaussures : les marches sont irregulieres.",
        en: "Bring water and proper shoes: the steps are uneven.",
        zh: "携带饮水和合适鞋子,台阶高低不一。",
      },
    ],
    warnings: [
      {
        fr: "Par grand vent ou verglas, certains escaliers deviennent glissants.",
        en: "In strong wind or ice, some staircases get slippery.",
        zh: "大风或结冰时,部分台阶易滑。",
      },
    ],
    reviews: [
      {
        id: "mutianyu-r1",
        author: "Sinora",
        rating: 5,
        highlight: {
          fr: "La muraille comme dans les reves, sans la cohue.",
          en: "The wall of your dreams, minus the crush.",
          zh: "梦中的长城,没有人挤人。",
        },
        body: {
          fr: "Arrives a 8h, nous avons eu trois tours de guet pour nous seuls. La lumiere rasante sur la pierre valait le reveil matinal.",
          en: "Arriving at 8am we had three watchtowers to ourselves. The low light on the stone was worth the early start.",
          zh: "8点抵达,三座敌楼仅我们独享。低角度的光线洒在石上,值得早起。",
        },
        crowdInsight: {
          fr: "Apres 11h, les groupes arrivent par la telecabine est.",
          en: "After 11am, tour groups pour in via the east cable car.",
          zh: "11点后,旅行团从东缆车涌入。",
        },
        visitedSeason: "automne",
      },
    ],
    relatedActivities: ["jingshan-sunset-viewpoint"],
    nearbySpots: ["great-wall-mutianyu"],
    recommendedForNiches: ["nature", "photography"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "forbidden-city-imperial-walk",
    title: {
      fr: "Traversee imperiale de la Cite interdite",
      en: "Imperial walk through the Forbidden City",
      zh: "故宫帝王之轴漫步",
    },
    summary: {
      fr: "Cinq siecles de pouvoir imperial le long de l'axe central, des portes pourpres aux jardins caches.",
      en: "Five centuries of imperial power along the central axis, from vermilion gates to hidden gardens.",
      zh: "沿中轴线穿越五个世纪的帝王权力,从朱红宫门到幽静庭园。",
    },
    longDescription: {
      fr: "Plus grand palais du monde, la Cite interdite aligne 980 batiments sur 72 hectares. On entre par la porte du Midi, on franchit la cour des audiences solennelles, puis on s'echappe vers les ailes laterales ou vivaient concubines et eunuques. Le jardin imperial, au nord, offre rocailles centenaires et cypres tordus avant la sortie face a la colline de charbon.",
      en: "The largest palace complex on earth, the Forbidden City lines up 980 buildings across 72 hectares. You enter through the Meridian Gate, cross the courtyard of solemn audiences, then slip into the side wings where concubines and eunuchs once lived. The northern imperial garden offers centuries-old rockeries and twisted cypresses before the exit faces Coal Hill.",
      zh: "故宫是世界最大的宫殿建筑群,72公顷内排列980座建筑。从午门入,穿过举行大朝的庭院,再转入昔日嫔妃与太监居住的侧院。北端御花园中有百年假山与盘曲古柏,出口正对煤山。",
    },
    citySlug: "pekin",
    district: { fr: "Dongcheng", en: "Dongcheng", zh: "东城区" },
    coordinates: { lat: 39.9163, lng: 116.3972 },
    category: "monument",
    subCategory: {
      fr: "Palais imperial",
      en: "Imperial palace",
      zh: "皇家宫殿",
    },
    difficulty: "easy",
    budget: "low",
    duration: { minMinutes: 180, maxMinutes: 360 },
    bestTime: ["morning", "afternoon"],
    recommendedSeasons: ["printemps", "automne", "hiver"],
    crowd: "packed",
    touristLevel: "iconic",
    localAuthenticity: 30,
    setting: "outdoor",
    weatherSensitivity: "moderate",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: true,
      notes: {
        fr: "Itineraire accessible balise ; quelques seuils de portes a franchir.",
        en: "A signed accessible route exists; a few door sills to cross.",
        zh: "设有无障碍标识路线,少数门槛需跨越。",
      },
    },
    transportTips: {
      fr: "Metro ligne 1 station Tian'anmen East, puis 10 min de marche vers la porte du Midi.",
      en: "Metro line 1 to Tiananmen East, then a 10-min walk to the Meridian Gate.",
      zh: "地铁1号线天安门东站,步行约10分钟至午门。",
    },
    openingHours: {
      fr: "8h30-17h (ferme le lundi hors jours feries).",
      en: "8:30am-5pm (closed Mondays outside public holidays).",
      zh: "8:30-17:00(周一闭馆,法定节假日除外)。",
    },
    pricing: {
      fr: "60 CNY (avril-octobre), 40 CNY (novembre-mars). Reservation en ligne obligatoire.",
      en: "60 CNY (Apr-Oct), 40 CNY (Nov-Mar). Online booking mandatory.",
      zh: "60元(4-10月),40元(11-3月)。须在线预约。",
    },
    rating: 4.7,
    reviewCount: 5380,
    badges: ["must-see", "unesco", "great-for-photos"],
    coverWikiTitle: "Forbidden City",
    galleryWikiTitles: ["Hall of Supreme Harmony", "Palace Museum"],
    immersion: {
      whyGo: [
        {
          fr: "Le coeur symbolique de la Chine imperiale, intact depuis 1420.",
          en: "The symbolic heart of imperial China, intact since 1420.",
          zh: "中华帝制的象征核心,自1420年保存至今。",
        },
        {
          fr: "Les ailes laterales, presque desertes, revelent la vie quotidienne de la cour.",
          en: "The near-empty side wings reveal the court's daily life.",
          zh: "几乎无人的侧院,揭示宫廷日常生活。",
        },
      ],
      avoid: [
        {
          fr: "Suivre uniquement l'axe central : c'est la ou se concentre toute la foule.",
          en: "Sticking only to the central axis, where the entire crowd funnels.",
          zh: "只走中轴线,人潮全聚于此。",
        },
      ],
      localTip: {
        fr: "Reservez le premier creneau et filez vers l'ouest : les Six Palais de l'Ouest se visitent au calme.",
        en: "Book the first slot and head west: the Six Western Palaces stay calm.",
        zh: "预约首个时段并先往西,西六宫格外清静。",
      },
      idealMoment: {
        fr: "Une matinee d'hiver sous la neige, quand les toits d'or tranchent sur le blanc.",
        en: "A snowy winter morning, when the golden roofs cut against the white.",
        zh: "雪后的冬日清晨,金顶映衬白雪。",
      },
      ambiance: {
        fr: "Pierre pourpre, silence des cours immenses, echo de cinq dynasties.",
        en: "Vermilion stone, the silence of vast courtyards, the echo of five dynasties.",
        zh: "朱红宫墙、空旷庭院的静谧、五朝的回响。",
      },
      perfectFor: [
        {
          fr: "Passionnes d'histoire",
          en: "History lovers",
          zh: "历史爱好者",
        },
        { fr: "Premiere visite a Pekin", en: "First-time Beijing visitors", zh: "首次到访北京者" },
      ],
    },
    localEtiquette: [
      {
        fr: "Ne montez pas sur les seuils de portes : ils symbolisent le passage et se contournent.",
        en: "Do not step on door sills: they symbolise passage and are stepped over.",
        zh: "勿踩门槛,门槛象征通道,应跨过。",
      },
    ],
    warnings: [
      {
        fr: "Billets souvent epuises 3-4 jours a l'avance en haute saison.",
        en: "Tickets often sell out 3-4 days ahead in peak season.",
        zh: "旺季门票常提前3-4天售罄。",
      },
    ],
    reviews: [
      {
        id: "forbidden-r1",
        author: "Sinora",
        rating: 5,
        highlight: {
          fr: "Immense, ecrasant, inoubliable.",
          en: "Vast, overwhelming, unforgettable.",
          zh: "宏大、震撼、难忘。",
        },
        body: {
          fr: "Trois heures n'ont pas suffi. Les ailes laterales, vides, donnent enfin une echelle humaine a ce palais demesure.",
          en: "Three hours were not enough. The empty side wings finally give a human scale to this colossal palace.",
          zh: "三小时仍不够。空荡的侧院终于让这座巨大宫殿有了人的尺度。",
        },
        crowdInsight: {
          fr: "L'axe central est sature de 10h a 14h ; les cours laterales restent respirables.",
          en: "The central axis is jammed from 10am to 2pm; side courts stay breathable.",
          zh: "中轴线10点至14点拥堵,侧院仍可喘息。",
        },
        localTip: {
          fr: "L'audioguide officiel se declenche tout seul piece par piece : un vrai plus.",
          en: "The official audio guide triggers room by room on its own: a real plus.",
          zh: "官方语音导览逐殿自动播放,十分实用。",
        },
        visitedSeason: "hiver",
      },
    ],
    relatedActivities: ["jingshan-sunset-viewpoint", "houhai-hutong-stroll"],
    nearbySpots: ["forbidden-city"],
    recommendedForNiches: ["photography"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "temple-of-heaven-morning-rituals",
    title: {
      fr: "Rituels du matin au Temple du Ciel",
      en: "Morning rituals at the Temple of Heaven",
      zh: "天坛晨间生活",
    },
    summary: {
      fr: "Tai-chi, calligraphie a l'eau et choeurs improvises sous les cypres centenaires.",
      en: "Tai chi, water calligraphy and impromptu choirs beneath century-old cypresses.",
      zh: "百年古柏下的太极、地书与即兴合唱。",
    },
    longDescription: {
      fr: "Avant que les touristes n'affluent vers le celebre temple circulaire, le parc du Temple du Ciel appartient aux Pekinois. Des l'aube, retraites et habitues investissent les allees : danse de l'eventail, badminton sans filet, calligraphes tracant des poemes a l'eau sur les dalles, orchestres d'instruments traditionnels. C'est la ville qui respire, gratuite et vivante.",
      en: "Before tourists flock to the famous circular temple, the Temple of Heaven park belongs to Beijingers. From dawn, retirees and regulars take over the lanes: fan dancing, netless badminton, calligraphers brushing poems in water on the flagstones, ensembles of traditional instruments. It is the city breathing, free and alive.",
      zh: "在游客涌向著名圆形祭殿之前,天坛公园属于北京人。天一亮,退休者与常客便占据林荫道:扇舞、无网羽毛球、用清水在石板上写诗的地书人、传统乐器合奏。这是城市的呼吸,免费而鲜活。",
    },
    citySlug: "pekin",
    district: { fr: "Dongcheng", en: "Dongcheng", zh: "东城区" },
    coordinates: { lat: 39.8822, lng: 116.4066 },
    category: "zen",
    subCategory: {
      fr: "Vie de parc matinale",
      en: "Morning park life",
      zh: "晨间公园生活",
    },
    difficulty: "none",
    budget: "free",
    duration: { minMinutes: 60, maxMinutes: 150 },
    bestTime: ["morning"],
    recommendedSeasons: ["printemps", "ete", "automne"],
    crowd: "quiet",
    touristLevel: "local",
    localAuthenticity: 92,
    setting: "outdoor",
    weatherSensitivity: "moderate",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: true,
      notes: {
        fr: "Allees larges et planes ; le temple lui-meme comporte des marches.",
        en: "Wide flat lanes; the temple itself has steps.",
        zh: "园路宽阔平整;祭殿本身有台阶。",
      },
    },
    transportTips: {
      fr: "Metro ligne 5 station Tiantan Dongmen, entree est du parc.",
      en: "Metro line 5 to Tiantan Dongmen, the park's east gate.",
      zh: "地铁5号线天坛东门站,公园东门。",
    },
    openingHours: {
      fr: "Parc 6h-22h ; monuments 8h-17h30.",
      en: "Park 6am-10pm; monuments 8am-5:30pm.",
      zh: "公园6:00-22:00;古建8:00-17:30。",
    },
    pricing: {
      fr: "Parc 15 CNY ; billet combine avec les monuments 34 CNY.",
      en: "Park 15 CNY; combined ticket with monuments 34 CNY.",
      zh: "公园15元;含古建联票34元。",
    },
    rating: 4.6,
    reviewCount: 870,
    badges: ["local-favorite", "free-entry", "hidden-gem"],
    coverWikiTitle: "Temple of Heaven",
    immersion: {
      whyGo: [
        {
          fr: "Voir le vrai Pekin avant l'heure des touristes.",
          en: "See the real Beijing before tourist hours.",
          zh: "在游客时段之前看见真实的北京。",
        },
        {
          fr: "Les habitants accueillent volontiers ceux qui s'essaient au tai-chi.",
          en: "Locals happily welcome anyone trying tai chi.",
          zh: "当地人乐于接纳尝试太极的人。",
        },
      ],
      localTip: {
        fr: "Le couloir des Echos, cote ouest, est l'endroit ou se rassemblent les choeurs.",
        en: "The Long Corridor on the west side is where the choirs gather.",
        zh: "西侧长廊是合唱团聚集之处。",
      },
      idealMoment: {
        fr: "Entre 7h et 9h, quand l'energie du parc est a son comble.",
        en: "Between 7am and 9am, when the park's energy peaks.",
        zh: "7点至9点,公园活力最盛。",
      },
      ambiance: {
        fr: "Erhu lointain, claquement des eventails, parfum des cypres.",
        en: "A distant erhu, the snap of fans, the scent of cypress.",
        zh: "远处二胡、扇子开合声、柏木清香。",
      },
      perfectFor: [
        { fr: "Voyageurs matinaux", en: "Early risers", zh: "早起的旅人" },
        {
          fr: "Amateurs de scenes de vie",
          en: "Lovers of everyday scenes",
          zh: "喜爱生活场景者",
        },
      ],
    },
    localEtiquette: [
      {
        fr: "Demandez d'un sourire avant de filmer les groupes : la plupart acceptent volontiers.",
        en: "Ask with a smile before filming groups: most happily agree.",
        zh: "拍摄人群前微笑示意,多数人乐意。",
      },
    ],
    reviews: [
      {
        id: "tiantan-r1",
        author: "Sinora",
        rating: 5,
        highlight: {
          fr: "Le moment le plus humain de notre sejour.",
          en: "The most human moment of our trip.",
          zh: "旅程中最有人情味的时刻。",
        },
        body: {
          fr: "Une dame nous a tendu son pinceau a eau pour essayer la calligraphie. Dix minutes plus tard, tout le groupe riait avec nous.",
          en: "A lady handed us her water brush to try calligraphy. Ten minutes later the whole group was laughing with us.",
          zh: "一位阿姨递来水笔让我们尝试地书。十分钟后,整群人都和我们一起笑。",
        },
        visitedSeason: "printemps",
      },
    ],
    relatedActivities: ["forbidden-city-imperial-walk"],
    nearbySpots: ["temple-of-heaven"],
    recommendedForNiches: ["calm", "spiritual"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "houhai-hutong-stroll",
    title: {
      fr: "Flanerie dans les hutongs de Houhai",
      en: "Hutong stroll around Houhai",
      zh: "后海胡同漫步",
    },
    summary: {
      fr: "Ruelles grises, cours carrees et lac borde de saules au coeur du vieux Pekin.",
      en: "Grey lanes, courtyard homes and a willow-lined lake at the heart of old Beijing.",
      zh: "老北京中心的灰墙小巷、四合院与垂柳环湖。",
    },
    longDescription: {
      fr: "Autour du lac Houhai, le lacis de hutongs garde la trame du Pekin des Ming. On y croise des cours carrees aux portes peintes, des marchands de yaourt en pot de gres, des joueurs de cartes a l'ombre. Le soir, les berges s'animent de cafes et de bars discrets. Une balade a pied, ou en pousse-pousse, qui raconte la ville a hauteur d'habitant.",
      en: "Around Houhai lake, the maze of hutongs preserves the layout of Ming-era Beijing. You pass courtyard homes with painted gates, vendors selling yoghurt in stoneware pots, card players in the shade. By evening the banks come alive with cafes and low-key bars. A walk, or rickshaw ride, that tells the city at residents' eye level.",
      zh: "后海一带的胡同迷宫保留了明代北京的肌理。沿途是彩绘院门的四合院、卖陶罐酸奶的小贩、树荫下打牌的人。入夜后湖岸的咖啡馆与小酒吧热闹起来。步行或乘三轮车,以居民的视角讲述这座城。",
    },
    citySlug: "pekin",
    district: { fr: "Xicheng", en: "Xicheng", zh: "西城区" },
    coordinates: { lat: 39.9407, lng: 116.3836 },
    category: "historic-quarter",
    subCategory: {
      fr: "Quartier de ruelles",
      en: "Lane neighbourhood",
      zh: "胡同街区",
    },
    difficulty: "easy",
    budget: "free",
    duration: { minMinutes: 90, maxMinutes: 180 },
    bestTime: ["afternoon", "evening"],
    recommendedSeasons: ["printemps", "ete", "automne"],
    crowd: "moderate",
    touristLevel: "mixed",
    localAuthenticity: 70,
    setting: "outdoor",
    weatherSensitivity: "moderate",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: true,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: true,
      notes: {
        fr: "Ruelles plates et pavees ; quelques passages etroits.",
        en: "Flat paved lanes; a few narrow passages.",
        zh: "巷道平坦铺石,少数路段狭窄。",
      },
    },
    transportTips: {
      fr: "Metro ligne 8 station Shichahai, sortie A2.",
      en: "Metro line 8 to Shichahai, exit A2.",
      zh: "地铁8号线什刹海站,A2出口。",
    },
    openingHours: {
      fr: "Acces libre en permanence ; commerces 10h-minuit.",
      en: "Open access at all times; shops 10am-midnight.",
      zh: "全天开放;商铺10:00-24:00。",
    },
    pricing: {
      fr: "Gratuit ; pousse-pousse 60-100 CNY le circuit.",
      en: "Free; rickshaw tour 60-100 CNY.",
      zh: "免费;三轮车游览60-100元。",
    },
    rating: 4.5,
    reviewCount: 1320,
    badges: ["local-favorite", "free-entry", "night-owl"],
    coverWikiTitle: "Houhai",
    immersion: {
      whyGo: [
        {
          fr: "Le dernier grand tissu de hutongs encore habite du centre.",
          en: "The last large hutong fabric still lived in downtown.",
          zh: "市中心最后一片仍有人居住的大片胡同。",
        },
        {
          fr: "Deux ambiances en une : ruelles calmes le jour, berges festives le soir.",
          en: "Two moods in one: quiet lanes by day, festive banks by night.",
          zh: "一地两境:白日静巷,夜晚热闹湖岸。",
        },
      ],
      avoid: [
        {
          fr: "Les pousse-pousse qui gonflent le prix : fixez le tarif avant de monter.",
          en: "Rickshaws that inflate the price: agree on the fare before boarding.",
          zh: "三轮车抬价:上车前谈妥价格。",
        },
      ],
      localTip: {
        fr: "Perdez-vous volontairement vers le sud : les hutongs de Nanluoguxiang voisins sont moins touristiques en journee.",
        en: "Get lost on purpose to the south: the nearby Nanluoguxiang lanes are quieter by day.",
        zh: "刻意往南走丢:邻近的南锣鼓巷白天更清静。",
      },
      idealMoment: {
        fr: "Au crepuscule, quand les lanternes s'allument sur le lac.",
        en: "At dusk, when lanterns light up over the lake.",
        zh: "黄昏时分,湖上灯笼次第亮起。",
      },
      ambiance: {
        fr: "Brique grise, clapotis du lac, fumet de brochettes.",
        en: "Grey brick, lapping water, the waft of grilled skewers.",
        zh: "灰砖、湖水轻拍、烤串香气。",
      },
      perfectFor: [
        { fr: "Couples", en: "Couples", zh: "情侣" },
        {
          fr: "Photographes de rue",
          en: "Street photographers",
          zh: "街头摄影师",
        },
      ],
    },
    reviews: [
      {
        id: "houhai-r1",
        author: "Sinora",
        rating: 4,
        highlight: {
          fr: "Charmant le jour, festif le soir.",
          en: "Charming by day, festive by night.",
          zh: "白日迷人,夜晚欢腾。",
        },
        body: {
          fr: "On a prefere l'apres-midi : moins de monde, et les habitants vaquent encore a leurs habitudes dans les ruelles.",
          en: "We preferred the afternoon: fewer people, and residents still going about their lanes.",
          zh: "我们更喜欢下午:人少,居民仍在巷中过着日常。",
        },
        crowdInsight: {
          fr: "Les berges deviennent bruyantes apres 21h le week-end.",
          en: "The lakeside gets loud after 9pm on weekends.",
          zh: "周末21点后湖岸变得喧闹。",
        },
        visitedSeason: "automne",
      },
    ],
    relatedActivities: ["forbidden-city-imperial-walk", "wangfujing-snack-crawl"],
    nearbySpots: ["houhai-hutongs"],
    recommendedForNiches: ["photography", "calm"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "798-art-district-afternoon",
    title: {
      fr: "Apres-midi creatif au district 798",
      en: "Creative afternoon in the 798 Art District",
      zh: "798艺术区创意午后",
    },
    summary: {
      fr: "Galeries d'avant-garde dans d'anciennes usines Bauhaus reconverties.",
      en: "Avant-garde galleries inside repurposed Bauhaus-era factories.",
      zh: "包豪斯旧厂房改建的前卫画廊群。",
    },
    longDescription: {
      fr: "L'ancien complexe electronique 798, bati par des ingenieurs est-allemands, est devenu le poumon de l'art contemporain pekinois. Entre tuyauteries apparentes et slogans maoistes conserves, des dizaines de galeries, ateliers et cafes design occupent les halls. On y passe un apres-midi a deambuler sans plan, entre une expo de photographie et une sculpture monumentale en plein air.",
      en: "The former 798 electronics complex, built by East German engineers, has become the lung of Beijing's contemporary art. Among exposed pipework and preserved Maoist slogans, dozens of galleries, studios and design cafes fill the halls. Spend an afternoon wandering without a plan, between a photography show and a monumental outdoor sculpture.",
      zh: "由东德工程师建造的798电子厂区,如今成为北京当代艺术的肺。在裸露管道与保留的标语之间,数十家画廊、工作室与设计咖啡馆填满厂房。可不带计划地漫游一个下午,从一场摄影展走到一件户外巨型雕塑。",
    },
    citySlug: "pekin",
    district: { fr: "Chaoyang", en: "Chaoyang", zh: "朝阳区" },
    coordinates: { lat: 39.9847, lng: 116.4953 },
    category: "museum",
    subCategory: {
      fr: "Quartier d'art contemporain",
      en: "Contemporary art district",
      zh: "当代艺术区",
    },
    difficulty: "easy",
    budget: "low",
    duration: { minMinutes: 120, maxMinutes: 240 },
    bestTime: ["afternoon"],
    recommendedSeasons: ["printemps", "ete", "automne", "hiver"],
    crowd: "moderate",
    touristLevel: "mixed",
    localAuthenticity: 65,
    setting: "mixed",
    weatherSensitivity: "low",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: true,
    accessibility: {
      wheelchairAccessible: true,
      notes: {
        fr: "Allees plates ; la plupart des galeries sont de plain-pied.",
        en: "Flat alleys; most galleries are at ground level.",
        zh: "通道平坦,多数画廊位于一层。",
      },
    },
    transportTips: {
      fr: "Metro ligne 14 station Wangjing South, puis 15 min de marche.",
      en: "Metro line 14 to Wangjing South, then a 15-min walk.",
      zh: "地铁14号线望京南站,步行约15分钟。",
    },
    openingHours: {
      fr: "Galeries 10h-18h, beaucoup fermees le lundi.",
      en: "Galleries 10am-6pm, many closed Mondays.",
      zh: "画廊10:00-18:00,多数周一闭馆。",
    },
    pricing: {
      fr: "Acces au district gratuit ; expositions 0-80 CNY.",
      en: "District access free; exhibitions 0-80 CNY.",
      zh: "园区免费;展览0-80元。",
    },
    rating: 4.4,
    reviewCount: 960,
    badges: ["great-for-photos", "rainy-day"],
    coverWikiTitle: "798 Art Zone",
    immersion: {
      whyGo: [
        {
          fr: "Prendre le pouls de la creation chinoise actuelle.",
          en: "Take the pulse of China's current creative scene.",
          zh: "感受中国当下创作的脉搏。",
        },
        {
          fr: "Un decor industriel photogenique a chaque coin de rue.",
          en: "A photogenic industrial backdrop at every corner.",
          zh: "每个转角都是上镜的工业背景。",
        },
      ],
      localTip: {
        fr: "La galerie UCCA programme les expositions les plus ambitieuses : commencez par la.",
        en: "The UCCA gallery hosts the most ambitious shows: start there.",
        zh: "UCCA画廊举办最具野心的展览:从此处开始。",
      },
      idealMoment: {
        fr: "Un jour de pluie : tout se visite a couvert, de hall en hall.",
        en: "A rainy day: everything is visited under cover, hall to hall.",
        zh: "雨天:厂房相连,皆可室内参观。",
      },
      ambiance: {
        fr: "Beton brut, neon d'artiste, odeur de cafe torrefie.",
        en: "Raw concrete, artist neon, the smell of roasted coffee.",
        zh: "清水混凝土、艺术家霓虹、咖啡烘焙香。",
      },
      perfectFor: [
        { fr: "Amateurs d'art", en: "Art lovers", zh: "艺术爱好者" },
        {
          fr: "Voyageurs un jour de pluie",
          en: "Travellers on a rainy day",
          zh: "雨天出行者",
        },
      ],
    },
    reviews: [
      {
        id: "798-r1",
        author: "Sinora",
        rating: 4,
        highlight: {
          fr: "Un labyrinthe creatif ou l'on perd la notion du temps.",
          en: "A creative maze where you lose track of time.",
          zh: "令人忘却时间的创意迷宫。",
        },
        body: {
          fr: "Toutes les galeries ne se valent pas, mais l'atmosphere generale et les cafes compensent largement.",
          en: "Not every gallery is worth it, but the overall atmosphere and cafes more than make up for it.",
          zh: "并非每家画廊都值得,但整体氛围与咖啡馆足以弥补。",
        },
        visitedSeason: "ete",
      },
    ],
    relatedActivities: [],
    recommendedForNiches: ["photography"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "jingshan-sunset-viewpoint",
    title: {
      fr: "Coucher de soleil depuis la colline de Jingshan",
      en: "Sunset from Jingshan Hill",
      zh: "景山日落观景",
    },
    summary: {
      fr: "Le seul belvedere qui embrasse toute la Cite interdite d'un regard.",
      en: "The one belvedere that takes in the whole Forbidden City at a glance.",
      zh: "唯一可一览紫禁城全貌的制高点。",
    },
    longDescription: {
      fr: "Colline artificielle elevee avec la terre des douves du palais, Jingshan culmine a 45 m au nord de la Cite interdite. Cinq pavillons en jalonnent l'ascension ; celui du sommet offre la vue la plus celebre de Pekin : la mer de toits dores du palais, l'axe imperial filant vers le sud, et au loin la silhouette des collines de l'Ouest. Au crepuscule, la lumiere fait flamber les tuiles.",
      en: "An artificial hill raised with earth from the palace moat, Jingshan rises 45 m north of the Forbidden City. Five pavilions mark the climb; the summit one offers Beijing's most famous view: the palace's sea of golden roofs, the imperial axis running south, and the distant silhouette of the Western Hills. At dusk, the light sets the tiles ablaze.",
      zh: "景山是用宫城护城河泥土堆成的人工山,在紫禁城以北高45米。五座亭子标记登山路,山顶一座可眺望北京最著名的景色:宫殿金顶之海、向南延伸的帝王中轴、远处西山轮廓。黄昏时分,光线令琉璃瓦熊熊燃烧。",
    },
    citySlug: "pekin",
    district: { fr: "Xicheng", en: "Xicheng", zh: "西城区" },
    coordinates: { lat: 39.9281, lng: 116.3903 },
    category: "viewpoint",
    subCategory: {
      fr: "Belvedere panoramique",
      en: "Panoramic belvedere",
      zh: "全景观景台",
    },
    difficulty: "easy",
    budget: "free",
    duration: { minMinutes: 45, maxMinutes: 90 },
    bestTime: ["evening"],
    recommendedSeasons: ["printemps", "automne", "hiver"],
    crowd: "busy",
    touristLevel: "touristy",
    localAuthenticity: 55,
    setting: "outdoor",
    weatherSensitivity: "high",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: false,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: false,
      notes: {
        fr: "L'ascension se fait par des escaliers raides, sans alternative.",
        en: "The climb is by steep stairs with no alternative.",
        zh: "登顶仅有陡峭台阶,无其他通道。",
      },
    },
    transportTips: {
      fr: "Metro ligne 8 station Shichahai, ou 10 min a pied depuis la sortie nord de la Cite interdite.",
      en: "Metro line 8 to Shichahai, or a 10-min walk from the Forbidden City's north exit.",
      zh: "地铁8号线什刹海站,或从故宫北门步行10分钟。",
    },
    openingHours: {
      fr: "6h30-21h (avril-octobre), 6h30-20h (novembre-mars).",
      en: "6:30am-9pm (Apr-Oct), 6:30am-8pm (Nov-Mar).",
      zh: "6:30-21:00(4-10月),6:30-20:00(11-3月)。",
    },
    pricing: { fr: "2 CNY.", en: "2 CNY.", zh: "2元。" },
    rating: 4.7,
    reviewCount: 1640,
    badges: ["sunset-spot", "great-for-photos", "free-entry"],
    coverWikiTitle: "Jingshan Park",
    immersion: {
      whyGo: [
        {
          fr: "La photo de carte postale de la Cite interdite se prend ici.",
          en: "The postcard photo of the Forbidden City is taken here.",
          zh: "紫禁城的明信片画面在此拍下。",
        },
        {
          fr: "Une ascension courte pour une recompense immense.",
          en: "A short climb for an immense reward.",
          zh: "短短攀登,回报极大。",
        },
      ],
      avoid: [
        {
          fr: "Arriver pile a l'heure du coucher : le pavillon sommital est alors bonde.",
          en: "Arriving right at sunset, when the summit pavilion is packed.",
          zh: "恰在日落时抵达,山顶亭已挤满。",
        },
      ],
      localTip: {
        fr: "Montez 40 minutes avant le coucher pour reserver une place au garde-corps sud.",
        en: "Climb 40 minutes before sunset to claim a spot at the south railing.",
        zh: "日落前40分钟登顶,占据南侧栏杆位置。",
      },
      idealMoment: {
        fr: "Un soir d'hiver clair : l'air froid rend les toits d'or eclatants.",
        en: "A clear winter evening: cold air makes the golden roofs vivid.",
        zh: "晴朗的冬夜:冷空气令金顶格外鲜明。",
      },
      ambiance: {
        fr: "Souffle court de la montee, puis le silence devant l'horizon dore.",
        en: "Short breath from the climb, then silence before the golden horizon.",
        zh: "登顶后的微喘,继而面对金色天际的静默。",
      },
      perfectFor: [
        {
          fr: "Photographes au coucher du soleil",
          en: "Sunset photographers",
          zh: "日落摄影师",
        },
        { fr: "Couples", en: "Couples", zh: "情侣" },
      ],
    },
    reviews: [
      {
        id: "jingshan-r1",
        author: "Sinora",
        rating: 5,
        highlight: {
          fr: "Deux yuans pour la plus belle vue de Pekin.",
          en: "Two yuan for the finest view in Beijing.",
          zh: "两元钱,北京最美的景。",
        },
        body: {
          fr: "On a enchaine la Cite interdite et Jingshan : voir d'en haut ce que l'on venait de traverser donne le vertige.",
          en: "We chained the Forbidden City and Jingshan: seeing from above what we had just crossed is dizzying.",
          zh: "我们接连游览故宫与景山:从高处俯瞰刚走过的一切,令人目眩。",
        },
        crowdInsight: {
          fr: "Le pavillon sommital se remplit 30 min avant le coucher.",
          en: "The summit pavilion fills 30 min before sunset.",
          zh: "山顶亭在日落前30分钟坐满。",
        },
        visitedSeason: "hiver",
      },
    ],
    relatedActivities: ["forbidden-city-imperial-walk"],
    recommendedForNiches: ["photography"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },

  {
    slug: "wangfujing-snack-crawl",
    title: {
      fr: "Tournee gourmande de Wangfujing",
      en: "Wangfujing snack crawl",
      zh: "王府井小吃巡礼",
    },
    summary: {
      fr: "Brochettes, raviolis vapeur et douceurs imperiales le long de la grande rue commercante.",
      en: "Skewers, steamed dumplings and imperial sweets along the great shopping street.",
      zh: "沿繁华商业街品尝串烧、蒸饺与宫廷点心。",
    },
    longDescription: {
      fr: "Wangfujing concentre, sur une artiere pietonne, l'eventail de la cuisine de rue pekinoise. On grignote des jianbing (crepe salee), des brochettes d'agneau cumines, des raviolis a la vapeur, puis on termine par une douceur imperiale : la creme de petits pois sucree ou le yaourt en pot. Une introduction simple et joyeuse a la table du Nord, ideale pour une premiere soiree.",
      en: "On a single pedestrian artery, Wangfujing condenses the full range of Beijing street food. You nibble jianbing (savoury crepe), cumin lamb skewers, steamed dumplings, then finish with an imperial sweet: sugared pea cream or pot-set yoghurt. A simple, joyful introduction to northern cooking, ideal for a first evening.",
      zh: "王府井在一条步行街上浓缩了北京街头美食的全貌。先尝煎饼、孜然羊肉串、蒸饺,再以宫廷甜点收尾:豌豆黄或陶罐酸奶。这是对北方饮食简单而欢快的入门,适合到访首夜。",
    },
    citySlug: "pekin",
    district: { fr: "Dongcheng", en: "Dongcheng", zh: "东城区" },
    coordinates: { lat: 39.9149, lng: 116.4109 },
    category: "food",
    subCategory: {
      fr: "Cuisine de rue",
      en: "Street food",
      zh: "街头小吃",
    },
    difficulty: "none",
    budget: "low",
    duration: { minMinutes: 60, maxMinutes: 120 },
    bestTime: ["evening"],
    recommendedSeasons: ["printemps", "ete", "automne", "hiver"],
    crowd: "busy",
    touristLevel: "touristy",
    localAuthenticity: 50,
    setting: "outdoor",
    weatherSensitivity: "low",
    familyFriendly: true,
    soloFriendly: true,
    nightActivity: true,
    rainCompatible: false,
    accessibility: {
      wheelchairAccessible: true,
      notes: {
        fr: "Artiere pietonne large et plane.",
        en: "Wide, flat pedestrian street.",
        zh: "步行街宽阔平坦。",
      },
    },
    transportTips: {
      fr: "Metro ligne 1 station Wangfujing, sortie A.",
      en: "Metro line 1 to Wangfujing, exit A.",
      zh: "地铁1号线王府井站,A出口。",
    },
    openingHours: {
      fr: "Echoppes 10h-22h ; affluence maximale en soiree.",
      en: "Stalls 10am-10pm; busiest in the evening.",
      zh: "摊位10:00-22:00;晚间最旺。",
    },
    pricing: {
      fr: "Comptez 40-80 CNY pour gouter cinq a six specialites.",
      en: "Budget 40-80 CNY to taste five or six specialties.",
      zh: "品尝五六样特色约需40-80元。",
    },
    rating: 4.1,
    reviewCount: 1190,
    badges: ["night-owl"],
    coverWikiTitle: "Wangfujing",
    immersion: {
      whyGo: [
        {
          fr: "Gouter large et vite, sans engagement de restaurant.",
          en: "Taste widely and quickly, with no restaurant commitment.",
          zh: "广泛而快速地品尝,无需点一桌菜。",
        },
        {
          fr: "Une rue animee, eclairee, facile pour une premiere soiree.",
          en: "A lively, well-lit street, easy for a first evening.",
          zh: "热闹明亮的街道,适合到访首夜。",
        },
      ],
      avoid: [
        {
          fr: "Les brochettes d'insectes exposees : ce sont des attrape-touristes hors de prix.",
          en: "The displayed insect skewers: overpriced tourist bait.",
          zh: "陈列的昆虫串:价高的游客噱头。",
        },
      ],
      localTip: {
        fr: "Bifurquez dans la ruelle Wangfujing Snack Street, parallele, pour des prix plus justes.",
        en: "Slip into the parallel Wangfujing Snack Street lane for fairer prices.",
        zh: "拐进平行的王府井小吃街,价格更实在。",
      },
      idealMoment: {
        fr: "Vers 19h, quand les echoppes allument leurs lampes et que la rue se remplit.",
        en: "Around 7pm, when stalls light their lamps and the street fills.",
        zh: "约19点,摊位点灯,街道热闹起来。",
      },
      ambiance: {
        fr: "Vapeur de raviolis, neon rouge, brouhaha joyeux.",
        en: "Dumpling steam, red neon, a cheerful din.",
        zh: "饺子蒸汽、红色霓虹、欢快喧嚣。",
      },
      perfectFor: [
        { fr: "Gourmands", en: "Foodies", zh: "美食爱好者" },
        {
          fr: "Voyageurs en solo",
          en: "Solo travellers",
          zh: "独自旅行者",
        },
      ],
    },
    warnings: [
      {
        fr: "Verifiez les prix avant de commander : certaines echoppes affichent flou.",
        en: "Check prices before ordering: some stalls keep them vague.",
        zh: "点单前确认价格,部分摊位标价模糊。",
      },
    ],
    reviews: [
      {
        id: "wangfujing-r1",
        author: "Sinora",
        rating: 4,
        highlight: {
          fr: "Touristique mais efficace pour une premiere fois.",
          en: "Touristy but effective for a first time.",
          zh: "略显游客化,但初次体验高效。",
        },
        body: {
          fr: "On a evite les insectes et fonce sur les jianbing et les raviolis : franchement bons et bon marche.",
          en: "We skipped the insects and went for jianbing and dumplings: genuinely good and cheap.",
          zh: "我们略过昆虫,直奔煎饼与饺子:确实好吃又便宜。",
        },
        visitedSeason: "automne",
      },
    ],
    relatedActivities: ["houhai-hutong-stroll"],
    nearbySpots: ["wangfujing-market"],
    recommendedForNiches: ["food-hunter"],
    isVerified: true,
    lastUpdated: "2026-05-22",
  },
];
