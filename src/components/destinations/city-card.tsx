import Link from "next/link";
import { CalendarRange } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City, CityRegion } from "@/data/cities";
import { localizedPath } from "@/lib/navigation";

// Dégradé par région, pour distinguer les cartes d'un coup d'œil.
const regionGradient: Record<CityRegion, string> = {
  nord: "from-jade/25 via-jade/5 to-transparent",
  est: "from-accent/25 via-gold/10 to-transparent",
  sud: "from-jade/30 via-accent/10 to-transparent",
  "sud-ouest": "from-gold/30 via-jade/10 to-transparent",
  centre: "from-accent/30 via-accent/5 to-transparent",
  ouest: "from-gold/35 via-gold/10 to-transparent",
};

// Carte d'une destination, vers sa page détaillée.
export function CityCard({
  city,
  locale,
  dict,
}: {
  city: City;
  locale: Locale;
  dict: Dictionary;
}) {
  const [minStay, maxStay] = city.recommendedStay;

  return (
    <Link
      href={localizedPath(`/destinations/${city.slug}`, locale)}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-accent/40"
    >
      <div
        className={`relative flex h-44 items-end bg-gradient-to-br p-5 ${regionGradient[city.region]}`}
      >
        <span className="absolute right-4 top-4 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-muted backdrop-blur">
          {dict.labels.regions[city.region]}
        </span>
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          {city.name[locale]}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">{city.tagline[locale]}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {city.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-foreground"
            >
              {dict.labels.tags[tag]}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted">
          <CalendarRange className="size-3.5" />
          {minStay}–{maxStay} {dict.destinations.days}
        </div>
      </div>
    </Link>
  );
}
