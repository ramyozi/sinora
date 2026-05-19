import type { LocalizedText } from "@/data/cities/types";

export type BudgetKind = "payment" | "currency" | "trap";

export interface PaymentMethod {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  acceptance: LocalizedText;
}

export interface BudgetTip {
  slug: string;
  kind: BudgetKind;
  title: LocalizedText;
  detail: LocalizedText;
}

export const paymentMethods: PaymentMethod[] = [
  {
    slug: "wechat-pay",
    name: { fr: "WeChat Pay", en: "WeChat Pay", zh: "微信支付" },
    description: {
      fr: "Paiement par QR code intégré à WeChat. Liaison d'une carte étrangère possible.",
      en: "QR-code payment built into WeChat. Foreign card linking available.",
      zh: "微信内置 QR 支付,可绑定外卡。",
    },
    acceptance: {
      fr: "Quasi universelle, du street-food au taxi.",
      en: "Near universal, from street food to taxis.",
      zh: "覆盖广泛,街边小吃至出租车皆可。",
    },
  },
  {
    slug: "alipay",
    name: { fr: "Alipay", en: "Alipay", zh: "支付宝" },
    description: {
      fr: "Alternative dominante de WeChat Pay, avec Tour Pass pour visiteurs étrangers.",
      en: "Dominant alternative to WeChat Pay, with Tour Pass for foreign visitors.",
      zh: "微信支付的主要替代,境外游客可用 Tour Pass。",
    },
    acceptance: {
      fr: "Aussi universelle que WeChat Pay.",
      en: "As universal as WeChat Pay.",
      zh: "与微信支付同样普及。",
    },
  },
  {
    slug: "cash",
    name: { fr: "Espèces (CNY)", en: "Cash (CNY)", zh: "现金(人民币)" },
    description: {
      fr: "Accepté partout, indispensable en zone rurale ou en cas de panne mobile.",
      en: "Accepted everywhere, essential rurally or when phone fails.",
      zh: "全境接受,偏远地区或手机故障时不可或缺。",
    },
    acceptance: {
      fr: "Toujours utile : prévoir 500–1000 CNY de secours.",
      en: "Always useful: carry 500–1000 CNY as backup.",
      zh: "始终有用:建议备 500–1000 元应急。",
    },
  },
  {
    slug: "foreign-card",
    name: {
      fr: "Carte étrangère (Visa/MC)",
      en: "Foreign card (Visa/MC)",
      zh: "外卡(Visa / MC)",
    },
    description: {
      fr: "Visa/Mastercard/Amex acceptés en hôtels haut de gamme et aéroports.",
      en: "Visa/Mastercard/Amex accepted at upscale hotels and airports.",
      zh: "高端酒店与机场接受 Visa/Mastercard/Amex。",
    },
    acceptance: {
      fr: "Limitée chez les commerçants locaux.",
      en: "Limited at local merchants.",
      zh: "本地商户接受度有限。",
    },
  },
];

export const budgetTips: BudgetTip[] = [
  {
    slug: "mobile-first",
    kind: "payment",
    title: {
      fr: "90 % par mobile",
      en: "90% by mobile",
      zh: "九成靠手机",
    },
    detail: {
      fr: "Quasi tous les paiements se font par QR code. Sans WeChat Pay ou Alipay, le quotidien devient compliqué.",
      en: "Nearly every payment is QR-coded. Without WeChat Pay or Alipay, daily life is awkward.",
      zh: "几乎所有支付都用二维码。没有微信支付或支付宝,日常生活会很尴尬。",
    },
  },
  {
    slug: "exchange-before",
    kind: "currency",
    title: {
      fr: "Changer un peu avant",
      en: "Exchange some before",
      zh: "出发前小额换汇",
    },
    detail: {
      fr: "Faire 200–300 € en CNY à votre banque ou à l'aéroport. Le change non officiel est risqué et illégal.",
      en: "Exchange 200–300 € to CNY at your bank or airport. Black-market exchange is risky and illegal.",
      zh: "在银行或机场兑换 200–300 欧元的人民币。地下兑换风险高且违法。",
    },
  },
  {
    slug: "wallet-limits",
    kind: "payment",
    title: {
      fr: "Plafonds des portefeuilles étrangers",
      en: "Foreign wallet caps",
      zh: "境外钱包限额",
    },
    detail: {
      fr: "Alipay/WeChat plafonnent les transactions étrangères (env. 200 $ par paiement, 5000 $ par mois). Garder une carte ou du cash pour gros achats.",
      en: "Alipay/WeChat cap foreign transactions (about $200 per payment, $5000 per month). Keep a card or cash for big buys.",
      zh: "支付宝/微信对外卡有限额(约每笔 200 美元,每月 5000 美元)。大额消费请备卡或现金。",
    },
  },
  {
    slug: "free-tour-trap",
    kind: "trap",
    title: {
      fr: "Le « tour gratuit » qui n'en est pas un",
      en: "The 'free tour' trap",
      zh: "“免费旅游”陷阱",
    },
    detail: {
      fr: "Certains tours gratuits imposent un détour shopping où on est poussé à acheter. Refuser poliment ou choisir des opérateurs réputés.",
      en: "Some free tours include a shopping detour with pressure to buy. Decline politely or pick reputable operators.",
      zh: "部分免费旅游含强制购物环节。礼貌拒绝,或选择口碑良好的运营商。",
    },
  },
  {
    slug: "taxi-non-official",
    kind: "trap",
    title: {
      fr: "Taxis non officiels",
      en: "Unofficial taxis",
      zh: "黑车",
    },
    detail: {
      fr: "Dans les gares et aéroports, des chauffeurs accostent en proposant un tarif élevé. Privilégier Didi ou la file officielle.",
      en: "At stations and airports, drivers tout high fares. Prefer Didi or the official taxi line.",
      zh: "车站与机场常有人拉客高价。请用滴滴或排队上正规出租车。",
    },
  },
  {
    slug: "no-tipping",
    kind: "payment",
    title: {
      fr: "Pas de pourboire",
      en: "No tipping",
      zh: "无须小费",
    },
    detail: {
      fr: "Le pourboire n'est pas attendu et peut même surprendre. Inutile d'arrondir.",
      en: "Tipping is not expected and can even surprise staff. No need to round up.",
      zh: "无需小费,反而可能让对方不解。",
    },
  },
];
