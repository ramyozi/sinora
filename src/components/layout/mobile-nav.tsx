"use client";

import { useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/lib/navigation";

export interface MobileNavLink {
  label: string;
  href: string;
}

const itemClass =
  "rounded-lg px-3 py-2 text-base text-foreground transition-colors hover:bg-surface-muted";

// Menu mobile : `<dialog>` natif (focus piégé, ESC, backdrop accessibles).
export function MobileNav({
  locale,
  dict,
  links,
}: {
  locale: Locale;
  dict: Dictionary;
  links: MobileNavLink[];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        aria-label="Menu"
        className="grid size-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-muted md:hidden"
      >
        <Menu className="size-4" />
      </button>

      <dialog
        ref={ref}
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
        className="fixed inset-auto right-0 top-0 m-0 h-dvh w-80 max-w-[88vw] bg-background p-6 text-foreground shadow-2xl backdrop:bg-foreground/40"
      >
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-surface-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={itemClass}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={localizedPath("/route-planner", locale)}
          onClick={close}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          {dict.nav.cta}
        </Link>
      </dialog>
    </>
  );
}
