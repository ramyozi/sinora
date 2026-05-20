import type { Dictionary } from "@/i18n/dictionaries";
import type { FatigueAssessment, FatigueLevel } from "@/data/routes";
import { cn } from "@/lib/cn";

const ORDER: FatigueLevel[] = ["calm", "moderate", "intense", "exhausting"];

const dotColor: Record<FatigueLevel, string> = {
  calm: "bg-jade",
  moderate: "bg-gold",
  intense: "bg-accent",
  exhausting: "bg-accent",
};

const textColor: Record<FatigueLevel, string> = {
  calm: "text-jade",
  moderate: "text-gold",
  intense: "text-accent",
  exhausting: "text-accent",
};

interface Props {
  assessment: FatigueAssessment;
  dict: Dictionary;
}

// Indicateur visuel d'intensité du voyage + message contextuel.
export function FatigueMeter({ assessment, dict }: Props) {
  const f = dict.routePlanner.fatigue;
  const idx = ORDER.indexOf(assessment.level);
  const suggestion =
    assessment.level === "intense"
      ? f.suggestions.intense
      : assessment.level === "exhausting"
        ? f.suggestions.exhausting
        : null;

  return (
    <div className="rounded-card bg-surface-muted p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">
            {f.title}
          </div>
          <div
            className={cn(
              "mt-0.5 text-base font-semibold",
              textColor[assessment.level],
            )}
          >
            {f.levels[assessment.level]}
          </div>
        </div>
        <div
          className="flex gap-1.5"
          role="meter"
          aria-valuenow={idx + 1}
          aria-valuemin={1}
          aria-valuemax={4}
          aria-label={f.title}
        >
          {ORDER.map((lvl, i) => (
            <span
              key={lvl}
              className={cn(
                "h-2 w-5 rounded-full",
                i <= idx ? dotColor[assessment.level] : "bg-border",
              )}
            />
          ))}
        </div>
      </div>
      {suggestion && (
        <p className="mt-3 text-xs text-muted">{suggestion}</p>
      )}
    </div>
  );
}
