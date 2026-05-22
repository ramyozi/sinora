import { MapPin } from "lucide-react";
import { buildMapUrl, type MapPlace } from "@/lib/maps";

interface Props {
  /** Lieu a ouvrir : nom, ville, adresse, coordonnees WGS-84. */
  place: MapPlace;
  label: string;
  /** Variante visuelle : bouton plein (primary) ou contour (outline). */
  variant?: "primary" | "outline";
}

// Bouton "Voir dans Google Maps".
//
// Le lien est construit PAR NOM (`buildMapUrl`) et non par coordonnee brute :
// `?query=Temple of Heaven Beijing` ouvre le bon POI, la ou `?query=lat,lng`
// ouvrait un point generique. L'URL universelle Google Maps ouvre
// l'application native sur mobile et la version web sur desktop.
export function OpenInMaps({ place, label, variant = "outline" }: Props) {
  const href = buildMapUrl("google", place);

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
