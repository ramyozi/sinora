import "server-only";
import { fetchJson } from "../fetch-json";

const BASE = "https://en.wikipedia.org/api/rest_v1/page/media-list";

// Cache long : les medias d'un article evoluent tres peu.
const REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

export interface WikiGalleryImage {
  /** URL pleine resolution. */
  url: string;
  /** Legende fournie par Wikipedia (en anglais). */
  caption?: string;
  /** Titre du fichier (utilise pour debug et attribution). */
  filename: string;
}

interface MediaListItem {
  type?: string;
  title?: string;
  caption?: { html?: string; text?: string };
  srcset?: { src: string; scale?: string }[];
  showInGallery?: boolean;
}

interface MediaListResponse {
  items: MediaListItem[];
}

function captionText(c: MediaListItem["caption"]): string | undefined {
  if (!c) return undefined;
  const raw = c.text ?? c.html;
  if (!raw) return undefined;
  return raw.replace(/<[^>]+>/g, "").trim() || undefined;
}

function pickSrc(item: MediaListItem): string | null {
  if (!item.srcset || item.srcset.length === 0) return null;
  // Eviter de tirer l'original 4-8k qui declenche du rate limiting cote
  // Wikimedia : on cible un scale moyen (1.5x), sinon le plus petit dispo.
  const sorted = [...item.srcset].sort((a, b) => {
    const sa = parseFloat(a.scale ?? "1");
    const sb = parseFloat(b.scale ?? "1");
    return sa - sb;
  });
  const middle = sorted[Math.min(1, sorted.length - 1)] ?? sorted[0];
  const raw = middle.src;
  if (!raw) return null;
  return raw.startsWith("//") ? `https:${raw}` : raw;
}

/**
 * Recupere jusqu'a `limit` images d'un article Wikipedia (anglais).
 * Filtre les non-images, icones et drapeaux. Tolerant aux erreurs : renvoie [].
 */
export async function getWikiGallery(
  title: string,
  limit = 6,
): Promise<WikiGalleryImage[]> {
  const url = `${BASE}/${encodeURIComponent(title)}`;
  try {
    const data = await fetchJson<MediaListResponse>(url, {
      revalidate: REVALIDATE_SECONDS,
      tags: ["wiki-gallery"],
      retries: 1,
    });
    const images: WikiGalleryImage[] = [];
    for (const item of data.items ?? []) {
      if (item.type !== "image") continue;
      const src = pickSrc(item);
      if (!src) continue;
      const filename = item.title ?? src.split("/").pop() ?? "";
      const lower = filename.toLowerCase();
      if (
        lower.includes("commons-logo") ||
        lower.includes("question_book") ||
        lower.includes("flag_of") ||
        lower.endsWith(".svg") ||
        lower.endsWith(".gif")
      ) {
        continue;
      }
      images.push({
        url: src,
        caption: captionText(item.caption),
        filename,
      });
      if (images.length >= limit) break;
    }
    return images;
  } catch (error) {
    console.error("[wiki-gallery] echec pour", title, error);
    return [];
  }
}
