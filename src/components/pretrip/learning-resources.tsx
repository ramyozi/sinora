import {
  Apple,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Play,
  Video,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type {
  LearningResource,
  ResourceLevel,
  ResourceType,
} from "@/data/pretrip/resources";
import { learningResources } from "@/data/pretrip/resources";

const typeIcon: Record<ResourceType, typeof Play> = {
  youtube: Video,
  app: Apple,
  website: BookOpen,
  course: GraduationCap,
};

const levelColor: Record<ResourceLevel, string> = {
  beginner: "bg-emerald-500/15 text-emerald-500",
  intermediate: "bg-amber-500/15 text-amber-500",
  advanced: "bg-rose-500/15 text-rose-500",
};

interface Props {
  locale: Locale;
  dict: Dictionary;
}

// Section "Apprendre avant de partir" : ressources externes curees.
export function LearningResources({ locale, dict }: Props) {
  const lr = dict.pretrip.learning;
  const groups = new Map<ResourceType, LearningResource[]>();
  for (const r of learningResources) {
    const list = groups.get(r.type) ?? [];
    list.push(r);
    groups.set(r.type, list);
  }

  const orderedTypes: ResourceType[] = ["youtube", "app", "website", "course"];

  return (
    <section>
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-2xl">
          📚
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {lr.title}
        </h2>
      </div>
      <p className="mt-2 text-muted">{lr.subtitle}</p>

      <div className="mt-8 space-y-10">
        {orderedTypes.map((type) => {
          const items = groups.get(type) ?? [];
          if (items.length === 0) return null;
          const Icon = typeIcon[type];
          return (
            <div key={type}>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
                <Icon className="size-4 text-accent" />
                {lr.types[type]}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((res) => (
                  <article
                    key={res.slug}
                    className="flex h-full flex-col rounded-card border border-border bg-surface p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-foreground">
                        {res.title}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${levelColor[res.level]}`}
                      >
                        {lr.levels[res.level]}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {res.description[locale]}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3 text-xs text-muted">
                      <span>{res.duration ? res.duration[locale] : ""}</span>
                      {res.free && (
                        <span className="rounded-full bg-jade/15 px-2 py-0.5 text-jade">
                          {lr.free}
                        </span>
                      )}
                    </div>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-surface-muted"
                    >
                      <ExternalLink className="size-3.5" />
                      {lr.open}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
