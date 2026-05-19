import type { LocalizedText } from "@/data/cities/types";

export type AppCategory =
  | "communication"
  | "payment"
  | "transit"
  | "navigation"
  | "translation"
  | "network"
  | "esim";

export interface PretripApp {
  slug: string;
  /** Nom de marque, inchangé selon la langue. */
  name: string;
  publisher: string;
  category: AppCategory;
  description: LocalizedText;
  /** Doit absolument être installée hors de Chine. */
  installBefore: boolean;
  /** Carte mise en avant dans le bloc « priorité ». */
  pinned: boolean;
}

export const pretripApps: PretripApp[] = [
  {
    slug: "wechat",
    name: "WeChat",
    publisher: "Tencent",
    category: "communication",
    description: {
      fr: "Messagerie quasi universelle en Chine, indispensable pour communiquer et passer commande.",
      en: "Near-universal messenger in China, essential to communicate and order anything.",
      zh: "在华几乎全民使用的即时通讯,沟通与下单的核心。",
    },
    installBefore: true,
    pinned: true,
  },
  {
    slug: "alipay",
    name: "Alipay",
    publisher: "Ant Group",
    category: "payment",
    description: {
      fr: "Paiement mobile dominant. Lier une carte étrangère est désormais possible pour les visiteurs.",
      en: "Dominant mobile payment. Linking a foreign card is now possible for visitors.",
      zh: "主流移动支付,境外游客可绑定外卡。",
    },
    installBefore: true,
    pinned: true,
  },
  {
    slug: "didi",
    name: "Didi",
    publisher: "DiDi Global",
    category: "transit",
    description: {
      fr: "Application VTC dominante (équivalent Uber). Version en anglais disponible.",
      en: "Dominant ride-hailing app (Uber equivalent). English version available.",
      zh: "主流网约车应用,提供英文版。",
    },
    installBefore: true,
    pinned: true,
  },
  {
    slug: "amap",
    name: "Amap",
    publisher: "Alibaba",
    category: "navigation",
    description: {
      fr: "Cartes locales très précises, transports en commun bien couverts. Interface en anglais partiellement disponible.",
      en: "Highly accurate local maps with strong public transit coverage. English UI partial.",
      zh: "本地地图精准,公共交通覆盖完善;英文界面部分支持。",
    },
    installBefore: false,
    pinned: true,
  },
  {
    slug: "pleco",
    name: "Pleco",
    publisher: "Pleco Software",
    category: "translation",
    description: {
      fr: "Le dictionnaire chinois de référence : recherche par tracé, photo et OCR. Fonctionne hors ligne.",
      en: "The reference Chinese dictionary: handwriting, photo and OCR lookup. Works offline.",
      zh: "权威汉语词典:支持手写、拍照与 OCR 查询,可离线使用。",
    },
    installBefore: false,
    pinned: false,
  },
  {
    slug: "vpn",
    name: "VPN",
    publisher: "—",
    category: "network",
    description: {
      fr: "Indispensable pour accéder à Google, WhatsApp, Instagram, X. L'installation depuis la Chine est bloquée : il faut l'installer et tester avant le départ.",
      en: "Needed to reach Google, WhatsApp, Instagram, X. Installation is blocked from inside China: install and test before leaving.",
      zh: "用于访问 Google、WhatsApp、Instagram、X 等。在华无法下载,务必出行前安装并测试。",
    },
    installBefore: true,
    pinned: false,
  },
  {
    slug: "esim",
    name: "eSIM",
    publisher: "—",
    category: "esim",
    description: {
      fr: "Carte SIM virtuelle achetée en ligne (Airalo, Holafly, etc.). Évite la SIM physique et passe en data sans changer de numéro.",
      en: "Online-purchased virtual SIM (Airalo, Holafly, etc.). Skip the physical SIM and roam without changing number.",
      zh: "线上购买的虚拟 SIM(如 Airalo、Holafly):无需实体卡即可漫游,保留原号码。",
    },
    installBefore: true,
    pinned: false,
  },
];

// Conseil de configuration ponctuel à appliquer sur le téléphone.
export interface PretripConfigTip {
  slug: string;
  title: LocalizedText;
  detail: LocalizedText;
  /** À effectuer avant le départ. Sinon : à l'arrivée. */
  beforeDeparture: boolean;
}

export const pretripConfigTips: PretripConfigTip[] = [
  {
    slug: "language",
    title: {
      fr: "Activer l'anglais (ou le français) dans WeChat",
      en: "Set WeChat to English (or French)",
      zh: "将 WeChat 切换为英文或法文",
    },
    detail: {
      fr: "Me → Settings → General → Language. À faire pendant que l'app est connectée en France.",
      en: "Me → Settings → General → Language. Do this while connected at home.",
      zh: "Me → 设置 → 通用 → 语言。在国内联网时完成。",
    },
    beforeDeparture: true,
  },
  {
    slug: "alipay-foreign-card",
    title: {
      fr: "Lier une carte étrangère à Alipay",
      en: "Link a foreign card to Alipay",
      zh: "为支付宝绑定外卡",
    },
    detail: {
      fr: "Tour Pass dans Alipay : suivre le parcours « International Version ». Plafonds par transaction et mensuels appliqués.",
      en: "Tour Pass in Alipay: follow the 'International Version' flow. Per-transaction and monthly limits apply.",
      zh: "支付宝 Tour Pass:按「国际版」流程操作,有单笔与月度限额。",
    },
    beforeDeparture: true,
  },
  {
    slug: "vpn-test",
    title: {
      fr: "Tester son VPN avant le départ",
      en: "Test your VPN before leaving",
      zh: "出行前测试 VPN",
    },
    detail: {
      fr: "Vérifier la connexion à plusieurs serveurs (Asie, Europe). Préparer 2 services au cas où l'un est bloqué le jour J.",
      en: "Check connection on several servers (Asia, Europe). Keep two services ready in case one is blocked on the day.",
      zh: "在多个服务器(亚洲、欧洲)上测试连接;备用第二个服务以防当日被封。",
    },
    beforeDeparture: true,
  },
  {
    slug: "offline-maps",
    title: {
      fr: "Télécharger les cartes hors ligne",
      en: "Download offline maps",
      zh: "下载离线地图",
    },
    detail: {
      fr: "Sur OsmAnd ou Maps.me, télécharger chaque ville visitée. Utile en cas de coupure ou de roaming limité.",
      en: "Use OsmAnd or Maps.me, download every city you'll visit. Helpful on patchy roaming.",
      zh: "在 OsmAnd 或 Maps.me 上下载每座目的城市,以备网络不畅。",
    },
    beforeDeparture: true,
  },
  {
    slug: "cloud-docs",
    title: {
      fr: "Scanner ses documents dans le cloud",
      en: "Scan your documents to the cloud",
      zh: "把证件扫描到云端",
    },
    detail: {
      fr: "Passeport, visa, assurance, billets : un PDF par document, sauvegardé sur Drive/iCloud et accessible hors ligne.",
      en: "Passport, visa, insurance, tickets: one PDF per document, saved on Drive/iCloud with offline access enabled.",
      zh: "护照、签证、保险、票据:每份扫描为 PDF,保存到 Drive/iCloud 并启用离线访问。",
    },
    beforeDeparture: true,
  },
  {
    slug: "roaming",
    title: {
      fr: "Activer le roaming data dès l'atterrissage",
      en: "Turn on data roaming on landing",
      zh: "落地后立即开通数据漫游",
    },
    detail: {
      fr: "Pour passer un appel ou ouvrir Didi à la sortie. L'eSIM ou le forfait roaming doit être actif AVANT.",
      en: "Needed to call or open Didi at the gate. eSIM or roaming plan must be active BEFORE.",
      zh: "出闸即可打车或拨号。eSIM 或漫游计划须事先开通。",
    },
    beforeDeparture: false,
  },
];
