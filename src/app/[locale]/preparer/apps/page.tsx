import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pretripApps, pretripConfigTips } from "@/data/pretrip/apps";
import { Container } from "@/components/ui/container";
import { AppCard } from "@/components/pretrip/apps/app-card";
import { ConfigTipCard } from "@/components/pretrip/apps/config-tip-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.pretrip.apps.meta.title,
    description: dict.pretrip.apps.meta.description,
    alternates: { canonical: `/${locale}/preparer/apps` },
  };
}

export default async function AppsPage({
  params,
}: PageProps<"/[locale]/preparer/apps">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const pinned = pretripApps.filter((app) => app.pinned);
  const localTips = pretripApps.filter((app) => app.localTip);
  const others = pretripApps.filter((app) => !app.pinned && !app.localTip);

  return (
    <Container className="space-y-14 py-16 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {dict.pretrip.modules.apps.title}
        </h1>
        <p className="mt-3 text-pretty text-muted">
          {dict.pretrip.modules.apps.summary}
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.apps.pinnedTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.apps.pinnedSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pinned.map((app) => (
            <AppCard key={app.slug} app={app} locale={locale} dict={dict} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.apps.othersTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.apps.othersSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((app) => (
            <AppCard key={app.slug} app={app} locale={locale} dict={dict} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-2xl">
            🇨🇳
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {dict.pretrip.apps.localTipsTitle}
          </h2>
        </div>
        <p className="mt-2 text-muted">
          {dict.pretrip.apps.localTipsSubtitle}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {localTips.map((app) => (
            <AppCard key={app.slug} app={app} locale={locale} dict={dict} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {dict.pretrip.apps.configTitle}
        </h2>
        <p className="mt-2 text-muted">{dict.pretrip.apps.configSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {pretripConfigTips.map((tip) => (
            <ConfigTipCard
              key={tip.slug}
              tip={tip}
              locale={locale}
              beforeLabel={dict.pretrip.apps.configBefore}
              arrivalLabel={dict.pretrip.apps.configOnArrival}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
