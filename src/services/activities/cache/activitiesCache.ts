import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// ============================================================================
// Cache de generation des activites
// ----------------------------------------------------------------------------
// Cache disque simple, utilise UNIQUEMENT cote build par le pipeline. Il
// memorise les reponses brutes des APIs (Overpass, Wikidata, Wikipedia) pour
// qu'une re-execution du script soit rapide et menagee pour les APIs ouvertes.
//
// Repertoire : .cache/activities/ a la racine du projet (gitignore). Le
// dataset final genere, lui, est committe dans src/data/activities/generated.
// ============================================================================

const CACHE_DIR = join(process.cwd(), ".cache", "activities");

// TTL par defaut : 30 jours. Les POIs et articles bougent peu.
const DEFAULT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface CacheEnvelope<T> {
  storedAt: number;
  data: T;
}

function ensureDir(): void {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
}

// Transforme une cle logique en nom de fichier. Un hash garantit l'unicite :
// indispensable car les cles contiennent des titres non-ASCII (chinois) qui,
// reduits a leurs seuls caracteres ASCII, entreraient tous en collision.
function cacheFile(key: string): string {
  const hash = createHash("sha1").update(key).digest("hex").slice(0, 16);
  const readable = key.replace(/[^a-z0-9_-]/gi, "_").slice(0, 48);
  return join(CACHE_DIR, `${readable}-${hash}.json`);
}

// Lit une entree de cache valide, ou null si absente / expiree.
export function readCache<T>(key: string, ttlMs = DEFAULT_TTL_MS): T | null {
  const file = cacheFile(key);
  if (!existsSync(file)) return null;
  try {
    const envelope = JSON.parse(
      readFileSync(file, "utf8"),
    ) as CacheEnvelope<T>;
    if (Date.now() - envelope.storedAt > ttlMs) return null;
    return envelope.data;
  } catch {
    return null;
  }
}

// Ecrit une entree de cache.
export function writeCache<T>(key: string, data: T): void {
  ensureDir();
  const envelope: CacheEnvelope<T> = { storedAt: Date.now(), data };
  writeFileSync(cacheFile(key), JSON.stringify(envelope), "utf8");
}

// Helper : retourne la valeur cachee, sinon execute le producteur et cache.
export async function cached<T>(
  key: string,
  producer: () => Promise<T>,
  ttlMs = DEFAULT_TTL_MS,
): Promise<T> {
  const hit = readCache<T>(key, ttlMs);
  if (hit !== null) return hit;
  const fresh = await producer();
  writeCache(key, fresh);
  return fresh;
}
