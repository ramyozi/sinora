"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CityPOI, POICategory } from "@/data/cities";

// Tuiles vectorielles libres et sans clé.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

const categoryEmoji: Record<POICategory, string> = {
  monument: "🏛️",
  quartier: "🏘️",
  marche: "🍢",
  vue: "🌆",
  experience: "✨",
  spot: "📍",
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

// Carte centree sur la ville, avec marqueur principal et POI cliquables.
// Le clic sur un POI fait defiler vers la carte correspondante dans la grille
// "A ne pas rater". Le survol affiche un mini apercu.
export function CityMap({
  lat,
  lng,
  label,
  pois = [],
  locale,
  dict,
}: {
  lat: number;
  lng: number;
  label: string;
  pois?: CityPOI[];
  locale: Locale;
  dict: Dictionary;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = new maplibregl.Map({
      container,
      style: STYLE_URL,
      center: [lng, lat],
      zoom: pois.length > 0 ? 11.5 : 10,
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
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );

    // Marqueur central de la ville.
    const cityDot = document.createElement("div");
    cityDot.className =
      "size-3 rounded-full bg-accent ring-4 ring-accent/30";
    new maplibregl.Marker({ element: cityDot })
      .setLngLat([lng, lat])
      .addTo(map);

    // POI cliquables : ancre href = #poi-{slug} pour focus + scroll natif.
    const pi = dict.destinations.pois;
    for (const poi of pois) {
      const el = document.createElement("a");
      el.className = "city-poi-marker";
      el.href = `#poi-${poi.slug}`;
      el.setAttribute("aria-label", poi.name[locale]);
      el.innerHTML = `
        <span class="bubble" aria-hidden="true">${categoryEmoji[poi.category]}</span>
        <span class="label">${escapeHtml(poi.name[locale])}</span>
        <div class="popover" role="tooltip">
          <div class="cat">${escapeHtml(pi.categories[poi.category])}</div>
          <div class="title">${escapeHtml(poi.name[locale])}</div>
          <div class="desc">${escapeHtml(poi.description[locale])}</div>
        </div>
      `;
      // La bulle (.bubble, 30px) est au-dessus du label. Avec anchor "bottom"
      // la coord se retrouvait au BAS du label, soit ~34px sous la vraie POI.
      // anchor "top" + offset [0, -15] place le centre de la bulle pile sur
      // la coordonnee : le label hang naturellement en dessous.
      new maplibregl.Marker({ element: el, anchor: "top", offset: [0, -15] })
        .setLngLat([poi.coordinates.lng, poi.coordinates.lat])
        .addTo(map);
    }

    // Adapter le cadrage pour englober tous les POI plus le centre ville.
    if (pois.length > 0) {
      const bounds = new maplibregl.LngLatBounds([lng, lat], [lng, lat]);
      for (const poi of pois) {
        bounds.extend([poi.coordinates.lng, poi.coordinates.lat]);
      }
      map.fitBounds(bounds, { padding: 60, maxZoom: 12.5, duration: 0 });
    }

    return () => {
      map.remove();
    };
  }, [lat, lng, pois, locale, dict]);

  return (
    <div className="overflow-hidden rounded-card border border-border">
      <div
        ref={containerRef}
        className="h-80 w-full sm:h-96"
        role="img"
        aria-label={label}
      />
    </div>
  );
}
