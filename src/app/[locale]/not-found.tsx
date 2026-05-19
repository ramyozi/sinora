import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

// Page 404 affichée pour toute route inconnue sous une langue.
export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="font-mono text-sm text-accent">404</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-sm text-muted">
        Cette destination n&apos;existe pas encore. Revenez à l&apos;accueil
        pour planifier votre voyage.
      </p>
      <ButtonLink href="/" className="mt-6">
        Retour à l&apos;accueil
      </ButtonLink>
    </Container>
  );
}
