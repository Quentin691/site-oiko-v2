"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[Erreur Globale]", error);
  }, [error]);

  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "#f9fafb",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {/* Code erreur */}
            <h1
              style={{
                fontSize: "6rem",
                fontWeight: "bold",
                color: "#ef4444",
                margin: "0 0 1rem 0",
              }}
            >
              500
            </h1>

            {/* Message */}
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#111827",
                margin: "0 0 1rem 0",
              }}
            >
              Erreur critique
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "2rem",
                maxWidth: "400px",
              }}
            >
              Une erreur inattendue s&apos;est produite. Veuillez réessayer.
            </p>

            {/* Boutons */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: "#16803a",
                  color: "white",
                  fontWeight: "500",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Réessayer
              </button>
              <a
                href="/"
                style={{
                  backgroundColor: "white",
                  color: "#111827",
                  fontWeight: "500",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e5e7eb",
                  textDecoration: "none",
                }}
              >
                Accueil
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
