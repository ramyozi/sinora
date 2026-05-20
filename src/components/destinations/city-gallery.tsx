import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";
import type { WikiGalleryImage } from "@/lib/api/providers/wiki-gallery";

interface Props {
  images: WikiGalleryImage[];
  title: string;
  dict: Dictionary;
}

// Galerie immersive : grille responsive, lazy-loaded.
export function CityGallery({ images, title, dict }: Props) {
  if (images.length === 0) return null;
  const label = dict.destinations.galleryLabel;
  const credit = dict.destinations.galleryCredit;

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {label}
      </h2>
      <p className="mt-2 text-sm text-muted">
        {credit.replace("{topic}", title)}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, idx) => (
          <figure
            key={img.filename || idx}
            className="relative overflow-hidden rounded-card border border-border bg-surface-muted"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={img.url}
                alt={img.caption ?? title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                unoptimized
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            {img.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent px-3 py-2 text-xs text-foreground line-clamp-2">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
