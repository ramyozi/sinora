import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { budgetTips, paymentMethods } from "@/data/pretrip/budget";
import { Container } from "@/components/ui/container";
import { PaymentMethodCard } from "@/components/pretrip/budget/payment-method-card";
import { BudgetTipCard } from "@/components/pretrip/budget/budget-tip-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.budget.meta.title,
    description: dict.pretrip.budget.meta.description,
    alternates: { canonical: `/${locale}/preparer/budget` },
  };
}

export default async function BudgetPage({
  params,
}: PageProps<"/[locale]/preparer/budget">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.modules.budget.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.pretrip.modules.budget.summary}
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.budget.methodsTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.budget.methodsSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.slug}
              method={method}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.budget.tipsTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.budget.tipsSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgetTips.map((tip) => (
            <BudgetTipCard
              key={tip.slug}
              tip={tip}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
