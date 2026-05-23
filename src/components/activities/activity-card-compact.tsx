import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkle } from "lucide-react";
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
  score: number;
}

// Carte activite COMPACTE : layout horizontal, miniature image a gauche,
// contenu condense a droite. Pensee pour le mode liste dense ou l'on veut
// voir un maximum d'elements a l'ecran (style Google Maps / TripAdvisor).
export function ActivityCardCompact({
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

  return (
    <Link
      href={href}
      className="group flex gap-3 rounded-card border border-border bg-surface p-2 transition-colors hover:border-accent/40"
    >
      {/* Miniature : carre, degrade de categorie en repli. */}
      <div
        className={`relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${gradient} sm:w-28`}
      >
        {image ? (
          <Image
            src={image.url}
            alt={activity.title[locale]}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            unoptimized
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center text-foreground/40"
            aria-hidden
          >
            <Icon className="size-6" />
          </div>
        )}
      </div>

      {/* Contenu condense. */}
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
            {activity.title[locale]}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent">
            <Sparkle className="size-2.5" />
            {score}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted">
          <span aria-hidden>{meta.emoji}</span>
          <span className="truncate">{a.categories[activity.category]}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted">
          {activity.summary[locale]}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-1.5 text-[11px] text-muted">
          <span className="inline-flex items-center gap-0.5">
            <MapPin className="size-3" />
            {cityName}
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Clock className="size-3" />
            {duration}
          </span>
          <span>{a.budgets[activity.budget]}</span>
        </div>
      </div>
    </Link>
  );
}
