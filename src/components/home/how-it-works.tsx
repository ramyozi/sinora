import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";

// Les trois temps du voyage : avant, pendant, après.
export function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section id="how" className="scroll-mt-20 py-20 sm:py-24">
      <Container>
        <SectionHeading title={dict.how.title} subtitle={dict.how.subtitle} />

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {dict.how.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-card border border-border bg-surface p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {step.tag}
                </span>
                <span className="font-mono text-sm text-muted">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

// Titre de section réutilisable, centré.
export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-pretty text-muted">{subtitle}</p>
    </div>
  );
}
