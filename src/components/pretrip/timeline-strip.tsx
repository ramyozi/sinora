import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { timelineTasks, timelineBuckets } from "@/data/pretrip/timeline";
import { localizedPath } from "@/lib/navigation";

// Strip visuel J-30 -> J-1 : badges par bucket avec compteur de taches.
export function TimelineStrip({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const ts = dict.pretrip.timelineStrip;

  const countByBucket = new Map<string, number>();
  for (const t of timelineTasks) {
    countByBucket.set(t.bucket, (countByBucket.get(t.bucket) ?? 0) + 1);
  }

  return (
    <section className="rounded-card border border-border bg-surface p-6">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {ts.title}
          </h2>
          <p className="mt-1 text-base text-foreground">{ts.subtitle}</p>
        </div>
        <Link
          href={localizedPath("/preparer/calendrier", locale)}
          className="hidden text-sm text-accent hover:underline sm:inline-flex"
        >
          {ts.openCalendar}
        </Link>
      </header>

      <ol className="mt-5 grid gap-3 sm:grid-cols-4">
        {timelineBuckets.map((bucket, idx) => {
          const count = countByBucket.get(bucket) ?? 0;
          return (
            <li
              key={bucket}
              className="relative rounded-card bg-surface-muted p-4"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                  {ts.buckets[bucket]}
                </span>
                <CheckCircle2 className="size-4 text-muted" />
              </div>
              <div className="mt-3 text-2xl font-semibold text-foreground">
                {count}
              </div>
              <p className="mt-1 text-xs text-muted">{ts.task}</p>
              {idx < timelineBuckets.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-0 top-1/2 hidden h-0.5 w-3 -translate-y-1/2 translate-x-1.5 bg-border sm:block"
                />
              )}
            </li>
          );
        })}
      </ol>

      <Link
        href={localizedPath("/preparer/calendrier", locale)}
        className="mt-4 inline-flex text-sm text-accent hover:underline sm:hidden"
      >
        {ts.openCalendar}
      </Link>
    </section>
  );
}
