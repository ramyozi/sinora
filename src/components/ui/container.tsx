import { cn } from "@/lib/cn";

// Conteneur centré à largeur maîtrisée, utilisé par toutes les sections.
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl",
        "[padding-left:max(1.25rem,env(safe-area-inset-left))]",
        "[padding-right:max(1.25rem,env(safe-area-inset-right))]",
        "sm:[padding-left:max(2rem,env(safe-area-inset-left))]",
        "sm:[padding-right:max(2rem,env(safe-area-inset-right))]",
        className,
      )}
    >
      {children}
    </div>
  );
}
