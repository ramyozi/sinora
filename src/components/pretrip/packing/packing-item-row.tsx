import { Check } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { PackingItem } from "@/data/pretrip/packing";

// Ligne d'un item à emporter, sous forme de checklist visuelle.
export function PackingItemRow({
  item,
  locale,
}: {
  item: PackingItem;
  locale: Locale;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-border text-muted">
        <Check className="size-3.5" />
      </span>
      <div>
        <p className="text-sm text-foreground">{item.label[locale]}</p>
        {item.note && (
          <p className="mt-1 text-xs text-muted">{item.note[locale]}</p>
        )}
      </div>
    </li>
  );
}
