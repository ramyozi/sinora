"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Page d'erreur sobre : on signale le probleme et on propose un retour propre.
// Le message reste neutre meme en prod, le digest est conserve pour debug.
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col items-start gap-6 px-5 py-20 sm:px-8 sm:py-28">
      <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-rose-500">
        Erreur
      </span>
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Quelque chose a derape.
      </h1>
      <p className="text-pretty text-muted">
        Une erreur est survenue lors du chargement. Vous pouvez reessayer ou
        revenir a l'accueil.
      </p>
      {error.digest && (
        <code className="rounded-md bg-surface-muted px-2 py-1 text-xs text-muted">
          {error.digest}
        </code>
      )}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Reessayer
        </button>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          Retour a l'accueil
        </Link>
      </div>
    </main>
  );
}
