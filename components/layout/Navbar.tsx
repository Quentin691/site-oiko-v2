"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le logo après 100px de scroll
      if (window.scrollY > 100) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between sm:justify-center relative">

        {/* Logo qui apparaît au scroll - positionné en absolu à gauche */}
        <div
          className={`absolute left-4 sm:left-6 transition-opacity duration-200 ${
            showLogo ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Link href="/">
            <img src="/logo.png" alt="Oikogestion" className="h-8 w-auto" />
          </Link>
        </div>

        {/* Navigation desktop - cachée sur mobile */}
        <ul className="hidden sm:flex gap-4 sm:gap-8 md:gap-16 text-xs sm:text-sm whitespace-nowrap">
          <li><Link href="/" className="hover:text-gray-500">Accueil</Link></li>
          <li><Link href="/activites" className="hover:text-gray-500">Activités</Link></li>
          <li><Link href="/a-propos-de-nous" className="hover:text-gray-500">À propos</Link></li>
          <li><Link href="/vente" className="hover:text-gray-500">Vente</Link></li>
          <li><Link href="/location" className="hover:text-gray-500">Location</Link></li>
          <li><Link href="/contactez-nous" className="hover:text-gray-500">Contact</Link></li>
        </ul>

        {/* Bouton hamburger - visible sur mobile */}
        <button
          className="sm:hidden p-2 text-gray-600 hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-200">
          <ul className="flex flex-col py-4">
            <li>
              <Link href="/" className="block px-6 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/activites" className="block px-6 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                Activités
              </Link>
            </li>
            <li>
              <Link href="/a-propos-de-nous" className="block px-6 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                À propos
              </Link>
            </li>
            <li>
              <Link href="/vente" className="block px-6 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                Vente
              </Link>
            </li>
            <li>
              <Link href="/location" className="block px-6 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                Location
              </Link>
            </li>
            <li>
              <Link href="/contactez-nous" className="block px-6 py-3 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
