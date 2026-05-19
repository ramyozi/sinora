import type { LocalizedText } from "@/data/cities/types";
import type { PretripModuleSlug } from "./modules";

export type TimelineBucket = "j-30" | "j-15" | "j-7" | "j-1";

export type TimelineCategory =
  | "visa"
  | "apps"
  | "packing"
  | "safety"
  | "budget"
  | "phrases"
  | "food";

export interface TimelineTask {
  slug: string;
  bucket: TimelineBucket;
  category: TimelineCategory;
  title: LocalizedText;
  detail: LocalizedText;
  /** Module Sinora à ouvrir pour aller plus loin. */
  moduleSlug?: PretripModuleSlug;
}

export const timelineBuckets: TimelineBucket[] = [
  "j-30",
  "j-15",
  "j-7",
  "j-1",
];

export const timelineTasks: TimelineTask[] = [
  // J-30 — démarrer les démarches longues
  {
    slug: "passport-check",
    bucket: "j-30",
    category: "visa",
    title: {
      fr: "Vérifier la validité du passeport",
      en: "Check passport validity",
      zh: "检查护照有效期",
    },
    detail: {
      fr: "Au moins 6 mois après la date de retour, 2 pages blanches.",
      en: "At least 6 months past return date, 2 blank pages.",
      zh: "返程后至少有 6 个月有效期,2 页空白。",
    },
    moduleSlug: "visa",
  },
  {
    slug: "visa-or-exemption",
    bucket: "j-30",
    category: "visa",
    title: {
      fr: "Lancer la demande de visa ou vérifier l'exemption",
      en: "Apply for visa or confirm exemption",
      zh: "申请签证或确认免签资格",
    },
    detail: {
      fr: "Transit 240 h, exemption courte durée ou visa L : choisir la voie la plus simple.",
      en: "240 h transit, short-stay waiver or L visa: pick the simplest path.",
      zh: "240 小时过境、短期免签或 L 签:选择最简路径。",
    },
    moduleSlug: "visa",
  },
  {
    slug: "vpn-choose",
    bucket: "j-30",
    category: "safety",
    title: {
      fr: "Choisir et installer un VPN",
      en: "Pick and install a VPN",
      zh: "选择并安装 VPN",
    },
    detail: {
      fr: "Souscrire et tester deux services depuis chez soi avant le départ.",
      en: "Subscribe to and test two services from home before leaving.",
      zh: "在出发前订购并测试两个服务。",
    },
    moduleSlug: "securite",
  },
  {
    slug: "book-flights",
    bucket: "j-30",
    category: "budget",
    title: {
      fr: "Réserver les vols",
      en: "Book the flights",
      zh: "预订机票",
    },
    detail: {
      fr: "Aller-retour ou aller simple + onward ticket pour transit visa-free.",
      en: "Round trip, or one-way with onward ticket for visa-free transit.",
      zh: "购买往返票,或单程加第三国机票(用于过境免签)。",
    },
  },
  {
    slug: "esim-order",
    bucket: "j-30",
    category: "apps",
    title: {
      fr: "Commander une eSIM ou activer le roaming",
      en: "Order an eSIM or activate roaming",
      zh: "购买 eSIM 或开通漫游",
    },
    detail: {
      fr: "Choisir un fournisseur (Airalo, Holafly...) ou contacter son opérateur.",
      en: "Choose a provider (Airalo, Holafly...) or contact your operator.",
      zh: "选择运营商(Airalo、Holafly 等)或联系运营商。",
    },
    moduleSlug: "apps",
  },

  // J-15 — valider, installer, réserver
  {
    slug: "install-wechat-alipay",
    bucket: "j-15",
    category: "apps",
    title: {
      fr: "Installer WeChat et Alipay",
      en: "Install WeChat and Alipay",
      zh: "安装微信和支付宝",
    },
    detail: {
      fr: "Créer un compte WeChat (parrainage utile), lier une carte étrangère à Alipay Tour Pass.",
      en: "Create a WeChat account (a referral helps), link a foreign card to Alipay Tour Pass.",
      zh: "注册微信(邀请有助),为支付宝 Tour Pass 绑定外卡。",
    },
    moduleSlug: "apps",
  },
  {
    slug: "book-hotels",
    bucket: "j-15",
    category: "budget",
    title: {
      fr: "Réserver les hôtels principaux",
      en: "Book the main hotels",
      zh: "预订主要酒店",
    },
    detail: {
      fr: "Confirmer chaque étape avec une réservation à montrer au consulat.",
      en: "Confirm each stopover with a booking to show at the consulate.",
      zh: "每个停留点都有可向领事馆出示的预订。",
    },
  },
  {
    slug: "travel-insurance",
    bucket: "j-15",
    category: "safety",
    title: {
      fr: "Souscrire une assurance voyage",
      en: "Subscribe to travel insurance",
      zh: "购买旅行保险",
    },
    detail: {
      fr: "Vérifier la couverture en Chine continentale et la prise en charge médicale.",
      en: "Check coverage in Mainland China and medical reimbursement.",
      zh: "确认涵盖中国大陆,含医疗报销。",
    },
  },

  // J-7 — finaliser logistique et numérique
  {
    slug: "secondary-apps",
    bucket: "j-7",
    category: "apps",
    title: {
      fr: "Installer Didi, Amap, Pleco",
      en: "Install Didi, Amap, Pleco",
      zh: "安装滴滴、高德、Pleco",
    },
    detail: {
      fr: "Compléter l'arsenal d'apps avant de partir.",
      en: "Round out your app toolkit before leaving.",
      zh: "出发前补全应用工具。",
    },
    moduleSlug: "apps",
  },
  {
    slug: "offline-maps",
    bucket: "j-7",
    category: "safety",
    title: {
      fr: "Télécharger les cartes hors ligne",
      en: "Download offline maps",
      zh: "下载离线地图",
    },
    detail: {
      fr: "OsmAnd ou Maps.me, une zone par ville d'étape.",
      en: "OsmAnd or Maps.me, one region per stopover city.",
      zh: "OsmAnd 或 Maps.me,逐城下载。",
    },
    moduleSlug: "securite",
  },
  {
    slug: "exchange-cash",
    bucket: "j-7",
    category: "budget",
    title: {
      fr: "Changer 200–300 € en CNY",
      en: "Exchange 200–300 € to CNY",
      zh: "兑换 200–300 欧元的人民币",
    },
    detail: {
      fr: "Garder du cash pour zones rurales et imprévus.",
      en: "Keep cash for rural areas and unexpected needs.",
      zh: "为偏远地区与应急留出现金。",
    },
    moduleSlug: "budget",
  },
  {
    slug: "print-docs",
    bucket: "j-7",
    category: "safety",
    title: {
      fr: "Imprimer et scanner les documents",
      en: "Print and scan documents",
      zh: "打印并扫描证件",
    },
    detail: {
      fr: "Passeport, visa, billets, assurance — papier + PDF cloud hors ligne.",
      en: "Passport, visa, tickets, insurance — paper + offline cloud PDF.",
      zh: "护照、签证、票据、保险:纸质 + 云端离线 PDF。",
    },
    moduleSlug: "securite",
  },

  // J-1 — derniers réglages
  {
    slug: "pack-bag",
    bucket: "j-1",
    category: "packing",
    title: {
      fr: "Faire la valise selon la saison",
      en: "Pack according to the season",
      zh: "按季节打包行李",
    },
    detail: {
      fr: "Vérifier la checklist du module bagages, sans oublier l'adaptateur.",
      en: "Run through the packing checklist, don't forget the adapter.",
      zh: "对照行李清单,别忘电源转换器。",
    },
    moduleSlug: "bagages",
  },
  {
    slug: "phone-backup",
    bucket: "j-1",
    category: "safety",
    title: {
      fr: "Sauvegarder le téléphone",
      en: "Back up the phone",
      zh: "备份手机",
    },
    detail: {
      fr: "Sauvegarde iCloud / Google complète, photos et contacts inclus.",
      en: "Full iCloud / Google backup, photos and contacts included.",
      zh: "完整 iCloud / Google 备份,含照片与联系人。",
    },
    moduleSlug: "securite",
  },
  {
    slug: "wechat-language",
    bucket: "j-1",
    category: "apps",
    title: {
      fr: "Passer WeChat en anglais ou français",
      en: "Switch WeChat to English or French",
      zh: "将微信切换为英文或法文",
    },
    detail: {
      fr: "Plus simple à utiliser au quotidien que la version chinoise.",
      en: "Easier daily use than the Chinese-only UI.",
      zh: "比纯中文界面更易日常使用。",
    },
    moduleSlug: "apps",
  },
  {
    slug: "allergy-card",
    bucket: "j-1",
    category: "food",
    title: {
      fr: "Préparer une carte d'allergies en mandarin",
      en: "Prepare an allergy card in Mandarin",
      zh: "准备一张中文过敏卡",
    },
    detail: {
      fr: "À montrer au restaurant. Précieux hors des grandes villes.",
      en: "Show it at restaurants. Especially helpful outside large cities.",
      zh: "可在餐厅出示,离开大城市后尤为重要。",
    },
    moduleSlug: "restaurants",
  },
  {
    slug: "review-phrases",
    bucket: "j-1",
    category: "phrases",
    title: {
      fr: "Revoir les phrases de survie",
      en: "Review survival phrases",
      zh: "复习应急短语",
    },
    detail: {
      fr: "Politesse, transport, urgence : un dernier tour du module phrases.",
      en: "Greetings, transport, emergency: a final pass on the phrases module.",
      zh: "礼貌、交通、应急:再过一遍短语模块。",
    },
    moduleSlug: "phrases",
  },
];
