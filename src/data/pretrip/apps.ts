import type { LocalizedText } from "@/data/cities/types";

export type AppCategory =
  | "communication"
  | "payment"
  | "transit"
  | "navigation"
  | "translation"
  | "network"
  | "esim";

export interface PretripAppLinks {
  playStore?: string;
  appStore?: string;
  official?: string;
}

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
  /** Slug Simple Icons (cdn.simpleicons.org) pour afficher le logo. */
  logoSlug?: string;
  /** Couleur de fond proposee derriere le logo (hex sans #). */
  logoBg?: string;
  /** Liens de telechargement officiels. */
  links?: PretripAppLinks;
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
    logoSlug: "wechat",
    logoBg: "07c160",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.tencent.mm",
      appStore: "https://apps.apple.com/app/wechat/id414478124",
      official: "https://www.wechat.com",
    },
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
    logoSlug: "alipay",
    logoBg: "1677ff",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=hk.alipay.wallet",
      appStore: "https://apps.apple.com/app/alipay/id333206289",
      official: "https://www.alipay.com",
    },
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
    logoBg: "ff7900",
    links: {
      playStore:
        "https://play.google.com/store/apps/details?id=com.didiglobal.passenger",
      appStore: "https://apps.apple.com/app/didi-rider/id554499054",
      official: "https://global.didiglobal.com",
    },
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
    logoBg: "00afff",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.autonavi.minimap",
      appStore: "https://apps.apple.com/app/id461703208",
      official: "https://mobile.amap.com",
    },
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
    pinned: true,
    logoBg: "d8443a",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.pleco.chinesesystem",
      appStore: "https://apps.apple.com/app/pleco-chinese-dictionary/id313088752",
      official: "https://www.pleco.com",
    },
  },
  {
    slug: "mullvad-vpn",
    name: "Mullvad VPN",
    publisher: "Mullvad",
    category: "network",
    description: {
      fr: "VPN respectueux de la vie privée, paiement sans email. À installer et tester avant le départ.",
      en: "Privacy-first VPN with email-less signup. Install and test before leaving.",
      zh: "注重隐私的 VPN,无需邮箱付款。请在出行前安装并测试。",
    },
    installBefore: true,
    pinned: false,
    logoSlug: "mullvad",
    logoBg: "44475a",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=net.mullvad.mullvadvpn",
      appStore: "https://apps.apple.com/app/mullvad-vpn/id1488466513",
      official: "https://mullvad.net",
    },
  },
  {
    slug: "proton-vpn",
    name: "Proton VPN",
    publisher: "Proton AG",
    category: "network",
    description: {
      fr: "Alternative ouverte, plan gratuit dispo. Suisse, audit régulier. Tester depuis l'étranger avant le départ.",
      en: "Open alternative with a free tier. Swiss, regularly audited. Test from abroad before leaving.",
      zh: "瑞士开源 VPN,提供免费版,定期审计。出行前请测试连接。",
    },
    installBefore: true,
    pinned: false,
    logoSlug: "protonvpn",
    logoBg: "6d4aff",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=ch.protonvpn.android",
      appStore: "https://apps.apple.com/app/protonvpn-fast-secure-vpn/id1437005085",
      official: "https://protonvpn.com",
    },
  },
  {
    slug: "airalo",
    name: "Airalo",
    publisher: "Airalo Inc.",
    category: "esim",
    description: {
      fr: "Marketplace eSIM : forfait Chine global, achat instantané et installation guidée. Pas besoin de SIM physique.",
      en: "eSIM marketplace: China plan, instant purchase and guided install. No physical SIM needed.",
      zh: "eSIM 平台:中国套餐即买即装,无需实体卡。",
    },
    installBefore: true,
    pinned: false,
    logoBg: "151515",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.airalo.app",
      appStore: "https://apps.apple.com/app/airalo-esim-travel-data/id1475911720",
      official: "https://www.airalo.com",
    },
  },
  {
    slug: "holafly",
    name: "Holafly",
    publisher: "Holafly",
    category: "esim",
    description: {
      fr: "Alternative à Airalo : forfaits Chine avec data illimitée, support 24/7 et hotspot inclus selon plan.",
      en: "Airalo alternative: China plans with unlimited data, 24/7 support, hotspot on some plans.",
      zh: "Airalo 的替代:中国不限流量套餐,24/7 客服,部分套餐含热点。",
    },
    installBefore: true,
    pinned: false,
    logoBg: "00d4ad",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.holafly.app",
      appStore: "https://apps.apple.com/app/holafly-esim-travel-data/id1581436770",
      official: "https://esim.holafly.com",
    },
  },
  {
    slug: "google-maps",
    name: "Google Maps",
    publisher: "Google",
    category: "navigation",
    description: {
      fr: "Indispensable hors continent. Télécharger les cartes hors ligne avant le départ : la précision en Chine est limitée mais utile en repli.",
      en: "Essential outside the mainland. Download offline maps before leaving: accuracy in China is limited but useful as backup.",
      zh: "境外必备。出行前请下载离线地图;在华精度有限但作为备份仍有用。",
    },
    installBefore: true,
    pinned: false,
    logoSlug: "googlemaps",
    logoBg: "4285f4",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.google.android.apps.maps",
      appStore: "https://apps.apple.com/app/google-maps/id585027354",
      official: "https://www.google.com/maps",
    },
  },
  {
    slug: "mapsme",
    name: "Maps.me",
    publisher: "Maps.me",
    category: "navigation",
    description: {
      fr: "Cartes OpenStreetMap hors ligne. Téléchargez chaque ville visitée ; idéal en cas de roaming patchy.",
      en: "Offline OpenStreetMap maps. Download every visited city; ideal when roaming is patchy.",
      zh: "离线 OpenStreetMap 地图。逐城下载,漫游不稳时尤其有用。",
    },
    installBefore: true,
    pinned: false,
    logoBg: "2196f3",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.mapswithme.maps.pro",
      appStore: "https://apps.apple.com/app/maps-me-offline-map-nav/id510623322",
      official: "https://maps.me",
    },
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
