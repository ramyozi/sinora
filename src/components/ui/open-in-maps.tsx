import { MapPin } from "lucide-react";

interface Props {
  /** Coordonnees precises. Prioritaires sur `query` si fournies. */
  lat?: number;
  lng?: number;
  /** Texte de recherche si aucune coordonnee (nom du lieu, ville). */
  query?: string;
  label: string;
  /** Variante visuelle : bouton plein (primary) ou contour (outline). */
  variant?: "primary" | "outline";
}

// Bouton "Voir dans Google Maps".
//
// On utilise l'URL universelle Google Maps (`/maps/search/?api=1`) plutot
// que le schema `geo:` : elle fonctionne sur les trois plateformes et ouvre
// l'application native sur mobile (iOS et Android) quand elle est installee,
// la version web sur desktop. Le schema `geo:` est limite a Android et echoue
// sans application de cartographie. Depuis la fiche Google Maps ainsi
// ouverte, l'itineraire est accessible en un tap.
export function OpenInMaps({
  lat,
  lng,
  query,
  label,
  variant = "outline",
}: Props) {
  const target =
    typeof lat === "number" && typeof lng === "number"
      ? `${lat},${lng}`
      : (query ?? "");
  if (!target) return null;

  const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    target,
  )}`;

  const className =
    variant === "primary"
      ? "flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
      : "flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <MapPin className="size-4" />
      {label}
    </a>
  );
}
