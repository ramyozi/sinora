import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCities, sortCitiesByName } from "@/data/cities";
import { routeTemplates } from "@/data/routes/templates";
import type { RouteStyle } from "@/data/routes/style";
import { getCityContextSnapshots } from "@/lib/api/providers/city-context";
import { Container } from "@/components/ui/container";
import { RouteBuilder } from "@/components/route-planner/route-builder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.routePlanner.meta.title,
    description: dict.routePlanner.meta.description,
    alternates: { canonical: `/${locale}/route-planner` },
  };
}

// Détermine l'état initial du planner depuis les paramètres d'URL :
//   ?cities=slug1,slug2[,...]
//   ?template=slug
// Le param `cities` prime sur `template` s'il est présent.
function parseInitialState(
  citiesParam: string | undefined,
  templateParam: string | undefined,
  validSlugs: Set<string>,
): { cities: string[]; style: RouteStyle | undefined } {
  if (citiesParam) {
    const requested = citiesParam
      .split(",")
      .map((s) => s.trim())
      .filter((s) => validSlugs.has(s));
    return { cities: requested, style: undefined };
  }
  if (templateParam) {
    const tpl = routeTemplates.find((t) => t.slug === templateParam);
    if (tpl) {
      return {
        cities: tpl.cities.filter((s) => validSlugs.has(s)),
        style: tpl.style,
      };
    }
  }
  return { cities: [], style: undefined };
}

export default async function RoutePlannerPage({
  params,
  searchParams,
}: PageProps<"/[locale]/route-planner">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const sp = await searchParams;
  const dict = await getDictionary(locale);
  const cities = sortCitiesByName(getAllCities(), locale);

  const citiesParam = typeof sp.cities === "string" ? sp.cities : undefined;
  const templateParam =
    typeof sp.template === "string" ? sp.template : undefined;
  const validSlugs = new Set(cities.map((c) => c.slug));
  const initial = parseInitialState(citiesParam, templateParam, validSlugs);
  const cityContext = await getCityContextSnapshots(cities);

  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.routePlanner.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.routePlanner.subtitle}
        </p>
      </header>

      <div className="mt-10">
        <RouteBuilder
          cities={cities}
          locale={locale}
          dict={dict}
          initialCities={initial.cities}
          initialStyle={initial.style}
          cityContext={cityContext}
        />
      </div>
    </Container>
  );
}
