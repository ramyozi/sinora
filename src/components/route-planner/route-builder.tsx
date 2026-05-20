"use client";

import { useCallback, useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City, CityTag } from "@/data/cities";
import {
  assessRouteFatigue,
  densityFromBudget,
  durationAdvice,
  durationBudget,
  niches,
  optimizeRouteOrder,
  peakWindowsRelevant,
  resolveRoute,
  routeTotalsResolved,
  scoreRoute,
  segmentsForRoute,
  type NicheSlug,
  type TripDates as TripDatesValue,
} from "@/data/routes";
import { suggestIntermediates } from "@/data/routes/recommendation";
import { type RouteStyle, styleConfig } from "@/data/routes/style";
import {
  composeTagBoost,
  type DietRestriction,
  type TravelProfile,
} from "@/data/routes/preferences";
import type { RouteTemplate } from "@/data/routes/templates";
import { bookingPlatformsForModes } from "@/data/routes/booking";
import type { CityContextSnapshot } from "@/lib/api/providers/city-context";
import { Disclosure } from "@/components/ui/disclosure";
import { NicheChips } from "./niche-chips";
import { BookingCards } from "./booking-cards";
import { BudgetEstimate } from "./budget-estimate";
import { ItineraryPanel } from "./itinerary-panel";
import { ItineraryTimeline } from "./itinerary-timeline";
import { PreferencesPanel } from "./preferences-panel";
import { RouteMap } from "./route-map";
import { DensityCard } from "./density-card";
import { RouteScoreCard } from "./route-score";
import { TripDates } from "./trip-dates";
import { TravelContextPanel } from "./travel-context";
import { SuggestionsPanel } from "./suggestions-panel";
import { TemplatesStrip } from "./templates-strip";

interface Props {
  cities: City[];
  locale: Locale;
  dict: Dictionary;
  /** État initial pré-rempli depuis l'URL (deep link depuis page ville ou template). */
  initialCities?: string[];
  initialStyle?: RouteStyle;
  /** Météo et qualité de l'air pré-fetchées côté serveur, indexées par slug. */
  cityContext?: Record<string, CityContextSnapshot>;
}

// Orchestrateur du Route Planner : possède l'ordre des villes sélectionnées
// et calcule les segments / totaux à la volée.
export function RouteBuilder({
  cities,
  locale,
  dict,
  initialCities,
  initialStyle,
  cityContext,
}: Props) {
  const [selected, setSelected] = useState<string[]>(initialCities ?? []);
  const [style, setStyle] = useState<RouteStyle>(initialStyle ?? "comfort");
  const [profile, setProfile] = useState<TravelProfile>("solo");
  const [diet, setDiet] = useState<DietRestriction[]>([]);
  const [interests, setInterests] = useState<CityTag[]>([]);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [tripDates, setTripDates] = useState<TripDatesValue>({
    start: null,
    end: null,
  });
  const [niche, setNiche] = useState<NicheSlug | null>(null);
  const config = styleConfig[style];

  // Application d'un preset niche : ecrase interests et style si fourni.
  const applyNiche = useCallback(
    (slug: NicheSlug | null) => {
      setNiche(slug);
      if (!slug) return;
      const preset = niches.find((n) => n.slug === slug);
      if (!preset) return;
      setInterests(preset.interests);
      if (preset.style) setStyle(preset.style);
    },
    [],
  );

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
  const optimize = useCallback(() => {
    setSelected((prev) => {
      const orderedCities = prev
        .map((slug) => cities.find((c) => c.slug === slug))
        .filter((c): c is City => Boolean(c));
      if (orderedCities.length <= 2) return prev;
      return optimizeRouteOrder(orderedCities);
    });
  }, [cities]);

  // Villes sélectionnées dans l'ordre choisi par l'utilisateur.
  const selectedCities = useMemo(() => {
    return selected
      .map((slug) => cities.find((c) => c.slug === slug))
      .filter((c): c is City => Boolean(c));
  }, [selected, cities]);

  const segments = useMemo(() => segmentsForRoute(selected), [selected]);
  const resolved = useMemo(() => resolveRoute(selected), [selected]);
  const totals = useMemo(() => routeTotalsResolved(selected), [selected]);
  const fatigue = useMemo(() => assessRouteFatigue(selected), [selected]);
  const score = useMemo(
    () => scoreRoute(selectedCities, resolved, fatigue),
    [selectedCities, resolved, fatigue],
  );
  const budget = useMemo(
    () => durationBudget(selectedCities, resolved, tripDates),
    [selectedCities, resolved, tripDates],
  );
  const density = useMemo(() => densityFromBudget(budget), [budget]);
  const advice = useMemo(
    () => durationAdvice(selectedCities, density, cities, resolved),
    [selectedCities, density, cities, resolved],
  );
  const peakAlerts = useMemo(() => {
    const periods: ("golden-week" | "spring-festival" | "summer-peak" | "national-day")[] = [];
    for (const seg of resolved) {
      for (const conn of seg.connections) {
        for (const p of conn.crowdedPeriods ?? []) periods.push(p);
      }
    }
    return peakWindowsRelevant(periods, new Date());
  }, [resolved]);
  const routeModes = useMemo(
    () =>
      Array.from(
        new Set(resolved.flatMap((r) => r.connections.map((c) => c.mode))),
      ),
    [resolved],
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

  // Resume affiche en mode plie pour chaque section repliable.
  const datesSummary = budget.totalDays
    ? `${budget.totalDays} ${dict.routePlanner.dates.daysShort}`
    : dict.routePlanner.dates.pending;
  const prefsSummary = `${dict.routePlanner.style.options[style]} · ${dict.routePlanner.preferences.profiles[profile]}`;

  return (
    <div className="space-y-6">
      {/* Carte centrale, immediatement visible above the fold. */}
      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <RouteMap
          cities={cities}
          locale={locale}
          dict={dict}
          selectedOrder={selected}
          segments={segments}
          resolved={resolved}
          hoveredSlug={hoveredSlug}
          onToggle={toggle}
        />
        <ItineraryPanel
          selected={selectedCities}
          segments={segments}
          resolved={resolved}
          totals={totals}
          fatigue={fatigue}
          locale={locale}
          dict={dict}
          cities={cities}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={remove}
          onClear={clear}
        />
      </div>

      {/* Presets niche : un clic suffit pour orienter les suggestions. */}
      <NicheChips active={niche} onSelect={applyNiche} dict={dict} />

      {/* Reglages plieables sous la carte. */}
      <div className="grid gap-3 lg:grid-cols-3">
        <Disclosure
          title={dict.routePlanner.dates.title}
          summary={datesSummary}
        >
          <TripDates
            dates={tripDates}
            onChange={setTripDates}
            totalDays={budget.totalDays}
            locale={locale}
            dict={dict}
          />
        </Disclosure>
        <Disclosure
          title={dict.routePlanner.preferences.title}
          summary={prefsSummary}
        >
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
        </Disclosure>
        <Disclosure title={dict.routePlanner.templates.title}>
          <TemplatesStrip dict={dict} onLoad={loadTemplate} />
        </Disclosure>
      </div>
      {score && (
        <RouteScoreCard
          score={score}
          cities={selectedCities}
          locale={locale}
          dict={dict}
          onOptimize={selectedCities.length >= 3 ? optimize : undefined}
        />
      )}
      {density && (
        <DensityCard
          budget={budget}
          density={density}
          advice={advice}
          cities={cities}
          locale={locale}
          dict={dict}
          onCutCity={remove}
          onAddCity={(slug) =>
            setSelected((prev) =>
              prev.includes(slug) ? prev : [...prev, slug],
            )
          }
        />
      )}
      {selectedCities.length > 0 && (
        <TravelContextPanel
          cities={selectedCities}
          resolved={resolved}
          peakAlerts={peakAlerts}
          cityContext={cityContext}
          locale={locale}
          dict={dict}
        />
      )}
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
