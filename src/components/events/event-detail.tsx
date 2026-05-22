import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarRange,
  Clock,
  Compass,
  ExternalLink,
  Flame,
  Lightbulb,
  MapPin,
  Route,
  Sparkles,
  Ticket,
  TrainFront,
  Users,
  UsersRound,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type {
  EventCategory,
  EventCrowd,
  EventOccurrence,
  SinoraEvent,
} from "@/data/events";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { localizedPath } from "@/lib/navigation";
import { EventShareButton } from "./event-share";

const categoryColor: Record<EventCategory, string> = {
  festival: "bg-accent/15 text-accent",
  religious: "bg-violet-500/15 text-violet-500",
  food: "bg-amber-500/15 text-amber-500",
  music: "bg-rose-500/15 text-rose-500",
  sport: "bg-emerald-500/15 text-emerald-500",
  national: "bg-red-500/15 text-red-500",
  lantern: "bg-orange-500/15 text-orange-500",
  "ice-snow": "bg-sky-500/15 text-sky-500",
  art: "bg-fuchsia-500/15 text-fuchsia-500",
  tech: "bg-cyan-500/15 text-cyan-500",
};

const crowdDots: Record<EventCrowd, string> = {
  calme: "•",
  modere: "••",
  dense: "•••",
  extreme: "••••",
};

export interface SimilarEntry {
  event: SinoraEvent;
  occurrence: EventOccurrence;
  city: City | undefined;
  image: WikiLeadImage | null;
}

interface Props {
  event: SinoraEvent;
  /** Occurrence pertinente (en cours ou la plus proche). */
  occurrence: EventOccurrence;
  city: City | undefined;
  cover: WikiLeadImage | null;
  gallery: WikiLeadImage[];
  similar: SimilarEntry[];
  locale: Locale;
  dict: Dictionary;
}

function localeTag(locale: Locale): string {
  return locale === "zh" ? "zh-CN" : locale === "en" ? "en-GB" : "fr-FR";
}

// Formate une plage de dates en libelle lisible.
function formatRange(start: string, end: string, locale: Locale): string {
  const tag = localeTag(locale);
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString(tag, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  return start === end ? fmt(start) : `${fmt(start)} - ${fmt(end)}`;
}

// Page detail immersive d'un evenement : hero, faits cles, programme, infos
// pratiques, localisation, galerie et evenements similaires.
export function EventDetail({
  event,
  occurrence,
  city,
  cover,
  gallery,
  similar,
  locale,
  dict,
}: Props) {
  const ev = dict.events;
  const d = ev.detail;

  // Lien planner : pre-remplit l'itineraire avec la ville hote et la fenetre
  // de l'evenement (meme contrat que les cartes evenement).
  const params = new URLSearchParams({
    cities: event.citySlug,
    eventStart: occurrence.start,
    eventEnd: occurrence.end,
    eventSlug: event.slug,
  });
  const plannerHref = `${localizedPath("/route-planner", locale)}?${params.toString()}`;
  const optimizeHref = `${plannerHref}&optimizeAround=1`;

  const today = new Date().toISOString().slice(0, 10);
  const ongoing = occurrence.start <= today && occurrence.end >= today;

  return (
    <div className="space-y-8">
      <Link
        href={localizedPath("/events", locale)}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {d.backToList}
      </Link>

      {/* Hero. */}
      <header className="relative overflow-hidden rounded-card bg-surface-muted">
        <div className="relative aspect-[21/9] min-h-[240px]">
          {cover ? (
            <Image
              src={cover.url}
              alt={event.title[locale]}
              fill
              sizes="100vw"
              unoptimized
              priority
              className="object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 grid place-items-center text-foreground/30"
              aria-hidden
            >
              <CalendarRange className="size-20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColor[event.category]}`}
              >
                {ev.categories[event.category]}
              </span>
              {ongoing && (
                <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white">
                  {d.ongoing}
                </span>
              )}
              {typeof event.popularityScore === "number" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  <Flame className="size-3 text-accent" />
                  {event.popularityScore}
                </span>
              )}
            </div>
            <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              {event.title[locale]}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-white/85">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" />
                {city ? city.name[locale] : event.citySlug}
                {event.venue ? ` · ${event.venue[locale]}` : ""}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarRange className="size-4" />
                {formatRange(occurrence.start, occurrence.end, locale)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Badges. */}
      <div className="flex flex-wrap gap-2">
        {event.isVerified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-jade/15 px-3 py-1 text-xs font-medium text-jade">
            <BadgeCheck className="size-3.5" />
            {ev.badges.verified}
          </span>
        )}
        {event.source === "community" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-500">
            <UsersRound className="size-3.5" />
            {ev.badges.community}
          </span>
        )}
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <Route className="size-3.5" />
          {ev.travelImpact[event.travelImpact]}
        </span>
      </div>

      {/* Faits cles. */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Fact
          icon={CalendarRange}
          label={d.datesLabel}
          value={formatRange(occurrence.start, occurrence.end, locale)}
        />
        <Fact
          icon={Users}
          label={d.crowdLabel}
          value={`${ev.crowdLabels[event.crowd]} ${crowdDots[event.crowd]}`}
        />
        <Fact
          icon={Sparkles}
          label={d.categoryLabel}
          value={ev.categories[event.category]}
        />
        <Fact
          icon={Compass}
          label={d.stayExtension}
          value={d.stayExtensionValue.replace(
            "{n}",
            String(event.recommendedStayExtensionDays),
          )}
        />
      </section>

      {/* A propos. */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">{d.about}</h2>
        <p className="text-pretty text-lg text-foreground">
          {event.summary[locale]}
        </p>
        {event.longDescription && (
          <p className="text-pretty leading-relaxed text-muted">
            {event.longDescription[locale]}
          </p>
        )}
      </section>

      {/* Temps forts. */}
      {event.highlights && event.highlights.length > 0 && (
        <section className="rounded-card border border-border bg-surface p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Sparkles className="size-5 text-accent" />
            {d.highlights}
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {event.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg bg-background p-3 text-sm text-foreground"
              >
                <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
                {h[locale]}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Pratique + localisation. */}
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          {/* Toutes les dates. */}
          <div className="rounded-card border border-border bg-surface p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <CalendarRange className="size-4 text-accent" />
              {d.allDates}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {event.occurrences.map((o) => {
                const isOngoing = o.start <= today && o.end >= today;
                const isPast = o.end < today;
                return (
                  <li
                    key={`${o.start}-${o.end}`}
                    className={`rounded-full border px-2.5 py-1 text-xs ${
                      isOngoing
                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-500"
                        : isPast
                          ? "border-border bg-surface-muted text-muted line-through"
                          : "border-border bg-background text-foreground"
                    }`}
                  >
                    {formatRange(o.start, o.end, locale)}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Conseils pratiques. */}
          {event.practicalTips && event.practicalTips.length > 0 && (
            <div className="rounded-card border border-accent/30 bg-accent/5 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Lightbulb className="size-4 text-accent" />
                {d.practicalTips}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {event.practicalTips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted">
                    {tip[locale]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Barre laterale : localisation + actions. */}
        <aside className="space-y-3 rounded-card border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {d.location}
          </h2>
          {event.venue && (
            <Practical icon={MapPin} label={d.venue}>
              {event.venue[locale]}
            </Practical>
          )}
          {event.address && (
            <Practical icon={MapPin} label={d.address}>
              {event.address[locale]}
            </Practical>
          )}
          {event.nearestMetro && (
            <Practical icon={TrainFront} label={d.metro}>
              {event.nearestMetro[locale]}
            </Practical>
          )}
          {event.priceInfo && (
            <Practical icon={Ticket} label={d.price}>
              {event.priceInfo[locale]}
            </Practical>
          )}
          {event.durationHint && (
            <Practical icon={Clock} label={d.duration}>
              {event.durationHint[locale]}
            </Practical>
          )}

          {/* Liens externes. */}
          {event.externalLinks && event.externalLinks.length > 0 && (
            <div className="border-t border-border pt-2.5">
              <div className="text-xs font-medium uppercase tracking-wide text-muted">
                {d.links}
              </div>
              <ul className="mt-1 space-y-1">
                {event.externalLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                    >
                      <ExternalLink className="size-3.5" />
                      {link.kind}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions. */}
          <div className="space-y-2 border-t border-border pt-3">
            <Link
              href={plannerHref}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <Sparkles className="size-4" />
              {d.addToTrip}
            </Link>
            <Link
              href={optimizeHref}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
            >
              <Route className="size-4" />
              {d.optimizeAround}
            </Link>
            <div className="flex justify-center pt-1">
              <EventShareButton
                title={event.title[locale]}
                label={d.share}
                copiedLabel={d.shareCopied}
              />
            </div>
          </div>
        </aside>
      </div>

      {/* Galerie. */}
      {gallery.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            {dict.activities.detail.gallery}
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-muted"
              >
                <Image
                  src={img.url}
                  alt={`${event.title[locale]} ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  unoptimized
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Evenements similaires. */}
      {similar.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            {d.similar}
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((entry) => (
              <Link
                key={entry.event.slug}
                href={localizedPath(
                  `/events/${entry.event.slug}`,
                  locale,
                )}
                className="group overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-accent/40"
              >
                <div className="relative aspect-[16/9] bg-surface-muted">
                  {entry.image ? (
                    <Image
                      src={entry.image.url}
                      alt={entry.event.title[locale]}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      unoptimized
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="grid h-full place-items-center text-foreground/25"
                      aria-hidden
                    >
                      <CalendarRange className="size-9" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted">
                    {entry.city ? entry.city.name[locale] : entry.event.citySlug}
                  </div>
                  <h3 className="mt-0.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                    {entry.event.title[locale]}
                  </h3>
                  <div className="mt-1 text-xs text-muted">
                    {formatRange(
                      entry.occurrence.start,
                      entry.occurrence.end,
                      locale,
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Carte "fait cle" du bandeau.
function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-card border border-border bg-surface p-3">
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted">
        <Icon className="size-3.5" />
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

// Ligne d'info de la barre laterale.
function Practical({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-2.5 first-of-type:border-t-0 first-of-type:pt-0">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
        <Icon className="size-3.5" />
        {label}
      </div>
      <p className="mt-0.5 text-sm text-foreground">{children}</p>
    </div>
  );
}
