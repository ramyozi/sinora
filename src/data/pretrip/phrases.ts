import type { LocalizedText } from "@/data/cities/types";

export type PhraseCategory =
  | "politesse"
  | "restauration"
  | "transport"
  | "urgence";

export interface Phrase {
  slug: string;
  hanzi: string;
  pinyin: string;
  meaning: LocalizedText;
  category: PhraseCategory;
}

export const phrases: Phrase[] = [
  // Politesse
  {
    slug: "hello",
    hanzi: "你好",
    pinyin: "nǐ hǎo",
    meaning: { fr: "Bonjour", en: "Hello", zh: "问候" },
    category: "politesse",
  },
  {
    slug: "thanks",
    hanzi: "谢谢",
    pinyin: "xièxie",
    meaning: { fr: "Merci", en: "Thank you", zh: "致谢" },
    category: "politesse",
  },
  {
    slug: "youre-welcome",
    hanzi: "不客气",
    pinyin: "bù kèqi",
    meaning: { fr: "De rien", en: "You're welcome", zh: "回应致谢" },
    category: "politesse",
  },
  {
    slug: "sorry",
    hanzi: "对不起",
    pinyin: "duìbuqǐ",
    meaning: { fr: "Désolé", en: "Sorry", zh: "致歉" },
    category: "politesse",
  },
  {
    slug: "bye",
    hanzi: "再见",
    pinyin: "zàijiàn",
    meaning: { fr: "Au revoir", en: "Goodbye", zh: "告别" },
    category: "politesse",
  },

  // Restauration
  {
    slug: "want-this",
    hanzi: "我要这个",
    pinyin: "wǒ yào zhège",
    meaning: { fr: "Je voudrais ceci", en: "I'd like this", zh: "点菜" },
    category: "restauration",
  },
  {
    slug: "how-much",
    hanzi: "多少钱?",
    pinyin: "duōshao qián?",
    meaning: { fr: "Combien ?", en: "How much?", zh: "询问价格" },
    category: "restauration",
  },
  {
    slug: "not-spicy",
    hanzi: "不要辣",
    pinyin: "bùyào là",
    meaning: { fr: "Pas épicé", en: "No spicy", zh: "不加辣" },
    category: "restauration",
  },
  {
    slug: "vegetarian",
    hanzi: "我吃素",
    pinyin: "wǒ chī sù",
    meaning: { fr: "Je suis végétarien", en: "I'm vegetarian", zh: "素食" },
    category: "restauration",
  },
  {
    slug: "halal",
    hanzi: "清真吗?",
    pinyin: "qīngzhēn ma?",
    meaning: { fr: "Est-ce halal ?", en: "Is this halal?", zh: "询问清真" },
    category: "restauration",
  },
  {
    slug: "bill",
    hanzi: "买单",
    pinyin: "mǎidān",
    meaning: { fr: "L'addition", en: "The bill", zh: "结账" },
    category: "restauration",
  },

  // Transport
  {
    slug: "how-to",
    hanzi: "怎么去…?",
    pinyin: "zěnme qù...?",
    meaning: {
      fr: "Comment aller à… ?",
      en: "How do I get to…?",
      zh: "问路",
    },
    category: "transport",
  },
  {
    slug: "stops",
    hanzi: "多少站?",
    pinyin: "duōshao zhàn?",
    meaning: {
      fr: "Combien d'arrêts ?",
      en: "How many stops?",
      zh: "询问站数",
    },
    category: "transport",
  },
  {
    slug: "this-goes-to",
    hanzi: "这是去…的车吗?",
    pinyin: "zhè shì qù... de chē ma?",
    meaning: {
      fr: "Ce bus/train va à… ?",
      en: "Does this go to…?",
      zh: "确认线路",
    },
    category: "transport",
  },
  {
    slug: "get-off",
    hanzi: "在哪里下车?",
    pinyin: "zài nǎli xià chē?",
    meaning: {
      fr: "Où descendre ?",
      en: "Where do I get off?",
      zh: "询问下车点",
    },
    category: "transport",
  },
  {
    slug: "taxi",
    hanzi: "出租车",
    pinyin: "chūzūchē",
    meaning: { fr: "Taxi", en: "Taxi", zh: "出租车" },
    category: "transport",
  },

  // Urgence
  {
    slug: "help",
    hanzi: "救命!",
    pinyin: "jiù mìng!",
    meaning: { fr: "Au secours !", en: "Help!", zh: "求救" },
    category: "urgence",
  },
  {
    slug: "sick",
    hanzi: "我生病了",
    pinyin: "wǒ shēng bìng le",
    meaning: { fr: "Je suis malade", en: "I'm sick", zh: "生病" },
    category: "urgence",
  },
  {
    slug: "police",
    hanzi: "警察",
    pinyin: "jǐngchá",
    meaning: { fr: "Police", en: "Police", zh: "警察" },
    category: "urgence",
  },
  {
    slug: "hospital",
    hanzi: "医院",
    pinyin: "yīyuàn",
    meaning: { fr: "Hôpital", en: "Hospital", zh: "医院" },
    category: "urgence",
  },
  {
    slug: "no-chinese",
    hanzi: "我不会说中文",
    pinyin: "wǒ bù huì shuō zhōngwén",
    meaning: {
      fr: "Je ne parle pas chinois",
      en: "I don't speak Chinese",
      zh: "表明语言能力",
    },
    category: "urgence",
  },
];

export const phraseCategories: PhraseCategory[] = [
  "politesse",
  "restauration",
  "transport",
  "urgence",
];
