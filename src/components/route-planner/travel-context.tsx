import { CalendarClock, Sun } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City, Season } from "@/data/cities";
import type {
  Connection,
  PeakWindow,
  ResolvedSegment,
} from "@/data/routes";

interface Props {
  cities: City[];
  resolved: ResolvedSegment[];
  peakAlerts: PeakWindow[];
  locale: Locale;
  dict: Dictionary;
}

const seasonOrder: Season[] = ["printemps", "ete", "automne", "hiver"];

// Saisons communes à toutes les villes : intersection des bestSeasons.
function commonBestSeasons(cities: City[]): Season[] {
  if (cities.length === 0) return [];
  const sets = cities.map((c) => new Set(c.bestSeasons));
  return seasonOrder.filter((s) => sets.every((set) => set.has(s)));
}

// Saisons "majoritaires" : présentes dans au moins la moitié des villes.
function majoritySeasons(cities: City[]): Season[] {
  if (cities.length === 0) return [];
  const count = new Map<Season, number>();
  for (const c of cities) {
    for (const s of c.bestSeasons) {
      count.set(s, (count.get(s) ?? 0) + 1);
    }
  }
  return seasonOrder.filter(
    (s) => (count.get(s) ?? 0) >= Math.ceil(cities.length / 2),
  );
}

function uniqueCrowdedKinds(resolved: ResolvedSegment[]): string[] {
  const set = new Set<string>();
  for (const seg of resolved) {
    for (const conn of seg.connections as Connection[]) {
      for (const p of conn.crowdedPeriods ?? []) set.add(p);
    }
  }
  return Array.from(set);
}

// Synthèse contextuelle : saison conseillée, pics calendaires, dates à éviter.
export function TravelContextPanel({
  cities,
  resolved,
  peakAlerts,
  locale,
  dict,
}: Props) {
  if (cities.length === 0) return null;
  const rp = dict.routePlanner;
  const tc = rp.context;

  const common = commonBestSeasons(cities);
  const majority = majoritySeasons(cities);
  const fallback = majority.length > 0 ? majority : seasonOrder;
  const seasonsToShow = common.length > 0 ? common : fallback;
  const matchKind: "common" | "majority" | "any" =
    common.length > 0 ? "common" : majority.length > 0 ? "majority" : "any";

  const crowded = uniqueCrowdedKinds(resolved);

  return (
    <section className="rounded-card border border-border bg-surface p-5">
      <header>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {tc.title}
        </h3>
        <p className="mt-1 text-xs text-muted">{tc.subtitle}</p>
      </header>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-card bg-surface-muted p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
            <Sun className="size-4 text-accent" />
            {tc.bestWindow}
          </div>
          <div className="mt-2 text-base font-semibold text-foreground">
            {seasonsToShow
              .map((s) => dict.labels.seasons[s])
              .join(" · ")}
          </div>
          <p className="mt-1 text-xs text-muted">
            {tc.match[matchKind]}
          </p>
        </div>

        <div className="rounded-card bg-surface-muted p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
            <CalendarClock className="size-4 text-accent" />
            {tc.calendar}
          </div>
          {peakAlerts.length === 0 ? (
            <p className="mt-2 text-sm text-foreground/80">{tc.noPeak}</p>
          ) : (
            <ul className="mt-2 space-y-1.5 text-sm">
              {peakAlerts.map((p, idx) => (
                <li
                  key={`${p.kind}-${p.start}-${idx}`}
                  className="flex items-baseline gap-2"
                >
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${
                      isWithin(p, new Date()) ? "bg-amber-500" : "bg-muted"
                    }`}
                  />
                  <span className="text-foreground">
                    {tc.peakLabels[p.kind]}
                  </span>
                  <span className="text-muted">
                    {formatRange(p.start, p.end, locale)}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {crowded.length > 0 && (
            <p className="mt-3 text-xs text-muted">
              {tc.affectsRoute.replace(
                "{kinds}",
                crowded.map((k) => tc.peakLabels[k as keyof typeof tc.peakLabels]).join(", "),
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function isWithin(p: PeakWindow, d: Date): boolean {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const key = `${y}-${m}-${day}`;
  return key >= p.start && key <= p.end;
}

function formatRange(start: string, end: string, locale: Locale): string {
  if (start === end) return formatDate(start, locale);
  return `${formatDate(start, locale)} - ${formatDate(end, locale)}`;
}

function formatDate(iso: string, locale: Locale): string {
  const d = new Date(`${iso}T00:00:00Z`);
  const tag = locale === "zh" ? "zh-CN" : locale === "en" ? "en-GB" : "fr-FR";
  return d.toLocaleDateString(tag, {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  });
}
