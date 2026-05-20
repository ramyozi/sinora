import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localizedPath } from "@/lib/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

// Mapping slug vers route. null signifie module non encore livré (badge Bientôt).
const slugToPath: Record<string, string | null> = {
  destinations: "/destinations",
  "route-planner": "/route-planner",
  trains: null,
  events: "/events",
  visa: "/preparer/visa",
  esim: "/preparer/apps",
  apps: "/preparer/apps",
  payments: "/preparer/budget",
  about: null,
  privacy: null,
  contact: null,
};

const itemClass =
  "text-sm text-muted transition-colors hover:text-foreground";

// Pied de page : marque, colonnes de liens et mentions.
export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-3">
            <Logo locale={locale} />
            <p className="max-w-xs text-sm text-muted">{dict.footer.tagline}</p>
          </div>

          {dict.footer.columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => {
                  const path = slugToPath[link.slug];
                  if (path) {
                    return (
                      <li key={link.slug}>
                        <Link
                          href={localizedPath(path, locale)}
                          className={itemClass}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={link.slug}
                      className="flex items-center gap-2"
                    >
                      <span className="cursor-default text-sm text-muted/70">
                        {link.label}
                      </span>
                      <span className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                        {dict.footer.soon}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} Sinora. {dict.footer.rights}
          </span>
          <span>Pékin · Shanghai · Chengdu · Xi&apos;an</span>
        </div>
      </Container>
    </footer>
  );
}
