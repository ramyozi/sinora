import type { CityRegion } from "@/data/cities";

// Dégradé associé à chaque région, partagé par les cartes et les en-têtes.
export const regionGradient: Record<CityRegion, string> = {
  nord: "from-jade/25 via-jade/5 to-transparent",
  est: "from-accent/25 via-gold/10 to-transparent",
  sud: "from-jade/30 via-accent/10 to-transparent",
  "sud-ouest": "from-gold/30 via-jade/10 to-transparent",
  centre: "from-accent/30 via-accent/5 to-transparent",
  ouest: "from-gold/35 via-gold/10 to-transparent",
};
