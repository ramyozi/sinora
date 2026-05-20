import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pretripModules } from "@/data/pretrip/modules";
import { Container } from "@/components/ui/container";
import { ModuleCard } from "@/components/pretrip/module-card";
import { QuickEssentials } from "@/components/pretrip/quick-essentials";
import { TimelineStrip } from "@/components/pretrip/timeline-strip";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.meta.title,
    description: dict.pretrip.meta.description,
    alternates: { canonical: `/${locale}/preparer` },
  };
}

export default async function PreparerHubPage({
  params,
}: PageProps<"/[locale]/preparer">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">{dict.pretrip.subtitle}</p>
      </header>

      <QuickEssentials locale={locale} dict={dict} />

      <TimelineStrip locale={locale} dict={dict} />

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.modulesTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.modulesSubtitle}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pretripModules.map((module) => (
            <ModuleCard
              key={module.slug}
              module={module}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
