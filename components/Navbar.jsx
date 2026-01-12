"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function Navbar() {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  useEffect(() => {
    setOpenMenu(null);
  }, [pathname]);
  
  return (
    <nav style={{
      padding: "16px 24px",
      borderBottom: "1px solid #ddd",
      marginBottom: "32px"
    }}>
      <ul style={{
    display: "flex",
    gap: "20px",
    alignItems: "center",
    listStyle: "none",
    padding: 0,
    margin: 0
  }}>
        <li>
          <Link href="/">Accueil</Link>
        </li>

        {/* activité */}
        <li>
          <button onClick={() => toggleMenu("cat1")}>
            activité
          </button>

          {openMenu === "cat1" && (
            <ul>
              <li><Link href="/activites/property-management">Property Management</Link></li>
              <li><Link href="/activites/asset-management">Asset Management</Link></li>
              <li><Link href="/activites/project-management">Project Management</Link></li>
              <li><Link href="/activites/transaction">Transaction</Link></li>
            </ul>
          )}
        </li>

        {/* A propos de nous */}
        <li>
                <button onClick={() => toggleMenu("cat2")}>
                    A propos de nous
                </button>

                {openMenu === "cat2" && (
                    <ul>
                    <li><Link href="/a-propos-de-nous/notre-histoire">Notre histoire</Link></li>
                    <li><Link href="/a-propos-de-nous/nos-outils">Nos outils</Link></li>
                    <li><Link href="/a-propos-de-nous/carriere">Carrière</Link></li>
                    <li><Link href="/a-propos-de-nous/contactez-nous">Contactez-nous</Link></li>
                    </ul>
                )}
                </li>

        {/* Annonces */}
        <li>
          <button onClick={() => toggleMenu("cat3")}>
            Annonces
          </button>

          {openMenu === "cat3" && (
            <ul>
              <li><Link href="/annonces/annonce-de-bien-a-la-location">Annonces de biens à la location</Link></li>
              <li><Link href="/annonces/annonce-de-bien-a-la-vente">Annonces de biens à la vente</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
