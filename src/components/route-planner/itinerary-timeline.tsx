import { ArrowDown } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type { Connection } from "@/data/routes";

interface Props {
  cities: City[];
  segments: (Connection | undefined)[];
  locale: Locale;
  dict: Dictionary;
}

// Vue chronologique verticale de l'itinéraire avec segments détaillés.
export function ItineraryTimeline({
  cities,
  segments,
  locale,
  dict,
}: Props) {
  if (cities.length < 2) return null;
  const rp = dict.routePlanner;

  return (
    <section className="rounded-card border border-border bg-surface p-6">
      <header>
        <h2 className="text-lg font-semibold text-foreground">
          {rp.timeline.title}
        </h2>
        <p className="mt-1 text-xs text-muted">{rp.timeline.subtitle}</p>
      </header>

      <ol className="mt-6 space-y-4">
        {cities.map((city, idx) => {
          const isLast = idx === cities.length - 1;
          const segment = !isLast ? segments[idx] : undefined;
          const [minStay, maxStay] = city.recommendedStay;
          return (
            <li key={city.slug}>
              <article className="flex gap-4 rounded-card border border-border bg-background p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {city.name[locale]}
                    </h3>
                    <span className="text-xs text-muted">
                      {dict.labels.regions[city.region]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {city.tagline[locale]}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {rp.timeline.stay} : {minStay}–{maxStay}{" "}
                    {dict.destinations.days}
                  </p>
                </div>
              </article>
              {!isLast && (
                <div className="ml-4 my-2 flex items-center gap-3 text-xs text-muted">
                  <ArrowDown className="size-3.5 shrink-0" />
                  {segment ? (
                    <span>
                      {segment.durationHours} {rp.hours} · {rp.modes[segment.mode]}{" "}
                      · {segment.distanceKm} {rp.km} · {segment.priceCNY[0]}–
                      {segment.priceCNY[1]} {rp.cny}
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
