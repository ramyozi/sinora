import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { timelineBuckets, timelineTasks } from "@/data/pretrip/timeline";
import { Container } from "@/components/ui/container";
import { BucketSection } from "@/components/pretrip/timeline/bucket-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.timeline.meta.title,
    description: dict.pretrip.timeline.meta.description,
    alternates: { canonical: `/${locale}/preparer/calendrier` },
  };
}

export default async function TimelinePage({
  params,
}: PageProps<"/[locale]/preparer/calendrier">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.modules.calendrier.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.pretrip.modules.calendrier.summary}
        </p>
        <p className="mt-4 text-sm text-muted">{dict.pretrip.timeline.intro}</p>
      </header>

      {timelineBuckets.map((bucket) => {
        const tasks = timelineTasks.filter((t) => t.bucket === bucket);
        return (
          <BucketSection
            key={bucket}
            bucket={bucket}
            tasks={tasks}
            locale={locale}
            dict={dict}
          />
        );
      })}
    </Container>
  );
}
