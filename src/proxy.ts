import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

// Détermine la langue : cookie en priorité, sinon en-tête Accept-Language.
function resolveLocale(request: NextRequest): string {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const accept = request.headers.get("accept-language");
  if (accept) {
    const ranked = accept
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase().split("-")[0]);
    const match = ranked.find((lang) => isLocale(lang));
    if (match) return match;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // On ignore les fichiers internes, l'API et les assets statiques.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
