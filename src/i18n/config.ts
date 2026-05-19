// Configuration centrale de l'internationalisation.

export const locales = ["fr", "en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

// Métadonnées d'affichage par langue (sélecteur, balises hreflang...).
export const localeMeta: Record<
  Locale,
  { label: string; native: string; flag: string; htmlLang: string }
> = {
  fr: { label: "Français", native: "Français", flag: "🇫🇷", htmlLang: "fr" },
  en: { label: "English", native: "English", flag: "🇬🇧", htmlLang: "en" },
  zh: { label: "Chinois", native: "中文", flag: "🇨🇳", htmlLang: "zh-Hans" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
