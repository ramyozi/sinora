"use client";

import { useServerInsertedHTML } from "next/navigation";

// Applique le thème avant le premier rendu pour éviter tout flash.
const script = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

// Injecte le script dans <head> via le flux SSR, hors de l'arbre de rendu
// client : évite l'avertissement React 19 sur les balises <script>.
export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  ));
  return null;
}
