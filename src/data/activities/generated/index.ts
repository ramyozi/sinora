import type { Activity } from "../types";

// ============================================================================
// Dataset d'activites GENERE par le pipeline (src/services/activities).
// ----------------------------------------------------------------------------
// FICHIER AUTO-GENERE par `pnpm generate:activities`. Ne pas editer a la main.
// ============================================================================

import city0 from "./pekin.json";
import city1 from "./shanghai.json";
import city2 from "./chengdu.json";
import city3 from "./xian.json";

export const generatedActivities: Activity[] = [
  ...(city0 as Activity[]),
  ...(city1 as Activity[]),
  ...(city2 as Activity[]),
  ...(city3 as Activity[]),
];
