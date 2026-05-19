import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getFeaturedCities } from "@/data/cities";
import { Container } from "@/components/ui/container";
import { CityCard } from "@/components/destinations/city-card";
import { SectionHeading } from "./how-it-works";

// Aperçu des destinations mises en avant, depuis le dataset partagé.
export function Cities({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const cities = getFeaturedCities();

  return (
    <section
      id="cities"
      className="scroll-mt-20 border-t border-border bg-surface py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          title={dict.cities.title}
          subtitle={dict.cities.subtitle}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <CityCard
              key={city.slug}
              city={city}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
