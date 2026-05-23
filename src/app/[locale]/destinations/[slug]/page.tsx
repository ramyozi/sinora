import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarRange, Compass, MapPin } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCityBySlug, getCitySlugs } from "@/data/cities";
import { localizedPath } from "@/lib/navigation";
import { getAirQuality } from "@/lib/api/providers/air-quality";
import { getWeather } from "@/lib/api/providers/weather";
import { getWikiGallery } from "@/lib/api/providers/wiki-gallery";
import { getWikiLeadImage } from "@/lib/api/providers/wiki-image";
import { Container } from "@/components/ui/container";
import { CityFacts } from "@/components/destinations/city-facts";
import { CityGallery } from "@/components/destinations/city-gallery";
import { CityHero } from "@/components/destinations/city-hero";
import { CityHighlights } from "@/components/destinations/city-highlights";
import { CityIdentitySection } from "@/components/destinations/city-identity";
import { CityPOIs } from "@/components/destinations/city-pois";
import { CityStickyCTA } from "@/components/destinations/city-sticky-cta";
import { AirQualityCard } from "@/components/destinations/air-quality-card";
import { CityMap } from "@/components/destinations/city-map";
import { WeatherCard } from "@/components/destinations/weather-card";

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
    title: `${name} - Sinora`,
    description: city.summary[locale],
    alternates: { canonical: `/${locale}/destinations/${slug}` },
    openGraph: {
      title: `${name} - Sinora`,
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

  const pois = city.pointsOfInterest ?? [];
  const [dict, weather, aqi, image, gallery, poiImages] = await Promise.all([
    getDictionary(locale),
    getWeather(city.coordinates.lat, city.coordinates.lng),
    getAirQuality(city.coordinates.lat, city.coordinates.lng),
    getWikiLeadImage(city.wikiTitle),
    getWikiGallery(city.wikiTitle, 6),
    Promise.all(
      pois.map((p) =>
        p.wikiTitle ? getWikiLeadImage(p.wikiTitle) : Promise.resolve(null),
      ),
    ),
  ]);

  return (
    <article>
      <CityStickyCTA
        slug={city.slug}
        cityName={city.name[locale]}
        label={dict.destinations.addToPlanner}
        locale={locale}
      />
      <CityHero city={city} locale={locale} dict={dict} image={image} />

      <Container className="space-y-12 py-12 sm:py-16">
        <CityFacts city={city} dict={dict} />

        <WeatherCard weather={weather} locale={locale} dict={dict} />

        <AirQualityCard aqi={aqi} dict={dict} />

        <section>
          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
            {dict.destinations.locationLabel}
          </h2>
          <CityMap
            lat={city.coordinates.lat}
            lng={city.coordinates.lng}
            label={`${dict.destinations.locationLabel} - ${city.name[locale]}`}
            pois={pois}
            locale={locale}
            dict={dict}
          />
        </section>

        <CityPOIs pois={pois} images={poiImages} locale={locale} dict={dict} />

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

        {/* Explorer cette ville : deep links vers activites et evenements,
            filtres URL deja appliques (city=slug). */}
        <section className="rounded-card border border-border bg-surface p-5 sm:p-6">
          <header>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
              <Compass className="size-3.5 text-accent" />
              {dict.destinations.explore.title}
            </div>
            <p className="mt-1 text-sm text-muted">
              {dict.destinations.explore.subtitle}
            </p>
          </header>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Link
              href={`${localizedPath("/activites", locale)}?city=${city.slug}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
            >
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-accent" />
                {dict.destinations.explore.activities}
              </span>
              <span className="text-xs text-muted">{city.name[locale]}</span>
            </Link>
            <Link
              href={`${localizedPath("/events", locale)}?city=${city.slug}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
            >
              <span className="inline-flex items-center gap-2">
                <CalendarRange className="size-4 text-accent" />
                {dict.destinations.explore.events}
              </span>
              <span className="text-xs text-muted">{city.name[locale]}</span>
            </Link>
          </div>
        </section>

        <CityIdentitySection city={city} locale={locale} dict={dict} />

        <CityGallery images={gallery} title={city.name[locale]} dict={dict} />
      </Container>
    </article>
  );
}
