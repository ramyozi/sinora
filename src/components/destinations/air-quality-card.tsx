import type { Dictionary } from "@/i18n/dictionaries";
import type { AirQualitySnapshot } from "@/lib/api/providers/air-quality";
import {
  aqiBandFromIndex,
  type AqiBand,
} from "@/lib/api/providers/aqi-bands";

// Couleur associée à chaque catégorie d'indice.
const bandColor: Record<AqiBand, string> = {
  "very-good": "bg-jade/10 text-jade",
  good: "bg-jade/10 text-jade",
  moderate: "bg-gold/10 text-gold",
  poor: "bg-gold/15 text-gold",
  "very-poor": "bg-accent/10 text-accent",
  extreme: "bg-accent/15 text-accent",
};

// Bloc qualité de l'air actuelle.
export function AirQualityCard({
  aqi,
  dict,
}: {
  aqi: AirQualitySnapshot | null;
  dict: Dictionary;
}) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        {dict.airQuality.title}
      </h2>

      {aqi ? (
        <AvailableState aqi={aqi} dict={dict} />
      ) : (
        <div className="rounded-card border border-border bg-surface p-6 text-sm text-muted">
          {dict.airQuality.unavailable}
        </div>
      )}
    </section>
  );
}

function AvailableState({
  aqi,
  dict,
}: {
  aqi: AirQualitySnapshot;
  dict: Dictionary;
}) {
  const band = aqiBandFromIndex(aqi.europeanAqi);

  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-4">
          <span
            className={`grid size-16 place-items-center rounded-2xl text-2xl font-semibold ${bandColor[band]}`}
          >
            {Math.round(aqi.europeanAqi)}
          </span>
          <div>
            <div className="text-base font-medium text-foreground">
              {dict.airQuality.bands[band]}
            </div>
            <div className="text-xs text-muted">
              {dict.airQuality.indexLabel}
            </div>
          </div>
        </div>

        <div className="ml-auto flex gap-8">
          <Pollutant
            label={dict.airQuality.pm25Label}
            value={aqi.pm2_5}
            unit={dict.airQuality.unitMicro}
          />
          <Pollutant
            label={dict.airQuality.pm10Label}
            value={aqi.pm10}
            unit={dict.airQuality.unitMicro}
          />
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">{dict.airQuality.source}</p>
    </div>
  );
}

function Pollutant({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div>
      <div className="text-xs text-muted">{label}</div>
      <div className="text-base font-semibold text-foreground">
        {Math.round(value)}{" "}
        <span className="text-xs text-muted">{unit}</span>
      </div>
    </div>
  );
}
