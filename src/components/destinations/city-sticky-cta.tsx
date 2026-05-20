"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/lib/navigation";

interface Props {
  slug: string;
  cityName: string;
  label: string;
  locale: Locale;
}

// Bouton flottant en bas d'ecran sur mobile : se manifeste quand le hero
// disparait du viewport. Sticky CTA pour ajouter la ville au planner sans
// avoir a remonter.
export function CityStickyCTA({ slug, cityName, label, locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Le hero porte data-attr=city-hero ; on observe sa sortie du viewport.
    const hero = document.querySelector("[data-city-hero]");
    if (!hero) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        // visible si le hero N'est PLUS dans le viewport (utilisateur a scrolle).
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-opacity duration-200 md:hidden ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Link
        href={`${localizedPath("/route-planner", locale)}?cities=${slug}`}
        className={`pointer-events-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/30 transition-colors hover:bg-accent-hover ${
          visible ? "" : "pointer-events-none"
        }`}
        tabIndex={visible ? 0 : -1}
      >
        <Sparkles className="size-4" />
        <span>{label}</span>
        <span className="text-accent-foreground/80">- {cityName}</span>
      </Link>
    </div>
  );
}
