import "server-only";
import { fetchJson } from "../fetch-json";

const BASE = "https://en.wikipedia.org/api/rest_v1/page/summary";

// Une semaine : les images d'articles changent peu.
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

export interface WikiLeadImage {
  url: string;
  width: number;
  height: number;
  /** URL de l'article source pour l'attribution. */
  articleUrl: string;
}

interface WikiSummary {
  originalimage?: { source: string; width: number; height: number };
  thumbnail?: { source: string; width: number; height: number };
  content_urls?: { desktop?: { page?: string } };
}

// Récupère l'image en tête d'un article Wikipedia (anglais).
// Renvoie `null` si l'article n'a pas d'image ou en cas d'erreur.
export async function getWikiLeadImage(
  title: string,
): Promise<WikiLeadImage | null> {
  const url = `${BASE}/${encodeURIComponent(title)}`;
  try {
    const data = await fetchJson<WikiSummary>(url, {
      revalidate: REVALIDATE_SECONDS,
      tags: ["wiki-image"],
      retries: 1,
    });
    const image = data.originalimage ?? data.thumbnail;
    if (!image) return null;
    return {
      url: image.source,
      width: image.width,
      height: image.height,
      articleUrl:
        data.content_urls?.desktop?.page ??
        `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
    };
  } catch (error) {
    console.error("[wiki-image] échec pour", title, error);
    return null;
  }
}
