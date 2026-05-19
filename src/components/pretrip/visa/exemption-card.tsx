import { Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { VisaExemption } from "@/data/pretrip/visa";
import { cn } from "@/lib/cn";

// Carte d'une exemption ou facilité de visa.
export function VisaExemptionCard({
  exemption,
  locale,
  dict,
}: {
  exemption: VisaExemption;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article
      className={cn(
        "rounded-card border bg-surface p-5",
        exemption.highlight ? "border-accent/40" : "border-border",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">
          {exemption.title[locale]}
        </h3>
        {exemption.highlight && (
          <Sparkles className="size-4 shrink-0 text-accent" />
        )}
      </div>
      <dl className="mt-3 grid gap-2 text-sm">
        <div>
          <dt className="inline text-muted">
            {dict.pretrip.visa.duration} :{" "}
          </dt>
          <dd className="inline text-foreground">
            {exemption.duration[locale]}
          </dd>
        </div>
        <div>
          <dt className="inline text-muted">
            {dict.pretrip.visa.eligibility} :{" "}
          </dt>
          <dd className="inline text-foreground">
            {exemption.eligibility[locale]}
          </dd>
        </div>
      </dl>
    </article>
  );
}
