import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  /** Resume affiche a droite quand le panneau est ferme (badge ou texte court). */
  summary?: ReactNode;
}

// Conteneur replieable en CSS only via <details>/<summary>. Pas de JS.
// Le bouton tient sur une ligne, le contenu flotte ensuite sans encadrement
// supplementaire pour ne pas dupliquer les bordures des sections enfants.
export function Disclosure({
  title,
  defaultOpen,
  summary,
  children,
}: Props) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-full border border-border bg-surface px-4 py-2.5 text-left transition-colors hover:border-accent/40">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="flex items-center gap-2">
          {summary && (
            <span className="text-xs text-muted group-open:hidden">
              {summary}
            </span>
          )}
          <ChevronDown
            className="size-4 text-muted transition-transform group-open:rotate-180"
            aria-hidden
          />
        </div>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
