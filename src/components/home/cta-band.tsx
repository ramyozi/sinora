import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/lib/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

// Bandeau d'appel à l'action en fin de page.
export function CtaBand({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="cta" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-card border border-border bg-foreground px-6 py-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/30 blur-3xl"
          />
          <div className="relative">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-background sm:text-4xl">
              {dict.cta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-background/70">
              {dict.cta.subtitle}
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={localizedPath("/route-planner", locale)} size="lg">
                {dict.cta.button}
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
