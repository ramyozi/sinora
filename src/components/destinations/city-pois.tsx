import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CityPOI, POICategory } from "@/data/cities";
import type { WikiLeadImage } from "@/lib/api/providers/wiki-image";

interface Props {
  pois: CityPOI[];
  images: Array<WikiLeadImage | null>;
  locale: Locale;
  dict: Dictionary;
}

const categoryColor: Record<POICategory, string> = {
  monument: "bg-accent/15 text-accent",
  quartier: "bg-emerald-500/15 text-emerald-500",
  marche: "bg-amber-500/15 text-amber-500",
  vue: "bg-sky-500/15 text-sky-500",
  experience: "bg-violet-500/15 text-violet-500",
  spot: "bg-rose-500/15 text-rose-500",
};

// Liste des points d'interet d'une ville en cartes avec image, badge, tags.
// L'ancrage HTML id permet a la carte POI de focus et scroller.
export function CityPOIs({ pois, images, locale, dict }: Props) {
  if (pois.length === 0) return null;
  const pi = dict.destinations.pois;

  return (
    <section id="city-pois">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {pi.title}
      </h2>
      <p className="mt-2 text-sm text-muted">{pi.subtitle}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pois.map((poi, idx) => {
          const img = images[idx] ?? null;
          return (
            <article
              key={poi.slug}
              id={`poi-${poi.slug}`}
              className="overflow-hidden rounded-card border border-border bg-surface transition-colors hover:border-accent/40 target:border-accent target:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-surface-muted">
                {img && (
                  <Image
                    src={img.url}
                    alt={poi.name[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    unoptimized
                    className="object-cover"
                  />
                )}
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${categoryColor[poi.category]}`}
                >
                  {pi.categories[poi.category]}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground">
                  {poi.name[locale]}
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {poi.description[locale]}
                </p>
                {poi.tags && poi.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {poi.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs text-foreground"
                      >
                        {tag[locale]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
