"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type Map as MapLibreMap, type Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import { connections } from "@/data/routes";

// Échappement HTML basique pour injection sûre via innerHTML.
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

const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const NETWORK_SOURCE = "sinora-network";
const NETWORK_LAYER = "sinora-network-lines";
const ROUTE_SOURCE = "sinora-route";
const ROUTE_LAYER = "sinora-route-line";

interface Props {
  cities: City[];
  locale: Locale;
  dict: Dictionary;
  selectedOrder: string[];
  onToggle: (slug: string) => void;
}

// Carte interactive : chaque ville est un marqueur cliquable.
// La ligne d'itinéraire est mise à jour en temps réel.
export function RouteMap({
  cities,
  locale,
  dict,
  selectedOrder,
  onToggle,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const onToggleRef = useRef(onToggle);
  const styleLoadedRef = useRef(false);

  // Garder la dernière fonction onToggle accessible sans re-créer la carte.
  useEffect(() => {
    onToggleRef.current = onToggle;
  });

  // Création de la carte et des marqueurs : une seule fois.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const markers = markersRef.current;

    const map = new maplibregl.Map({
      container,
      style: STYLE_URL,
      center: [105, 35],
      zoom: 3.5,
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );
    mapRef.current = map;

    // Calque réseau : toutes les connexions du graphe, en transparence.
    const cityBySlug = new Map(cities.map((c) => [c.slug, c]));
    const networkFeatures = connections
      .map((conn) => {
        const from = cityBySlug.get(conn.from);
        const to = cityBySlug.get(conn.to);
        if (!from || !to) return null;
        return {
          type: "Feature" as const,
          geometry: {
            type: "LineString" as const,
            coordinates: [
              [from.coordinates.lng, from.coordinates.lat],
              [to.coordinates.lng, to.coordinates.lat],
            ],
          },
          properties: { mode: conn.mode },
        };
      })
      .filter((f): f is NonNullable<typeof f> => f !== null);

    map.on("load", () => {
      map.addSource(NETWORK_SOURCE, {
        type: "geojson",
        data: { type: "FeatureCollection", features: networkFeatures },
      });
      // Vols en pointillés, train/HSR/bus en trait plein discret.
      map.addLayer({
        id: NETWORK_LAYER,
        type: "line",
        source: NETWORK_SOURCE,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": [
            "match",
            ["get", "mode"],
            "flight",
            "#c8943b",
            "hsr",
            "#9a9288",
            "train",
            "#9a9288",
            "bus",
            "#9a9288",
            "#9a9288",
          ],
          "line-width": 1.4,
          "line-opacity": 0.35,
          "line-dasharray": [
            "case",
            ["==", ["get", "mode"], "flight"],
            ["literal", [2, 3]],
            ["literal", [1, 0]],
          ],
        },
      });

      map.addSource(ROUTE_SOURCE, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: [] },
          properties: {},
        },
      });
      map.addLayer({
        id: ROUTE_LAYER,
        type: "line",
        source: ROUTE_SOURCE,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#d8443a",
          "line-width": 3,
          "line-dasharray": [2, 1.5],
        },
      });
      styleLoadedRef.current = true;
    });

    for (const city of cities) {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "route-marker";
      el.setAttribute("aria-label", city.name[locale]);
      const tagsHtml = city.tags
        .slice(0, 3)
        .map(
          (t) =>
            `<span class="tag">${escapeHtml(dict.labels.tags[t])}</span>`,
        )
        .join("");
      const [minStay, maxStay] = city.recommendedStay;
      el.innerHTML = `
        <span class="dot" aria-hidden="true"></span>
        <span class="badge" aria-hidden="true"></span>
        <span class="name">${escapeHtml(city.name[locale])}</span>
        <div class="info-card" role="tooltip">
          <div class="region">${escapeHtml(dict.labels.regions[city.region])}</div>
          <div class="tagline">${escapeHtml(city.tagline[locale])}</div>
          <div class="meta">
            <span class="stay">${minStay}–${maxStay} ${escapeHtml(dict.destinations.days)}</span>
            <span class="tags">${tagsHtml}</span>
          </div>
        </div>
      `;
      el.addEventListener("click", () => onToggleRef.current(city.slug));

      const marker = new maplibregl.Marker({ element: el, anchor: "top" })
        .setLngLat([city.coordinates.lng, city.coordinates.lat])
        .addTo(map);
      markers.set(city.slug, marker);
    }

    return () => {
      markers.forEach((m) => m.remove());
      markers.clear();
      map.remove();
      mapRef.current = null;
      styleLoadedRef.current = false;
    };
  }, [cities, locale, dict]);

  // Mise à jour de la sélection : classes des marqueurs + tracé.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker, slug) => {
      const idx = selectedOrder.indexOf(slug);
      const el = marker.getElement();
      el.classList.toggle("selected", idx >= 0);
      const badge = el.querySelector(".badge");
      if (badge) badge.textContent = idx >= 0 ? String(idx + 1) : "";
    });

    const coordinates: [number, number][] = selectedOrder
      .map((slug) => cities.find((c) => c.slug === slug))
      .filter((c): c is City => Boolean(c))
      .map((c) => [c.coordinates.lng, c.coordinates.lat]);

    const updateLine = () => {
      const source = map.getSource(ROUTE_SOURCE) as
        | maplibregl.GeoJSONSource
        | undefined;
      if (!source) return;
      source.setData({
        type: "Feature",
        geometry: { type: "LineString", coordinates },
        properties: {},
      });
    };

    if (styleLoadedRef.current) {
      updateLine();
    } else {
      map.once("load", updateLine);
    }
  }, [selectedOrder, cities]);

  return (
    <div
      ref={containerRef}
      className="h-[60vh] w-full overflow-hidden rounded-card border border-border"
      role="application"
      aria-label="Carte interactive du Route Planner"
    />
  );
}
