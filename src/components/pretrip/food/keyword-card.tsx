import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { FoodKeyword } from "@/data/pretrip/food";

// Mot-clé à repérer ou montrer (hanzi + pinyin + sens).
export function FoodKeywordCard({
  keyword,
  locale,
  dict,
}: {
  keyword: FoodKeyword;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <article className="rounded-card border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold text-foreground" lang="zh-Hans">
          {keyword.hanzi}
        </div>
        <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground">
          {dict.pretrip.food.needs[keyword.need]}
        </span>
      </div>
      <div className="mt-1 font-mono text-sm text-accent">
        {keyword.pinyin}
      </div>
      <div className="mt-2 text-sm text-muted">{keyword.meaning[locale]}</div>
    </article>
  );
}
