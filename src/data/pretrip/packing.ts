import type { LocalizedText } from "@/data/cities/types";
import type { Season } from "@/data/cities/types";

export type PackingCategory = "essentials" | Season;

export interface PackingItem {
  slug: string;
  label: LocalizedText;
  category: PackingCategory;
  note?: LocalizedText;
}

export const packingItems: PackingItem[] = [
  // Essentiels universels
  {
    slug: "passport-copies",
    label: {
      fr: "Passeport + copies (papier et cloud)",
      en: "Passport + copies (paper and cloud)",
      zh: "护照与复印件(纸质和云端)",
    },
    category: "essentials",
  },
  {
    slug: "power-adapter",
    label: {
      fr: "Adaptateur de prise (type A/I)",
      en: "Power adapter (type A/I)",
      zh: "电源转换器(A/I 型)",
    },
    category: "essentials",
  },
  {
    slug: "powerbank",
    label: {
      fr: "Batterie externe (< 100 Wh en cabine)",
      en: "Power bank (< 100 Wh in cabin)",
      zh: "充电宝(随身携带,< 100 Wh)",
    },
    category: "essentials",
  },
  {
    slug: "meds",
    label: {
      fr: "Médicaments personnels + ordonnances",
      en: "Personal medication + prescriptions",
      zh: "随身药物及处方",
    },
    category: "essentials",
  },
  {
    slug: "toiletries",
    label: {
      fr: "Trousse de toilette (savon, brosse à dents)",
      en: "Toiletries (soap, toothbrush)",
      zh: "洗漱用品(肥皂、牙刷)",
    },
    category: "essentials",
    note: {
      fr: "Certains hôtels n'en fournissent plus pour raison écologique.",
      en: "Some hotels no longer provide them for environmental reasons.",
      zh: "部分酒店出于环保原因不再提供。",
    },
  },
  {
    slug: "raincoat",
    label: {
      fr: "Coupe-vent imperméable léger",
      en: "Lightweight waterproof jacket",
      zh: "轻便防水外套",
    },
    category: "essentials",
  },

  // Printemps
  {
    slug: "spring-layers",
    label: {
      fr: "Couches légères (T-shirt + pull fin)",
      en: "Light layers (T-shirt + thin sweater)",
      zh: "轻便分层(T 恤 + 薄毛衣)",
    },
    category: "printemps",
  },
  {
    slug: "spring-sunglasses",
    label: {
      fr: "Lunettes de soleil",
      en: "Sunglasses",
      zh: "太阳镜",
    },
    category: "printemps",
  },
  {
    slug: "spring-mask",
    label: {
      fr: "Masque anti-pollen (Nord)",
      en: "Pollen mask (North)",
      zh: "防花粉口罩(北方)",
    },
    category: "printemps",
  },

  // Été
  {
    slug: "summer-light",
    label: {
      fr: "Vêtements amples et respirants",
      en: "Loose breathable clothes",
      zh: "宽松透气衣物",
    },
    category: "ete",
  },
  {
    slug: "summer-spf",
    label: {
      fr: "Crème solaire SPF 50",
      en: "Sunscreen SPF 50",
      zh: "防晒霜 SPF 50",
    },
    category: "ete",
  },
  {
    slug: "summer-hat",
    label: {
      fr: "Casquette ou chapeau",
      en: "Cap or hat",
      zh: "帽子",
    },
    category: "ete",
  },
  {
    slug: "summer-mosquito",
    label: {
      fr: "Anti-moustiques (Sud, humidité)",
      en: "Mosquito repellent (humid South)",
      zh: "驱蚊液(华南潮湿)",
    },
    category: "ete",
  },

  // Automne
  {
    slug: "autumn-layers",
    label: {
      fr: "Couches mi-saison",
      en: "Mid-season layers",
      zh: "过渡季分层",
    },
    category: "automne",
  },
  {
    slug: "autumn-jacket",
    label: {
      fr: "Veste légère",
      en: "Light jacket",
      zh: "轻便外套",
    },
    category: "automne",
  },
  {
    slug: "autumn-umbrella",
    label: {
      fr: "Parapluie compact",
      en: "Compact umbrella",
      zh: "便携雨伞",
    },
    category: "automne",
  },

  // Hiver
  {
    slug: "winter-coat",
    label: {
      fr: "Manteau chaud (doudoune longue pour le Nord)",
      en: "Warm coat (long down for the North)",
      zh: "保暖外套(北方建议长款羽绒服)",
    },
    category: "hiver",
  },
  {
    slug: "winter-accessories",
    label: {
      fr: "Bonnet, gants, écharpe",
      en: "Beanie, gloves, scarf",
      zh: "帽子、手套、围巾",
    },
    category: "hiver",
  },
  {
    slug: "winter-boots",
    label: {
      fr: "Bottes imperméables et antidérapantes",
      en: "Waterproof anti-slip boots",
      zh: "防水防滑靴",
    },
    category: "hiver",
    note: {
      fr: "Indispensable à Harbin (festival de glace).",
      en: "Essential in Harbin (ice festival).",
      zh: "哈尔滨冰雪节必备。",
    },
  },
  {
    slug: "winter-thermal",
    label: {
      fr: "Sous-couche thermique",
      en: "Thermal base layer",
      zh: "保暖内衣",
    },
    category: "hiver",
  },
];

export function essentialsList(): PackingItem[] {
  return packingItems.filter((item) => item.category === "essentials");
}

export function seasonList(season: Season): PackingItem[] {
  return packingItems.filter((item) => item.category === season);
}
