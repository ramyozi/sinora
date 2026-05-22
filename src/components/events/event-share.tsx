"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

interface Props {
  /** Titre partage (nom de l'evenement). */
  title: string;
  label: string;
  copiedLabel: string;
}

// Bouton de partage : utilise l'API Web Share native quand elle existe
// (mobile surtout), sinon copie l'URL dans le presse-papiers avec un
// retour visuel "Lien copie".
export function EventShareButton({ title, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Partage annule par l'utilisateur : on ne fait rien.
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers indisponible : echec silencieux.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40"
    >
      {copied ? (
        <Check className="size-4 text-accent" />
      ) : (
        <Share2 className="size-4" />
      )}
      {copied ? copiedLabel : label}
    </button>
  );
}
