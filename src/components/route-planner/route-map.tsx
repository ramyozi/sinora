"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type Map as MapLibreMap, type Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import {
  connections,
  type Connection,
  type ResolvedSegment,
} from "@/data/routes";

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

// Construit le contenu HTML du tooltip premium d'un segment.
function buildSegmentTooltip(
  seg: Connection,
  cities: City[],
  locale: Locale,
  dict: Dictionary,
): string {
  const from = cities.find((c) => c.slug === seg.from);
  const to = cities.find((c) => c.slug === seg.to);
  if (!from || !to) return "";
  const rp = dict.routePlanner;
  const st = rp.segmentTooltip;
  const chips: string[] = [];
  if (typeof seg.fatigue === "number") {
    const warn = seg.fatigue >= 4 ? " warn" : "";
    chips.push(
      `<span class="chip${warn}">${escapeHtml(st.fatigue)} ${seg.fatigue}/5</span>`,
    );
  }
  if (typeof seg.scenic === "number") {
    chips.push(
      `<span class="chip">${escapeHtml(st.scenic)} ${seg.scenic}/5</span>`,
    );
  }
  if (seg.overnightCapable) {
    chips.push(`<span class="chip">${escapeHtml(st.overnight)}</span>`);
  }
  if (seg.crowdedPeriods && seg.crowdedPeriods.length > 0) {
    chips.push(`<span class="chip warn">${escapeHtml(st.crowded)}</span>`);
  }
  const note = seg.note ? escapeHtml(seg.note[locale]) : null;
  return `
    <div class="sinora-segment-card">
      <div class="head">
        <span>${escapeHtml(from.name[locale])}</span>
        <span class="arrow">→</span>
        <span>${escapeHtml(to.name[locale])}</span>
      </div>
      <div class="row">
        <span class="strong">${seg.durationHours} ${escapeHtml(rp.hours)}</span>
        <span>·</span>
        <span>${escapeHtml(rp.modes[seg.mode])}</span>
        <span>·</span>
        <span>${seg.distanceKm} ${escapeHtml(rp.km)}</span>
        <span>·</span>
        <span>${seg.priceCNY[0]}–${seg.priceCNY[1]} ${escapeHtml(rp.cny)}</span>
      </div>
      ${chips.length ? `<div class="chips">${chips.join("")}</div>` : ""}
      ${note ? `<p class="note">${note}</p>` : ""}
    </div>
  `;
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
  /** Segments calculés pour l'ordre courant (undefined si pas de connexion directe). */
  segments: (import("@/data/routes").Connection | undefined)[];
  /** Découpe résolue avec villes intermédiaires éventuelles. */
  resolved: ResolvedSegment[];
  /** Slug d'une ville actuellement survolée dans le panneau de suggestions. */
  hoveredSlug?: string | null;
  onToggle: (slug: string) => void;
}

// Carte interactive : chaque ville est un marqueur cliquable.
// La ligne d'itinéraire est mise à jour en temps réel.
export function RouteMap({
  cities,
  locale,
  dict,
  selectedOrder,
  segments,
  resolved,
  hoveredSlug,
  onToggle,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const onToggleRef = useRef(onToggle);
  const styleLoadedRef = useRef(false);

  // Contexte utilisé par les handlers de popup (segments + dict + cities + locale).
  // Maintenu à jour via une ref pour ne pas recréer la carte à chaque rendu.
  const segmentCtxRef = useRef({ segments, cities, locale, dict });

  // Garder la dernière fonction onToggle accessible sans re-créer la carte.
  useEffect(() => {
    onToggleRef.current = onToggle;
  });

  useEffect(() => {
    segmentCtxRef.current = { segments, cities, locale, dict };
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
      locale: {
        "CooperativeGesturesHandler.WindowsHelpText": dict.routePlanner.gestures.desktop,
        "CooperativeGesturesHandler.MacHelpText": dict.routePlanner.gestures.desktop,
        "CooperativeGesturesHandler.MobileHelpText": dict.routePlanner.gestures.mobile,
      },
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

    let dashAnimationId: number | null = null;

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
        data: { type: "FeatureCollection", features: [] },
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

      // Popup interactif au survol de la ligne d'itinéraire.
      let activePopup: maplibregl.Popup | null = null;
      let activeIndex: number | null = null;
      map.on("mousemove", ROUTE_LAYER, (e) => {
        map.getCanvas().style.cursor = "pointer";
        const feature = e.features?.[0];
        if (!feature) return;
        const idx = (feature.properties?.index ?? -1) as number;
        if (idx === activeIndex && activePopup) {
          activePopup.setLngLat(e.lngLat);
          return;
        }
        activeIndex = idx;
        const ctx = segmentCtxRef.current;
        const seg = ctx.segments[idx];
        if (!seg) return;
        const html = buildSegmentTooltip(
          seg,
          ctx.cities,
          ctx.locale,
          ctx.dict,
        );
        activePopup?.remove();
        activePopup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 12,
          className: "sinora-segment-popup",
          maxWidth: "300px",
        })
          .setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map);
      });
      // Flux de tirets animé sur la ligne d'itinéraire : effet "marche" Google Maps.
      const dashSequence: [number, number, number, number][] = [
        [0, 0.5, 3, 3.5],
        [0, 1, 3, 3],
        [0, 1.5, 3, 2.5],
        [0, 2, 3, 2],
        [0, 2.5, 3, 1.5],
        [0, 3, 3, 1],
        [0, 3.5, 3, 0.5],
        [0, 4, 3, 0],
        [0.5, 4, 2.5, 0],
        [1, 4, 2, 0],
        [1.5, 4, 1.5, 0],
        [2, 4, 1, 0],
        [2.5, 4, 0.5, 0],
        [3, 4, 0, 0],
      ];
      let dashStep = -1;
      const animate = (timestamp: number) => {
        const next = Math.floor(timestamp / 70) % dashSequence.length;
        if (next !== dashStep) {
          map.setPaintProperty(
            ROUTE_LAYER,
            "line-dasharray",
            dashSequence[next],
          );
          dashStep = next;
        }
        dashAnimationId = requestAnimationFrame(animate);
      };
      dashAnimationId = requestAnimationFrame(animate);

      map.on("mouseleave", ROUTE_LAYER, () => {
        map.getCanvas().style.cursor = "";
        activePopup?.remove();
        activePopup = null;
        activeIndex = null;
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
      if (dashAnimationId !== null) cancelAnimationFrame(dashAnimationId);
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

    // Un Feature par segment. Pour les sauts indirects, on enchaîne les
    // tronçons du plus court chemin afin de tracer un trait réaliste sur le réseau.
    const cityCoord = new Map(
      cities.map(
        (c) =>
          [c.slug, [c.coordinates.lng, c.coordinates.lat] as [number, number]] as const,
      ),
    );
    const segmentFeatures: GeoJSON.Feature[] = [];
    for (let i = 0; i < selectedOrder.length - 1; i++) {
      const fromSlug = selectedOrder[i];
      const toSlug = selectedOrder[i + 1];
      const fromCoord = cityCoord.get(fromSlug);
      const toCoord = cityCoord.get(toSlug);
      if (!fromCoord || !toCoord) continue;
      const seg = resolved[i];
      const indirect = seg && !seg.direct && seg.connections.length > 0;

      let lineCoords: [number, number][];
      if (indirect && seg) {
        const pathCoords: [number, number][] = [fromCoord];
        let cursor = fromSlug;
        for (const conn of seg.connections) {
          const next = conn.from === cursor ? conn.to : conn.from;
          const nc = cityCoord.get(next);
          if (nc) pathCoords.push(nc);
          cursor = next;
        }
        lineCoords = pathCoords;
      } else {
        lineCoords = [fromCoord, toCoord];
      }

      segmentFeatures.push({
        type: "Feature",
        geometry: { type: "LineString", coordinates: lineCoords },
        properties: { index: i, indirect: Boolean(indirect) },
      });
    }

    const updateLine = () => {
      const source = map.getSource(ROUTE_SOURCE) as
        | maplibregl.GeoJSONSource
        | undefined;
      if (!source) return;
      source.setData({
        type: "FeatureCollection",
        features: segmentFeatures,
      });
    };

    if (styleLoadedRef.current) {
      updateLine();
    } else {
      map.once("load", updateLine);
    }

    // Recadrage souple sur l'itinéraire courant dès qu'il y a au moins
    // une ville sélectionnée. Ignoré si l'itinéraire est vide.
    if (coordinates.length >= 1) {
      const bounds = coordinates.reduce(
        (acc, c) => acc.extend(c),
        new maplibregl.LngLatBounds(coordinates[0], coordinates[0]),
      );
      map.fitBounds(bounds, {
        padding: 80,
        maxZoom: 7,
        duration: 600,
      });
    }
  }, [selectedOrder, cities, resolved]);

  // Synchronisation du marqueur survolé (depuis le panneau de suggestions).
  useEffect(() => {
    markersRef.current.forEach((marker, slug) => {
      marker.getElement().classList.toggle("hovered", slug === hoveredSlug);
    });
  }, [hoveredSlug]);

  const showHint = selectedOrder.length === 0;

  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-card border border-border">
      <div
        ref={containerRef}
        className="h-full w-full"
        role="application"
        aria-label="Carte interactive du Route Planner"
      />
      {showHint && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-6 z-10 -translate-x-1/2 rounded-full border border-border bg-background/90 px-4 py-2 text-center text-sm shadow-sm backdrop-blur"
        >
          <span className="font-medium text-foreground">
            {dict.routePlanner.mapHint.title}
          </span>
          <span className="ml-2 text-muted">
            {dict.routePlanner.mapHint.subtitle}
          </span>
        </div>
      )}
    </div>
  );
}
