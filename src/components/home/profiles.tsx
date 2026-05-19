import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./how-it-works";

// Éventail des profils de voyageur pris en charge, sous forme de pastilles.
export function Profiles({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          title={dict.profiles.title}
          subtitle={dict.profiles.subtitle}
        />

        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {dict.profiles.items.map((profile) => (
            <li
              key={profile}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              {profile}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
