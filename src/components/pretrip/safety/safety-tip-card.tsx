import {
  Ban,
  Cloud,
  Phone,
  Shield,
  Smartphone,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { SafetyIcon, SafetyTip } from "@/data/pretrip/safety";
import { cn } from "@/lib/cn";

const iconMap: Record<SafetyIcon, LucideIcon> = {
  "wifi-off": WifiOff,
  cloud: Cloud,
  shield: Shield,
  ban: Ban,
  phone: Phone,
  smartphone: Smartphone,
};

// Conseil de sécurité / hors-ligne, avec marquage « critique » optionnel.
export function SafetyTipCard({
  tip,
  locale,
  dict,
}: {
  tip: SafetyTip;
  locale: Locale;
  dict: Dictionary;
}) {
  const Icon = iconMap[tip.icon];
  return (
    <article
      className={cn(
        "rounded-card border bg-surface p-5",
        tip.critical ? "border-accent/40" : "border-border",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
          <Icon className="size-5" />
        </span>
        <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground">
          {dict.pretrip.safety.kinds[tip.kind]}
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">
        {tip.title[locale]}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {tip.detail[locale]}
      </p>
      {tip.critical && (
        <p className="mt-3 inline-block rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
          {dict.pretrip.safety.criticalBadge}
        </p>
      )}
    </article>
  );
}
