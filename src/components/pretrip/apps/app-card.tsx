import { CheckCircle2, Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PretripApp } from "@/data/pretrip/apps";

// Carte d'une application recommandée.
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

  return (
    <article className="flex flex-col rounded-card border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            {app.name}
          </h3>
          {app.publisher !== "—" && (
            <p className="mt-0.5 text-xs text-muted">
              {dict.pretrip.apps.publisherLabel} : {app.publisher}
            </p>
          )}
        </div>
        <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground">
          {dict.pretrip.apps.categories[app.category]}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {app.description[locale]}
      </p>
      <div
        className={`mt-4 inline-flex items-center gap-1.5 border-t border-border pt-3 text-xs ${installAccent}`}
      >
        <InstallIcon className="size-3.5" />
        {installNote}
      </div>
    </article>
  );
}
