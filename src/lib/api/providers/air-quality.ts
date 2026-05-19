import "server-only";
import { fetchJson } from "../fetch-json";

const BASE = "https://air-quality-api.open-meteo.com/v1/air-quality";

// Une heure : la qualité de l'air évolue plus lentement que la météo.
const REVALIDATE_SECONDS = 3600;

export interface AirQualitySnapshot {
  /** Indice de qualité de l'air européen (échelle 0–100+). */
  europeanAqi: number;
  /** PM2.5 en µg/m³. */
  pm2_5: number;
  /** PM10 en µg/m³. */
  pm10: number;
  time: string;
}

interface OpenMeteoResponse {
  current: {
    time: string;
    european_aqi: number;
    pm2_5: number;
    pm10: number;
  };
}

// Renvoie un instantané de la qualité de l'air pour une coordonnée WGS-84.
// Renvoie `null` en cas d'erreur : la donnée est informative, pas bloquante.
export async function getAirQuality(
  lat: number,
  lng: number,
): Promise<AirQualitySnapshot | null> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: "european_aqi,pm2_5,pm10",
    timezone: "auto",
  });

  try {
    const data = await fetchJson<OpenMeteoResponse>(`${BASE}?${params}`, {
      revalidate: REVALIDATE_SECONDS,
      tags: ["air-quality"],
      retries: 1,
    });
    return {
      europeanAqi: data.current.european_aqi,
      pm2_5: data.current.pm2_5,
      pm10: data.current.pm10,
      time: data.current.time,
    };
  } catch (error) {
    console.error("[air-quality] échec de l'appel Open-Meteo", error);
    return null;
  }
}
