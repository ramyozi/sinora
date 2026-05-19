import "server-only";

// Identifie clairement l'application auprès des APIs publiques.
const DEFAULT_USER_AGENT = "Sinora/0.1 (+https://github.com/ramyozi/sinora)";

export interface FetchJsonOptions {
  /** Délai d'attente avant abandon, en millisecondes (défaut : 8 s). */
  timeoutMs?: number;
  /** Nombre de réessais après échec (défaut : 1). */
  retries?: number;
  /** Durée de cache côté Next, en secondes. */
  revalidate?: number;
  /** Étiquettes de cache Next pour invalidation ciblée. */
  tags?: string[];
  /** En-têtes additionnels : surchargent les valeurs par défaut. */
  headers?: HeadersInit;
}

// Applique les en-têtes par défaut (User-Agent, Accept) sans écraser ceux
// explicitement fournis par l'appelant.
function buildHeaders(extra: HeadersInit | undefined): Headers {
  const headers = new Headers(extra);
  if (!headers.has("User-Agent")) headers.set("User-Agent", DEFAULT_USER_AGENT);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  return headers;
}

// Petit utilitaire de récupération JSON avec timeout, retry et cache Next.
// Conçu pour être appelé uniquement côté serveur.
export async function fetchJson<T>(
  url: string,
  opts: FetchJsonOptions = {},
): Promise<T> {
  const { timeoutMs = 8000, retries = 1, revalidate, tags, headers } = opts;
  const requestHeaders = buildHeaders(headers);

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        headers: requestHeaders,
        signal: controller.signal,
        next: { revalidate, tags },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} sur ${url}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, 200 * (attempt + 1)),
        );
      }
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}
