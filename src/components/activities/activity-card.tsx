import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkle, Star } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Activity } from "@/data/activities";
import { categoryMeta, groupGradient } from "@/data/activities";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { localizedPath } from "@/lib/navigation";
import { categoryIcon, formatDuration } from "./activity-visuals";

interface Props {
  activity: Activity;
  image: WikiLeadImage | null;
  cityName: string;
  locale: Locale;
  dict: Dictionary;
  /** Score editorial pre-calcule cote serveur. */
  score: number;
}

// Carte activite immersive : couverture photo (ou degrade de categorie),
// chip de categorie, score editorial, badges editoriaux et meta-infos cles.
// Pensee pour une grille responsive ; toute la carte est cliquable.
export function ActivityCard({
  activity,
  image,
  cityName,
  locale,
  dict,
  score,
}: Props) {
  const a = dict.activities;
  const meta = categoryMeta[activity.category];
  const Icon = categoryIcon[activity.category];
  const gradient = groupGradient[meta.group];
  const href = localizedPath(`/activites/${activity.slug}`, locale);

  const duration = formatDuration(
    activity.duration.minMinutes,
    activity.duration.maxMinutes,
    a.durationFormat.hShort,
    a.durationFormat.minShort,
  );
  // Deux badges immersifs au maximum sur la carte, le reste sur la page detail.
  const shownBadges = activity.badges.slice(0, 2);

  return (
    <article className="group overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-accent/40">
      <Link href={href} className="block focus:outline-none">
        {/* Couverture : photo si dispo, sinon degrade de categorie + icone. */}
        <div
          className={`relative aspect-[16/10] bg-gradient-to-br ${gradient}`}
        >
          {image && (
            <Image
              src={image.url}
              alt={activity.title[locale]}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!image && (
            <div
              className="absolute inset-0 grid place-items-center text-foreground/40"
              aria-hidden
            >
              <Icon className="size-12" />
            </div>
          )}
          {/* Voile bas pour lisibilite des chips. */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Categorie en haut a gauche. */}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
            <span aria-hidden>{meta.emoji}</span>
            {a.categories[activity.category]}
          </span>

          {/* Score editorial en haut a droite. */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkle className="size-3" />
            {score}
          </span>
        </div>

        <div className="p-4">
          {/* Ville + note visiteurs. */}
          <div className="flex items-center justify-between gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {cityName}
            </span>
            <span className="inline-flex items-center gap-1 text-foreground">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {activity.rating.toFixed(1)}
              <span className="text-muted">({activity.reviewCount})</span>
            </span>
          </div>

          <h3 className="mt-1.5 text-base font-semibold text-foreground transition-colors group-hover:text-accent">
            {activity.title[locale]}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted">
            {activity.summary[locale]}
          </p>

          {/* Meta : duree + budget. */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2 py-0.5 text-muted">
              <Clock className="size-3" />
              {duration}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-2 py-0.5 text-muted">
              {a.budgets[activity.budget]}
            </span>
          </div>

          {/* Badges immersifs editoriaux. */}
          {shownBadges.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {shownBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent"
                >
                  {a.badges[badge]}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
