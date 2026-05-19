import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./how-it-works";

// Dégradés distincts par ville, en attendant la photothèque réelle.
const gradients = [
  "from-accent/30 via-accent/10 to-transparent",
  "from-jade/30 via-jade/10 to-transparent",
  "from-gold/35 via-gold/10 to-transparent",
  "from-accent/25 via-gold/15 to-transparent",
  "from-jade/30 via-accent/10 to-transparent",
  "from-gold/30 via-jade/15 to-transparent",
];

// Aperçu des destinations phares.
export function Cities({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="cities"
      className="scroll-mt-20 border-t border-border bg-surface py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          title={dict.cities.title}
          subtitle={dict.cities.subtitle}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.cities.items.map((city, index) => (
            <article
              key={city.name}
              className="group overflow-hidden rounded-card border border-border bg-background"
            >
              <div
                className={`relative flex h-40 items-end bg-gradient-to-br p-5 ${gradients[index % gradients.length]}`}
              >
                <span className="absolute right-4 top-4 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-muted backdrop-blur">
                  {city.region}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {city.name}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <p className="text-sm text-muted">{city.tagline}</p>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
