import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/lib/navigation";

interface Essential {
  emoji: string;
  slug: string;
  href: string;
}

// Bandeau visuel synthetique a l'ouverture du hub preparation.
export function QuickEssentials({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const qe = dict.pretrip.quickEssentials;
  const items: Essential[] = [
    { slug: "visa", emoji: "🛂", href: localizedPath("/preparer/visa", locale) },
    {
      slug: "esim",
      emoji: "📶",
      href: localizedPath("/preparer/apps", locale),
    },
    {
      slug: "payment",
      emoji: "💳",
      href: localizedPath("/preparer/budget", locale),
    },
    {
      slug: "language",
      emoji: "🗣️",
      href: localizedPath("/preparer/phrases", locale),
    },
    {
      slug: "packing",
      emoji: "🎒",
      href: localizedPath("/preparer/bagages", locale),
    },
    {
      slug: "safety",
      emoji: "🛟",
      href: localizedPath("/preparer/securite", locale),
    },
  ];

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
        {qe.title}
      </h2>
      <p className="mt-1 text-base text-foreground">{qe.subtitle}</p>
      <ul className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              className="group flex h-full flex-col items-start gap-2 rounded-card border border-border bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <span className="text-3xl" aria-hidden>
                {item.emoji}
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {qe.items[item.slug as keyof typeof qe.items].title}
                </div>
                <p className="mt-1 text-xs text-muted">
                  {qe.items[item.slug as keyof typeof qe.items].body}
                </p>
              </div>
              <span className="mt-auto text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
                {qe.openLabel}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
