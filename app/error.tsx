"use client";

import Image from "next/image";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log l'erreur pour le debugging (en production, envoyer à un service de monitoring)
    console.error("[Erreur Page]", error);
  }, [error]);

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
        <h1 className="text-8xl font-bold text-red-500 mb-4">500</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Nous sommes désolés, quelque chose s&apos;est mal passé.
          Veuillez réessayer ou revenir à l&apos;accueil.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded transition-colors"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-block bg-surface hover:bg-muted/20 text-foreground font-medium px-6 py-3 rounded border border-border transition-colors"
          >
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </main>
  );
}
