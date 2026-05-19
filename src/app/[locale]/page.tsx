import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Features } from "@/components/home/features";
import { Profiles } from "@/components/home/profiles";
import { Cities } from "@/components/home/cities";
import { CtaBand } from "@/components/home/cta-band";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <HowItWorks dict={dict} />
      <Features dict={dict} />
      <Profiles dict={dict} />
      <Cities dict={dict} />
      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
