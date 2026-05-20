// Skeleton minimal pendant le chargement d'une page localisee.
// L'animation respecte prefers-reduced-motion via la regle globals.css.
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 py-16 sm:py-20">
      <div className="h-8 w-64 max-w-full animate-pulse rounded-md bg-surface-muted" />
      <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded-md bg-surface-muted" />
      <div className="mt-2 h-4 w-1/2 max-w-md animate-pulse rounded-md bg-surface-muted" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 animate-pulse rounded-card border border-border bg-surface-muted"
          />
        ))}
      </div>
    </div>
  );
}
