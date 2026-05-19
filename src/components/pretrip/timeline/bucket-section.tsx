import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { TimelineBucket, TimelineTask } from "@/data/pretrip/timeline";
import { TimelineTaskCard } from "./timeline-task-card";

// Bloc d'un cran de la timeline : étiquette J-N + sous-titre + cartes tâches.
export function BucketSection({
  bucket,
  tasks,
  locale,
  dict,
}: {
  bucket: TimelineBucket;
  tasks: TimelineTask[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-10">
      <header>
        <div className="font-mono text-3xl font-semibold text-accent">
          {dict.pretrip.timeline.buckets[bucket]}
        </div>
        <p className="mt-2 text-sm text-muted">
          {dict.pretrip.timeline.bucketsSubtitle[bucket]}
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {tasks.map((task) => (
          <TimelineTaskCard
            key={task.slug}
            task={task}
            locale={locale}
            dict={dict}
          />
        ))}
      </div>
    </section>
  );
}
