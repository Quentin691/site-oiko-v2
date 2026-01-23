"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const refuseCookies = () => {
    localStorage.setItem("cookie-consent", "refused");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted">
            <p>
              Nous utilisons des cookies pour améliorer votre expérience.{" "}
              <Link href="/politique-rgpd" className="text-primary hover:underline">
                En savoir plus
              </Link>
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={refuseCookies}
              className="px-4 py-2 text-sm border border-border rounded-md text-muted hover:bg-background transition-colors"
            >
              Refuser
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}