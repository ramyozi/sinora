import { AlertTriangle, ExternalLink, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { BookingContext, BookingPlatform } from "@/data/routes/booking";
import { cn } from "@/lib/cn";

const contextAccent: Record<BookingContext, string> = {
  "before-china": "bg-jade/10 text-jade",
  "in-china": "bg-accent/10 text-accent",
  anytime: "bg-gold/10 text-gold",
};

interface Props {
  platforms: BookingPlatform[];
  locale: Locale;
  dict: Dictionary;
}

// Section premium "Où réserver" : carte par plateforme avec contexte, conseil et caveat.
export function BookingCards({ platforms, locale, dict }: Props) {
  if (platforms.length === 0) return null;
  const b = dict.routePlanner.booking;

  return (
    <section className="rounded-card border border-border bg-surface p-6">
      <header>
        <h2 className="text-lg font-semibold text-foreground">{b.title}</h2>
        <p className="mt-1 text-sm text-muted">{b.subtitle}</p>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <article
            key={platform.slug}
            className={cn(
              "flex flex-col rounded-card border bg-background p-5",
              platform.highlight ? "border-accent/40" : "border-border",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-semibold text-foreground">
                  {platform.name}
                </div>
                <span
                  className={cn(
                    "mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    contextAccent[platform.context],
                  )}
                >
                  {b.contextLabels[platform.context]}
                </span>
              </div>
              {platform.highlight && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  <Sparkles className="size-3" /> {b.primary}
                </span>
              )}
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {platform.hint[locale]}
            </p>

            {platform.caveat && (
              <div className="mt-3 flex items-start gap-2 rounded-card border border-border bg-surface-muted p-3 text-xs text-muted">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-accent" />
                <span>{platform.caveat[locale]}</span>
              </div>
            )}

            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <ExternalLink className="size-3.5" />
              {b.open}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
