import { AlertTriangle } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { VisaError } from "@/data/pretrip/visa";

// Erreur fréquente à éviter, mise en évidence par un encart.
export function VisaErrorCallout({
  error,
  locale,
}: {
  error: VisaError;
  locale: Locale;
}) {
  return (
    <article className="flex gap-4 rounded-card border border-border bg-surface p-5">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        <AlertTriangle className="size-4" />
      </span>
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          {error.title[locale]}
        </h3>
        <p className="mt-1 text-sm text-muted">{error.detail[locale]}</p>
      </div>
    </article>
  );
}
