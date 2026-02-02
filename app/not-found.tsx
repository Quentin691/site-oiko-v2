import Image from "next/image";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="OIKO - Gestion immobilière"
            width={150}
            height={48}
            className="mx-auto logo-blend"
            sizes="150px"
          />
        </div>

        {/* Code erreur */}
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page introuvable
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>

        {/* Bouton retour */}
        <Button href="/" variant="primary">
          Retour à l&apos;accueil
        </Button>
      </div>
    </main>
  );
}
