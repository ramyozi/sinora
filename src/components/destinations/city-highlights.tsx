import {
  Building,
  Building2,
  Landmark,
  Mountain,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City, HighlightKind } from "@/data/cities";

// Icône associée à chaque type de point d'intérêt.
const kindIcon: Record<HighlightKind, LucideIcon> = {
  monument: Landmark,
  quartier: Building2,
  nature: Mountain,
  musee: Building,
};

// Incontournables d'une ville.
export function CityHighlights({
  city,
  locale,
  dict,
}: {
  city: City;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {dict.destinations.highlightsLabel}
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {city.highlights.map((highlight) => {
          const Icon = kindIcon[highlight.kind];
          return (
            <div
              key={highlight.name.fr}
              className="flex items-center gap-4 rounded-card border border-border bg-surface p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon className="size-5" />
              </span>
              <div>
                <div className="font-medium text-foreground">
                  {highlight.name[locale]}
                </div>
                <div className="text-xs text-muted">
                  {dict.labels.highlightKinds[highlight.kind]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
