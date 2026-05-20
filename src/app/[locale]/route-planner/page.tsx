import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCities, sortCitiesByName, type CityTag } from "@/data/cities";
import { routeTemplates } from "@/data/routes/templates";
import { styleConfig, type RouteStyle } from "@/data/routes/style";
import type {
  DietRestriction,
  TravelProfile,
} from "@/data/routes/preferences";
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

  // Pre-fill via deep link depuis la page /events.
  const eventStart =
    typeof sp.eventStart === "string" ? sp.eventStart : undefined;
  const eventEnd =
    typeof sp.eventEnd === "string" ? sp.eventEnd : undefined;
  const eventSlug =
    typeof sp.eventSlug === "string" ? sp.eventSlug : undefined;
  const optimizeAround = sp.optimizeAround === "1";
  const initialDates =
    eventStart && eventEnd ? { start: eventStart, end: eventEnd } : undefined;

  // Params additionnels utilises pour la reprise d'un trip sauvegarde dans
  // le journal. Chaque valeur est validee contre l'enum / liste pour eviter
  // qu'un lien malveillant n'injecte un style ou un profil inattendu.
  const styleParam = typeof sp.style === "string" ? sp.style : undefined;
  const validStyles = Object.keys(styleConfig) as RouteStyle[];
  const initialStyle =
    initial.style ??
    (styleParam && validStyles.includes(styleParam as RouteStyle)
      ? (styleParam as RouteStyle)
      : undefined);

  const originSlug =
    typeof sp.origin === "string" && validSlugs.has(sp.origin)
      ? sp.origin
      : undefined;
  const destinationSlug =
    typeof sp.destination === "string" && validSlugs.has(sp.destination)
      ? sp.destination
      : undefined;

  const validProfiles: TravelProfile[] = ["solo", "couple", "family", "group"];
  const profileParam =
    typeof sp.profile === "string" &&
    validProfiles.includes(sp.profile as TravelProfile)
      ? (sp.profile as TravelProfile)
      : undefined;

  const validDiets: DietRestriction[] = ["halal"];
  const dietParam =
    typeof sp.diet === "string"
      ? (sp.diet
          .split(",")
          .map((s) => s.trim())
          .filter((s): s is DietRestriction =>
            validDiets.includes(s as DietRestriction),
          ) as DietRestriction[])
      : undefined;

  const interestsParam =
    typeof sp.interests === "string"
      ? (sp.interests
          .split(",")
          .map((s) => s.trim() as CityTag)
          .filter(Boolean) as CityTag[])
      : undefined;

  const tripId = typeof sp.tripId === "string" ? sp.tripId : undefined;

  return (
    <Container className="py-6 sm:py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {dict.routePlanner.title}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {dict.routePlanner.subtitle}
          </p>
        </div>
      </header>

      <div className="mt-5">
        <RouteBuilder
          cities={cities}
          locale={locale}
          dict={dict}
          initialCities={initial.cities}
          initialStyle={initialStyle}
          initialOriginSlug={originSlug}
          initialDestinationSlug={destinationSlug}
          initialProfile={profileParam}
          initialDiet={dietParam}
          initialInterests={interestsParam}
          initialDates={initialDates}
          initialEventSlug={eventSlug}
          initialOptimizeAround={optimizeAround}
          initialTripId={tripId}
          cityContext={cityContext}
        />
      </div>
    </Container>
  );
}
