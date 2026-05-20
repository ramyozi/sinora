import type { Connection } from "./types";

/**
 * Graphe de connexions réalistes entre les 12 villes Sinora.
 * Durées et fourchettes de prix indicatives, ordre de grandeur 2025-2026.
 * Les valeurs servent le moteur de planification ; pour la réservation
 * effective, l'utilisateur sera redirigé vers les plateformes officielles.
 */
export const connections: Connection[] = [
  // Pékin — hub Nord
  {
    from: "pekin",
    to: "xian",
    mode: "hsr",
    durationHours: 5,
    distanceKm: 1200,
    priceCNY: [515, 820],
  },
  {
    from: "pekin",
    to: "shanghai",
    mode: "hsr",
    durationHours: 4.5,
    distanceKm: 1320,
    priceCNY: [553, 933],
  },
  {
    from: "pekin",
    to: "harbin",
    mode: "hsr",
    durationHours: 6,
    distanceKm: 1290,
    priceCNY: [540, 870],
  },
  {
    from: "pekin",
    to: "chengdu",
    mode: "hsr",
    durationHours: 7.5,
    distanceKm: 1850,
    priceCNY: [770, 1300],
  },
  {
    from: "pekin",
    to: "hangzhou",
    mode: "hsr",
    durationHours: 5.5,
    distanceKm: 1400,
    priceCNY: [600, 1000],
  },
  {
    from: "pekin",
    to: "hong-kong",
    mode: "hsr",
    durationHours: 9,
    distanceKm: 2440,
    priceCNY: [1080, 1850],
  },
  {
    from: "pekin",
    to: "kunming",
    mode: "flight",
    durationHours: 3.5,
    distanceKm: 2100,
    priceCNY: [800, 1500],
  },
  {
    from: "pekin",
    to: "guilin",
    mode: "flight",
    durationHours: 3,
    distanceKm: 1800,
    priceCNY: [700, 1400],
  },
  {
    from: "pekin",
    to: "kachgar",
    mode: "flight",
    durationHours: 5,
    distanceKm: 3400,
    priceCNY: [1500, 3000],
  },

  // Shanghai — hub Est
  {
    from: "shanghai",
    to: "hangzhou",
    mode: "hsr",
    durationHours: 1,
    distanceKm: 170,
    priceCNY: [73, 117],
  },
  {
    from: "shanghai",
    to: "suzhou",
    mode: "hsr",
    durationHours: 0.5,
    distanceKm: 85,
    priceCNY: [40, 65],
  },
  {
    from: "shanghai",
    to: "xian",
    mode: "hsr",
    durationHours: 6,
    distanceKm: 1400,
    priceCNY: [600, 1000],
  },
  {
    from: "shanghai",
    to: "chengdu",
    mode: "hsr",
    durationHours: 10,
    distanceKm: 2070,
    priceCNY: [850, 1450],
  },
  {
    from: "shanghai",
    to: "hong-kong",
    mode: "hsr",
    durationHours: 8,
    distanceKm: 1980,
    priceCNY: [880, 1500],
  },
  {
    from: "shanghai",
    to: "harbin",
    mode: "flight",
    durationHours: 3,
    distanceKm: 1700,
    priceCNY: [700, 1300],
  },

  // Hangzhou — Suzhou
  {
    from: "hangzhou",
    to: "suzhou",
    mode: "hsr",
    durationHours: 1.5,
    distanceKm: 200,
    priceCNY: [95, 150],
  },

  // Xi'an — porte de l'Ouest
  {
    from: "xian",
    to: "chengdu",
    mode: "hsr",
    durationHours: 3.5,
    distanceKm: 660,
    priceCNY: [263, 420],
  },
  {
    from: "xian",
    to: "chongqing",
    mode: "hsr",
    durationHours: 5,
    distanceKm: 900,
    priceCNY: [380, 620],
  },

  // Sichuan & Sud-Ouest
  {
    from: "chengdu",
    to: "chongqing",
    mode: "hsr",
    durationHours: 1.5,
    distanceKm: 300,
    priceCNY: [154, 240],
  },
  {
    from: "chengdu",
    to: "kunming",
    mode: "hsr",
    durationHours: 6.5,
    distanceKm: 850,
    priceCNY: [410, 650],
  },
  {
    from: "kunming",
    to: "guilin",
    mode: "hsr",
    durationHours: 5,
    distanceKm: 850,
    priceCNY: [380, 620],
  },

  // Sud
  {
    from: "guilin",
    to: "hong-kong",
    mode: "hsr",
    durationHours: 4,
    distanceKm: 1300,
    priceCNY: [580, 900],
  },

  // Kachgar — Xinjiang (essentiellement vol)
  {
    from: "kachgar",
    to: "kunming",
    mode: "flight",
    durationHours: 4.5,
    distanceKm: 2200,
    priceCNY: [1200, 2200],
  },
  {
    from: "kachgar",
    to: "shanghai",
    mode: "flight",
    durationHours: 6,
    distanceKm: 4000,
    priceCNY: [1800, 3500],
  },
  {
    from: "kachgar",
    to: "xian",
    mode: "flight",
    durationHours: 4,
    distanceKm: 2400,
    priceCNY: [1300, 2400],
  },

  // Datong, Pingyao, Luoyang — corridor culturel nord/centre
  {
    from: "datong",
    to: "pekin",
    mode: "hsr",
    durationHours: 1.5,
    distanceKm: 350,
    priceCNY: [170, 290],
  },
  {
    from: "datong",
    to: "pingyao",
    mode: "train",
    durationHours: 4,
    distanceKm: 450,
    priceCNY: [150, 280],
  },
  {
    from: "pingyao",
    to: "xian",
    mode: "train",
    durationHours: 3,
    distanceKm: 500,
    priceCNY: [110, 220],
  },
  {
    from: "pingyao",
    to: "pekin",
    mode: "train",
    durationHours: 5,
    distanceKm: 600,
    priceCNY: [200, 380],
  },
  {
    from: "luoyang",
    to: "xian",
    mode: "hsr",
    durationHours: 1.5,
    distanceKm: 380,
    priceCNY: [175, 280],
  },
  {
    from: "luoyang",
    to: "pekin",
    mode: "hsr",
    durationHours: 4,
    distanceKm: 800,
    priceCNY: [380, 620],
  },
  {
    from: "luoyang",
    to: "shanghai",
    mode: "hsr",
    durationHours: 6,
    distanceKm: 1100,
    priceCNY: [500, 850],
  },

  // Yangshuo — appendice de Guilin
  {
    from: "yangshuo",
    to: "guilin",
    mode: "bus",
    durationHours: 1.5,
    distanceKm: 70,
    priceCNY: [20, 35],
  },

  // Yunnan — Kunming · Dali · Lijiang
  {
    from: "lijiang",
    to: "kunming",
    mode: "hsr",
    durationHours: 3.5,
    distanceKm: 510,
    priceCNY: [220, 360],
  },
  {
    from: "lijiang",
    to: "dali",
    mode: "hsr",
    durationHours: 1.5,
    distanceKm: 165,
    priceCNY: [70, 120],
  },
  {
    from: "dali",
    to: "kunming",
    mode: "hsr",
    durationHours: 2,
    distanceKm: 330,
    priceCNY: [145, 240],
  },

  // Huangshan — couronne est
  {
    from: "huangshan",
    to: "shanghai",
    mode: "hsr",
    durationHours: 3,
    distanceKm: 470,
    priceCNY: [220, 360],
  },
  {
    from: "huangshan",
    to: "hangzhou",
    mode: "hsr",
    durationHours: 1.5,
    distanceKm: 300,
    priceCNY: [140, 230],
  },
  {
    from: "huangshan",
    to: "pekin",
    mode: "hsr",
    durationHours: 6.5,
    distanceKm: 1300,
    priceCNY: [600, 1000],
  },

  // Dunhuang — oasis de la route de la soie
  {
    from: "dunhuang",
    to: "xian",
    mode: "flight",
    durationHours: 2.5,
    distanceKm: 1700,
    priceCNY: [1000, 1800],
  },
  {
    from: "dunhuang",
    to: "kachgar",
    mode: "flight",
    durationHours: 2,
    distanceKm: 1100,
    priceCNY: [800, 1500],
  },

  // Lhassa — accès aérien principal
  {
    from: "lhassa",
    to: "chengdu",
    mode: "flight",
    durationHours: 2,
    distanceKm: 1300,
    priceCNY: [900, 1700],
  },
  {
    from: "lhassa",
    to: "pekin",
    mode: "flight",
    durationHours: 4,
    distanceKm: 2500,
    priceCNY: [1500, 2800],
  },
  {
    from: "lhassa",
    to: "xian",
    mode: "flight",
    durationHours: 3,
    distanceKm: 1900,
    priceCNY: [1100, 2100],
  },
];
