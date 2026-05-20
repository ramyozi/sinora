import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { phrases, phraseCategories } from "@/data/pretrip/phrases";
import { Container } from "@/components/ui/container";
import { LearningResources } from "@/components/pretrip/learning-resources";
import { PhraseCard } from "@/components/pretrip/phrases/phrase-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.phrases.meta.title,
    description: dict.pretrip.phrases.meta.description,
    alternates: { canonical: `/${locale}/preparer/phrases` },
  };
}

export default async function PhrasesPage({
  params,
}: PageProps<"/[locale]/preparer/phrases">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.modules.phrases.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.pretrip.modules.phrases.summary}
        </p>
      </header>

      {phraseCategories.map((category) => {
        const items = phrases.filter((p) => p.category === category);
        return (
          <section key={category}>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {dict.pretrip.phrases.categories[category]}
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((phrase) => (
                <PhraseCard
                  key={phrase.slug}
                  phrase={phrase}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        );
      })}

      <LearningResources locale={locale} dict={dict} />
    </Container>
  );
}
