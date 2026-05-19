import type { LocalizedText } from "@/data/cities/types";

// Modèle d'un type de visa chinois.
export interface VisaType {
  code: string;
  title: LocalizedText;
  purpose: LocalizedText;
  duration: LocalizedText;
}

// Exemption ou facilitation permettant d'éviter la procédure complète.
export interface VisaExemption {
  slug: string;
  title: LocalizedText;
  duration: LocalizedText;
  eligibility: LocalizedText;
  /** Met en avant les exemptions les plus attractives. */
  highlight: boolean;
}

export interface VisaDocument {
  slug: string;
  label: LocalizedText;
  note?: LocalizedText;
}

export interface VisaError {
  slug: string;
  title: LocalizedText;
  detail: LocalizedText;
}

export const visaExemptions: VisaExemption[] = [
  {
    slug: "transit-240h",
    title: {
      fr: "Transit sans visa 240 h",
      en: "240-hour visa-free transit",
      zh: "240 小时过境免签",
    },
    duration: { fr: "Jusqu'à 10 jours", en: "Up to 10 days", zh: "至多 10 天" },
    eligibility: {
      fr: "54 nationalités (FR incluse), 60 ports d'entrée, billet vers un pays tiers exigé.",
      en: "54 nationalities (FR included), 60 entry ports, onward ticket to a third country required.",
      zh: "54 个国籍(含法国),60 个入境口岸,需持前往第三国机票。",
    },
    highlight: true,
  },
  {
    slug: "unilateral-short-stay",
    title: {
      fr: "Exemption courte durée (FR/UE)",
      en: "Short-stay waiver (FR/EU)",
      zh: "短期单方面免签",
    },
    duration: {
      fr: "Jusqu'à 30 jours",
      en: "Up to 30 days",
      zh: "至多 30 天",
    },
    eligibility: {
      fr: "Tourisme, affaires courtes, visite famille. 38+ pays éligibles. Politique récente, à vérifier.",
      en: "Tourism, short business, family visit. 38+ countries. Recent policy, verify before travel.",
      zh: "旅游、短期商务、探亲。38+ 国家可用。新政策,出行前请确认。",
    },
    highlight: true,
  },
  {
    slug: "hainan",
    title: {
      fr: "Hainan sans visa",
      en: "Hainan visa-free",
      zh: "海南免签",
    },
    duration: {
      fr: "Jusqu'à 30 jours",
      en: "Up to 30 days",
      zh: "至多 30 天",
    },
    eligibility: {
      fr: "59 nationalités, séjour limité à l'île de Hainan.",
      en: "59 nationalities, stay limited to Hainan island.",
      zh: "59 个国籍,停留范围仅限海南岛。",
    },
    highlight: false,
  },
];

export const visaTypes: VisaType[] = [
  {
    code: "L",
    title: { fr: "Tourisme", en: "Tourism", zh: "旅游" },
    purpose: {
      fr: "Visite touristique, court séjour.",
      en: "Tourist visit, short stay.",
      zh: "旅游探访,短期停留。",
    },
    duration: {
      fr: "30 j typiquement, 1 ou 2 entrées",
      en: "Typically 30 d, 1 or 2 entries",
      zh: "通常 30 天,1 至 2 次入境",
    },
  },
  {
    code: "F",
    title: { fr: "Échanges culturels", en: "Cultural exchange", zh: "文化交流" },
    purpose: {
      fr: "Conférences, échanges, recherche courte.",
      en: "Conferences, exchanges, short research.",
      zh: "会议、交流、短期研究。",
    },
    duration: {
      fr: "Jusqu'à 90 j",
      en: "Up to 90 d",
      zh: "至多 90 天",
    },
  },
  {
    code: "M",
    title: { fr: "Affaires", en: "Business", zh: "商务" },
    purpose: {
      fr: "Activités commerciales, négociations.",
      en: "Commercial activities, negotiations.",
      zh: "商业活动、谈判。",
    },
    duration: {
      fr: "Jusqu'à 60 j",
      en: "Up to 60 d",
      zh: "至多 60 天",
    },
  },
  {
    code: "X1/X2",
    title: { fr: "Études", en: "Studies", zh: "留学" },
    purpose: {
      fr: "Études longues (X1 ≥ 180 j) ou courtes (X2).",
      en: "Long (X1 ≥ 180 d) or short (X2) studies.",
      zh: "长期(X1 ≥ 180 天)或短期(X2)学习。",
    },
    duration: {
      fr: "Selon la durée du cursus",
      en: "Per programme length",
      zh: "依学制而定",
    },
  },
  {
    code: "Z",
    title: { fr: "Travail", en: "Work", zh: "工作" },
    purpose: {
      fr: "Emploi salarié, exige permis de travail.",
      en: "Salaried employment, work permit required.",
      zh: "受雇就业,须取得工作许可证。",
    },
    duration: {
      fr: "Longue durée, renouvelable",
      en: "Long term, renewable",
      zh: "长期,可续",
    },
  },
];

export const visaDocuments: VisaDocument[] = [
  {
    slug: "passport",
    label: {
      fr: "Passeport valide 6 mois, 2 pages blanches",
      en: "Passport valid 6+ months, 2 blank pages",
      zh: "护照有效期 6 个月以上,2 页空白",
    },
  },
  {
    slug: "photo",
    label: {
      fr: "Photo couleur 33 × 48 mm, fond blanc, < 6 mois",
      en: "Colour photo 33 × 48 mm, white background, < 6 months",
      zh: "彩色照片 33 × 48 毫米,白底,6 个月内",
    },
  },
  {
    slug: "form-cova",
    label: {
      fr: "Formulaire COVA rempli en ligne, imprimé et signé",
      en: "COVA form filled online, printed and signed",
      zh: "在线填写并签字打印的 COVA 表格",
    },
  },
  {
    slug: "flights",
    label: {
      fr: "Réservation de vols aller-retour",
      en: "Round-trip flight bookings",
      zh: "往返机票预订",
    },
  },
  {
    slug: "hotel",
    label: {
      fr: "Réservation d'hôtel ou lettre d'invitation",
      en: "Hotel booking or letter of invitation",
      zh: "酒店预订或邀请函",
    },
  },
  {
    slug: "address",
    label: {
      fr: "Justificatif de domicile (< 3 mois)",
      en: "Proof of address (< 3 months)",
      zh: "居住证明(3 个月内)",
    },
  },
  {
    slug: "activity",
    label: {
      fr: "Justificatif d'activité (salaire, école, retraite)",
      en: "Proof of activity (payslip, school, pension)",
      zh: "工作或在校证明",
    },
  },
  {
    slug: "fees",
    label: {
      fr: "Frais de visa, à régler sur place",
      en: "Visa fees, paid on site",
      zh: "签证费用,现场支付",
    },
    note: {
      fr: "Environ 125 € pour un citoyen français.",
      en: "Approx. 125 € for a French citizen.",
      zh: "法国公民约 125 欧元。",
    },
  },
];

export const visaErrors: VisaError[] = [
  {
    slug: "late-request",
    title: {
      fr: "Demande trop tardive",
      en: "Applying too late",
      zh: "申请过晚",
    },
    detail: {
      fr: "Prévoir 10 à 15 jours ouvrés avant le départ, plus en haute saison.",
      en: "Allow 10 to 15 working days before departure, longer in high season.",
      zh: "出行前预留 10–15 个工作日,旺季更长。",
    },
  },
  {
    slug: "photo-format",
    title: {
      fr: "Photo non conforme",
      en: "Non-compliant photo",
      zh: "照片不合规",
    },
    detail: {
      fr: "Format strict 33 × 48 mm, fond blanc, moins de 6 mois. Premier motif de refus.",
      en: "Strict 33 × 48 mm format, white background, under 6 months. Top reason for refusal.",
      zh: "33 × 48 毫米、白底、6 个月内严格要求,拒签首要原因。",
    },
  },
  {
    slug: "hong-kong-confusion",
    title: {
      fr: "Hong Kong ≠ Chine continentale",
      en: "Hong Kong ≠ Mainland China",
      zh: "香港与内地不同",
    },
    detail: {
      fr: "Les visas et exemptions diffèrent entre Hong Kong, Macao et la Chine continentale.",
      en: "Visas and exemptions differ between Hong Kong, Macao and Mainland China.",
      zh: "香港、澳门与中国内地的签证及免签政策各不相同。",
    },
  },
  {
    slug: "transit-no-onward-ticket",
    title: {
      fr: "Transit sans billet pays tiers",
      en: "Transit without onward ticket",
      zh: "过境无第三国机票",
    },
    detail: {
      fr: "Le transit sans visa exige un billet confirmé vers un pays tiers — l'aller-retour ne suffit pas.",
      en: "Visa-free transit requires a confirmed onward ticket to a third country — a round trip is not enough.",
      zh: "过境免签需持前往第三国的确认机票,往返票不符合条件。",
    },
  },
  {
    slug: "passport-expiry",
    title: {
      fr: "Passeport bientôt expiré",
      en: "Passport too close to expiry",
      zh: "护照临近失效",
    },
    detail: {
      fr: "Le passeport doit rester valide au moins 6 mois après la date de retour prévue.",
      en: "The passport must remain valid at least 6 months after the planned return date.",
      zh: "护照在预定返回日期后须至少有 6 个月有效期。",
    },
  },
];
