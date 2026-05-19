import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";

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
                {column.links.map((link) => (
                  <li key={link}>
                    <span className="cursor-default text-sm text-muted transition-colors hover:text-foreground">
                      {link}
                    </span>
                  </li>
                ))}
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
