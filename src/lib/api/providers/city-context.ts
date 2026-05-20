import "server-only";
import type { City } from "@/data/cities";
import { getAirQuality, type AirQualitySnapshot } from "./air-quality";
import { getWeather, type WeatherSnapshot } from "./weather";

export interface CityContextSnapshot {
  slug: string;
  weather: WeatherSnapshot | null;
  aqi: AirQualitySnapshot | null;
}

/**
 * Récupère météo + qualité de l'air pour chaque ville en parallèle.
 * Les providers gèrent leur propre cache (30 min / 1 h) et renvoient `null`
 * en cas d'échec, donc l'appel est tolérant aux erreurs partielles.
 */
export async function getCityContextSnapshots(
  cities: City[],
): Promise<Record<string, CityContextSnapshot>> {
  const results = await Promise.all(
    cities.map(async (city) => {
      const [weather, aqi] = await Promise.all([
        getWeather(city.coordinates.lat, city.coordinates.lng),
        getAirQuality(city.coordinates.lat, city.coordinates.lng),
      ]);
      return {
        slug: city.slug,
        weather,
        aqi,
      } satisfies CityContextSnapshot;
    }),
  );
  return Object.fromEntries(results.map((r) => [r.slug, r]));
}
