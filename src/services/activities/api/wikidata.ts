import { readCache, writeCache } from "../cache/activitiesCache";
import type { WikidataEntity } from "../types";

// ============================================================================
// Client Wikidata
// ----------------------------------------------------------------------------
// Wikidata fournit, sans cle d'API : des libelles multilingues (fr / en / zh),
// une image (propriete P18), la nature de l'element (P31) et les liens vers
// les editions Wikipedia. C'est la piece qui rend le tier "generated"
// reellement multilingue.
// ============================================================================

const ENDPOINT = "https://www.wikidata.org/w/api.php";

// L'API wbgetentities accepte jusqu'a 50 identifiants par appel.
const BATCH_SIZE = 50;

interface WdSnakValue {
  mainsnak?: {
    datavalue?: { value?: unknown };
  };
}

interface WdEntityRaw {
  labels?: Record<string, { value: string }>;
  claims?: Record<string, WdSnakValue[]>;
  sitelinks?: Record<string, { title: string }>;
}

interface WbGetEntitiesResponse {
  entities?: Record<string, WdEntityRaw>;
}

// Extrait le premier identifiant Q d'une claim P31 (instance of).
function readInstanceOf(claims: Record<string, WdSnakValue[]>): string[] {
  const p31 = claims["P31"] ?? [];
  const ids: string[] = [];
  for (const snak of p31) {
    const value = snak.mainsnak?.datavalue?.value as
      | { id?: string }
      | undefined;
    if (value?.id) ids.push(value.id);
  }
  return ids;
}

// Extrait le nom de fichier image (P18).
function readImageFile(
  claims: Record<string, WdSnakValue[]>,
): string | undefined {
  const p18 = claims["P18"]?.[0];
  const value = p18?.mainsnak?.datavalue?.value;
  return typeof value === "string" ? value : undefined;
}

// Pause simple.
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Recupere un lot d'entites Wikidata, avec gestion du rate limiting : sur
// 429 / 503 ou erreur applicative (rate limit dans le corps JSON), on attend
// puis on reessaie, jusqu'a 5 tentatives. On NE PASSE PAS `maxlag` : sous
// charge, l'API renverrait alors un corps d'erreur sans entites, qui serait
// pris a tort pour un succes vide.
async function fetchBatch(ids: string[]): Promise<WikidataEntity[]> {
  const params = new URLSearchParams({
    action: "wbgetentities",
    ids: ids.join("|"),
    props: "labels|claims|sitelinks",
    languages: "fr|en|zh",
    sitefilter: "enwiki|frwiki|zhwiki",
    format: "json",
    origin: "*",
  });
  const url = `${ENDPOINT}?${params.toString()}`;

  let data: WbGetEntitiesResponse | null = null;
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
    if (!res.ok) throw new Error(`Wikidata HTTP ${res.status}`);
    const parsed = (await res.json()) as WbGetEntitiesResponse & {
      error?: { code?: string };
    };
    // Erreur applicative (HTTP 200 mais corps d'erreur) : on retente.
    if (parsed.error || !parsed.entities) {
      await sleep(1500 * 2 ** attempt);
      continue;
    }
    data = parsed;
    break;
  }
  if (!data) {
    throw new Error("Wikidata indisponible apres plusieurs tentatives");
  }
  const out: WikidataEntity[] = [];
  for (const [id, raw] of Object.entries(data.entities ?? {})) {
    const claims = raw.claims ?? {};
    const labels: WikidataEntity["labels"] = {};
    for (const lang of ["fr", "en", "zh"] as const) {
      const label = raw.labels?.[lang]?.value;
      if (label) labels[lang] = label;
    }
    const sitelinks: WikidataEntity["sitelinks"] = {};
    for (const wiki of ["enwiki", "frwiki", "zhwiki"] as const) {
      const title = raw.sitelinks?.[wiki]?.title;
      if (title) sitelinks[wiki] = title;
    }
    out.push({
      id,
      labels,
      imageFile: readImageFile(claims),
      instanceOf: readInstanceOf(claims),
      sitelinks,
    });
  }
  return out;
}

// Resout une liste d'identifiants Wikidata en entites, par lots de 50.
// Chaque lot est cache disque independamment.
export async function fetchEntities(
  ids: string[],
): Promise<Map<string, WikidataEntity>> {
  const unique = Array.from(new Set(ids));
  const result = new Map<string, WikidataEntity>();
  for (let i = 0; i < unique.length; i += BATCH_SIZE) {
    const batch = unique.slice(i, i + BATCH_SIZE);
    const key = `wikidata-${batch[0]}-${batch.length}`;
    const cacheHit = readCache<WikidataEntity[]>(key);
    const entities = cacheHit ?? (await fetchBatch(batch));
    // On ne met en cache que des resultats non vides : un lot vide trahit
    // un echec transitoire qu'il ne faut pas figer.
    if (!cacheHit) {
      if (entities.length > 0) writeCache(key, entities);
      // Politesse : espace les appels reseau effectifs.
      await sleep(350);
    }
    for (const entity of entities) result.set(entity.id, entity);
  }
  return result;
}
