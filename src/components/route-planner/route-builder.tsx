"use client";

import { useCallback, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City, CityTag } from "@/data/cities";
import { assessRouteFatigue, routeTotals, segmentsForRoute } from "@/data/routes";
import { suggestIntermediates } from "@/data/routes/recommendation";
import { type RouteStyle, styleConfig } from "@/data/routes/style";
import {
  composeTagBoost,
  type DietRestriction,
  type TravelProfile,
} from "@/data/routes/preferences";
import type { RouteTemplate } from "@/data/routes/templates";
import { bookingPlatformsForModes } from "@/data/routes/booking";
import { BookingCards } from "./booking-cards";
import { BudgetEstimate } from "./budget-estimate";
import { ItineraryPanel } from "./itinerary-panel";
import { ItineraryTimeline } from "./itinerary-timeline";
import { PreferencesPanel } from "./preferences-panel";
import { RouteMap } from "./route-map";
import { SuggestionsPanel } from "./suggestions-panel";
import { TemplatesStrip } from "./templates-strip";

interface Props {
  cities: City[];
  locale: Locale;
  dict: Dictionary;
}

// Orchestrateur du Route Planner : possède l'ordre des villes sélectionnées
// et calcule les segments / totaux à la volée.
export function RouteBuilder({ cities, locale, dict }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [style, setStyle] = useState<RouteStyle>("comfort");
  const [profile, setProfile] = useState<TravelProfile>("solo");
  const [diet, setDiet] = useState<DietRestriction[]>([]);
  const [interests, setInterests] = useState<CityTag[]>([]);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const config = styleConfig[style];

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
  const insertAt = useCallback((slug: string, afterIndex: number) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev;
      const copy = [...prev];
      copy.splice(afterIndex + 1, 0, slug);
      return copy;
    });
  }, []);
  const loadTemplate = useCallback((template: RouteTemplate) => {
    setSelected(template.cities);
    setStyle(template.style);
  }, []);

  // Villes sélectionnées dans l'ordre choisi par l'utilisateur.
  const selectedCities = useMemo(() => {
    return selected
      .map((slug) => cities.find((c) => c.slug === slug))
      .filter((c): c is City => Boolean(c));
  }, [selected, cities]);

  const segments = useMemo(() => segmentsForRoute(selected), [selected]);
  const totals = useMemo(() => routeTotals(selected), [selected]);
  const fatigue = useMemo(() => assessRouteFatigue(selected), [selected]);
  const routeModes = useMemo(
    () =>
      Array.from(
        new Set(segments.filter((s) => s).map((s) => s!.mode)),
      ),
    [segments],
  );
  const bookingPlatforms = useMemo(
    () => bookingPlatformsForModes(routeModes),
    [routeModes],
  );

  // Tag boost effectif : style + profil + restrictions + intérêts.
  const effectiveBoost = useMemo(
    () => composeTagBoost(config.tagBoost, { profile, diet, interests }),
    [config.tagBoost, profile, diet, interests],
  );

  const recommendations = useMemo(
    () =>
      suggestIntermediates(
        { selected, cities, tagBoost: effectiveBoost },
        config.suggestionLimit,
      ),
    [selected, cities, effectiveBoost, config.suggestionLimit],
  );

  return (
    <div className="space-y-6">
      <TemplatesStrip dict={dict} onLoad={loadTemplate} />
      <PreferencesPanel
        style={style}
        profile={profile}
        diet={diet}
        interests={interests}
        onStyleChange={setStyle}
        onProfileChange={setProfile}
        onDietChange={setDiet}
        onInterestsChange={setInterests}
        dict={dict}
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <RouteMap
          cities={cities}
          locale={locale}
          dict={dict}
          selectedOrder={selected}
          segments={segments}
          hoveredSlug={hoveredSlug}
          onToggle={toggle}
        />
        <ItineraryPanel
          selected={selectedCities}
          segments={segments}
          totals={totals}
          fatigue={fatigue}
          locale={locale}
          dict={dict}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={remove}
          onClear={clear}
        />
      </div>
      {recommendations.length > 0 && (
        <SuggestionsPanel
          recommendations={recommendations}
          locale={locale}
          dict={dict}
          onAdd={insertAt}
          onHover={setHoveredSlug}
        />
      )}
      {selectedCities.length >= 2 && (
        <ItineraryTimeline
          cities={selectedCities}
          segments={segments}
          locale={locale}
          dict={dict}
        />
      )}
      {selectedCities.length > 0 && (
        <BudgetEstimate
          cities={selectedCities}
          transport={totals}
          tier={config.tier}
          locale={locale}
          dict={dict}
        />
      )}
      {selectedCities.length >= 2 && (
        <BookingCards
          platforms={bookingPlatforms}
          locale={locale}
          dict={dict}
        />
      )}
    </div>
  );
}
