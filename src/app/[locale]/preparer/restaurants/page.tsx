import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { foodKeywords, foodTips } from "@/data/pretrip/food";
import { Container } from "@/components/ui/container";
import { FoodTipCard } from "@/components/pretrip/food/food-tip-card";
import { FoodKeywordCard } from "@/components/pretrip/food/keyword-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.food.meta.title,
    description: dict.pretrip.food.meta.description,
    alternates: { canonical: `/${locale}/preparer/restaurants` },
  };
}

export default async function FoodPage({
  params,
}: PageProps<"/[locale]/preparer/restaurants">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.modules.restaurants.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.pretrip.modules.restaurants.summary}
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.food.tipsTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.food.tipsSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foodTips.map((tip) => (
            <FoodTipCard key={tip.slug} tip={tip} locale={locale} dict={dict} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.food.keywordsTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.food.keywordsSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foodKeywords.map((keyword) => (
            <FoodKeywordCard
              key={keyword.slug}
              keyword={keyword}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
