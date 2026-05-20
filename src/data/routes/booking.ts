import type { LocalizedText } from "@/data/cities/types";
import type { TransportMode } from "./types";

export type BookingContext = "before-china" | "in-china" | "anytime";

export interface BookingPlatform {
  slug: string;
  name: string;
  url: string;
  modes: TransportMode[];
  context: BookingContext;
  /** Mise en avant comme premier choix pour les voyageurs internationaux. */
  highlight: boolean;
  hint: LocalizedText;
  caveat?: LocalizedText;
}

export const bookingPlatforms: BookingPlatform[] = [
  {
    slug: "trip-com",
    name: "Trip.com",
    url: "https://trip.com",
    modes: ["hsr", "train", "flight", "bus"],
    context: "anytime",
    highlight: true,
    hint: {
      fr: "Portail international : interface multilingue, paiement carte étrangère, e-billets envoyés directement.",
      en: "International portal: multilingual UI, foreign card payments, e-tickets sent straight to your inbox.",
      zh: "国际平台:多语界面,支持外卡支付,电子票直送邮箱。",
    },
  },
  {
    slug: "12306",
    name: "12306",
    url: "https://www.12306.cn",
    modes: ["hsr", "train"],
    context: "in-china",
    highlight: false,
    hint: {
      fr: "Site officiel chinois - tarifs les plus bas, billets remboursables.",
      en: "Official Chinese site - lowest prices, refundable tickets.",
      zh: "中国铁路官网,价格最低,可退票。",
    },
    caveat: {
      fr: "Compte exigeant un numéro chinois ou une validation passeport en gare.",
      en: "Account needs a Chinese phone number or in-station passport check.",
      zh: "注册需中国手机号或前往车站凭护照验证。",
    },
  },
  {
    slug: "skyscanner",
    name: "Skyscanner",
    url: "https://www.skyscanner.com",
    modes: ["flight"],
    context: "anytime",
    highlight: false,
    hint: {
      fr: "Comparateur de vols, redirige vers les compagnies ou agences.",
      en: "Flight comparator, redirects to airlines or OTAs.",
      zh: "机票比价,跳转至航空公司或代理。",
    },
  },
];

// Filtre les plateformes utiles aux modes effectivement utilisés sur l'itinéraire.
export function bookingPlatformsForModes(
  modes: TransportMode[],
): BookingPlatform[] {
  if (modes.length === 0) return bookingPlatforms;
  const set = new Set(modes);
  return bookingPlatforms.filter((p) => p.modes.some((m) => set.has(m)));
}
