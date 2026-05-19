import "server-only";
import { fetchJson } from "../fetch-json";

const BASE = "https://api.open-meteo.com/v1/forecast";

// Demi-heure : la météo bouge lentement et l'on évite de marteler l'API.
const REVALIDATE_SECONDS = 1800;

export interface CurrentWeather {
  /** Température en degrés Celsius. */
  temperature: number;
  /** Code météo WMO renvoyé par Open-Meteo. */
  weatherCode: number;
  /** Vitesse du vent en km/h. */
  windSpeed: number;
  isDay: boolean;
  time: string;
}

export interface DailyWeather {
  /** Date au format AAAA-MM-JJ. */
  date: string;
  tempMax: number;
  tempMin: number;
  precipitationMm: number;
  weatherCode: number;
}

export interface WeatherSnapshot {
  current: CurrentWeather;
  daily: DailyWeather[];
}

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
  };
}

// Récupère les prévisions à 7 jours pour une coordonnée WGS-84.
// Renvoie `null` plutôt que de propager une erreur : la météo est un agrément,
// pas un contenu bloquant.
export async function getWeather(
  lat: number,
  lng: number,
): Promise<WeatherSnapshot | null> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    current: "temperature_2m,weather_code,wind_speed_10m,is_day",
    daily:
      "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum",
    timezone: "auto",
    forecast_days: "7",
  });

  try {
    const data = await fetchJson<OpenMeteoResponse>(`${BASE}?${params}`, {
      revalidate: REVALIDATE_SECONDS,
      tags: ["weather"],
      retries: 1,
    });

    return {
      current: {
        temperature: data.current.temperature_2m,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
        isDay: data.current.is_day === 1,
        time: data.current.time,
      },
      daily: data.daily.time.map((date, i) => ({
        date,
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
        precipitationMm: data.daily.precipitation_sum[i],
        weatherCode: data.daily.weather_code[i],
      })),
    };
  } catch (error) {
    console.error("[weather] échec de l'appel Open-Meteo", error);
    return null;
  }
}
