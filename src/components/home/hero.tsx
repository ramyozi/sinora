import { ArrowRight, CloudSun, MapPin, ShieldCheck, TrainFront } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/lib/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

// Section d'ouverture : accroche, appels à l'action et aperçu visuel.
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      {/* Halo d'accent et grille décorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-[28rem] w-[48rem] max-w-full rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] [background-size:32px_32px] opacity-50"
      />

      <Container className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
            <span className="size-1.5 rounded-full bg-accent" />
            {dict.hero.badge}
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {dict.hero.title}{" "}
            <span className="text-accent">{dict.hero.titleAccent}</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg">
            {dict.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={localizedPath("/route-planner", locale)} size="lg">
              {dict.hero.ctaPrimary}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="#cities" size="lg" variant="secondary">
              {dict.hero.ctaSecondary}
            </ButtonLink>
          </div>
        </div>

        <HeroVisual />

        <ul className="mx-auto mt-16 flex max-w-2xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {dict.hero.stats.map((stat) => (
            <li key={stat.label} className="text-center">
              <div className="text-3xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// Trois cartes flottantes illustrant les données du produit.
function HeroVisual() {
  return (
    <div className="relative mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-4">
      <PreviewCard
        icon={<TrainFront className="size-5" />}
        accent="text-accent"
        title="Pékin → Xi'an"
        value="4h 32"
        note="Train G · 2e classe"
      />
      <PreviewCard
        icon={<CloudSun className="size-5" />}
        accent="text-gold"
        title="Chengdu 成都"
        value="21°"
        note="Doux · faible pollution"
      />
      <PreviewCard
        icon={<ShieldCheck className="size-5" />}
        accent="text-jade"
        title="72 / 144 h"
        value="Visa"
        note="Transit sans visa"
      />
    </div>
  );
}

function PreviewCard({
  icon,
  accent,
  title,
  value,
  note,
}: {
  icon: React.ReactNode;
  accent: string;
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="w-52 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={accent}>{icon}</span>
        <MapPin className="size-4 text-muted" />
      </div>
      <div className="mt-3 text-sm font-medium text-foreground">{title}</div>
      <div className="mt-0.5 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted">{note}</div>
    </div>
  );
}
