"use client";

import Link from "next/link";


export default function Navbar() {
  return( 
<nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

    
    <a href="/" className="font-semibold text-lg">
      LOGO
    </a>


    <ul className="flex gap-8 text-sm">
      <li><Link href="/" className="hover:text-gray-500">Accueil</Link></li>
      <li><Link href="/activites" className="hover:text-gray-500">Activités</Link></li>
      <li><Link href="/a-propos" className="hover:text-gray-500">À propos</Link></li>
      <li><Link href="/annonces" className="hover:text-gray-500">Annonces</Link></li>
      <li><Link href="/contact" className="hover:text-gray-500">Contact</Link></li>
    </ul>

    <a
      href="/connexion"
      className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
    >
      Connexion
    </a>

  </div>
</nav>
);
}
