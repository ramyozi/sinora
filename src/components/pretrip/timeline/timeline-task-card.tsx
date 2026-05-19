import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { TimelineTask } from "@/data/pretrip/timeline";
import { localizedPath } from "@/lib/navigation";

// Carte d'une tâche de la timeline.
export function TimelineTaskCard({
  task,
  locale,
  dict,
}: {
  task: TimelineTask;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">
          {task.title[locale]}
        </h3>
        <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground">
          {dict.pretrip.timeline.categories[task.category]}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {task.detail[locale]}
      </p>
      {task.moduleSlug && (
        <Link
          href={localizedPath(`/preparer/${task.moduleSlug}`, locale)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
        >
          {dict.pretrip.timeline.openModule}
          <ArrowRight className="size-3" />
        </Link>
      )}
    </article>
  );
}
