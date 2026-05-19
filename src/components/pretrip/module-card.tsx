import Link from "next/link";
import {
  Briefcase,
  CalendarClock,
  Languages,
  ShieldCheck,
  Smartphone,
  Stamp,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PretripIcon, PretripModule } from "@/data/pretrip/modules";
import { cn } from "@/lib/cn";
import { localizedPath } from "@/lib/navigation";

const iconMap: Record<PretripIcon, LucideIcon> = {
  stamp: Stamp,
  smartphone: Smartphone,
  languages: Languages,
  "shield-check": ShieldCheck,
  "utensils-crossed": UtensilsCrossed,
  wallet: Wallet,
  briefcase: Briefcase,
  "calendar-clock": CalendarClock,
};

// Carte d'un module de préparation, désactivée tant que la page n'est pas livrée.
export function ModuleCard({
  module,
  locale,
  dict,
}: {
  module: PretripModule;
  locale: Locale;
  dict: Dictionary;
}) {
  const Icon = iconMap[module.icon];
  const meta = dict.pretrip.modules[module.slug];
  const badge = module.available
    ? { label: dict.pretrip.available, className: "bg-jade/10 text-jade" }
    : { label: dict.pretrip.soon, className: "bg-surface-muted text-muted" };

  const baseClass =
    "block rounded-card border border-border bg-surface p-6 transition-colors";

  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
          <Icon className="size-5" />
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            badge.className,
          )}
        >
          {badge.label}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {meta.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {meta.summary}
      </p>
    </>
  );

  if (!module.available) {
    return (
      <div
        className={cn(baseClass, "opacity-60")}
        aria-disabled
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={localizedPath(`/preparer/${module.slug}`, locale)}
      className={cn(baseClass, "hover:border-accent/40")}
    >
      {inner}
    </Link>
  );
}
