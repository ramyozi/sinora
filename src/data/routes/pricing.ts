import type { City, CityRegion } from "@/data/cities";

/**
 * Modèle d'estimation des coûts à destination, en yuans.
 * Trois gammes typiques pour chaque ligne (hébergement, restauration, activités).
 */

export type PricingTier = "eco" | "comfort" | "luxury";

export interface TierTariff {
  eco: number;
  comfort: number;
  luxury: number;
}

export interface RegionTariffs {
  /** Hébergement, par nuit. */
  lodging: TierTariff;
  /** Restauration, par jour. */
  food: TierTariff;
  /** Activités et entrées, total pour le séjour dans la ville. */
  activities: TierTariff;
}

// Tarifs typiques par région (ordre de grandeur 2025-2026).
const regionTariffs: Record<CityRegion, RegionTariffs> = {
  nord: {
    lodging: { eco: 200, comfort: 600, luxury: 1800 },
    food: { eco: 50, comfort: 150, luxury: 500 },
    activities: { eco: 120, comfort: 320, luxury: 850 },
  },
  est: {
    lodging: { eco: 250, comfort: 700, luxury: 2200 },
    food: { eco: 60, comfort: 180, luxury: 600 },
    activities: { eco: 120, comfort: 320, luxury: 850 },
  },
  centre: {
    lodging: { eco: 180, comfort: 500, luxury: 1500 },
    food: { eco: 40, comfort: 130, luxury: 400 },
    activities: { eco: 110, comfort: 300, luxury: 750 },
  },
  "sud-ouest": {
    lodging: { eco: 150, comfort: 450, luxury: 1300 },
    food: { eco: 45, comfort: 140, luxury: 450 },
    activities: { eco: 100, comfort: 280, luxury: 700 },
  },
  sud: {
    lodging: { eco: 200, comfort: 700, luxury: 2500 },
    food: { eco: 50, comfort: 160, luxury: 550 },
    activities: { eco: 110, comfort: 320, luxury: 800 },
  },
  ouest: {
    lodging: { eco: 120, comfort: 350, luxury: 1000 },
    food: { eco: 35, comfort: 100, luxury: 300 },
    activities: { eco: 80, comfort: 220, luxury: 550 },
  },
};

// Surcoûts spécifiques (Hong Kong notoirement plus cher).
const citySurcharge: Record<string, Partial<RegionTariffs>> = {
  "hong-kong": {
    lodging: { eco: 600, comfort: 1500, luxury: 4500 },
    food: { eco: 120, comfort: 300, luxury: 900 },
    activities: { eco: 200, comfort: 500, luxury: 1200 },
  },
};

// Renvoie les tarifs effectifs pour une ville, en appliquant les surcoûts éventuels.
export function tariffsForCity(city: City): RegionTariffs {
  const base = regionTariffs[city.region];
  const override = citySurcharge[city.slug];
  if (!override) return base;
  return {
    lodging: override.lodging ?? base.lodging,
    food: override.food ?? base.food,
    activities: override.activities ?? base.activities,
  };
}

// Durée par défaut pour un séjour dans une ville (milieu de la fourchette conseillée).
export function defaultNightsFor(city: City): number {
  const [min, max] = city.recommendedStay;
  return Math.round((min + max) / 2);
}

export interface CityCostBreakdown {
  citySlug: string;
  nights: number;
  lodging: number;
  food: number;
  activities: number;
  total: number;
}

export function costForCity(
  city: City,
  tier: PricingTier,
  nights = defaultNightsFor(city),
): CityCostBreakdown {
  const t = tariffsForCity(city);
  const lodging = t.lodging[tier] * nights;
  const food = t.food[tier] * nights;
  const activities = t.activities[tier];
  return {
    citySlug: city.slug,
    nights,
    lodging,
    food,
    activities,
    total: lodging + food + activities,
  };
}

export interface RouteStayCost {
  byCity: CityCostBreakdown[];
  lodging: number;
  food: number;
  activities: number;
  total: number;
  nights: number;
}

export function stayCostsForRoute(
  cities: City[],
  tier: PricingTier,
): RouteStayCost {
  const byCity = cities.map((c) => costForCity(c, tier));
  return {
    byCity,
    lodging: byCity.reduce((s, c) => s + c.lodging, 0),
    food: byCity.reduce((s, c) => s + c.food, 0),
    activities: byCity.reduce((s, c) => s + c.activities, 0),
    total: byCity.reduce((s, c) => s + c.total, 0),
    nights: byCity.reduce((s, c) => s + c.nights, 0),
  };
}
