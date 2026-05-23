"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

// ============================================================================
// Hook generique de filtres URL-driven
// ----------------------------------------------------------------------------
// Fournit une API simple pour lire / ecrire des parametres de recherche dans
// l'URL, avec batch et serialisation liste (separateur virgule). L'URL est
// la source de verite : back/forward navigateur et partage de lien
// fonctionnent naturellement.
//
// Convention :
//  - Valeur unique : ?city=beijing
//  - Valeur multiple : ?category=hiking,monument
//  - null ou tableau vide : retire la cle de l'URL
//
// Les ecritures passent par router.replace (pas de nouvelle entree dans
// l'historique pour chaque clic de chip ; back/forward reste utilisable).
// ============================================================================

export interface UrlFiltersAPI {
  /** Lit une valeur unique. */
  get: (key: string) => string | null;
  /** Lit une valeur multi-items separes par virgule. */
  getList: (key: string) => string[];
  /** Met a jour plusieurs cles d'un coup. */
  setMany: (patches: Record<string, string | string[] | null>) => void;
  /** Retire les cles indiquees (ou toutes les cles si non precisees). */
  reset: (keys?: string[]) => void;
}

export function useUrlFilters(): UrlFiltersAPI {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams],
  );

  const getList = useCallback(
    (key: string) => {
      const raw = searchParams.get(key);
      return raw ? raw.split(",").filter(Boolean) : [];
    },
    [searchParams],
  );

  const setMany = useCallback(
    (patches: Record<string, string | string[] | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patches)) {
        const isEmpty =
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);
        if (isEmpty) {
          next.delete(key);
        } else if (Array.isArray(value)) {
          next.set(key, value.join(","));
        } else {
          next.set(key, value);
        }
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const reset = useCallback(
    (keys?: string[]) => {
      if (!keys || keys.length === 0) {
        router.replace(pathname, { scroll: false });
        return;
      }
      const next = new URLSearchParams(searchParams.toString());
      for (const k of keys) next.delete(k);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  return useMemo(
    () => ({ get, getList, setMany, reset }),
    [get, getList, setMany, reset],
  );
}
