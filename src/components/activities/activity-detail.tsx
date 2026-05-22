import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Compass,
  Heart,
  Lightbulb,
  MapPin,
  ScrollText,
  Sparkle,
  Sparkles,
  Star,
  Sunrise,
  Ticket,
  Train,
  Users,
  Wallet,
  Wind,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Activity } from "@/data/activities";
import { categoryMeta, groupGradient } from "@/data/activities";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { localizedPath } from "@/lib/navigation";
import { categoryIcon, formatDuration } from "./activity-visuals";
import { ActivityCard } from "./activity-card";

interface RelatedEntry {
  activity: Activity;
  image: WikiLeadImage | null;
  cityName: string;
  score: number;
}

interface Props {
  activity: Activity;
  cover: WikiLeadImage | null;
  gallery: WikiLeadImage[];
  cityName: string;
  score: number;
  related: RelatedEntry[];
  locale: Locale;
  dict: Dictionary;
}

// Page de detail immersive d'une activite : hero, faits cles, sections
// editoriales chaleureuses, infos pratiques, avis et activites liees.
export function ActivityDetail({
  activity,
  cover,
  gallery,
  cityName,
  score,
  related,
  locale,
  dict,
}: Props) {
  const a = dict.activities;
  const d = a.detail;
  const meta = categoryMeta[activity.category];
  const Icon = categoryIcon[activity.category];
  const gradient = groupGradient[meta.group];
  const im = activity.immersion;

  const duration = formatDuration(
    activity.duration.minMinutes,
    activity.duration.maxMinutes,
    a.durationFormat.hShort,
    a.durationFormat.minShort,
  );
  const bestTime = activity.bestTime.map((m) => a.dayMoments[m]).join(" · ");
  const seasons = activity.recommendedSeasons
    .map((s) => a.seasons[s])
    .join(" · ");
  const plannerHref = `${localizedPath("/route-planner", locale)}?cities=${activity.citySlug}`;

  return (
    <div className="space-y-8">
      {/* Retour. */}
      <Link
        href={localizedPath("/activites", locale)}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {d.backToList}
      </Link>

      {/* Hero. */}
      <header
        className={`relative overflow-hidden rounded-card bg-gradient-to-br ${gradient}`}
      >
        <div className="relative aspect-[21/9] min-h-[240px]">
          {cover ? (
            <Image
              src={cover.url}
              alt={activity.title[locale]}
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
              <Icon className="size-20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
                <span aria-hidden>{meta.emoji}</span>
                {a.categories[activity.category]}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                <Sparkle className="size-3" />
                {score}
                <span className="font-normal opacity-80">
                  / {d.scoreOutOf}
                </span>
              </span>
            </div>
            <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              {activity.title[locale]}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-white/85">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" />
                {activity.district[locale]}, {cityName}
              </span>
              {activity.reviewCount > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  {activity.rating.toFixed(1)} ({activity.reviewCount})
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Badges immersifs. */}
      {activity.badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activity.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
            >
              {a.badges[badge]}
            </span>
          ))}
        </div>
      )}

      {/* Faits cles. */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Fact icon={Clock} label={d.durationLabel} value={duration} />
        <Fact
          icon={Wallet}
          label={d.budgetLabel}
          value={a.budgets[activity.budget]}
        />
        <Fact
          icon={Compass}
          label={d.difficultyLabel}
          value={a.difficulties[activity.difficulty]}
        />
        <Fact
          icon={Users}
          label={d.crowdLabel}
          value={a.crowds[activity.crowd]}
        />
      </section>

      {/* Resume + description longue. */}
      <section className="space-y-3">
        <p className="text-pretty text-lg text-foreground">
          {activity.summary[locale]}
        </p>
        {activity.longDescription && (
          <p className="text-pretty leading-relaxed text-muted">
            {activity.longDescription[locale]}
          </p>
        )}
      </section>

      {/* Pourquoi y aller : section editoriale, absente du tier generated. */}
      {im && im.whyGo.length > 0 && (
        <section className="rounded-card border border-border bg-surface p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Sparkles className="size-5 text-accent" />
            {d.whyGo}
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {im.whyGo.map((reason, i) => (
              <li
                key={i}
                className="flex gap-2 rounded-lg bg-background p-3 text-sm text-foreground"
              >
                <Sparkle className="mt-0.5 size-4 shrink-0 text-accent" />
                {reason[locale]}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sections immersives + infos pratiques. */}
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          {im?.ambiance && (
            <Editorial icon={Wind} title={d.ambiance}>
              {im.ambiance[locale]}
            </Editorial>
          )}
          {im?.idealMoment && (
            <Editorial icon={Sunrise} title={d.idealMoment}>
              {im.idealMoment[locale]}
            </Editorial>
          )}
          {im?.localTip && (
            <Editorial icon={Lightbulb} title={d.localTip} tone="accent">
              {im.localTip[locale]}
            </Editorial>
          )}
          {im?.perfectFor && im.perfectFor.length > 0 && (
            <div className="rounded-card border border-border bg-surface p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Heart className="size-4 text-accent" />
                {d.perfectFor}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {im.perfectFor.map((p, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-foreground"
                  >
                    {p[locale]}
                  </span>
                ))}
              </div>
            </div>
          )}
          {im?.avoid && im.avoid.length > 0 && (
            <div className="rounded-card border border-amber-500/30 bg-amber-500/5 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <AlertTriangle className="size-4 text-amber-500" />
                {d.avoid}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {im.avoid.map((item, i) => (
                  <li key={i} className="text-sm text-muted">
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Note de provenance pour le tier generated : transparence sur
              l'origine ouverte de la fiche. */}
          {activity.source === "generated" && (
            <p className="rounded-card border border-border bg-surface-muted p-3 text-xs text-muted">
              {d.generatedNote}
            </p>
          )}
        </div>

        {/* Infos pratiques. */}
        <aside className="space-y-3 rounded-card border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {d.practical}
          </h2>
          {activity.openingHours && (
            <Practical icon={Ticket} label={d.openingHours}>
              {activity.openingHours[locale]}
            </Practical>
          )}
          {activity.pricing && (
            <Practical icon={Wallet} label={d.pricing}>
              {activity.pricing[locale]}
            </Practical>
          )}
          {activity.transportTips && (
            <Practical icon={Train} label={d.transport}>
              {activity.transportTips[locale]}
            </Practical>
          )}
          <Practical icon={Sunrise} label={d.bestTime}>
            {bestTime}
          </Practical>
          <Practical icon={Compass} label={d.seasons}>
            {seasons}
          </Practical>
          <Practical icon={Users} label={d.setting}>
            {a.settings[activity.setting]} · {a.touristLevels[activity.touristLevel]}
          </Practical>
          {activity.accessibility?.notes && (
            <Practical icon={Heart} label={d.accessibility}>
              {activity.accessibility.notes[locale]}
            </Practical>
          )}
          <Link
            href={plannerHref}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Compass className="size-4" />
            {d.planTrip}
          </Link>
        </aside>
      </div>

      {/* Etiquette + avertissements. */}
      {(activity.localEtiquette || activity.warnings) && (
        <section className="grid gap-3 sm:grid-cols-2">
          {activity.localEtiquette && activity.localEtiquette.length > 0 && (
            <div className="rounded-card border border-border bg-surface p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ScrollText className="size-4 text-accent" />
                {d.etiquette}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {activity.localEtiquette.map((item, i) => (
                  <li key={i} className="text-sm text-muted">
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activity.warnings && activity.warnings.length > 0 && (
            <div className="rounded-card border border-amber-500/30 bg-amber-500/5 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <AlertTriangle className="size-4 text-amber-500" />
                {d.warnings}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {activity.warnings.map((item, i) => (
                  <li key={i} className="text-sm text-muted">
                    {item[locale]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Avis. */}
      {activity.reviews && activity.reviews.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            {d.reviews}
          </h2>
          <div className="mt-3 space-y-3">
            {activity.reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-card border border-border bg-surface p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {review.author}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    {review.rating}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-accent">
                  {review.highlight[locale]}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {review.body[locale]}
                </p>
                {review.crowdInsight && (
                  <p className="mt-2 flex gap-1.5 text-xs text-muted">
                    <Users className="size-3.5 shrink-0 text-accent" />
                    {review.crowdInsight[locale]}
                  </p>
                )}
                {review.localTip && (
                  <p className="mt-1 flex gap-1.5 text-xs text-muted">
                    <Lightbulb className="size-3.5 shrink-0 text-accent" />
                    {review.localTip[locale]}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Galerie. */}
      {gallery.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            {d.gallery}
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface-muted"
              >
                <Image
                  src={img.url}
                  alt={`${activity.title[locale]} ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Activites liees. */}
      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-foreground">
            {d.related}
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <ActivityCard
                key={entry.activity.slug}
                activity={entry.activity}
                image={entry.image}
                cityName={entry.cityName}
                locale={locale}
                dict={dict}
                score={entry.score}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// Carte "fait cle" compacte du bandeau sous le hero.
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

// Section editoriale chaleureuse (ambiance, moment ideal, conseil local).
function Editorial({
  icon: Icon,
  title,
  tone = "default",
  children,
}: {
  icon: typeof Clock;
  title: string;
  tone?: "default" | "accent";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-card border p-4 ${
        tone === "accent"
          ? "border-accent/30 bg-accent/5"
          : "border-border bg-surface"
      }`}
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Icon className="size-4 text-accent" />
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}

// Ligne d'info pratique de la barre laterale.
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
