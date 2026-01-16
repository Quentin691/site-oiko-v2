"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Anchor {
  id: string;
  label: string;
}

interface PageAnchorsProps {
  anchors: Anchor[];
}

export default function PageAnchors({ anchors }: PageAnchorsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Trouver quelle section est actuellement visible
      const sections = anchors.map((anchor) => {
        const element = document.getElementById(anchor.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: anchor.id,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      }).filter(Boolean);

      // La section active est celle dont le haut est le plus proche du haut de la fenêtre
      const current = sections.find(
        (section) => section && section.top <= 100 && section.bottom > 100
      );

      if (current) {
        setActiveId(current.id);
      }
    };

    handleScroll(); // Appel initial
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [anchors]);

  return (
    <nav className="bg-card border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex gap-8 overflow-x-auto py-4">
          {anchors.map((anchor) => (
            <li key={anchor.id} className="shrink-0">
              <Link
                href={`#${anchor.id}`}
                className={`text-sm font-medium transition-colors ${
                  activeId === anchor.id
                    ? "text-foreground border-b-2 border-foreground pb-1"
                    : "text-gray-600 hover:text-foreground"
                }`}
              >
                {anchor.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
