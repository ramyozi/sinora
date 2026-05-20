import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getCitySlugs } from "@/data/cities";
import { pretripModules } from "@/data/pretrip/modules";

const SITE_URL = "https://china.ramzibenmansour.com";

// Genere une entree multilingue avec alternances hreflang pour un meme path.
function entry(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
      ),
    },
  }));
}

// Sitemap complet : accueil + destinations + chaque ville + planner + preparer.
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  out.push(...entry("", "weekly", 1));
  out.push(...entry("/destinations", "weekly", 0.9));
  for (const slug of getCitySlugs()) {
    out.push(...entry(`/destinations/${slug}`, "monthly", 0.7));
  }
  out.push(...entry("/route-planner", "weekly", 0.95));
  out.push(...entry("/events", "weekly", 0.85));
  out.push(...entry("/preparer", "weekly", 0.85));
  for (const m of pretripModules) {
    if (m.available) {
      out.push(...entry(`/preparer/${m.slug}`, "monthly", 0.6));
    }
  }
  return out;
}
