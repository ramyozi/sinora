import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/lib/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

// En-tête fixe avec navigation par ancres, sélecteur de langue et thème.
export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  // Navigation reduite a deux sections : Destinations (savoir ou aller) et
  // Preparer (savoir comment partir). L'acces au planner est porte uniquement
  // par la CTA pour eviter la confusion historique entre "Sejours" et "Planifier
  // mon voyage" qui pointaient sur la meme page.
  const links = [
    { label: dict.nav.destinations, href: localizedPath("/destinations", locale) },
    { label: dict.nav.prepare, href: localizedPath("/preparer", locale) },
  ];

  const linkClass =
    "rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher current={locale} />
          <ButtonLink
            href={localizedPath("/route-planner", locale)}
            size="sm"
            className="hidden md:inline-flex"
          >
            {dict.nav.cta}
          </ButtonLink>
          <MobileNav locale={locale} dict={dict} links={links} />
        </div>
      </Container>
    </header>
  );
}
