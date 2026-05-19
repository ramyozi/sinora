import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import { localizedPath } from "@/lib/navigation";
import { Container } from "@/components/ui/container";
import { regionGradient } from "./region-gradient";

// En-tête de la page ville : retour, badge région, nom, accroche.
export function CityHero({
  city,
  locale,
  dict,
}: {
  city: City;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <header className={`bg-gradient-to-br ${regionGradient[city.region]}`}>
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
  );
}
