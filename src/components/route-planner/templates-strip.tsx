"use client";

import {
  Building2,
  Compass,
  Footprints,
  Landmark,
  MoonStar,
  Mountain,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { RouteTemplate } from "@/data/routes/templates";
import { routeTemplates } from "@/data/routes/templates";

const iconMap: Record<RouteTemplate["icon"], LucideIcon> = {
  landmark: Landmark,
  mountain: Mountain,
  compass: Compass,
  "building-2": Building2,
  footprints: Footprints,
  "moon-star": MoonStar,
};

type TemplateSlug = keyof Dictionary["routePlanner"]["templates"]["items"];

interface Props {
  dict: Dictionary;
  onLoad: (template: RouteTemplate) => void;
}

// Strip horizontale d'itinéraires-types à charger d'un clic.
export function TemplatesStrip({ dict, onLoad }: Props) {
  const t = dict.routePlanner.templates;

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header>
        <h2 className="text-base font-semibold text-foreground">{t.title}</h2>
        <p className="mt-1 text-xs text-muted">{t.subtitle}</p>
      </header>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {routeTemplates.map((tpl) => {
          const Icon = iconMap[tpl.icon];
          const meta = t.items[tpl.slug as TemplateSlug];
          return (
            <button
              key={tpl.slug}
              type="button"
              onClick={() => onLoad(tpl)}
              className="group flex flex-col rounded-card border border-border bg-background p-4 text-left transition-colors hover:border-accent/40"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="size-4" />
              </span>
              <div className="mt-3 text-sm font-semibold text-foreground">
                {meta.name}
              </div>
              <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                {meta.summary}
              </div>
              <span className="mt-3 inline-block text-xs font-medium text-accent">
                {t.load} →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
