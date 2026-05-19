# Couche API

Cette couche isole tout appel à un service externe. Les composants ne font jamais de
`fetch` directement : ils consomment un provider typé.

## Structure

```
src/lib/api/
  fetch-json.ts        Utilitaire générique : timeout, retry, cache Next, en-têtes
  providers/
    weather.ts         Open-Meteo Forecast
    air-quality.ts     Open-Meteo Air Quality
    wiki-image.ts      Wikipedia REST page/summary
    weather-codes.ts   Mapping WMO -> catégorie synthétique
    aqi-bands.ts       Mapping indice européen -> catégorie synthétique
```

## Conventions

1. **Server-only.** Chaque module importe `"server-only"` en tête. La donnée externe
   ne fuite jamais vers le bundle client.
2. **Dégradation gracieuse.** Un provider renvoie `null` plutôt que de propager une
   erreur. Les composants gèrent l'état « indisponible ».
3. **Cache Next.** Chaque appel précise `revalidate` (secondes) et `tags` (pour
   invalidation ciblée). Pas de cache `force-cache` implicite.
4. **En-têtes par défaut.** `fetchJson` applique `User-Agent: Sinora/...` et
   `Accept: application/json` sauf surcharge explicite. Identifie clairement
   l'application auprès des APIs publiques.
5. **Typage strict.** Les types `*Snapshot` exposés au reste de l'app n'exposent
   pas la forme brute de la réponse de l'API : on remappe.
6. **Mapping séparé.** Les catégories synthétiques (codes WMO, bandes AQI) vivent
   dans des modules dédiés, distincts du provider qui appelle l'API.

## Ajouter un provider

1. Créer `src/lib/api/providers/<nom>.ts`.
2. Définir le type `*Snapshot` (ce que voit le reste de l'app).
3. Définir un type interne pour la réponse brute.
4. Implémenter `get<Nom>(...)` :
   - `import "server-only"`
   - Construire l'URL avec `URLSearchParams`
   - Appeler `fetchJson<T>(url, { revalidate, tags, retries })`
   - Remapper le résultat vers le type `*Snapshot`
   - `try/catch` : `console.error` + retour `null`
5. Si une catégorisation est requise (icônes, libellés), créer un module
   `<nom>-codes.ts` ou `<nom>-bands.ts` séparé.

## Providers actuels

| Provider | Source | Revalidate | Tag |
| --- | --- | --- | --- |
| `getWeather` | [Open-Meteo Forecast](https://open-meteo.com/) | 30 min | `weather` |
| `getAirQuality` | [Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api) | 1 h | `air-quality` |
| `getWikiLeadImage` | [Wikipedia REST](https://en.wikipedia.org/api/rest_v1/) | 7 j | `wiki-image` |

Aucune clé d'API n'est requise pour le moment. L'introduction d'un service à clé
exigera un module `config/secrets.ts` côté serveur uniquement.
