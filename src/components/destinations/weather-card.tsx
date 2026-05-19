import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WeatherSnapshot } from "@/lib/api/providers/weather";
import {
  weatherKindFromCode,
  type WeatherKind,
} from "@/lib/api/providers/weather-codes";

const dayIcon: Record<WeatherKind, LucideIcon> = {
  clear: Sun,
  partly: CloudSun,
  cloudy: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  thunder: CloudLightning,
};

const nightIcon: Record<WeatherKind, LucideIcon> = {
  ...dayIcon,
  clear: Moon,
  partly: CloudMoon,
};

function dayAbbreviation(date: string, locale: Locale): string {
  return new Date(date).toLocaleDateString(localeMeta[locale].htmlLang, {
    weekday: "short",
  });
}

// Bloc météo actuelle + prévisions 7 jours pour une ville.
export function WeatherCard({
  weather,
  locale,
  dict,
}: {
  weather: WeatherSnapshot | null;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        {dict.weather.title}
      </h2>

      {weather ? (
        <div className="rounded-card border border-border bg-surface p-6">
          <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-center">
            <CurrentWeather weather={weather} dict={dict} />
            <DailyForecast weather={weather} locale={locale} />
          </div>
          <p className="mt-5 text-xs text-muted">{dict.weather.source}</p>
        </div>
      ) : (
        <div className="rounded-card border border-border bg-surface p-6 text-sm text-muted">
          {dict.weather.unavailable}
        </div>
      )}
    </section>
  );
}

function CurrentWeather({
  weather,
  dict,
}: {
  weather: WeatherSnapshot;
  dict: Dictionary;
}) {
  const kind = weatherKindFromCode(weather.current.weatherCode);
  const Icon = weather.current.isDay ? dayIcon[kind] : nightIcon[kind];

  return (
    <div className="flex items-center gap-5">
      <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
        <Icon className="size-9" />
      </span>
      <div>
        <div className="text-4xl font-semibold text-foreground">
          {Math.round(weather.current.temperature)}°
        </div>
        <div className="mt-0.5 text-sm text-muted">
          {dict.weather.kinds[kind]}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <Wind className="size-3.5" />
          {Math.round(weather.current.windSpeed)} {dict.weather.kmh}
        </div>
      </div>
    </div>
  );
}

function DailyForecast({
  weather,
  locale,
}: {
  weather: WeatherSnapshot;
  locale: Locale;
}) {
  return (
    <ul className="grid grid-cols-7 gap-1.5">
      {weather.daily.slice(0, 7).map((day) => {
        const kind = weatherKindFromCode(day.weatherCode);
        const Icon = dayIcon[kind];
        return (
          <li
            key={day.date}
            className="rounded-xl bg-surface-muted p-2 text-center"
          >
            <div className="text-xs uppercase tracking-wide text-muted">
              {dayAbbreviation(day.date, locale)}
            </div>
            <Icon className="mx-auto mt-1.5 size-5 text-foreground" />
            <div className="mt-1.5 text-xs font-semibold text-foreground">
              {Math.round(day.tempMax)}°
            </div>
            <div className="text-xs text-muted">
              {Math.round(day.tempMin)}°
            </div>
          </li>
        );
      })}
    </ul>
  );
}
