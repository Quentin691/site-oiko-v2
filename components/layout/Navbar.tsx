"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/activites", label: "Activités" },
  { href: "/a-propos-de-nous", label: "À propos" },
  { href: "/vente", label: "Vente" },
  { href: "/location", label: "Location" },
  { href: "/contactez-nous", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Afficher le logo après 100px de scroll
          if (window.scrollY > 100) {
            setShowLogo(true);
          } else {
            setShowLogo(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 w-full bg-background border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between sm:justify-center relative">

        {/* Logo qui apparaît au scroll - positionné en absolu à gauche */}
        <div
          className={`absolute left-4 sm:left-6 transition-opacity duration-200 ${
            showLogo ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Link href="/">
            <div className="bg-logo-container p-1 rounded">
              <Image
                src="/logo.png"
                alt="OIKO - Gestion immobilière"
                width={300}
                height={100}
                className="h-8 w-auto"
                unoptimized
              />
            </div>
          </Link>
        </div>

        {/* Navigation desktop - cachée sur mobile */}
        <ul className="hidden sm:flex gap-4 sm:gap-8 md:gap-16 text-xs sm:text-sm whitespace-nowrap items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`hover:text-primary transition-colors ${pathname === link.href ? "text-primary font-semibold" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bouton hamburger - visible sur mobile */}
        <button
          className="sm:hidden p-2 text-muted hover:text-foreground ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
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

      {/* Menu mobile avec animation slide */}
      <div
        className={`sm:hidden border-t border-border overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col py-4">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className={`transform transition-all duration-300 ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`block px-6 py-3 hover:bg-hover-bg transition-colors ${pathname === link.href ? "text-primary font-semibold" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
