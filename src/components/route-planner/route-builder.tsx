"use client";

import { useCallback, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import { routeTotals, segmentsForRoute } from "@/data/routes";
import { ItineraryPanel } from "./itinerary-panel";
import { RouteMap } from "./route-map";

interface Props {
  cities: City[];
  locale: Locale;
  dict: Dictionary;
}

// Orchestrateur du Route Planner : possède l'ordre des villes sélectionnées
// et calcule les segments / totaux à la volée.
export function RouteBuilder({ cities, locale, dict }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback((slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setSelected((prev) => prev.filter((s) => s !== slug));
  }, []);

  const move = useCallback((slug: string, delta: -1 | 1) => {
    setSelected((prev) => {
      const idx = prev.indexOf(slug);
      const next = idx + delta;
      if (idx < 0 || next < 0 || next >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[next]] = [copy[next], copy[idx]];
      return copy;
    });
  }, []);

  const moveUp = useCallback((slug: string) => move(slug, -1), [move]);
  const moveDown = useCallback((slug: string) => move(slug, 1), [move]);
  const clear = useCallback(() => setSelected([]), []);

  // Villes sélectionnées dans l'ordre choisi par l'utilisateur.
  const selectedCities = useMemo(() => {
    return selected
      .map((slug) => cities.find((c) => c.slug === slug))
      .filter((c): c is City => Boolean(c));
  }, [selected, cities]);

  const segments = useMemo(() => segmentsForRoute(selected), [selected]);
  const totals = useMemo(() => routeTotals(selected), [selected]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <RouteMap
        cities={cities}
        locale={locale}
        selectedOrder={selected}
        onToggle={toggle}
      />
      <ItineraryPanel
        selected={selectedCities}
        segments={segments}
        totals={totals}
        locale={locale}
        dict={dict}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
        onRemove={remove}
        onClear={clear}
      />
    </div>
  );
}
