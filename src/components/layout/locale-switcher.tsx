"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Check, Globe } from "lucide-react";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { setLocaleCookie, switchLocaleInPath } from "@/lib/navigation";
import { cn } from "@/lib/cn";

// Sélecteur de langue : met à jour l'URL et mémorise le choix via cookie.
export function LocaleSwitcher({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function choose(next: Locale) {
    setOpen(false);
    if (next === current) return;
    setLocaleCookie(next);
    router.push(switchLocaleInPath(pathname, next));
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm text-foreground transition-colors hover:bg-surface-muted"
      >
        <Globe className="size-4" />
        <span className="uppercase">{current}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-surface p-1 shadow-lg shadow-black/5"
        >
          {locales.map((locale) => (
            <li key={locale}>
              <button
                type="button"
                role="option"
                aria-selected={locale === current}
                onMouseDown={() => choose(locale)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors hover:bg-surface-muted",
                  locale === current && "text-accent",
                )}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden>{localeMeta[locale].flag}</span>
                  {localeMeta[locale].native}
                </span>
                {locale === current && <Check className="size-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
