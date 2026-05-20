import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { JournalOverview } from "@/components/journal/journal-overview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.journal.meta.title,
    description: dict.journal.meta.description,
    alternates: { canonical: `/${locale}/journal` },
  };
}

// Carnet de voyage local-first : page-hub qui agrege les entites du carnet
// (voyages, notes, favoris, souvenirs). En PR1 on rend la coquille + la
// section notes pour valider la persistence ; les autres sections seront
// branchees dans les PRs suivantes.
export default async function JournalPage({
  params,
}: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <Container className="py-6 sm:py-10">
      <JournalOverview locale={locale} dict={dict} />
    </Container>
  );
}
