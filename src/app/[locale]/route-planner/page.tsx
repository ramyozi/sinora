import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCities, sortCitiesByName } from "@/data/cities";
import { Container } from "@/components/ui/container";
import { RouteBuilder } from "@/components/route-planner/route-builder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.routePlanner.meta.title,
    description: dict.routePlanner.meta.description,
    alternates: { canonical: `/${locale}/route-planner` },
  };
}

export default async function RoutePlannerPage({
  params,
}: PageProps<"/[locale]/route-planner">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const cities = sortCitiesByName(getAllCities(), locale);

  return (
    <Container className="py-10 sm:py-14">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.routePlanner.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.routePlanner.subtitle}
        </p>
      </header>

      <div className="mt-10">
        <RouteBuilder cities={cities} locale={locale} dict={dict} />
      </div>
    </Container>
  );
}
