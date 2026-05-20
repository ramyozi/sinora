import type { MetadataRoute } from "next";

// PWA manifest minimal : assez pour que les navigateurs reconnaissent la marque
// quand l'utilisateur ajoute Sinora a l'ecran d'accueil. Plus tard, on pourra
// ajouter screenshots, categories, etc., si on cible une vraie installation.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sinora",
    short_name: "Sinora",
    description: "Voyager en Chine, simplement.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f7",
    theme_color: "#d8443a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
