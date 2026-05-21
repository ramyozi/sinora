"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// Suit la classe .dark de <html> comme source de vérité.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");

// Bascule clair/sombre, persistée dans localStorage.
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function toggle() {
    const next = !dark;
    const value = next ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", value);
    // Cookie : permet au layout serveur de connaitre le theme et d'appliquer
    // la classe dark sur <html> au render. Sans ca, un changement de locale
    // re-render <html> sans la classe et React la retire pendant la
    // reconciliation. SameSite Lax + un an pour persister entre sessions.
    document.cookie = `theme=${value}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Activer le mode clair" : "Activer le mode sombre"}
      className="grid size-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-muted"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
