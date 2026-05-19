import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  BUDGETS,
  REGIONS,
  SEASONS,
  TAGS,
  type BudgetTier,
  type CityFilter,
  type CityRegion,
  type CityTag,
  type Season,
  filterCities,
  getAllCities,
  sortCitiesByName,
} from "@/data/cities";
import { Container } from "@/components/ui/container";
import { CityCard } from "@/components/destinations/city-card";
import { FilterBar } from "@/components/destinations/filter-bar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.destinations.meta.title,
    description: dict.destinations.meta.description,
    alternates: { canonical: `/${locale}/destinations` },
  };
}

// Valide une valeur d'URL contre la liste autorisée, sinon renvoie undefined.
function pickValid<T extends string>(
  value: unknown,
  allowed: readonly T[],
): T | undefined {
  return typeof value === "string" &&
    (allowed as readonly string[]).includes(value)
    ? (value as T)
    : undefined;
}

export default async function DestinationsPage({
  params,
  searchParams,
}: PageProps<"/[locale]/destinations">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const sp = await searchParams;
  const dict = await getDictionary(locale);

  const criteria: CityFilter = {
    region: pickValid<CityRegion>(sp.region, REGIONS),
    season: pickValid<Season>(sp.season, SEASONS),
    budget: pickValid<BudgetTier>(sp.budget, BUDGETS),
    tag: pickValid<CityTag>(sp.tag, TAGS),
  };
  const cities = sortCitiesByName(
    filterCities(getAllCities(), criteria),
    locale,
  );

  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          {cities.length} {dict.destinations.cities}
        </span>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.destinations.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.destinations.subtitle}
        </p>
      </header>

      <div className="mt-10">
        <FilterBar dict={dict} />
      </div>

      {cities.length > 0 ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <CityCard
              key={city.slug}
              city={city}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-card border border-border bg-surface p-10 text-center text-muted">
          {dict.destinations.filters.noResults}
        </p>
      )}
    </Container>
  );
}
