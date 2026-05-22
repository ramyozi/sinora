"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { mapProviders, type MapPlace } from "@/lib/maps";

interface Props {
  /** Lieu a ouvrir : nom, ville, adresse, coordonnees WGS-84. */
  place: MapPlace;
  /** Libelle du bouton declencheur. */
  buttonLabel: string;
  /** Titre du panneau ("Ouvrir dans"). */
  title: string;
  /** Etiquette des fournisseurs utilisables en Chine. */
  chinaHint: string;
  /** Variante visuelle du bouton. */
  variant?: "primary" | "outline";
}

// Menu de navigation multi-cartes.
//
// Sur clic, ouvre une bottom sheet sur mobile (panneau ancre en bas, plein
// largeur, avec fond grise) et un dropdown sur desktop (ancre sous le
// bouton). Chaque entree est un lien `https` universel qui ouvre
// l'application native sur mobile si elle est installee, la version web
// sinon. Les fournisseurs adaptes a la Chine sont signales.
export function MapNavigationMenu({
  place,
  buttonLabel,
  title,
  chinaHint,
  variant = "outline",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fermeture au clic exterieur et a la touche Echap.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const buttonClass =
    variant === "primary"
      ? "flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
      : "flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={buttonClass}
      >
        <Navigation className="size-4" />
        {buttonLabel}
      </button>

      {open && (
        <>
          {/* Fond grise : mobile uniquement (bottom sheet). */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-black/40 sm:hidden"
          />
          {/* Panneau : bottom sheet sur mobile, dropdown sur desktop. */}
          <div
            role="menu"
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border bg-surface p-4 pb-7 shadow-2xl sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 sm:rounded-xl sm:border sm:p-2 sm:pb-2 sm:shadow-xl"
          >
            <div className="px-1 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              {title}
            </div>
            <ul className="space-y-1">
              {mapProviders.map((provider) => (
                <li key={provider.id}>
                  <a
                    href={provider.build(place)}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-surface-muted"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="size-4 text-accent" />
                      {provider.label}
                    </span>
                    {provider.chinaReady && (
                      <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                        {chinaHint}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
