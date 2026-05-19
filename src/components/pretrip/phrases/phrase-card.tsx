import type { Locale } from "@/i18n/config";
import type { Phrase } from "@/data/pretrip/phrases";

// Carte d'une phrase : caractère, pinyin, sens.
export function PhraseCard({
  phrase,
  locale,
}: {
  phrase: Phrase;
  locale: Locale;
}) {
  return (
    <article className="rounded-card border border-border bg-surface p-5">
      <div className="text-3xl font-semibold text-foreground" lang="zh-Hans">
        {phrase.hanzi}
      </div>
      <div className="mt-1 font-mono text-sm text-accent">{phrase.pinyin}</div>
      <div className="mt-3 text-sm text-muted">{phrase.meaning[locale]}</div>
    </article>
  );
}
