"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { BUDGETS, REGIONS, SEASONS, TAGS } from "@/data/cities";

const selectClass =
  "h-9 shrink-0 appearance-none rounded-full border border-border bg-surface px-3 pr-7 text-sm text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-ring";

// Barre de filtres synchronisée à l'URL : SEO friendly et partageable.
export function FilterBar({ dict }: { dict: Dictionary }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const region = searchParams.get("region") ?? "";
  const season = searchParams.get("season") ?? "";
  const budget = searchParams.get("budget") ?? "";
  const tag = searchParams.get("tag") ?? "";

  const hasFilter = Boolean(region || season || budget || tag);

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function reset() {
    router.replace(pathname, { scroll: false });
  }

  return (
    // Mobile : barre horizontale scrollable pour eviter un empilement vertical
    // qui pousse la carte plus bas. Desktop : flex-wrap classique.
    <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 sm:pb-0 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <select
        className={selectClass}
        value={region}
        onChange={(e) => update("region", e.target.value)}
        aria-label={dict.destinations.filters.region}
      >
        <option value="">{dict.destinations.filters.allRegions}</option>
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {dict.labels.regions[r]}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={season}
        onChange={(e) => update("season", e.target.value)}
        aria-label={dict.destinations.filters.season}
      >
        <option value="">{dict.destinations.filters.allSeasons}</option>
        {SEASONS.map((s) => (
          <option key={s} value={s}>
            {dict.labels.seasons[s]}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={budget}
        onChange={(e) => update("budget", e.target.value)}
        aria-label={dict.destinations.filters.budget}
      >
        <option value="">{dict.destinations.filters.allBudgets}</option>
        {BUDGETS.map((b) => (
          <option key={b} value={b}>
            {dict.labels.budget[b]}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={tag}
        onChange={(e) => update("tag", e.target.value)}
        aria-label={dict.destinations.filters.tag}
      >
        <option value="">{dict.destinations.filters.allTags}</option>
        {TAGS.map((t) => (
          <option key={t} value={t}>
            {dict.labels.tags[t]}
          </option>
        ))}
      </select>

      {hasFilter && (
        <button
          type="button"
          onClick={reset}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <X className="size-3.5" />
          {dict.destinations.filters.reset}
        </button>
      )}
    </div>
  );
}
