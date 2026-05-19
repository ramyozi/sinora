import type { LocalizedText } from "@/data/cities/types";

export type FoodNeed =
  | "halal"
  | "vegan"
  | "safe"
  | "spicy"
  | "culture"
  | "ordering";

export interface FoodTip {
  slug: string;
  need: FoodNeed;
  title: LocalizedText;
  detail: LocalizedText;
}

export interface FoodKeyword {
  slug: string;
  hanzi: string;
  pinyin: string;
  meaning: LocalizedText;
  need: FoodNeed;
}

export const foodTips: FoodTip[] = [
  {
    slug: "find-halal",
    need: "halal",
    title: {
      fr: "Trouver du halal",
      en: "Finding halal",
      zh: "寻找清真餐厅",
    },
    detail: {
      fr: "Chercher l'enseigne 清真 (qīngzhēn). Les quartiers musulmans de Xi'an et Kachgar concentrent les bonnes adresses, mais on en trouve partout via Meituan.",
      en: "Look for the 清真 (qīngzhēn) sign. The Muslim quarters of Xi'an and Kashgar are prime hunting grounds, but Meituan finds them everywhere.",
      zh: "寻找“清真”字样。西安回民街与喀什老城是首选,大众点评/美团亦覆盖全国。",
    },
  },
  {
    slug: "find-vegan",
    need: "vegan",
    title: {
      fr: "Trouver du végétarien",
      en: "Finding vegetarian food",
      zh: "寻找素食餐厅",
    },
    detail: {
      fr: "Chercher 素 (sù) ou 素食 (sùshí). Les restaurants bouddhistes près des temples sont une valeur sûre.",
      en: "Look for 素 (sù) or 素食 (sùshí). Buddhist restaurants near temples are reliable.",
      zh: "找“素”或“素食”字样。寺院旁的素菜馆通常可靠。",
    },
  },
  {
    slug: "allergy-card",
    need: "safe",
    title: {
      fr: "Carte d'allergies en mandarin",
      en: "Allergy card in Mandarin",
      zh: "中文过敏卡",
    },
    detail: {
      fr: "Préparer une carte écrite indiquant vos allergies (cacahuète, gluten, fruits de mer...). Indispensable hors des grandes villes.",
      en: "Carry a written card listing your allergies (peanut, gluten, seafood...). Essential outside major cities.",
      zh: "准备一张写明过敏源(花生、麸质、海鲜等)的卡片;离开大城市后尤为重要。",
    },
  },
  {
    slug: "spicy-scale",
    need: "spicy",
    title: {
      fr: "L'échelle du piquant",
      en: "The spicy scale",
      zh: "辣度等级",
    },
    detail: {
      fr: "Sichuan et Hunan grimpent vite : 微辣 (léger), 中辣 (moyen), 重辣 (fort), 不要辣 (sans). À préciser à la commande.",
      en: "Sichuan and Hunan climb fast: 微辣 (mild), 中辣 (medium), 重辣 (strong), 不要辣 (none). Specify when ordering.",
      zh: "川湘菜辣度升级很快:微辣、中辣、重辣、不要辣。下单时务必说明。",
    },
  },
  {
    slug: "sharing-rules",
    need: "culture",
    title: {
      fr: "Plats partagés, riz individuel",
      en: "Shared dishes, individual rice",
      zh: "菜共享,饭分食",
    },
    detail: {
      fr: "Les plats arrivent au centre de la table et se partagent. Le riz est en bol individuel. Pas de pourboire attendu.",
      en: "Dishes arrive in the centre and are shared. Rice comes in individual bowls. No tipping expected.",
      zh: "菜肴置于桌中央共享,米饭独立碗装;通常不需小费。",
    },
  },
  {
    slug: "water",
    need: "safe",
    title: {
      fr: "Eau : bouillie ou en bouteille",
      en: "Water: boiled or bottled",
      zh: "饮水:煮沸或瓶装",
    },
    detail: {
      fr: "L'eau du robinet n'est pas potable. Les restaurants servent gratuitement de l'eau bouillie chaude (热水).",
      en: "Tap water is not drinkable. Restaurants serve hot boiled water (热水) for free.",
      zh: "自来水不宜直饮。餐厅普遍免费提供热水。",
    },
  },
];

export const foodKeywords: FoodKeyword[] = [
  {
    slug: "halal-sign",
    hanzi: "清真",
    pinyin: "qīngzhēn",
    meaning: { fr: "Halal", en: "Halal", zh: "清真" },
    need: "halal",
  },
  {
    slug: "vegan-sign",
    hanzi: "素食",
    pinyin: "sùshí",
    meaning: { fr: "Végétarien", en: "Vegetarian", zh: "素食" },
    need: "vegan",
  },
  {
    slug: "no-spicy",
    hanzi: "不要辣",
    pinyin: "bùyào là",
    meaning: { fr: "Sans piquant", en: "No spicy", zh: "无辣" },
    need: "spicy",
  },
  {
    slug: "mild-spicy",
    hanzi: "微辣",
    pinyin: "wēi là",
    meaning: { fr: "Léger piquant", en: "Mildly spicy", zh: "微辣" },
    need: "spicy",
  },
  {
    slug: "no-meat",
    hanzi: "没有肉",
    pinyin: "méiyǒu ròu",
    meaning: { fr: "Sans viande", en: "No meat", zh: "无肉" },
    need: "vegan",
  },
  {
    slug: "hot-water",
    hanzi: "热水",
    pinyin: "rè shuǐ",
    meaning: { fr: "Eau chaude", en: "Hot water", zh: "热水" },
    need: "safe",
  },
];
