// Categories de depenses : couvrent les besoins reels d'un voyage en Chine
// (transport, hebergement, restauration, activites, shopping, imprevus).
export type ExpenseCategory =
  | "transport"
  | "lodging"
  | "food"
  | "activities"
  | "shopping"
  | "emergency"
  | "other";

export interface Expense {
  id: string;
  tripId: string;
  /** Montant en CNY pour rester coherent avec la monnaie de reference. */
  amountCNY: number;
  category: ExpenseCategory;
  /** Libelle court : "Train Shanghai-Hangzhou", "Repas baozi", etc. */
  label: string;
  /** Slug de ville facultatif pour regrouper par etape. */
  citySlug: string | null;
  /** Date de la depense (ISO yyyy-mm-dd). null = non datee. */
  spentOn: string | null;
  createdAt: string;
  updatedAt: string;
}

// Budget previsionnel par categorie, attache a un voyage. La somme des
// categories peut differer du `plannedBudgetCNY` du trip pour permettre des
// approximations partielles.
export interface CategoryBudget {
  category: ExpenseCategory;
  plannedCNY: number;
}
