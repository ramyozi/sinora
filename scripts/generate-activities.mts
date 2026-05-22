import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { getAllCities } from "../src/data/cities";
import { curatedActivities } from "../src/data/activities";
import { generateCityActivities } from "../src/services/activities";

// ============================================================================
// Script de generation des activites
// ----------------------------------------------------------------------------
// Lance le pipeline (Overpass -> Wikidata -> Wikipedia -> normalisation ->
// filtrage -> enrichissement) pour une liste de villes, et ecrit le dataset
// genere dans src/data/activities/generated/.
//
// Usage : pnpm generate:activities [citySlug ...]
// Sans argument, traite la liste TARGET_CITIES par defaut.
//
// Le dataset produit est committe : c'est lui qui sert de cache et de
// fallback offline a l'execution. Aucun appel reseau n'a lieu au runtime.
// ============================================================================

const TARGET_CITIES = ["pekin", "shanghai", "chengdu", "xian"];

const GENERATED_DIR = join(
  process.cwd(),
  "src",
  "data",
  "activities",
  "generated",
);

async function main(): Promise<void> {
  const requested = process.argv.slice(2);
  const citySlugs = requested.length > 0 ? requested : TARGET_CITIES;
  const allCities = getAllCities();
  const written: string[] = [];

  for (const slug of citySlugs) {
    const city = allCities.find((c) => c.slug === slug);
    if (!city) {
      console.warn(`[skip] ville inconnue : ${slug}`);
      continue;
    }
    const curatedRefs = curatedActivities
      .filter((a) => a.citySlug === slug)
      .map((a) => ({
        name: a.title.en,
        lat: a.coordinates.lat,
        lng: a.coordinates.lng,
      }));

    try {
      const activities = await generateCityActivities({
        citySlug: slug,
        cityName: city.name,
        center: city.coordinates,
        curatedRefs,
        onProgress: (m) => console.log(`  ${m}`),
      });
      const file = join(GENERATED_DIR, `${slug}.json`);
      writeFileSync(file, `${JSON.stringify(activities, null, 2)}\n`, "utf8");
      written.push(slug);
      console.log(`[ok] ${slug} : ${activities.length} activites -> ${slug}.json`);
    } catch (error) {
      console.error(`[fail] ${slug} :`, (error as Error).message);
    }
  }

  // Reecrit l'index : importe chaque JSON de ville et agrege.
  const imports = written
    .map((slug, i) => `import city${i} from "./${slug}.json";`)
    .join("\n");
  const spreads = written
    .map((_, i) => `  ...(city${i} as Activity[]),`)
    .join("\n");
  const indexContent = `import type { Activity } from "../types";

// ============================================================================
// Dataset d'activites GENERE par le pipeline (src/services/activities).
// ----------------------------------------------------------------------------
// FICHIER AUTO-GENERE par \`pnpm generate:activities\`. Ne pas editer a la main.
// ============================================================================
${imports ? `\n${imports}\n` : ""}
export const generatedActivities: Activity[] = [
${spreads}
];
`;
  writeFileSync(join(GENERATED_DIR, "index.ts"), indexContent, "utf8");
  console.log(
    `\nTermine. ${written.length} ville(s) generee(s) : ${written.join(", ") || "aucune"}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
