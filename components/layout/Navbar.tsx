"use client";

import Link from "next/link";


export default function Navbar() {
  return( 
<nav className="sticky top-0 w-full bg-white border-b border-gray-200 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center overflow-x-auto">

    <ul className="flex gap-4 sm:gap-8 md:gap-16 text-xs sm:text-sm whitespace-nowrap">
      <li><Link href="/" className="hover:text-gray-500">Accueil</Link></li>
      <li><Link href="/activites" className="hover:text-gray-500">Activités</Link></li>
      <li><Link href="/a-propos-de-nous" className="hover:text-gray-500">À propos</Link></li>
      <li><Link href="/vente" className="hover:text-gray-500">Vente</Link></li>
      <li><Link href="/location" className="hover:text-gray-500">Location</Link></li>
      <li><Link href="/contactez-nous" className="hover:text-gray-500">Contact</Link></li>
    </ul>



  </div>
</nav>
);
}
