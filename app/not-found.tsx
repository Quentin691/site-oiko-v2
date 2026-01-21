import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="OIKO"
            width={150}
            height={48}
            className="mx-auto logo-blend"
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
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}