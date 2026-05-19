import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/lib/navigation";

// Marque Sinora : pictogramme « pics karstiques » + logotype.
export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link
      href={localizedPath("/", locale)}
      className="flex items-center gap-2.5"
      aria-label="Sinora — accueil"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-accent">
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-accent-foreground"
          fill="none"
          aria-hidden
        >
          <circle cx="17" cy="6.5" r="2.5" fill="currentColor" />
          <path
            d="M2 20.5 L8 9 L12.5 17 L15.5 11.5 L22 20.5 Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Sinora
      </span>
    </Link>
  );
}
