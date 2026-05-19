import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { VisaType } from "@/data/pretrip/visa";

// Carte d'une catégorie de visa.
export function VisaTypeCard({
  type,
  locale,
  dict,
}: {
  type: VisaType;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-baseline gap-3">
        <span className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-sm font-semibold text-accent">
          {type.code}
        </span>
        <h3 className="text-base font-semibold text-foreground">
          {type.title[locale]}
        </h3>
      </div>
      <dl className="mt-3 grid gap-2 text-sm">
        <div>
          <dt className="inline text-muted">{dict.pretrip.visa.purpose} : </dt>
          <dd className="inline text-foreground">{type.purpose[locale]}</dd>
        </div>
        <div>
          <dt className="inline text-muted">{dict.pretrip.visa.duration} : </dt>
          <dd className="inline text-foreground">{type.duration[locale]}</dd>
        </div>
      </dl>
    </article>
  );
}
