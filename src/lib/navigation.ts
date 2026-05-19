import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

// Préfixe un chemin avec la langue courante : ("/villes", "fr") -> "/fr/villes".
export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

// Remplace la langue dans un chemin existant en conservant le reste.
export function switchLocaleInPath(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = next;
  } else {
    segments.unshift(next);
  }
  return `/${segments.join("/")}`;
}

// Extrait la langue d'un chemin, avec repli sur la langue par défaut.
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}

// Mémorise la langue choisie pour les visites suivantes (un an).
export function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}
