import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCityBySlug, getCitySlugs } from "@/data/cities";
import { localizedPath } from "@/lib/navigation";
import { getWeather } from "@/lib/api/providers/weather";
import { Container } from "@/components/ui/container";
import { CityFacts } from "@/components/destinations/city-facts";
import { CityHighlights } from "@/components/destinations/city-highlights";
import { WeatherCard } from "@/components/destinations/weather-card";
import { regionGradient } from "@/components/destinations/region-gradient";

// L'ensemble des villes est connu : pas de route dynamique au-delà.
export const dynamicParams = false;

export function generateStaticParams() {
  return getCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const city = getCityBySlug(slug);
  if (!isLocale(locale) || !city) return {};

  const name = city.name[locale];
  return {
    title: `${name} — Sinora`,
    description: city.summary[locale],
    alternates: { canonical: `/${locale}/destinations/${slug}` },
    openGraph: {
      title: `${name} — Sinora`,
      description: city.tagline[locale],
      type: "article",
    },
  };
}

export default async function CityPage({
  params,
}: PageProps<"/[locale]/destinations/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const city = getCityBySlug(slug);
  if (!city) notFound();

  const [dict, weather] = await Promise.all([
    getDictionary(locale),
    getWeather(city.coordinates.lat, city.coordinates.lng),
  ]);

  return (
    <article>
      <header
        className={`bg-gradient-to-br ${regionGradient[city.region]}`}
      >
        <Container className="py-10 sm:py-14">
          <Link
            href={localizedPath("/destinations", locale)}
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {dict.destinations.back}
          </Link>

          <span className="mt-6 inline-block rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
            {dict.labels.regions[city.region]}
          </span>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {city.name[locale]}
          </h1>
          <p className="mt-2 text-pretty text-lg text-muted">
            {city.tagline[locale]}
          </p>
        </Container>
      </header>

      <Container className="space-y-12 py-12 sm:py-16">
        <CityFacts city={city} dict={dict} />

        <WeatherCard weather={weather} locale={locale} dict={dict} />

        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {dict.destinations.overviewLabel}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">
            {city.summary[locale]}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {city.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
              >
                {dict.labels.tags[tag]}
              </span>
            ))}
          </div>
        </section>

        <CityHighlights city={city} locale={locale} dict={dict} />
      </Container>
    </article>
  );
}
