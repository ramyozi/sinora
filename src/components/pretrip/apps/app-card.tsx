import Image from "next/image";
import { CheckCircle2, Clock, ExternalLink, Apple, Play } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PretripApp } from "@/data/pretrip/apps";

// Carte App Store-like : logo, badge categorie, description, boutons stores.
export function AppCard({
  app,
  locale,
  dict,
}: {
  app: PretripApp;
  locale: Locale;
  dict: Dictionary;
}) {
  const installNote = app.installBefore
    ? dict.pretrip.apps.installBefore
    : dict.pretrip.apps.installAnytime;
  const installAccent = app.installBefore ? "text-accent" : "text-jade";
  const InstallIcon = app.installBefore ? Clock : CheckCircle2;
  const bg = app.logoBg ? `#${app.logoBg}` : "#1a1714";
  const logoUrl = app.logoSlug
    ? `https://cdn.simpleicons.org/${app.logoSlug}/white`
    : null;
  const initials = app.name
    .split(/[\s.]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const labels = dict.pretrip.apps.actions;
  const hasLinks =
    app.links && (app.links.playStore || app.links.appStore || app.links.official);

  return (
    <article className="flex flex-col rounded-card border border-border bg-surface p-5">
      <div className="flex items-start gap-4">
        <div
          className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl text-xl font-bold text-white"
          style={{ background: bg }}
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt=""
              width={36}
              height={36}
              unoptimized
              className="size-9 object-contain"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-foreground">
                {app.name}
              </h3>
              {app.publisher !== "-" && (
                <p className="mt-0.5 truncate text-xs text-muted">
                  {app.publisher}
                </p>
              )}
            </div>
            <span className="shrink-0 rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground">
              {dict.pretrip.apps.categories[app.category]}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {app.description[locale]}
      </p>

      {hasLinks && (
        <div className="mt-4 flex flex-wrap gap-2">
          {app.links?.appStore && (
            <a
              href={app.links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              <Apple className="size-3.5" />
              {labels.appStore}
            </a>
          )}
          {app.links?.playStore && (
            <a
              href={app.links.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-muted"
            >
              <Play className="size-3.5" />
              {labels.playStore}
            </a>
          )}
          {app.links?.official && (
            <a
              href={app.links.official}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-muted"
            >
              <ExternalLink className="size-3.5" />
              {labels.official}
            </a>
          )}
        </div>
      )}

      <div
        className={`mt-4 inline-flex items-center gap-1.5 border-t border-border pt-3 text-xs ${installAccent}`}
      >
        <InstallIcon className="size-3.5" />
        {installNote}
      </div>
    </article>
  );
}
