"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl, {
  type Map as MapLibreMap,
  type Marker,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City, CityRegion } from "@/data/cities";
import { localizedPath } from "@/lib/navigation";

interface Props {
  cities: City[];
  locale: Locale;
  dict: Dictionary;
}

const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

const regionColor: Record<CityRegion, string> = {
  nord: "#1f9d76",
  est: "#d8443a",
  sud: "#38b48c",
  "sud-ouest": "#c8943b",
  centre: "#f0594b",
  ouest: "#d8a651",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

// Vue exploration : carte de Chine + marqueurs colorés par région.
// Hover : popup synthétique. Clic : navigation vers la page ville.
export function ExplorationMap({ cities, locale, dict }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [activeRegion, setActiveRegion] = useState<CityRegion | "all">("all");

  // Calcul des cites par region (memoizé hors effet pour la legende).
  const groupedByRegion = useMemo(() => {
    const map = new Map<CityRegion, City[]>();
    for (const c of cities) {
      const list = map.get(c.region) ?? [];
      list.push(c);
      map.set(c.region, list);
    }
    return map;
  }, [cities]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = new maplibregl.Map({
      container,
      style: STYLE_URL,
      center: [105, 35],
      zoom: 3.4,
      attributionControl: { compact: true },
      cooperativeGestures: true,
      locale: {
        "CooperativeGesturesHandler.WindowsHelpText":
          dict.routePlanner.gestures.desktop,
        "CooperativeGesturesHandler.MacHelpText":
          dict.routePlanner.gestures.desktop,
        "CooperativeGesturesHandler.MobileHelpText":
          dict.routePlanner.gestures.mobile,
      },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    const path = (slug: string) =>
      localizedPath(`/destinations/${slug}`, locale);

    for (const city of cities) {
      const el = document.createElement("a");
      el.href = path(city.slug);
      el.setAttribute("aria-label", city.name[locale]);
      el.className = "exploration-marker";
      el.style.setProperty("--marker-color", regionColor[city.region]);
      el.innerHTML = `
        <span class="dot" aria-hidden="true"></span>
        <span class="name">${escapeHtml(city.name[locale])}</span>
        <div class="card" role="tooltip">
          <div class="region">${escapeHtml(dict.labels.regions[city.region])}</div>
          <div class="tagline">${escapeHtml(city.tagline[locale])}</div>
          <div class="cta">${escapeHtml(dict.destinations.exploration.view)}</div>
        </div>
      `;
      // offset [0, -6] : compense la moitie de la hauteur du dot (12px) pour
      // que son centre s'aligne pile sur la coord, et pas 6px en dessous.
      const marker = new maplibregl.Marker({
        element: el,
        anchor: "top",
        offset: [0, -6],
      })
        .setLngLat([city.coordinates.lng, city.coordinates.lat])
        .addTo(map);
      markersRef.current.push(marker);
    }

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [cities, locale, dict]);

  // Application du filtre region : on cache les marqueurs hors region active.
  useEffect(() => {
    for (let i = 0; i < cities.length; i++) {
      const marker = markersRef.current[i];
      if (!marker) continue;
      const el = marker.getElement();
      const matches = activeRegion === "all" || cities[i].region === activeRegion;
      el.style.opacity = matches ? "1" : "0.18";
      el.style.pointerEvents = matches ? "auto" : "none";
    }

    if (activeRegion === "all") {
      mapRef.current?.flyTo({ center: [105, 35], zoom: 3.4, duration: 800 });
    } else {
      const cityList = cities.filter((c) => c.region === activeRegion);
      if (cityList.length === 0) return;
      const bounds = cityList.reduce(
        (b, c) => b.extend([c.coordinates.lng, c.coordinates.lat]),
        new maplibregl.LngLatBounds(
          [cityList[0].coordinates.lng, cityList[0].coordinates.lat],
          [cityList[0].coordinates.lng, cityList[0].coordinates.lat],
        ),
      );
      mapRef.current?.fitBounds(bounds, { padding: 80, maxZoom: 6, duration: 800 });
    }
  }, [activeRegion, cities]);

  const exp = dict.destinations.exploration;
  const regionsOrdered: CityRegion[] = [
    "nord",
    "est",
    "sud",
    "sud-ouest",
    "centre",
    "ouest",
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveRegion("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            activeRegion === "all"
              ? "border-foreground bg-foreground text-background"
              : "border-border text-foreground hover:border-accent"
          }`}
        >
          {exp.allRegions}
        </button>
        {regionsOrdered.map((r) => {
          const count = groupedByRegion.get(r)?.length ?? 0;
          if (count === 0) return null;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setActiveRegion(r)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeRegion === r
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-foreground hover:border-accent/60"
              }`}
            >
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ background: regionColor[r] }}
              />
              {dict.labels.regions[r]}
              <span className="text-muted">{count}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={containerRef}
        className="relative h-[70vh] w-full overflow-hidden rounded-card border border-border"
        role="application"
        aria-label={exp.mapLabel}
      />

      {activeRegion !== "all" && (
        <div className="rounded-card border border-border bg-surface p-4">
          <div className="text-xs uppercase tracking-wide text-muted">
            {dict.labels.regions[activeRegion]}
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {(groupedByRegion.get(activeRegion) ?? []).map((c) => (
              <li key={c.slug}>
                <Link
                  href={localizedPath(`/destinations/${c.slug}`, locale)}
                  className="flex items-baseline gap-2 rounded-card px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface-muted"
                >
                  <span className="font-medium">{c.name[locale]}</span>
                  <span className="text-muted">{c.tagline[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
