import { Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { VisaDocument } from "@/data/pretrip/visa";

// Liste des documents à préparer.
export function VisaDocumentsChecklist({
  documents,
  locale,
  dict,
}: {
  documents: VisaDocument[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <ul className="space-y-3 rounded-card border border-border bg-surface p-5">
      {documents.map((doc) => (
        <li key={doc.slug} className="flex items-start gap-3">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-border text-muted">
            <Check className="size-3.5" />
          </span>
          <div>
            <p className="text-sm text-foreground">{doc.label[locale]}</p>
            {doc.note && (
              <p className="mt-1 text-xs text-muted">
                {dict.pretrip.visa.note} : {doc.note[locale]}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
