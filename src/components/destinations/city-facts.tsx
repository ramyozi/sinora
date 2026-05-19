import { CalendarRange, Sun, Users, Wallet } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";

// Repères clés d'une ville, présentés en cartes synthétiques.
export function CityFacts({
  city,
  dict,
}: {
  city: City;
  dict: Dictionary;
}) {
  const facts = [
    {
      icon: Users,
      label: dict.destinations.populationLabel,
      value: `${city.population} ${dict.destinations.millionShort}`,
    },
    {
      icon: CalendarRange,
      label: dict.destinations.stayLabel,
      value: `${city.recommendedStay[0]}–${city.recommendedStay[1]} ${dict.destinations.days}`,
    },
    {
      icon: Wallet,
      label: dict.destinations.budgetLabel,
      value: dict.labels.budget[city.budgetTier],
    },
    {
      icon: Sun,
      label: dict.destinations.bestSeasonLabel,
      value: city.bestSeasons
        .map((season) => dict.labels.seasons[season])
        .join(" · "),
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="rounded-card border border-border bg-surface p-5"
        >
          <fact.icon className="size-5 text-accent" />
          <div className="mt-3 text-xs uppercase tracking-wide text-muted">
            {fact.label}
          </div>
          <div className="mt-1 text-base font-semibold text-foreground">
            {fact.value}
          </div>
        </div>
      ))}
    </div>
  );
}
