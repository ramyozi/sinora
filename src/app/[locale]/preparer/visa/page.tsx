import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  visaDocuments,
  visaErrors,
  visaExemptions,
  visaTypes,
} from "@/data/pretrip/visa";
import { Container } from "@/components/ui/container";
import { VisaExemptionCard } from "@/components/pretrip/visa/exemption-card";
import { VisaTypeCard } from "@/components/pretrip/visa/type-card";
import { VisaDocumentsChecklist } from "@/components/pretrip/visa/documents-checklist";
import { VisaErrorCallout } from "@/components/pretrip/visa/error-callout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.visa.meta.title,
    description: dict.pretrip.visa.meta.description,
    alternates: { canonical: `/${locale}/preparer/visa` },
  };
}

export default async function VisaPage({
  params,
}: PageProps<"/[locale]/preparer/visa">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.modules.visa.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.pretrip.modules.visa.summary}
        </p>
        <p className="mt-4 inline-flex items-start gap-2 rounded-card border border-border bg-surface px-3 py-2 text-xs text-muted">
          <Info className="mt-0.5 size-4 shrink-0 text-accent" />
          {dict.pretrip.visa.verifyDisclaimer}
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.visa.exemptionsTitle}
        </h2>
        <p className="mt-2 text-muted">
          {dict.pretrip.visa.exemptionsSubtitle}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visaExemptions.map((exemption) => (
            <VisaExemptionCard
              key={exemption.slug}
              exemption={exemption}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.visa.typesTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.visa.typesSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visaTypes.map((type) => (
            <VisaTypeCard
              key={type.code}
              type={type}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.visa.documentsTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.visa.documentsSubtitle}</p>
        <div className="mt-6 max-w-2xl">
          <VisaDocumentsChecklist
            documents={visaDocuments}
            locale={locale}
            dict={dict}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.visa.errorsTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.visa.errorsSubtitle}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {visaErrors.map((error) => (
            <VisaErrorCallout
              key={error.slug}
              error={error}
              locale={locale}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
