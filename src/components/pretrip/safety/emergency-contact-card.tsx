import { Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { EmergencyContact } from "@/data/pretrip/safety";

// Numéro d'urgence à mémoriser.
export function EmergencyContactCard({
  contact,
  locale,
}: {
  contact: EmergencyContact;
  locale: Locale;
}) {
  return (
    <article className="flex items-center gap-4 rounded-card border border-border bg-surface p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
        <Phone className="size-5" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-muted">
          {contact.label[locale]}
        </div>
        <a
          href={`tel:${contact.number}`}
          className="mt-0.5 block font-mono text-2xl font-semibold text-foreground hover:text-accent"
        >
          {contact.number}
        </a>
      </div>
    </article>
  );
}
