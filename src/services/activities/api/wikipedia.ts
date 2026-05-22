import { readCache, writeCache } from "../cache/activitiesCache";
import type { PipelineLang, WikiSummary } from "../types";

// ============================================================================
// Client Wikipedia (MediaWiki API, en lot)
// ----------------------------------------------------------------------------
// On interroge l'API MediaWiki `action=query` en LOTS (20 titres par appel)
// plutot que l'endpoint REST page par page : une ville = une poignee de
// requetes au lieu de plusieurs centaines, ce qui evite le rate limiting.
// Chaque appel renvoie a la fois l'extrait de description et l'image en tete.
// ============================================================================

// L'extension TextExtracts plafonne a 20 extraits par requete.
const BATCH_SIZE = 20;

interface QueryPage {
  pageid?: number;
  title: string;
  missing?: boolean;
  extract?: string;
  original?: { source?: string };
  fullurl?: string;
}

interface QueryResponse {
  query?: {
    normalized?: { from: string; to: string }[];
    redirects?: { from: string; to: string }[];
    pages?: QueryPage[];
  };
  error?: { code?: string };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Effectue un appel API avec retry sur rate limiting (429 / 503).
async function queryApi(url: string): Promise<QueryResponse | null> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, {
      headers: { "User-Agent": "Sinora/1.0 (activities pipeline)" },
    });
    if (res.status === 429 || res.status === 503) {
      const retryAfter = Number(res.headers.get("retry-after"));
      await sleep(
        Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : 1500 * 2 ** attempt,
      );
      continue;
    }
    if (!res.ok) return null;
    const data = (await res.json()) as QueryResponse;
    if (data.error) {
      await sleep(1500 * 2 ** attempt);
      continue;
    }
    return data;
  }
  return null;
}

// Resout un titre demande vers son titre final (apres normalisation et
// redirections renvoyees par l'API).
function buildResolver(
  data: QueryResponse,
): (requested: string) => string {
  const norm = new Map<string, string>();
  for (const n of data.query?.normalized ?? []) norm.set(n.from, n.to);
  const redir = new Map<string, string>();
  for (const r of data.query?.redirects ?? []) redir.set(r.from, r.to);
  return (requested: string) => {
    const normalized = norm.get(requested) ?? requested;
    return redir.get(normalized) ?? normalized;
  };
}

// Recupere, pour une edition Wikipedia donnee, les resumes d'un lot de titres.
// Resultat : Map indexee par le titre DEMANDE.
async function fetchBatch(
  lang: PipelineLang,
  titles: string[],
): Promise<Map<string, WikiSummary>> {
  const out = new Map<string, WikiSummary>();
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    prop: "extracts|pageimages|info",
    exintro: "1",
    explaintext: "1",
    exsentences: "4",
    exlimit: "20",
    piprop: "original",
    inprop: "url",
    redirects: "1",
    titles: titles.join("|"),
    origin: "*",
  });
  const url = `https://${lang}.wikipedia.org/w/api.php?${params.toString()}`;
  const data = await queryApi(url);
  if (!data?.query?.pages) return out;

  const resolve = buildResolver(data);
  const byTitle = new Map<string, QueryPage>();
  for (const page of data.query.pages) byTitle.set(page.title, page);

  for (const requested of titles) {
    const page = byTitle.get(resolve(requested));
    if (!page || page.missing || !page.extract) continue;
    out.set(requested, {
      lang,
      extract: page.extract,
      imageUrl: page.original?.source,
      pageUrl:
        page.fullurl ??
        `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
    });
  }
  return out;
}

// Recupere les resumes d'une longue liste de titres pour une edition, par
// lots, avec mise en cache disque par lot.
export async function fetchSummaries(
  lang: PipelineLang,
  titles: string[],
): Promise<Map<string, WikiSummary>> {
  const unique = Array.from(new Set(titles)).filter(Boolean);
  const result = new Map<string, WikiSummary>();
  for (let i = 0; i < unique.length; i += BATCH_SIZE) {
    const batch = unique.slice(i, i + BATCH_SIZE);
    const key = `wikibatch-${lang}-${batch.length}-${batch[0]}-${batch[batch.length - 1]}`;
    let map = readCache<Record<string, WikiSummary>>(key);
    if (!map) {
      const fetched = await fetchBatch(lang, batch);
      map = Object.fromEntries(fetched);
      // On ne cache que les lots non vides : un lot vide trahit un echec.
      if (Object.keys(map).length > 0) writeCache(key, map);
      await sleep(200);
    }
    for (const [title, summary] of Object.entries(map)) {
      result.set(title, summary);
    }
  }
  return result;
}
