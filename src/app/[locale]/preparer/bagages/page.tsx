import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { essentialsList } from "@/data/pretrip/packing";
import { Container } from "@/components/ui/container";
import { PackingItemRow } from "@/components/pretrip/packing/packing-item-row";
import { SeasonPicker } from "@/components/pretrip/packing/season-picker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.packing.meta.title,
    description: dict.pretrip.packing.meta.description,
    alternates: { canonical: `/${locale}/preparer/bagages` },
  };
}

export default async function PackingPage({
  params,
}: PageProps<"/[locale]/preparer/bagages">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const essentials = essentialsList();

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.modules.bagages.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.pretrip.modules.bagages.summary}
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.packing.essentialsTitle}
        </h2>
        <p className="mt-2 text-muted">
          {dict.pretrip.packing.essentialsSubtitle}
        </p>
        <ul className="mt-6 max-w-2xl space-y-3 rounded-card border border-border bg-surface p-5">
          {essentials.map((item) => (
            <PackingItemRow key={item.slug} item={item} locale={locale} />
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.packing.seasonalTitle}
        </h2>
        <p className="mt-2 text-muted">
          {dict.pretrip.packing.seasonalSubtitle}
        </p>
        <div className="mt-6 max-w-2xl">
          <SeasonPicker locale={locale} dict={dict} />
        </div>
      </section>
    </Container>
  );
}
