"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Tuiles vectorielles libres et sans clé.
const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

// Petite carte centrée sur la ville, avec un marqueur cohérent au thème.
export function CityMap({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = new maplibregl.Map({
      container,
      style: STYLE_URL,
      center: [lng, lat],
      zoom: 10,
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right",
    );

    const marker = document.createElement("div");
    marker.className =
      "size-3 rounded-full bg-accent ring-4 ring-accent/30";
    new maplibregl.Marker({ element: marker })
      .setLngLat([lng, lat])
      .addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return (
    <div className="overflow-hidden rounded-card border border-border">
      <div
        ref={containerRef}
        className="h-72 w-full"
        role="img"
        aria-label={label}
      />
    </div>
  );
}
