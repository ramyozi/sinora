import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { City } from "@/data/cities";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";
import { localizedPath } from "@/lib/navigation";
import { Container } from "@/components/ui/container";
import { regionGradient } from "./region-gradient";

// En-tête de la page ville : photo en arrière-plan si disponible, sinon dégradé.
export function CityHero({
  city,
  locale,
  dict,
  image,
}: {
  city: City;
  locale: Locale;
  dict: Dictionary;
  image?: WikiLeadImage | null;
}) {
  return (
    <header className="relative overflow-hidden">
      {image ? (
        <>
          <Image
            src={image.url}
            alt={city.name[locale]}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/20"
          />
        </>
      ) : (
        <div
          aria-hidden
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${regionGradient[city.region]}`}
        />
      )}

      <Container
        className={image ? "py-16 sm:py-24 md:py-32" : "py-10 sm:py-14"}
      >
        <Link
          href={localizedPath("/destinations", locale)}
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {dict.destinations.back}
        </Link>

        <span className="mt-6 inline-block rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          {dict.labels.regions[city.region]}
        </span>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          {city.name[locale]}
        </h1>
        <p className="mt-2 text-pretty text-lg text-foreground/80">
          {city.tagline[locale]}
        </p>
      </Container>

      {image && (
        <a
          href={image.articleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 rounded-full bg-background/70 px-2.5 py-1 text-xs text-muted backdrop-blur transition-colors hover:text-foreground"
        >
          {dict.destinations.imageCredit}
        </a>
      )}
    </header>
  );
}
