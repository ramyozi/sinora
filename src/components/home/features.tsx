import {
  Compass,
  Luggage,
  Map,
  MoonStar,
  Sparkles,
  TrainFront,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./how-it-works";

// Association clé d'icône (dictionnaire) -> composant Lucide.
const icons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  luggage: Luggage,
  "train-front": TrainFront,
  map: Map,
  compass: Compass,
  "moon-star": MoonStar,
};

// Grille des fonctionnalités phares du produit.
export function Features({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-y border-border bg-surface py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          title={dict.features.title}
          subtitle={dict.features.subtitle}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.features.items.map((item) => {
            const Icon = icons[item.icon] ?? Compass;
            return (
              <article
                key={item.title}
                className="group rounded-card border border-border bg-background p-6 transition-colors hover:border-accent/40"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
