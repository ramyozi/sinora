import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PaymentMethod } from "@/data/pretrip/budget";

// Méthode de paiement avec description et étendue d'acceptation.
export function PaymentMethodCard({
  method,
  locale,
  dict,
}: {
  method: PaymentMethod;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="rounded-card border border-border bg-surface p-5">
      <h3 className="text-base font-semibold text-foreground">
        {method.name[locale]}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {method.description[locale]}
      </p>
      <p className="mt-3 border-t border-border pt-3 text-xs">
        <span className="text-muted">
          {dict.pretrip.budget.acceptanceLabel} :{" "}
        </span>
        <span className="text-foreground">{method.acceptance[locale]}</span>
      </p>
    </article>
  );
}
