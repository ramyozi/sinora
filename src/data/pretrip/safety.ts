import type { LocalizedText } from "@/data/cities/types";

export type SafetyKind = "offline" | "documents" | "network" | "emergency";

export type SafetyIcon =
  | "wifi-off"
  | "cloud"
  | "shield"
  | "ban"
  | "phone"
  | "smartphone";

export interface SafetyTip {
  slug: string;
  kind: SafetyKind;
  icon: SafetyIcon;
  title: LocalizedText;
  detail: LocalizedText;
  critical: boolean;
}

export const safetyTips: SafetyTip[] = [
  {
    slug: "vpn-pre-install",
    kind: "network",
    icon: "shield",
    title: {
      fr: "Installer le VPN AVANT d'entrer",
      en: "Install your VPN BEFORE entering",
      zh: "入境前先装好 VPN",
    },
    detail: {
      fr: "Les sites des fournisseurs sont bloqués depuis la Chine. Préparer deux services et tester sa connexion avant le vol.",
      en: "VPN provider sites are blocked from inside China. Set up two services and test the connection before the flight.",
      zh: "VPN 官网在华无法访问。出发前安装并测试两个服务以备份。",
    },
    critical: true,
  },
  {
    slug: "offline-maps",
    kind: "offline",
    icon: "wifi-off",
    title: {
      fr: "Cartes hors ligne par ville",
      en: "Offline maps for every city",
      zh: "逐城下载离线地图",
    },
    detail: {
      fr: "OsmAnd ou Maps.me : télécharger chaque ville d'étape. Utile si l'eSIM faiblit ou en transports souterrains.",
      en: "OsmAnd or Maps.me: download each stopover city. Helpful when the eSIM drops or underground.",
      zh: "用 OsmAnd 或 Maps.me 下载每座目的城市,网络不畅或地下出行时仍可用。",
    },
    critical: true,
  },
  {
    slug: "cloud-docs",
    kind: "documents",
    icon: "cloud",
    title: {
      fr: "Documents scannés et accessibles hors ligne",
      en: "Documents scanned and offline-accessible",
      zh: "证件扫描并启用离线访问",
    },
    detail: {
      fr: "Passeport, visa, assurance, billets. Un PDF par document sur Drive ou iCloud, marqué « disponible hors ligne ».",
      en: "Passport, visa, insurance, tickets. One PDF per item on Drive or iCloud, marked 'available offline'.",
      zh: "护照、签证、保险、票据各扫描为 PDF,在 Drive 或 iCloud 中开启离线可用。",
    },
    critical: false,
  },
  {
    slug: "great-firewall",
    kind: "network",
    icon: "ban",
    title: {
      fr: "Ce qui est bloqué en Chine",
      en: "What's blocked in China",
      zh: "中国境内访问受限的服务",
    },
    detail: {
      fr: "Google (Gmail, Drive, Maps), Meta (WhatsApp, Instagram), X, YouTube, beaucoup de presse occidentale. Prévoir des alternatives ou un VPN.",
      en: "Google (Gmail, Drive, Maps), Meta (WhatsApp, Instagram), X, YouTube, much Western press. Plan alternatives or VPN.",
      zh: "Google(Gmail、Drive、Maps)、Meta(WhatsApp、Instagram)、X、YouTube、大量西方媒体均受限。请准备替代方案或 VPN。",
    },
    critical: true,
  },
  {
    slug: "public-wifi",
    kind: "network",
    icon: "shield",
    title: {
      fr: "Wi-Fi publics : prudence",
      en: "Public Wi-Fi: be cautious",
      zh: "公共 Wi-Fi 需谨慎",
    },
    detail: {
      fr: "Activer le VPN avant toute saisie de mot de passe ou paiement. Préférer l'eSIM personnelle pour les opérations sensibles.",
      en: "Turn the VPN on before entering any password or making a payment. Prefer your own eSIM for sensitive operations.",
      zh: "输入密码或支付前先开启 VPN;敏感操作优先使用自己的 eSIM。",
    },
    critical: false,
  },
  {
    slug: "phone-backup",
    kind: "documents",
    icon: "smartphone",
    title: {
      fr: "Sauvegarder son téléphone",
      en: "Back up your phone",
      zh: "为手机做备份",
    },
    detail: {
      fr: "Une sauvegarde complète juste avant le départ. En cas de perte, le remplacement à l'identique est immédiat depuis l'iCloud / Google.",
      en: "Full backup right before leaving. If you lose your phone, restoring identically from iCloud / Google is instant.",
      zh: "出发前做完整备份。如遗失,可通过 iCloud / Google 即时还原。",
    },
    critical: false,
  },
];

export interface EmergencyContact {
  slug: string;
  label: LocalizedText;
  number: string;
}

export const emergencyContacts: EmergencyContact[] = [
  {
    slug: "police",
    label: { fr: "Police", en: "Police", zh: "警察" },
    number: "110",
  },
  {
    slug: "fire",
    label: { fr: "Pompiers", en: "Fire department", zh: "消防" },
    number: "119",
  },
  {
    slug: "ambulance",
    label: { fr: "Ambulance", en: "Ambulance", zh: "急救" },
    number: "120",
  },
  {
    slug: "tourist-hotline",
    label: {
      fr: "Hotline tourisme",
      en: "Tourist hotline",
      zh: "旅游服务热线",
    },
    number: "12301",
  },
];
