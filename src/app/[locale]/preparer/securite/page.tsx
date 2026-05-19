import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { emergencyContacts, safetyTips } from "@/data/pretrip/safety";
import { Container } from "@/components/ui/container";
import { SafetyTipCard } from "@/components/pretrip/safety/safety-tip-card";
import { EmergencyContactCard } from "@/components/pretrip/safety/emergency-contact-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.safety.meta.title,
    description: dict.pretrip.safety.meta.description,
    alternates: { canonical: `/${locale}/preparer/securite` },
  };
}

export default async function SafetyPage({
  params,
}: PageProps<"/[locale]/preparer/securite">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.modules.securite.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.pretrip.modules.securite.summary}
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.safety.tipsTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.safety.tipsSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {safetyTips.map((tip) => (
            <SafetyTipCard
              key={tip.slug}
              tip={tip}
              locale={locale}
              dict={dict}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.safety.emergencyTitle}
        </h2>
        <p className="mt-2 text-muted">
          {dict.pretrip.safety.emergencySubtitle}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {emergencyContacts.map((contact) => (
            <EmergencyContactCard
              key={contact.slug}
              contact={contact}
              locale={locale}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
