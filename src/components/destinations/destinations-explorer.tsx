"use client";

import { useState } from "react";
import { LayoutGrid, Map } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { CityCard } from "./city-card";
import { ExplorationMap } from "./exploration-map";

type View = "map" | "grid";

interface Props {
  cities: City[];
  locale: Locale;
  dict: Dictionary;
  imageBySlug: Record<string, WikiLeadImage | null>;
}

// Toggle entre exploration carte et grille de cartes ville.
export function DestinationsExplorer({
  cities,
  locale,
  dict,
  imageBySlug,
}: Props) {
  const [view, setView] = useState<View>("map");
  const exp = dict.destinations.exploration;

  return (
    <div>
      <div className="flex items-center justify-end">
        <div
          role="tablist"
          aria-label={exp.viewSwitchLabel}
          className="inline-flex rounded-full border border-border bg-surface p-1 text-sm"
        >
          <button
            type="button"
            role="tab"
            aria-selected={view === "map"}
            onClick={() => setView("map")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
              view === "map"
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Map className="size-3.5" />
            {exp.viewMap}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "grid"}
            onClick={() => setView("grid")}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors ${
              view === "grid"
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            <LayoutGrid className="size-3.5" />
            {exp.viewGrid}
          </button>
        </div>
      </div>

      <div className="mt-4">
        {view === "map" ? (
          <ExplorationMap cities={cities} locale={locale} dict={dict} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <CityCard
                key={city.slug}
                city={city}
                locale={locale}
                dict={dict}
                image={imageBySlug[city.slug] ?? null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
