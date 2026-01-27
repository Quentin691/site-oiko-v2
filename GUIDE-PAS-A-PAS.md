# Guide pas-à-pas - OIKO v2

**Phases couvertes :** 1 à 16
**Dernière mise à jour :** 27 janvier 2026

Ce guide contient toutes les étapes détaillées pour implémenter les 16 phases du projet OIKO v2. Chaque tâche est découpée en micro-étapes à suivre dans l'ordre.

---

## 📊 Progression

| Phase | Progression | Statut |
|-------|-------------|--------|
| Phase 1 - Configuration et fondations | 65/65 (100%) | ✅ Terminée |
| Phase 2 - Layout global | 68/68 (100%) | ✅ Terminée |
| Phase 3 - Page Accueil | 44/44 (100%) | ✅ Terminée |
| Phase 4 - Page Activités | 40/40 (100%) | ✅ Terminée |
| Phase 5 - Page À propos | 52/52 (100%) | ✅ Terminée |
| Phase 6 - Page Contact | 52/52 (100%) | ✅ Terminée |
| Phase 7 - Esthétique / Thème | 52/52 (100%) | ✅ Terminée |
| Phase 8 - Audit & Finitions | 59/59 (100%) | ✅ Terminée |
| Phase 9 - Page Location (API + affichage) | 32/32 (100%) | ✅ Terminée |
| Phase 10 - Page Vente | 12/12 (100%) | ✅ Terminée |
| Phase 11 - Filtres & Pages Détail | 45/45 (100%) | ✅ Terminé |
| Phase 12 - SEO & Performance | 40/40 (100%) | ✅ Terminé |
| Phase 13 - Contenus Légaux | 24/24 (100%) | ✅ Terminée |
| Phase 14 - Blog (optionnel) | 87/87 (100%) | ✅ Terminée |
| Phase 15 - Gestion articles admin | 45/45 (100%) | ✅ Terminée |
| Phase 16 - Points à revoir | 3/23 (13%) | ⏳ En cours |
| **Total** | **720/740 (97%)** | |

---

## 📋 Légende

- [ ] Tâche à faire
- [x] Tâche complétée
- ⚠️ Attention particulière requise
- 💡 Conseil / Astuce
- 🔗 Dépendance (nécessite une autre tâche)

---

# Phase 1 - Configuration et fondations

## 1.1 Configuration Tailwind

### Étape 1.1.1 : Mettre à jour globals.css

- [x] Ouvrir le fichier `app/globals.css`
- [x] Localiser la section `:root` (lignes 3-6)
- [x] Remplacer `--background: #ffffff;` par `--background: #F5F5F5;`
- [x] Remplacer `--foreground: #171717;` par `--foreground: #1F1F1F;`
- [x] Ajouter une nouvelle ligne : `--card: #FFFFFF;`
- [x] Localiser la section `@theme inline` (lignes 8-13)
- [x] Ajouter dans cette section : `--color-card: var(--card);`
- [x] Sauvegarder le fichier

**Résultat attendu :**
```css
:root {
  --background: #F5F5F5;
  --foreground: #1F1F1F;
  --card: #FFFFFF;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

### Étape 1.1.2 : Configurer scroll-margin

- [x] Dans `app/globals.css`, après la section `body { ... }`
- [x] Ajouter une nouvelle section pour les ancres :
```css
/* Scroll offset pour les ancres (évite que navbar cache les titres) */
[id] {
  scroll-margin-top: 80px;
}
```
- [x] Sauvegarder le fichier

💡 **Conseil :** 80px correspond à la hauteur approximative de la navbar sticky.

---

## 1.2 Vérification TypeScript

### Étape 1.2.1 : Supprimer ButtonLink.tsx

- [x] ~~Les fichiers sont déjà en .tsx~~
- [x] Supprimer le fichier `components/ButtonLink.tsx`

💡 **Explication :** Le composant `Button.tsx` (créé à l'étape 1.3.2) remplace `ButtonLink.tsx`. Il est plus complet car il supporte les liens ET les boutons avec plusieurs variants.

### Étape 1.2.2 : Vérifier Header.tsx

- [x] Ouvrir `components/Header.tsx`
- [x] Vérifier que le fichier est en TypeScript
- [x] ⚠️ L'import de `ButtonLink` sera mis à jour après la création de `Button.tsx` (étape 1.3.2)
- [x] Fermer le fichier

### Étape 1.2.3 : Vérifier Navbar.tsx

- [x] Ouvrir `components/Navbar.tsx`
- [x] Vérifier que `"use client"` est présent en première ligne
- [x] Le fichier est déjà en TypeScript, pas de modification nécessaire pour l'instant
- [x] Fermer le fichier

---

## 1.3 Composants UI de base

### Étape 1.3.1 : Créer le dossier ui

- [x] Dans l'explorateur de fichiers, aller dans le dossier `components/`
- [x] Créer un nouveau dossier nommé `ui`
- [x] Vérifier que le chemin est : `components/ui/`

### Étape 1.3.2 : Créer Button.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/ui/`, créer un nouveau fichier `Button.tsx`
- [x] Ajouter les imports :
```typescript
import Link from "next/link";
import { ReactNode } from "react";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface des props :
```typescript
interface ButtonProps {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
```

💡 **Explication :**
- `href?` : optionnel, si présent = lien, sinon = bouton
- `variant?` : style du bouton (par défaut "primary")
- `onClick?` : fonction appelée au clic (pour les vrais boutons)
- `type?` : type HTML du bouton

#### Sous-étape C : Créer la fonction getVariantStyles
- [x] Ajouter une fonction helper pour les styles :
```typescript
const getVariantStyles = (variant: "primary" | "secondary" | "outline") => {
  switch (variant) {
    case "primary":
      return "bg-foreground text-background hover:opacity-90";
    case "secondary":
      return "bg-card text-foreground border border-gray-300 hover:bg-gray-50";
    case "outline":
      return "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background";
    default:
      return "bg-foreground text-background hover:opacity-90";
  }
};
```

#### Sous-étape D : Implémenter le composant
- [x] Ajouter le composant principal :
```typescript
export default function Button({
  href,
  children,
  variant = "primary",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded font-medium transition-all duration-200";
  const variantStyles = getVariantStyles(variant);
  const combinedStyles = `${baseStyles} ${variantStyles}`;

  // Si href est fourni, rendre un Link
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  // Sinon, rendre un bouton
  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
```

- [x] Sauvegarder le fichier

💡 **Conseil :** Ce composant peut être utilisé comme lien OU comme bouton selon si `href` est fourni.

#### Sous-étape E : Mettre à jour Header.tsx

🔗 **Dépendance :** Cette sous-étape met à jour l'import supprimé à l'étape 1.2.1

- [x] Ouvrir `components/Header.tsx`
- [x] Remplacer l'import :
```typescript
// Avant
import ButtonLink from "@/components/ButtonLink";

// Après
import Button from "@/components/ui/Button";
```
- [x] Remplacer l'utilisation de `ButtonLink` par `Button` avec variant `secondary` :
```typescript
<Button href="/connexion" variant="secondary">
  Connexion
</Button>
```
- [x] Sauvegarder le fichier

**Header.tsx complet attendu :**
```typescript
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo à gauche */}
        <div>
          <p><Link href="/">LOGO</Link></p>
        </div>

        {/* Bloc à droite : connexion + réseaux */}
        <div className="flex items-center gap-6">
          <Button href="/connexion" variant="secondary">
            Connexion
          </Button>
          <p>réseaux sociaux</p>
        </div>

      </div>
    </header>
  );
}
```

### Étape 1.3.3 : Créer Section.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/ui/`, créer un nouveau fichier `Section.tsx`
- [x] Ajouter les imports :
```typescript
import { ReactNode } from "react";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface des props :
```typescript
interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "gray";
  id?: string;
}
```

💡 **Explication :**
- `background?` : "white" pour fond blanc, "gray" pour fond #F5F5F5
- `id?` : pour les ancres de navigation
- `className?` : classes additionnelles si besoin

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function Section({
  children,
  className = "",
  background = "white",
  id,
}: SectionProps) {
  const bgColor = background === "white" ? "bg-card" : "bg-background";

  return (
    <section
      id={id}
      className={`py-16 px-6 ${bgColor} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
```

- [x] Sauvegarder le fichier

💡 **Conseil :** Le `max-w-7xl mx-auto` centre le contenu avec une largeur max cohérente.

### Étape 1.3.4 : Créer Card.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/ui/`, créer un nouveau fichier `Card.tsx`
- [x] Ajouter les imports :
```typescript
import { ReactNode } from "react";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface des props :
```typescript
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}
```

💡 **Explication :**
- `hover?` : si true, effet de survol avec scale et shadow

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  const hoverStyles = hover
    ? "hover:shadow-lg hover:scale-105 cursor-pointer"
    : "";

  return (
    <div
      className={`bg-card rounded-lg border border-gray-200 p-6 shadow-sm transition-all duration-200 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 1.3.5 : Créer Stats.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/ui/`, créer un nouveau fichier `Stats.tsx`
- [x] Ajouter les imports :
```typescript
import { ReactNode } from "react";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface des props :
```typescript
interface StatsProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  className?: string;
}
```

💡 **Explication :**
- `value` : le chiffre (ex: "85", "1000+")
- `label` : le texte explicatif (ex: "Professionnels")
- `icon?` : icône optionnelle

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function Stats({
  value,
  label,
  icon,
  className = "",
}: StatsProps) {
  return (
    <div className={`text-center ${className}`}>
      {icon && <div className="mb-2 flex justify-center">{icon}</div>}
      <div className="text-4xl font-bold text-foreground mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </div>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 1.3.6 : Créer ScrollToTop.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/ui/`, créer un nouveau fichier `ScrollToTop.tsx`
- [x] ⚠️ Ce composant doit être client-side, ajouter en première ligne :
```typescript
"use client";
```
- [x] Ajouter les imports :
```typescript
import { useState, useEffect } from "react";
```

#### Sous-étape B : Implémenter le composant
- [x] Ajouter le composant complet :
```typescript
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Détecter le scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Fonction pour scroller en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-foreground text-background p-4 rounded-full shadow-lg hover:opacity-90 transition-all duration-200 z-50"
      aria-label="Retour en haut"
    >
      {/* Icône flèche vers le haut */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
```

- [x] Sauvegarder le fichier

💡 **Explication :**
- Le bouton apparaît après 300px de scroll
- Position fixe en bas à droite
- Scroll smooth vers le haut au clic

### Étape 1.3.7 : Créer index.ts pour les exports

- [x] Dans `components/ui/`, créer un fichier `index.ts`
- [x] Ajouter tous les exports :
```typescript
export { default as Button } from "./Button";
export { default as Section } from "./Section";
export { default as Card } from "./Card";
export { default as Stats } from "./Stats";
export { default as ScrollToTop } from "./ScrollToTop";
```
- [x] Sauvegarder le fichier

💡 **Avantage :** Permet d'importer tous les composants depuis un seul endroit :
```typescript
import { Button, Card, Section } from "@/components/ui";
```

---

## ✅ Checkpoint Phase 1

À ce stade, vous devriez avoir :
- [x] `globals.css` mis à jour avec les bonnes couleurs
- [x] Classes scroll-margin configurées
- [x] `ButtonLink.tsx` typé correctement
- [x] 5 composants UI créés dans `components/ui/`
- [x] Fichier `index.ts` pour les exports

**Test rapide :**
- [ ] Lancer `npm run dev`
- [ ] Vérifier qu'il n'y a pas d'erreurs TypeScript
- [ ] Le site doit compiler sans erreur

---

# Phase 2 - Layout global

## 2.1 Mise à jour Header

### Étape 2.1.1 : Créer un dossier layout

- [x] Dans `components/`, créer un dossier `layout`
- [x] Déplacer `Header.tsx` dans `components/layout/`
- [x] Déplacer `Navbar.tsx` dans `components/layout/`
- [x] Mettre à jour les imports dans `app/layout.tsx` :
  - Remplacer `import Header from "@/components/Header"` par `import Header from "@/components/layout/Header"`
  - Remplacer `import Navbar from "@/components/Navbar"` par `import Navbar from "@/components/layout/Navbar"`

💡 **Organisation :** On groupe tous les composants de layout ensemble.

⚠️ **Important :** Les imports doivent être mis à jour en même temps que le déplacement des fichiers, sinon le site ne compilera pas.

### Étape 2.1.2 : Ajouter les réseaux sociaux au Header

#### Sous-étape A : Préparer la structure
- [x] Ouvrir `components/layout/Header.tsx`
- [x] Identifier la div avec les réseaux sociaux (ligne 18)

#### Sous-étape B : Créer le composant d'icône social
- [x] Avant la fonction `Header`, ajouter un composant helper :
```typescript
interface SocialLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-600 hover:text-foreground transition-colors"
    >
      {children}
    </a>
  );
}
```

#### Sous-étape C : Remplacer le placeholder réseaux sociaux
- [x] Remplacer `<p>réseaux sociaux</p>` par :
```typescript
<div className="flex items-center gap-4">
  <SocialLink href="https://linkedin.com" label="LinkedIn">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  </SocialLink>

  <SocialLink href="https://twitter.com" label="Twitter">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  </SocialLink>

  <SocialLink href="https://facebook.com" label="Facebook">
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </SocialLink>
</div>
```

#### Sous-étape D : Ajouter l'import React
- [x] En haut du fichier, vérifier que React est importé :
```typescript
import React from "react";
```

- [x] Sauvegarder le fichier

⚠️ **Note :** Les URLs des réseaux sociaux sont des placeholders. Remplacer par les vraies URLs OIKO plus tard.

### Étape 2.1.3 : Ajouter le logo

- [x] Préparer une image du logo avec fond transparent (PNG)
- [x] Placer le fichier dans `public/logo.png`
- [x] Dans `Header.tsx`, remplacer le placeholder logo par :
```typescript
<Link href="/">
  <img src="/logo.png" alt="Oikogestion" className="h-12 sm:h-20 w-auto" />
</Link>
```

💡 **Astuce :** `h-12 sm:h-20` = petit sur mobile, grand sur desktop.

### Étape 2.1.4 : Améliorer le responsive

- [x] Dans `Header.tsx`, modifier la div principale :
```typescript
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
```

💡 **Explication :** Padding et gaps réduits sur mobile pour optimiser l'espace.

- [x] Pour la section réseaux + connexion, ajouter un wrapper responsive :
```typescript
<div className="flex items-center gap-2 sm:gap-6 shrink-0">
  <Button href="/connexion" variant="secondary">
    Connexion
  </Button>

  {/* réseaux sociaux - cachés sur mobile */}
  <div className="hidden sm:flex items-center gap-4">
    {/* ... les SocialLink ... */}
  </div>
</div>
```

💡 **Explication :** `hidden sm:flex` cache les réseaux sociaux sur mobile (ils seront dans le footer).

- [x] Sauvegarder le fichier

---

## 2.2 Mise à jour Navbar

### Étape 2.2.1 : Ajouter la logique de scroll

#### Sous-étape A : Préparer les imports
- [x] Ouvrir `components/layout/Navbar.tsx`
- [x] Vérifier que `"use client"` est en première ligne
- [x] Ajouter les imports nécessaires :
```typescript
import { useState, useEffect } from "react";
```

#### Sous-étape B : Ajouter le state pour le scroll
- [x] Dans la fonction `Navbar`, avant le `return`, ajouter :
```typescript
const [showLogo, setShowLogo] = useState(false);
```

#### Sous-étape C : Ajouter le useEffect pour détecter le scroll
- [x] Après le state, ajouter :
```typescript
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
```

💡 **Explication :** Le logo apparaît quand on scroll plus de 100px.

#### Sous-étape D : Ajouter le logo dans la navbar
- [x] Modifier la div principale de la navbar pour inclure le logo :
```typescript
<div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
  {/* Logo qui apparaît au scroll */}
  <div
    className={`font-bold text-lg transition-opacity duration-200 ${
      showLogo ? "opacity-100" : "opacity-0"
    }`}
  >
    <Link href="/">LOGO</Link>
  </div>

  {/* Navigation */}
  <ul className="flex gap-16 text-sm">
    {/* ... les liens existants ... */}
  </ul>
</div>
```

- [x] Sauvegarder le fichier

### Étape 2.2.2 : Améliorer le responsive de la navbar

⚠️ **Note :** Pour l'instant, on fait une version simple. Un menu burger mobile sera ajouté en section 2.5.

- [x] Modifier la div principale pour le responsive :
```typescript
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center overflow-x-auto">
```

- [x] Modifier les gaps et taille de texte pour mobile :
```typescript
<ul className="flex gap-4 sm:gap-8 md:gap-16 text-xs sm:text-sm whitespace-nowrap">
```

💡 **Explication :**
- `gap-4 sm:gap-8 md:gap-16` : espacement progressif
- `text-xs sm:text-sm` : texte plus petit sur mobile
- `whitespace-nowrap` : empêche les retours à la ligne
- `overflow-x-auto` : permet le scroll horizontal si besoin

- [x] Sauvegarder le fichier

---

## 2.3 Créer PageAnchors

### Étape 2.3.1 : Créer le fichier

- [x] Dans `components/layout/`, créer `PageAnchors.tsx`
- [x] Ajouter `"use client"` en première ligne
- [x] Ajouter les imports :
```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
```

### Étape 2.3.2 : Définir l'interface

- [x] Ajouter les interfaces :
```typescript
interface Anchor {
  id: string;
  label: string;
}

interface PageAnchorsProps {
  anchors: Anchor[];
}
```

### Étape 2.3.3 : Implémenter le composant

#### Sous-étape A : Structure de base
- [x] Ajouter le composant :
```typescript
export default function PageAnchors({ anchors }: PageAnchorsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // TODO: Détecter la section active au scroll

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
```

#### Sous-étape B : Ajouter la détection de scroll
- [x] Remplacer le `// TODO` par :
```typescript
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
```

💡 **Explication :** On détecte quelle section est visible à ~100px du haut de la fenêtre.

- [x] Sauvegarder le fichier

---

## 2.4 Créer Footer

### Étape 2.4.1 : Créer le fichier

- [x] Dans `components/layout/`, créer `Footer.tsx`
- [x] Ajouter les imports :
```typescript
import Link from "next/link";
import footerData from "@/content/footer.json";
```

### Étape 2.4.2 : Créer le mapping des liens

- [x] Ajouter le mapping avant le composant :
```typescript
// Mapping des labels vers les URLs (contrôlé par les devs)
const linkMapping: Record<string, string> = {
  // Navigation
  "Accueil": "/",
  "Activités": "/activites",
  "À propos": "/a-propos-de-nous",
  "Vente": "/vente",
  "Location": "/location",
  "Contact": "/contactez-nous",

  // Activités
  "Property Management": "/activites#property-management",
  "Asset Management": "/activites#asset-management",
  "Project Management": "/activites#project-management",
  "Transaction": "/activites#transaction",

  // Locataires
  "Espace locataire": "/espace-locataire",
  "Trouver un bien à louer": "/location",
};
```

### Étape 2.4.3 : Implémenter le composant Footer

#### Sous-étape A : Structure principale
- [x] Ajouter le composant :
```typescript
export default function Footer() {
  return (
    <footer className="bg-card border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1 : Navigation */}
          {/* Colonne 2 : Activités */}
          {/* Colonne 3 : Locataires */}
          {/* Colonne 4 : Adresses */}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} OIKO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
```

#### Sous-étape B : Créer un composant helper FooterColumn
- [x] Avant le composant Footer, ajouter :
```typescript
interface FooterColumnProps {
  title: string;
  links: string[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <Link
              href={linkMapping[link] || "#"}
              className="text-sm text-gray-600 hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Sous-étape C : Remplir les colonnes
- [x] Remplacer les commentaires par les vraies colonnes :
```typescript
{/* Colonne 1 : Navigation */}
<FooterColumn
  title={footerData.sections.navigation.title}
  links={footerData.sections.navigation.links}
/>

{/* Colonne 2 : Activités */}
<FooterColumn
  title={footerData.sections.activites.title}
  links={footerData.sections.activites.links}
/>

{/* Colonne 3 : Locataires */}
<FooterColumn
  title={footerData.sections.locataires.title}
  links={footerData.sections.locataires.links}
/>

{/* Colonne 4 : Adresses */}
<div>
  <h3 className="font-semibold text-foreground mb-4">Nos adresses</h3>
  <div className="space-y-6">
    {footerData.adresses.map((adresse, index) => (
      <div key={index} className="text-sm text-gray-600">
        <p className="font-semibold text-foreground">{adresse.ville}</p>
        <p>{adresse.rue}</p>
        <p>{adresse.codePostal} {adresse.ville} – {adresse.pays}</p>
        <p className="mt-1">{adresse.telephone}</p>
      </div>
    ))}
  </div>
</div>
```

#### Sous-étape D : Ajouter les réseaux sociaux (mobile)
- [x] Avant le copyright, ajouter les réseaux sociaux (visibles uniquement sur mobile) :
```typescript
{/* Réseaux sociaux (mobile uniquement) */}
<div className="mt-8 flex sm:hidden justify-center gap-6">
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-600 hover:text-foreground transition-colors">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  </a>
  <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-gray-600 hover:text-foreground transition-colors">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  </a>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-foreground transition-colors">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-foreground transition-colors">
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </a>
</div>
```

- [x] Sauvegarder le fichier

### Étape 2.4.4 : Ajouter Footer au layout principal

- [x] Ouvrir `app/layout.tsx`
- [x] Ajouter l'import :
```typescript
import Footer from "@/components/layout/Footer";
```
- [x] Avant la balise fermante `</body>`, ajouter :
```typescript
<Footer />
```
- [x] Sauvegarder le fichier

### Étape 2.4.5 : Mettre à jour les imports du Header et Navbar

- [x] Ouvrir `app/layout.tsx`
- [x] Modifier les imports :
```typescript
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
```
- [x] Sauvegarder le fichier

---

## 2.5 Responsive Navbar (Menu Hamburger)

### Étape 2.5.1 : Ajouter l'état pour le menu mobile

- [x] Ouvrir `components/layout/Navbar.tsx`
- [x] Ajouter l'import useState si pas déjà présent :
```typescript
import { useState, useEffect } from "react";
```
- [x] Ajouter un état pour gérer l'ouverture du menu :
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

### Étape 2.5.2 : Créer le bouton hamburger

- [x] Ajouter le bouton hamburger (visible uniquement sur mobile) :
```typescript
{/* Bouton hamburger - visible sur mobile */}
<button
  className="sm:hidden p-2 text-gray-600 hover:text-foreground"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label="Menu"
>
  {isMenuOpen ? (
    {/* Icône X pour fermer */}
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    {/* Icône hamburger */}
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )}
</button>
```

### Étape 2.5.3 : Cacher la navigation desktop sur mobile

- [x] Modifier la `<ul>` des liens pour la cacher sur mobile :
```typescript
<ul className="hidden sm:flex gap-16 text-sm">
```

### Étape 2.5.4 : Créer le menu mobile déroulant

- [x] Après la div principale, ajouter le menu mobile :
```typescript
{/* Menu mobile */}
{isMenuOpen && (
  <div className="sm:hidden border-t border-gray-200">
    <ul className="flex flex-col py-4">
      <li>
        <Link
          href="/"
          className="block px-6 py-3 hover:bg-gray-50"
          onClick={() => setIsMenuOpen(false)}
        >
          Accueil
        </Link>
      </li>
      <li>
        <Link
          href="/activites"
          className="block px-6 py-3 hover:bg-gray-50"
          onClick={() => setIsMenuOpen(false)}
        >
          Activités
        </Link>
      </li>
      <li>
        <Link
          href="/a-propos-de-nous"
          className="block px-6 py-3 hover:bg-gray-50"
          onClick={() => setIsMenuOpen(false)}
        >
          À propos
        </Link>
      </li>
      <li>
        <Link
          href="/vente"
          className="block px-6 py-3 hover:bg-gray-50"
          onClick={() => setIsMenuOpen(false)}
        >
          Vente
        </Link>
      </li>
      <li>
        <Link
          href="/location"
          className="block px-6 py-3 hover:bg-gray-50"
          onClick={() => setIsMenuOpen(false)}
        >
          Location
        </Link>
      </li>
      <li>
        <Link
          href="/contactez-nous"
          className="block px-6 py-3 hover:bg-gray-50"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
      </li>
    </ul>
  </div>
)}
```

### Étape 2.5.5 : Fermer le menu au changement de page

- [x] Ajouter un useEffect pour fermer le menu quand on scroll :
```typescript
// Fermer le menu mobile au scroll
useEffect(() => {
  const handleScroll = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [isMenuOpen]);
```

- [x] Sauvegarder le fichier

💡 **Explication :**
- `sm:hidden` cache le bouton hamburger sur écran >= 640px
- `hidden sm:flex` cache les liens desktop sur mobile
- `onClick={() => setIsMenuOpen(false)}` ferme le menu quand on clique sur un lien

### Étape 2.5.6 : Tester le responsive de la page

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000
- [x] Ouvrir les outils de développement (F12)
- [x] Activer le mode responsive (Ctrl+Shift+M ou icône mobile)
- [x] Tester les différentes tailles :
  - [x] Mobile (320px) : Menu hamburger visible, réseaux sociaux cachés
  - [x] Tablette (768px) : Navigation desktop visible
  - [x] Desktop (1024px+) : Tout visible correctement
- [x] Vérifier que le menu hamburger s'ouvre et se ferme
- [x] Vérifier que les liens du menu mobile fonctionnent
- [x] Vérifier que le menu se ferme au scroll

---

## ✅ Checkpoint Phase 2

À ce stade, vous devriez avoir :
- [x] Header avec réseaux sociaux
- [x] Navbar avec logo qui apparaît au scroll
- [x] Composant PageAnchors fonctionnel
- [x] Footer complet avec mapping des liens
- [x] Tous les composants dans `components/layout/`
- [x] Menu hamburger responsive sur mobile

**Test visuel :**
- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000
- [ ] Vérifier que Header et Footer s'affichent
- [ ] Scroller et vérifier que le logo apparaît dans la navbar
- [ ] Vérifier le responsive (réduire la fenêtre)
- [ ] Tester le menu hamburger sur mobile (< 640px)

---

# Phase 3 - Page Accueil

## 3.1 Créer les composants spécifiques

### Étape 3.1.1 : Créer le dossier

- [x] Dans `components/`, créer un dossier `accueil`
- [x] Vérifier le chemin : `components/accueil/`

### Étape 3.1.2 : Créer Hero.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/accueil/`, créer `Hero.tsx`
- [x] Ajouter les imports :
```typescript
import { Button } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface :
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="bg-background py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <Button href={ctaLink} variant="primary">
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 3.1.3 : Créer ServicesGrid.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/accueil/`, créer `ServicesGrid.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
import Link from "next/link";
```

#### Sous-étape B : Définir les interfaces
- [x] Ajouter les interfaces :
```typescript
interface Service {
  title: string;
  description: string;
  link: string;
}

interface ServicesGridProps {
  services: Service[];
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section className="bg-card py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          Nos services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.link}>
              <Card hover>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 3.1.4 : Créer HighlightsSection.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/accueil/`, créer `HighlightsSection.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [x] Ajouter les interfaces :
```typescript
interface Highlight {
  title: string;
  description: string;
}

interface HighlightsSectionProps {
  highlights: Highlight[];
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function HighlightsSection({ highlights }: HighlightsSectionProps) {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">
          À la une
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((highlight) => (
            <Card key={highlight.title}>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-600">
                {highlight.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 3.1.5 : Créer ActivitiesPreview.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/accueil/`, créer `ActivitiesPreview.tsx`
- [x] Ajouter les imports :
```typescript
import { Stats, Button } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [x] Ajouter les interfaces :
```typescript
interface Stat {
  value: string;
  label: string;
}

interface ActivitiesPreviewProps {
  title: string;
  description: string;
  stats: Stat[];
  ctaText: string;
  ctaLink: string;
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function ActivitiesPreview({
  title,
  description,
  stats,
  ctaText,
  ctaLink,
}: ActivitiesPreviewProps) {
  return (
    <section className="bg-card py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {stats.map((stat) => (
            <Stats key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>

        <div className="text-center">
          <Button href={ctaLink} variant="primary">
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 3.1.6 : Créer index.ts pour les exports

- [x] Dans `components/accueil/`, créer `index.ts`
- [x] Ajouter les exports :
```typescript
export { default as Hero } from "./Hero";
export { default as ServicesGrid } from "./ServicesGrid";
export { default as HighlightsSection } from "./HighlightsSection";
export { default as ActivitiesPreview } from "./ActivitiesPreview";
```
- [x] Sauvegarder le fichier

---

## 3.2 Implémenter la page Accueil

### Étape 3.2.1 : Mettre à jour page.tsx

- [x] Ouvrir `app/page.tsx`
- [x] Remplacer tout le contenu par :
```typescript
import {
  Hero,
  ServicesGrid,
  HighlightsSection,
  ActivitiesPreview,
} from "@/components/accueil";
import { ScrollToTop } from "@/components/ui";
import homeContent from "@/content/accueil.json";

export default function HomePage() {
  return (
    <main>
      <Hero
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        ctaText={homeContent.hero.cta}
        ctaLink="/activites"
      />

      <ServicesGrid services={homeContent.services} />

      <HighlightsSection highlights={homeContent.highlights} />

      <ActivitiesPreview
        title={homeContent.activities.title}
        description={homeContent.activities.description}
        stats={homeContent.activities.stats}
        ctaText={homeContent.activities.cta}
        ctaLink="/activites"
      />

      <ScrollToTop />
    </main>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 3.2.2 : Test visuel

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000
- [x] Vérifier que toutes les sections s'affichent
- [x] Vérifier le responsive (mobile, tablette, desktop)
- [x] Tester les liens des cartes services
- [x] Scroller et vérifier que le bouton "Retour en haut" apparaît
- [x] Cliquer sur le bouton pour tester le scroll vers le haut

---

## ✅ Checkpoint Phase 3

À ce stade, vous devriez avoir :
- [x] 4 composants créés dans `components/accueil/`
- [x] Page d'accueil complète avec toutes les sections
- [x] Bouton ScrollToTop fonctionnel
- [x] Design responsive
- [x] Tous les liens fonctionnels

**Vérifications :**
- [x] Aucune erreur TypeScript
- [x] Toutes les sections s'affichent correctement
- [x] Le contenu provient bien de `accueil.json`
- [x] Le responsive fonctionne sur tous les écrans

---

# Phase 4 - Page Activités

## 4.1 Créer les composants spécifiques

### Étape 4.1.1 : Créer le dossier

- [x] Dans `components/`, créer un dossier `activites`
- [x] Vérifier le chemin : `components/activites/`

### Étape 4.1.2 : Créer ActivitySection.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/activites/`, créer `ActivitySection.tsx`
- [x] Ajouter les imports :
```typescript
import { Section, Card, Stats } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [x] Ajouter les interfaces (basées sur la structure de `content/activites.json`) :
```typescript
interface Feature {
  title: string;
  content: string;
}

interface Stat {
  number: string;
  label: string;
}

interface ActivitySectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  features?: Feature[];
  paragraphs?: string[];
  stats?: Stat[];
}
```

💡 **Explication :** Les `?` indiquent que ces props sont optionnelles. Les interfaces correspondent à la structure du fichier JSON.

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function ActivitySection({
  id,
  title,
  subtitle,
  description,
  features = [],
  paragraphs = [],
  stats = [],
}: ActivitySectionProps) {
  return (
    <Section id={id} background="white">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 mb-4">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-gray-700">
              {description}
            </p>
          )}
        </div>

        {/* Features (avec titre et contenu) */}
        {features.length > 0 && (
          <div className="mb-12 space-y-8">
            {features.map((feature, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {feature.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Paragraphes (simples chaînes de texte) */}
        {paragraphs.length > 0 && (
          <div className="mb-12 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="flex justify-center gap-16">
            {stats.map((stat, index) => (
              <Stats key={index} value={stat.number} label={stat.label} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 4.1.3 : Créer index.ts

- [x] Dans `components/activites/`, créer `index.ts`
- [x] Ajouter l'export :
```typescript
export { default as ActivitySection } from "./ActivitySection";
```
- [x] Sauvegarder le fichier

---

## 4.2 Implémenter la page Activités

### Étape 4.2.1 : Mettre à jour la page

- [x] Ouvrir `app/activites/page.tsx`
- [x] Remplacer tout le contenu par :
```typescript
import { ActivitySection } from "@/components/activites";
import { PageAnchors } from "@/components/layout";
import { ScrollToTop } from "@/components/ui";
import activitiesContent from "@/content/activites.json";

export default function ActivitiesPage() {
  // Définir les ancres dynamiquement depuis le JSON
  const anchors = activitiesContent.sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));

  return (
    <main>
      <PageAnchors anchors={anchors} />

      {/* Boucle sur les sections du JSON */}
      {activitiesContent.sections.map((section) => (
        <ActivitySection
          key={section.id}
          id={section.id}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          features={section.features}
          paragraphs={section.paragraphs}
          stats={section.stats}
        />
      ))}

      <ScrollToTop />
    </main>
  );
}
```

💡 **Note :** Le JSON utilise un tableau `sections[]` avec chaque activité comme objet. On utilise `.map()` pour parcourir toutes les sections automatiquement.

- [x] Sauvegarder le fichier

### Étape 4.2.2 : Créer l'index.ts pour layout (si pas déjà fait)

- [x] Vérifier si `components/layout/index.ts` existe
- [x] Si non, créer `components/layout/index.ts` :
```typescript
export { default as Header } from "./Header";
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
export { default as PageAnchors } from "./PageAnchors";
```
- [x] Sauvegarder le fichier

💡 **Note :** Cela permet d'importer avec `from "@/components/layout"` au lieu de `from "@/components/layout/PageAnchors"`.

### Étape 4.2.3 : Test visuel complet

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/activites
- [x] Vérifier que PageAnchors s'affiche en haut
- [x] Cliquer sur chaque lien d'ancre et vérifier le scroll
- [x] Vérifier que le lien actif change selon le scroll
- [x] Vérifier que les 4 sections s'affichent correctement
- [x] Tester le responsive (mobile, tablette, desktop)
- [x] Vérifier que le bouton ScrollToTop fonctionne

**Améliorations apportées lors du test :**
- PageAnchors masqué sur mobile (`hidden md:block`)
- Liens des ancres centrés (`justify-center`)
- PageAnchors sticky sous la navbar (`sticky top-11`)

---

## ✅ Checkpoint Phase 4

À ce stade, vous devriez avoir :
- [x] Composant ActivitySection réutilisable créé
- [x] Page Activités complète avec 4 sections
- [x] PageAnchors fonctionnel avec highlight
- [x] Scroll smooth vers les sections
- [x] Offset correct (navbar ne cache pas les titres)
- [x] ScrollToTop fonctionnel
- [x] Design responsive

**Vérifications finales :**
- [x] Aucune erreur TypeScript
- [x] Toutes les sections visibles
- [x] Navigation par ancres fluide
- [x] Contenu provient bien de `activites.json`
- [x] Responsive OK sur mobile et desktop

---

## 🎉 Phases 1-4 terminées !

Félicitations ! Vous avez complété :
- ✅ Phase 1 - Configuration et fondations
- ✅ Phase 2 - Layout global
- ✅ Phase 3 - Page Accueil
- ✅ Phase 4 - Page Activités

**Ce qui a été créé :**
- 5 composants UI de base (Button, Section, Card, Stats, ScrollToTop)
- Layout complet (Header, Navbar, Footer, PageAnchors)
- 4 composants page Accueil (Hero, ServicesGrid, HighlightsSection, ActivitiesPreview)
- 1 composant réutilisable page Activités (ActivitySection)
- 2 pages complètes et fonctionnelles

**Prochaines étapes (Phases 5-7) :**
- Phase 5 : Page À propos (6 composants)
- Phase 6 : Page Contact (4 composants)
- Phase 7 : Page Connexion (1 page simple)

---

---

# Phase 5 - Page À propos

## 5.1 Créer les composants spécifiques

### Étape 5.1.1 : Créer le dossier

- [x] Dans `components/`, créer un dossier `a-propos`
- [x] Vérifier le chemin : `components/a-propos/`

### Étape 5.1.2 : Créer Timeline.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/a-propos/`, créer `Timeline.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [x] Ajouter les interfaces :
```typescript
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Ligne verticale centrale */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>

      <div className="space-y-12">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={event.year} className="relative">
              {/* Desktop: alternance gauche/droite */}
              <div className={`hidden md:flex md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-5/12"></div>

                {/* Point central */}
                <div className="hidden md:flex items-center justify-center md:w-2/12">
                  <div className="w-4 h-4 rounded-full bg-foreground border-4 border-background shadow"></div>
                </div>

                {/* Contenu */}
                <div className="md:w-5/12">
                  <Card>
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-3xl font-bold text-foreground">{event.year}</span>
                      <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </Card>
                </div>
              </div>

              {/* Mobile: liste simple */}
              <div className="md:hidden">
                <Card>
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-2xl font-bold text-foreground">{event.year}</span>
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

💡 **Explication :** Timeline en zigzag sur desktop, liste simple sur mobile.

- [x] Sauvegarder le fichier

### Étape 5.1.3 : Créer ToolsGrid.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/a-propos/`, créer `ToolsGrid.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [x] Ajouter les interfaces :
```typescript
interface Tool {
  name: string;
  description: string;
}

interface ToolsGridProps {
  tools: Tool[];
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Card key={tool.name} hover>
          <div className="flex items-start gap-4">
            {/* Icône placeholder */}
            <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center shrink-0">
              <svg
                className="w-6 h-6 text-background"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tool.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {tool.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 5.1.4 : Créer VideoSection.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/a-propos/`, créer `VideoSection.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface (basée sur `content/a-propos.json`) :
```typescript
interface VideoSectionProps {
  title: string;
  description?: string;
}
```

💡 **Note :** La vidéo sera ajoutée plus tard. Pour l'instant on affiche un placeholder.

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function VideoSection({ title, description }: VideoSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 whitespace-pre-line">
            {description}
          </p>
        )}
      </div>

      <Card>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-20 h-20 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-500">Vidéo à venir</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 5.1.5 : Créer TestimonialsGrid.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/a-propos/`, créer `TestimonialsGrid.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface (basée sur `content/a-propos.json` où les témoignages sont de simples strings) :
```typescript
interface TestimonialsGridProps {
  testimonials: string[];
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map((testimonial, index) => (
        <Card key={index}>
          <div className="p-2">
            {/* Icône citation */}
            <svg
              className="w-8 h-8 text-gray-300 mb-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-gray-700 italic leading-relaxed">
              "{testimonial}"
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

💡 **Explication :** Grille simple 2x2 sur desktop, colonne sur mobile. Tous les témoignages sont visibles d'un coup.

- [x] Sauvegarder le fichier

### Étape 5.1.6 : Créer JobsGrid.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/a-propos/`, créer `JobsGrid.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [x] Ajouter les interfaces (basées sur `content/a-propos.json`) :
```typescript
interface Job {
  name: string;
  title: string;
  description: string;
  link: string;
}

interface JobsGridProps {
  jobs: Job[];
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function JobsGrid({ jobs }: JobsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <Card key={job.name} hover>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">{job.name}</p>
            <h3 className="text-xl font-semibold text-foreground">
              {job.title}
            </h3>
          </div>
          {job.description && (
            <p className="text-gray-600 mb-4">
              {job.description}
            </p>
          )}
          {job.link && (
            <p className="text-sm text-foreground font-medium">
              {job.link}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 5.1.7 : Créer index.ts

- [x] Dans `components/a-propos/`, créer `index.ts`
- [x] Ajouter tous les exports :
```typescript
export { default as Timeline } from "./Timeline";
export { default as ToolsGrid } from "./ToolsGrid";
export { default as VideoSection } from "./VideoSection";
export { default as TestimonialsGrid } from "./TestimonialsGrid";
export { default as JobsGrid } from "./JobsGrid";
```
- [x] Sauvegarder le fichier

---

## 5.2 Implémenter la page À propos

### Étape 5.2.1 : Mettre à jour la page

- [x] Ouvrir `app/a-propos-de-nous/page.tsx`
- [x] Remplacer tout le contenu par :
```typescript
import {
  Timeline,
  ToolsGrid,
  VideoSection,
  TestimonialsGrid,
  JobsGrid,
} from "@/components/a-propos";
import { PageAnchors } from "@/components/layout";
import { Section, ScrollToTop } from "@/components/ui";
import aproposContent from "@/content/a-propos.json";

export default function AProposPage() {
  // Extraire les sections par leur id
  const histoireSection = aproposContent.sections.find(s => s.id === "histoire");
  const outilsSection = aproposContent.sections.find(s => s.id === "outils");
  const presentationSection = aproposContent.sections.find(s => s.id === "presentation");
  const temoignagesSection = aproposContent.sections.find(s => s.id === "temoignages");
  const recrutementSection = aproposContent.sections.find(s => s.id === "recrutement");
  const metiersSection = aproposContent.sections.find(s => s.id === "metiers");

  // Définir les ancres dynamiquement
  const anchors = aproposContent.sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));

  return (
    <main>
      <PageAnchors anchors={anchors} />

      {/* Section Histoire */}
      {histoireSection && (
        <Section id="histoire" background="white">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {histoireSection.title}
            </h1>
            {histoireSection.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {histoireSection.subtitle}
              </p>
            )}
          </div>
          {histoireSection.timeline && (
            <Timeline events={histoireSection.timeline} />
          )}
        </Section>
      )}

      {/* Section Outils */}
      {outilsSection && (
        <Section id="outils" background="gray">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {outilsSection.title}
            </h2>
            {outilsSection.description && (
              <p className="text-gray-600 max-w-2xl mx-auto whitespace-pre-line">
                {outilsSection.description}
              </p>
            )}
          </div>
          {outilsSection.tools && (
            <ToolsGrid tools={outilsSection.tools} />
          )}
        </Section>
      )}

      {/* Section Présentation */}
      {presentationSection && (
        <Section id="presentation" background="white">
          <VideoSection
            title={presentationSection.title}
            description={presentationSection.description}
          />
        </Section>
      )}

      {/* Section Témoignages */}
      {temoignagesSection && temoignagesSection.testimonials && (
        <Section id="temoignages" background="gray">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {temoignagesSection.title}
            </h2>
          </div>
          <TestimonialsGrid testimonials={temoignagesSection.testimonials} />
        </Section>
      )}

      {/* Section Métiers */}
      {metiersSection && (
        <Section id="metiers" background="white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {metiersSection.title}
            </h2>
          </div>
          {metiersSection.jobs && (
            <JobsGrid jobs={metiersSection.jobs} />
          )}
        </Section>
      )}

      <ScrollToTop />
    </main>
  );
}
```

💡 **Note :** Le JSON utilise un tableau `sections[]` avec différents types de contenu. On extrait chaque section par son `id`.

- [x] Sauvegarder le fichier

### Étape 5.2.2 : Test visuel complet

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/a-propos-de-nous
- [x] Vérifier que PageAnchors s'affiche
- [x] Tester la navigation par ancres
- [x] Vérifier la Timeline (alternance gauche/droite sur desktop)
- [x] Vérifier la grille des outils (7 outils)
- [x] Vérifier la grille de témoignages (4 témoignages en 2x2)
- [x] Vérifier la grille des métiers (6 métiers)
- [x] Tester le responsive sur mobile et tablette
- [x] Vérifier que ScrollToTop fonctionne

⚠️ **Correction appliquée :** La Timeline avait un bug de doublement sur mobile. Le fix consiste à ajouter `hidden` à la div desktop : `hidden md:flex` au lieu de `md:flex` seul.

---

## ✅ Checkpoint Phase 5

À ce stade, vous devriez avoir :
- [x] 5 composants créés dans `components/a-propos/`
- [x] Page À propos complète avec les sections du JSON
- [x] Timeline avec alternance gauche/droite (et fix mobile)
- [x] Grille de témoignages (2x2 sur desktop)
- [x] Grille des métiers
- [x] PageAnchors fonctionnel
- [x] Design responsive

**Vérifications :**
- [x] Aucune erreur TypeScript
- [x] Toutes les sections visibles
- [x] Grille témoignages fonctionnelle
- [x] Contenu provient de `a-propos.json`
- [x] Responsive OK

---

# Phase 6 - Page Contact

## 6.1 Créer les composants spécifiques

### Étape 6.1.1 : Créer le dossier

- [x] Dans `components/`, créer un dossier `contact`
- [x] Vérifier le chemin : `components/contact/`

### Étape 6.1.2 : Créer FormField.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/contact/`, créer `FormField.tsx`
- [x] Ajouter les imports :
```typescript
import { ReactNode } from "react";
```

#### Sous-étape B : Définir les interfaces
- [x] Ajouter les interfaces :
```typescript
interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  rows?: number;
  children?: ReactNode;
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
```typescript
export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  options = [],
  rows = 4,
  children,
}: FormFieldProps) {
  const baseInputStyles = "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent";

  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          className={baseInputStyles}
        />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
          id={name}
          name={name}
          required={required}
          className={baseInputStyles}
        >
          <option value="">Sélectionner...</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="mb-4 flex items-start gap-3">
        <input
          type="checkbox"
          id={name}
          name={name}
          required={required}
          className="mt-1 w-4 h-4 text-foreground border-gray-300 rounded focus:ring-foreground"
        />
        <label htmlFor={name} className="text-sm text-gray-700">
          {children || label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={baseInputStyles}
      />
    </div>
  );
}
```

💡 **Explication :** Composant générique qui gère tous les types de champs.

- [x] Sauvegarder le fichier

### Étape 6.1.3 : Créer ContactForm.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/contact/`, créer `ContactForm.tsx`
- [x] Ajouter `"use client"` en première ligne
- [x] Ajouter les imports :
```typescript
"use client";

import { useState, FormEvent } from "react";
import { Card, Button } from "@/components/ui";
import FormField from "./FormField";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface :
```typescript
interface ContactFormProps {
  subjects: string[];
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function ContactForm({ subjects }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi (à remplacer par vraie API plus tard)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Prénom"
            name="firstName"
            type="text"
            placeholder="Votre prénom"
            required
          />
          <FormField
            label="Nom"
            name="lastName"
            type="text"
            placeholder="Votre nom"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="votre.email@exemple.com"
            required
          />
          <FormField
            label="Téléphone"
            name="phone"
            type="tel"
            placeholder="06 12 34 56 78"
          />
        </div>

        <FormField
          label="Objet"
          name="subject"
          type="select"
          options={subjects}
          required
        />

        <FormField
          label="Message"
          name="message"
          type="textarea"
          placeholder="Votre message..."
          rows={6}
          required
        />

        <FormField
          label="J'accepte d'être contacté par téléphone"
          name="callback"
          type="checkbox"
        />

        <FormField
          label=""
          name="rgpd"
          type="checkbox"
          required
        >
          J'accepte la <a href="/politique-rgpd" className="text-foreground underline">politique de confidentialité</a> et le traitement de mes données personnelles.
        </FormField>

        {/* Captcha simple */}
        <div className="bg-gray-50 border border-gray-300 rounded p-4">
          <FormField
            label="Vérification : Combien font 3 + 5 ?"
            name="captcha"
            type="text"
            placeholder="Votre réponse"
            required
          />
        </div>

        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
          </div>
        )}

        <Button type="submit" variant="primary">
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </Card>
  );
}
```

💡 **Explication :** Formulaire avec validation, captcha simple et feedback utilisateur.

- [x] Sauvegarder le fichier

### Étape 6.1.4 : Créer AddressCard.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/contact/`, créer `AddressCard.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface (adaptée au JSON) :
```typescript
interface Address {
  city: string;
  address: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface AddressCardProps {
  address: Address;
}
```

⚠️ **Correction appliquée :** L'interface utilise les mêmes noms que le JSON (`city`, `address`, `postalCode`, `country`, `phone`).

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function AddressCard({ address }: AddressCardProps) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        {/* Icône localisation */}
        <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-background"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {address.ville}
          </h3>
          <div className="text-gray-600 space-y-1">
            <p>{address.rue}</p>
            <p>{address.codePostal} {address.ville} – {address.pays}</p>
            <p className="font-medium text-foreground mt-3">
              📞 {address.telephone}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 6.1.5 : Créer ContactInfo.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/contact/`, créer `ContactInfo.tsx`
- [x] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface :
```typescript
interface ContactInfoProps {
  email: string;
  phone: string;
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function ContactInfo({ email, phone }: ContactInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Email */}
      <Card hover>
        <a href={`mailto:${email}`} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6 text-background"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="text-foreground font-medium">{email}</p>
          </div>
        </a>
      </Card>

      {/* Téléphone */}
      <Card hover>
        <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6 text-background"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Téléphone</p>
            <p className="text-foreground font-medium">{phone}</p>
          </div>
        </a>
      </Card>
    </div>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 6.1.6 : Créer index.ts

- [x] Dans `components/contact/`, créer `index.ts`
- [x] Ajouter les exports :
```typescript
export { default as ContactForm } from "./ContactForm";
export { default as FormField } from "./FormField";
export { default as AddressCard } from "./AddressCard";
export { default as ContactInfo } from "./ContactInfo";
```
- [x] Sauvegarder le fichier

---

## 6.2 Implémenter la page Contact

### Étape 6.2.1 : Mettre à jour la page

- [x] Ouvrir `app/contactez-nous/page.tsx`
- [x] Remplacer tout le contenu par :
```typescript
import {
  ContactForm,
  AddressCard,
  ContactInfo,
} from "@/components/contact";
import { Section, ScrollToTop } from "@/components/ui";
import contactContent from "@/content/contact.json";

export default function ContactPage() {
  return (
    <main>
      {/* Hero section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {contactContent.hero.title}
          </h1>
          <p className="text-xl text-gray-600">
            {contactContent.hero.subtitle}
          </p>
        </div>

        {/* Contact info */}
        <div className="max-w-4xl mx-auto mb-16">
          <ContactInfo
            email={contactContent.contact.email.value}
            phone={contactContent.contact.phone.value}
          />
        </div>

        {/* Formulaire */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Envoyez-nous un message
          </h2>
          <ContactForm subjects={["Demande d'information", "Demande de devis", "Réclamation", "Autre"]} />
        </div>
      </Section>

      {/* Nos bureaux */}
      <Section background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {contactContent.addresses.title}
          </h2>
          <p className="text-gray-600">
            {contactContent.addresses.company}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactContent.addresses.offices.map((office, index) => (
            <AddressCard key={index} address={office} />
          ))}
        </div>
      </Section>

      <ScrollToTop />
    </main>
  );
}
```

⚠️ **Corrections appliquées :**
- `ContactForm` attend `subjects` (un tableau de strings) et non `formConfig`
- `AddressCard` attend `address={office}` et non `office={office}`

- [x] Sauvegarder le fichier

### Étape 6.2.2 : Test visuel complet

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/contactez-nous
- [x] Vérifier le titre et l'intro
- [x] Cliquer sur l'email et le téléphone (doivent ouvrir les apps)
- [x] Tester le formulaire :
  - [x] Remplir tous les champs
  - [x] Vérifier la validation (champs requis)
  - [x] Tester le captcha
  - [x] Soumettre le formulaire
  - [x] Vérifier le message de succès
- [x] Vérifier les 2 cartes d'adresses (Paris et Marseille)
- [x] Tester le responsive
- [x] Vérifier ScrollToTop

---

## ✅ Checkpoint Phase 6

À ce stade, vous devriez avoir :
- [x] 4 composants créés dans `components/contact/`
- [x] Page Contact complète
- [x] Formulaire fonctionnel avec validation
- [x] Captcha simple
- [x] Cartes email et téléphone cliquables
- [x] Cartes d'adresses (Paris et Marseille)
- [x] Design responsive
- [x] Feedback utilisateur (succès/erreur)

**Vérifications :**
- [x] Aucune erreur TypeScript
- [x] Formulaire se soumet correctement
- [x] Validation fonctionne
- [x] Message de succès s'affiche
- [x] Liens email/téléphone fonctionnels
- [x] Contenu provient de `contact.json`
- [x] Responsive OK

---

## 🎉 Phases 1-6 terminées !

Vous avez complété les 6 premières phases du projet :
- ✅ Phase 1 - Configuration et fondations
- ✅ Phase 2 - Layout global
- ✅ Phase 3 - Page Accueil
- ✅ Phase 4 - Page Activités
- ✅ Phase 5 - Page À propos (5 composants)
- ✅ Phase 6 - Page Contact (4 composants)

**Récapitulatif complet (Phases 1-6) :**
- 19 composants créés au total
- 4 pages complètes fonctionnelles (Accueil, Activités, À propos, Contact)
- Layout global complet (Header, Navbar, Footer, PageAnchors)
- Design system cohérent
- Formulaire de contact avec validation
- Timeline visuelle

**Prochaine étape :** Phase 7 - Esthétique / Thème (dark mode + couleur verte)

---

# Phase 7 - Esthétique / Thème

## Décisions de design validées

Avant de commencer, voici les décisions prises :

| Élément | Décision |
|---------|----------|
| **Toggle thème** | Tout à droite dans la navbar (après le bouton "Contactez-nous") |
| **Logo** | Même logo pour les deux thèmes (on ajuste si besoin après test) |
| **Thème clair** | Fond `#F5F5F5`, cards blanches, texte `#1F1F1F` |
| **Thème sombre** | Fond `#121212`, cards `#1E1E1E`, texte `#F5F5F5` |
| **Couleur accent** | Vert OIKO `#2ECC71`, hover `#27AE60` |

---

## 7.1 Configurer les variables CSS

### Étape 7.1.1 : Ajouter les variables de couleur primaire

#### Sous-étape A : Ouvrir globals.css
- [x] Ouvrir le fichier `app/globals.css`
- [x] Localiser la section `:root` (début du fichier)

#### Sous-étape B : Ajouter les couleurs primaires
- [x] Dans `:root`, ajouter ces lignes :
```css
--primary: #2ECC71;
--primary-dark: #27AE60;
--card-foreground: #1F1F1F;
--muted: #6B7280;
```

#### Sous-étape C : Ajouter dans @theme inline
- [x] Localiser la section `@theme inline`
- [x] Ajouter ces lignes :
```css
--color-primary: var(--primary);
--color-primary-dark: var(--primary-dark);
--color-card-foreground: var(--card-foreground);
--color-muted: var(--muted);
```

**Résultat attendu pour :root :**
```css
:root {
  --background: #F5F5F5;
  --foreground: #1F1F1F;
  --card: #FFFFFF;
  --card-foreground: #1F1F1F;
  --muted: #6B7280;
  --primary: #2ECC71;
  --primary-dark: #27AE60;
}
```

- [x] Sauvegarder le fichier

### Étape 7.1.2 : Ajouter les variables pour le thème sombre

#### Sous-étape A : Créer la classe .dark
- [x] Dans `app/globals.css`, après la section `:root`, ajouter :
```css
.dark {
  --background: #121212;
  --foreground: #F5F5F5;
  --card: #1E1E1E;
  --card-foreground: #F5F5F5;
  --muted: #9CA3AF;
}
```

💡 **Explication :** Les variables `--primary` et `--primary-dark` restent identiques dans les deux thèmes (le vert fonctionne bien sur fond clair et foncé).

- [x] Sauvegarder le fichier

---

## 7.2 Créer le système de thème

### Étape 7.2.1 : Créer le dossier providers

- [x] Dans `components/`, créer un dossier `providers`
- [x] Vérifier le chemin : `components/providers/`

### Étape 7.2.2 : Créer ThemeProvider.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/providers/`, créer `ThemeProvider.tsx`
- [x] Ajouter `"use client"` en première ligne
- [x] Ajouter les imports :
```typescript
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
```

#### Sous-étape B : Définir les types
- [x] Ajouter les types :
```typescript
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```

#### Sous-étape C : Créer le context
- [x] Ajouter le context :
```typescript
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

#### Sous-étape D : Implémenter le provider
- [x] Ajouter le composant provider :
```typescript
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Vérifier localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Vérifier la préférence système
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Appliquer la classe au document
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      // Sauvegarder dans localStorage
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Éviter le flash de contenu
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

#### Sous-étape E : Ajouter le hook personnalisé
- [x] Ajouter le hook à la fin du fichier :
```typescript
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
```

- [x] Sauvegarder le fichier

### Étape 7.2.3 : Créer l'index des providers

- [x] Dans `components/providers/`, créer `index.ts`
- [x] Ajouter :
```typescript
export { ThemeProvider, useTheme } from "./ThemeProvider";
```
- [x] Sauvegarder le fichier

### Étape 7.2.4 : Intégrer le ThemeProvider dans le layout

#### Sous-étape A : Ouvrir le layout
- [x] Ouvrir `app/layout.tsx`

#### Sous-étape B : Ajouter l'import
- [x] Ajouter l'import en haut du fichier :
```typescript
import { ThemeProvider } from "@/components/providers";
```

#### Sous-étape C : Envelopper le contenu
- [x] Dans le return, envelopper `{children}` avec le ThemeProvider :
```tsx
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <ThemeProvider>
    {children}
  </ThemeProvider>
</body>
```

- [x] Sauvegarder le fichier

---

## 7.3 Créer le bouton de toggle

### Étape 7.3.1 : Créer ThemeToggle.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/ui/`, créer `ThemeToggle.tsx`
- [x] Ajouter `"use client"` en première ligne
- [x] Ajouter les imports :
```typescript
"use client";

import { useTheme } from "@/components/providers";
```

#### Sous-étape B : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
    >
      {theme === "light" ? (
        // Icône lune
        <svg
          className="w-5 h-5 text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        // Icône soleil
        <svg
          className="w-5 h-5 text-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
}
```

- [x] Sauvegarder le fichier

### Étape 7.3.2 : Exporter ThemeToggle

- [x] Ouvrir `components/ui/index.ts`
- [x] Ajouter l'export :
```typescript
export { default as ThemeToggle } from "./ThemeToggle";
```
- [x] Sauvegarder le fichier

### Étape 7.3.3 : Ajouter ThemeToggle dans le Header

#### Sous-étape A : Modifier Header.tsx
- [x] Ouvrir `components/layout/Header.tsx`
- [x] Ajouter `"use client"` en première ligne
- [x] Ajouter l'import :
```typescript
import { ThemeToggle } from "@/components/ui";
```

#### Sous-étape B : Placer le toggle
- [x] Localiser la fin de la section des réseaux sociaux
- [x] Ajouter le ThemeToggle **après les icônes sociales** :
```tsx
<ThemeToggle />
```

💡 **Décision :** Le toggle est placé dans le Header après les réseaux sociaux, pour qu'il soit visible tout en haut de la page.

#### Sous-étape C : Corriger la Navbar
- [x] Ouvrir `components/layout/Navbar.tsx`
- [x] Changer `bg-white` en `bg-background` pour adaptation au thème
- [x] Retirer ThemeToggle de la Navbar (il est maintenant dans le Header)
- [x] Sauvegarder le fichier

---

## 7.4 Adapter les composants pour le dark mode

### Étape 7.4.1 : Adapter Card.tsx

- [x] Ouvrir `components/ui/Card.tsx`
- [x] Remplacer `bg-card` par `bg-card text-card-foreground`
- [x] Sauvegarder le fichier

### Étape 7.4.2 : Adapter Section.tsx

- [x] Ouvrir `components/ui/Section.tsx`
- [x] Modifier le mapping des backgrounds :
```typescript
const bgClasses = {
  white: "bg-card",
  gray: "bg-background",
};
```
- [x] Sauvegarder le fichier

### Étape 7.4.3 : Adapter Header.tsx

- [x] Ouvrir `components/layout/Header.tsx`
- [x] Remplacer les classes `bg-white` par `bg-card`
- [x] Remplacer les `text-gray-xxx` par `text-foreground` ou `text-muted`
- [x] Sauvegarder le fichier

💡 **Note sur le logo :** On garde le même logo pour les deux thèmes. Si le rendu n'est pas satisfaisant en mode sombre, on ajustera (version claire du logo ou modification de la couleur du header).

### Étape 7.4.4 : Adapter Footer.tsx

- [x] Ouvrir `components/layout/Footer.tsx`
- [x] Remplacer `bg-gray-100` par `bg-card`
- [x] Remplacer `border-gray-400` par `border-t-2` (bordure adaptative)
- [x] Remplacer `text-gray-600` (copyright) par `text-muted`
- [x] Remplacer `border-gray-300` (ligne du haut) par `border-t`
- [x] Sauvegarder le fichier

### Étape 7.4.5 : Adapter ContactForm.tsx (zone captcha)

- [x] Ouvrir `components/contact/ContactForm.tsx`
- [x] Ligne 149 : Remplacer `bg-gray-50 border border-gray-300` par `bg-background border`
- [x] Sauvegarder le fichier

💡 **Note :** La zone captcha est maintenant lisible en mode sombre

### Étape 7.4.6 : Adapter les autres textes gris (optionnel)

Dans tous les composants, les classes `text-gray-xxx` peuvent être adaptées si nécessaire :
- `text-gray-600` → `text-muted`
- `text-gray-500` → `text-muted`
- `bg-gray-100` → `bg-background`
- `bg-gray-50` → `bg-background`

⚠️ **Attention :** Ne pas tout remplacer aveuglément. Certains gris sont volontairement fixes.

---

## 7.5 Ajouter les accents verts

### Étape 7.5.1 : Modifier Button.tsx

- [x] Ouvrir `components/ui/Button.tsx`
- [x] Localiser la variante `primary`
- [x] Remplacer `bg-foreground hover:bg-gray-800` par `bg-primary hover:bg-primary-dark`
- [x] Garder `text-white` (le blanc fonctionne sur le vert)
- [x] Sauvegarder le fichier

**Résultat attendu :**
```typescript
primary: "bg-primary hover:bg-primary-dark text-white",
```

### Étape 7.5.2 : Modifier Timeline.tsx

- [x] Ouvrir `components/a-propos/Timeline.tsx`
- [x] Remplacer `bg-foreground` par `bg-primary` sur les points de la timeline
- [x] Sauvegarder le fichier

### Étape 7.5.3 : Modifier ToolsGrid.tsx

- [x] Ouvrir `components/a-propos/ToolsGrid.tsx`
- [x] Remplacer `bg-foreground` par `bg-primary` sur les conteneurs d'icônes
- [x] Sauvegarder le fichier

### Étape 7.5.4 : Modifier ContactInfo.tsx

- [x] Ouvrir `components/contact/ContactInfo.tsx`
- [x] Remplacer `bg-foreground` par `bg-primary` sur les icônes email/téléphone
- [x] Sauvegarder le fichier

### Étape 7.5.5 : Modifier AddressCard.tsx

- [x] Ouvrir `components/contact/AddressCard.tsx`
- [x] Remplacer `bg-foreground` par `bg-primary` sur l'icône de localisation
- [x] Sauvegarder le fichier

### Étape 7.5.6 : Modifier FormField.tsx

- [x] Ouvrir `components/contact/FormField.tsx`
- [x] Remplacer `focus:ring-foreground` par `focus:ring-primary`
- [x] Sauvegarder le fichier

### Étape 7.5.7 : Modifier PageAnchors.tsx

- [x] Ouvrir `components/layout/PageAnchors.tsx`
- [x] Sur le lien actif, remplacer `text-foreground` par `text-primary`
- [x] Remplacer `border-foreground` par `border-primary`
- [x] Sauvegarder le fichier

### Étape 7.5.8 : Modifier ScrollToTop.tsx

- [x] Ouvrir `components/ui/ScrollToTop.tsx`
- [x] Remplacer `bg-foreground` par `bg-primary`
- [x] Ajouter `hover:bg-primary-dark`
- [x] Sauvegarder le fichier

---

## 7.6 Ajouter les transitions

### Étape 7.6.1 : Transition globale pour le thème

- [x] Ouvrir `app/globals.css`
- [x] Dans la section `body`, ajouter :
```css
body {
  background-color: var(--background);
  color: var(--foreground);
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

### Étape 7.6.2 : Transitions sur les composants interactifs

- [x] Dans `Button.tsx`, ajouter `transition-colors duration-200` à la classe de base
- [x] Dans `Card.tsx`, ajouter `transition-colors duration-200`
- [x] Sauvegarder les fichiers

💡 **Conseil :** Les transitions rendent le changement de thème plus fluide et professionnel.

---

## ✅ Checkpoint Phase 7

À ce stade, vous devriez avoir :
- [ ] Variables CSS pour light et dark mode
- [ ] ThemeProvider fonctionnel
- [ ] ThemeToggle dans la navbar
- [ ] Card, Section, Header, Footer adaptés
- [ ] Accents verts sur tous les éléments interactifs
- [ ] Transitions fluides

**Vérifications :**
- [ ] Toggle fonctionne (clic change le thème)
- [ ] Thème persiste après refresh (localStorage)
- [ ] Préférence système respectée au premier chargement
- [ ] Pas de flash blanc au chargement en mode sombre
- [ ] Boutons verts avec hover foncé
- [ ] Focus des inputs en vert
- [ ] Timeline avec points verts
- [ ] Icônes contact en vert
- [ ] Toutes les pages OK en light mode
- [ ] Toutes les pages OK en dark mode
- [ ] Responsive OK dans les deux thèmes

---

## 🎉 Phase 7 terminée !

Le site OIKO a maintenant :
- ✅ Thème clair (fond gris clair `#F5F5F5`, cards blanches)
- ✅ Thème sombre (fond `#121212`, cards `#1E1E1E`)
- ✅ Couleur accent verte `#2ECC71` (boutons, icônes, focus, liens actifs)
- ✅ Toggle dans la navbar avec icône soleil/lune
- ✅ Persistance du choix utilisateur
- ✅ Respect de la préférence système
- ✅ Transitions fluides

### Corrections post-phase 7

**Correction de la lisibilité du texte en mode sombre :**
- Ajout d'une classe CSS personnalisée `.text-muted` dans `app/globals.css` avec `!important` pour forcer l'application
- Couleur mode clair : `#6B7280`
- Couleur mode sombre : `#D1D5DB`
- Remplacement de toutes les classes `text-gray-*` par `text-muted` dans les fichiers suivants :
  - `components/activites/ActivitySection.tsx`
  - `components/a-propos/JobsGrid.tsx`
  - `components/a-propos/VideoSection.tsx`
  - `components/a-propos/TestimonialsGrid.tsx`
  - `components/layout/PageAnchors.tsx`
  - `components/layout/Navbar.tsx`
  - `components/layout/Footer.tsx`
  - `components/ui/Stats.tsx`
  - `components/contact/FormField.tsx`
  - `components/accueil/Hero.tsx`

**Prochaines étapes :**
- Phase 8 : Audit & Finitions 🔄 En cours
- Phase 9 : Intégration API (en attente de l'API)
- Phase 10 : Pages Vente/Location (dépend de Phase 9)
- Phase 11 : Authentification (dépend de Phase 9)

---

# Phase 8 - Audit & Finitions

**Objectif :** Réaliser un audit complet du site, corriger les problèmes identifiés, et ajouter les pages/fichiers techniques manquants.

---

## 8.1 Audit du site

### Étape 8.1.1 : Réaliser l'audit visuel

- [x] Tester toutes les pages en mode clair
- [x] Tester toutes les pages en mode sombre
- [x] Vérifier le responsive sur mobile
- [x] Identifier les problèmes de contraste/lisibilité
- [x] Documenter les 28 points à vérifier

### Étape 8.1.2 : Corriger la bordure du footer

- [x] Ouvrir `components/layout/Footer.tsx`
- [x] Localiser la classe `border-border` sur le footer
- [x] Remplacer par `border-primary` pour avoir la bordure verte visible
- [x] Sauvegarder le fichier

💡 **Explication :** La bordure `border-border` était invisible en mode sombre car trop proche de la couleur de fond.

### Étape 8.1.3 : Corriger le logo en dark mode

- [x] Ouvrir `app/globals.css`
- [x] Ajouter la classe `.logo-blend` avec transition :
```css
.logo-blend {
  transition: all 0.3s ease;
}

html.dark .logo-blend {
  filter: brightness(1.4) contrast(1);
}
```
- [x] Sauvegarder le fichier
- [x] Vérifier que les logos dans `Header.tsx` et `Navbar.tsx` utilisent la classe `logo-blend`

💡 **Explication :** Le filtre brightness éclaircit le logo en mode sombre pour qu'il reste visible.

### Étape 8.1.4 : Améliorer le texte muted en dark mode

- [x] Ouvrir `app/globals.css`
- [x] Dans la section `.dark`, modifier la variable `--muted` :
```css
.dark {
  --muted: #E5E7EB;  /* Plus clair que #9CA3AF */
}
```
- [x] Sauvegarder le fichier

💡 **Explication :** Le texte secondaire était trop sombre en mode nuit, maintenant il est plus lisible.

---

## 8.2 Pages manquantes

### Étape 8.2.1 : Créer la page 404

- [x] Créer le fichier `app/not-found.tsx`
- [x] Ajouter les imports :
```typescript
import Link from "next/link";
import Image from "next/image";
```
- [x] Créer la fonction `NotFound` (avec majuscule !)
- [x] Ajouter la structure :
  - `<main>` centré avec `min-h-screen bg-background flex items-center justify-center`
  - `<div>` avec `text-center`
  - Logo OIKO avec `next/image`
  - `<h1>` avec "404" en `text-8xl font-bold text-primary`
  - `<h2>` avec "Page introuvable"
  - `<p>` avec message explicatif en `text-muted`
  - Lien de retour avec style bouton primary
- [x] Sauvegarder le fichier

**Fichier créé :** `app/not-found.tsx`

### Étape 8.2.2 : Créer la page Politique RGPD

- [x] Créer le dossier `app/politique-rgpd/`
- [x] Créer le fichier `app/politique-rgpd/page.tsx`
- [x] Créer la fonction `PolitiqueRGPD` (avec majuscule !)
- [x] Ajouter la structure :
  - `<main>` centré avec classes de thème
  - `<div>` avec `text-center`
  - `<h1>` avec "Politique de confidentialité"
  - `<p>` avec "Le contenu arrive bientôt" en `text-muted`
- [x] Sauvegarder le fichier

**Fichier créé :** `app/politique-rgpd/page.tsx`

⚠️ **En attente :** Le contenu légal réel doit être fourni par OIKO.

### Étape 8.2.3 : Créer la page Connexion

- [x] Créer le dossier `app/connexion/`
- [x] Créer le fichier `app/connexion/page.tsx`
- [x] Ajouter l'import des composants :
```typescript
import { Button, Card } from "@/components/ui";
```
- [x] Créer la fonction `Connexion` (avec majuscule !)
- [x] Ajouter la structure :
  - `<main>` centré
  - `<Card>` pour le formulaire
  - `<h1>` avec "Connexion"
  - `<form>` avec :
    - Label + input email
    - Label + input password
    - `<Button type="submit" variant="primary">Se connecter</Button>`
- [x] Utiliser les classes de thème sur les inputs : `border-border bg-card text-foreground`
- [x] Sauvegarder le fichier

**Fichier créé :** `app/connexion/page.tsx`

💡 **Apprentissage :** Cette page illustre l'utilisation des composants réutilisables (`Button`, `Card`) et l'importance d'utiliser les variables de thème plutôt que des couleurs fixes comme `border-gray-300`.

---

## 8.3 Fichiers SEO

### Étape 8.3.1 : Créer robots.txt

- [x] Créer le fichier `public/robots.txt`
- [x] Ajouter le contenu :
```
User-agent: *
Allow: /
Sitemap: https://oiko.fr/sitemap.xml
```
- [x] Sauvegarder le fichier

**Fichier créé :** `public/robots.txt`

💡 **Explication :** Ce fichier indique aux moteurs de recherche qu'ils peuvent indexer tout le site et où trouver le sitemap.

### Étape 8.3.2 : Créer sitemap.xml automatique

- [x] Créer le fichier `app/sitemap.ts`
- [x] Ajouter l'import :
```typescript
import type { MetadataRoute } from "next";
```
- [x] Exporter la fonction `sitemap` qui retourne un tableau d'URLs avec toutes les pages du site
- [x] Sauvegarder le fichier

**Fichier créé :** `app/sitemap.ts`

💡 **Explication :** Next.js génère automatiquement `/sitemap.xml` à partir de ce fichier TypeScript.

### Étape 8.3.3 : Ajouter données structurées JSON-LD

- [x] Créer le dossier `components/seo/`
- [x] Créer le fichier `components/seo/JsonLd.tsx`
- [x] Ajouter le schema Organization pour OIKO (nom, description, adresses Paris/Marseille, logo)
- [x] Créer le fichier `components/seo/index.ts` pour l'export
- [x] Intégrer `<JsonLd />` dans `app/layout.tsx` dans le `<head>`
- [x] Sauvegarder les fichiers

**Fichiers créés :** `components/seo/JsonLd.tsx`, `components/seo/index.ts`

💡 **Explication :** Les données structurées aident Google à mieux comprendre le contenu du site (entreprise, adresse, téléphone, etc.).

---

## 8.4 Améliorations UX

### Étape 8.4.1 : Ajouter animations d'entrée au scroll

- [x] Créer le hook `hooks/useInView.ts` pour détecter quand un élément est visible
- [x] Créer le composant `components/ui/AnimateOnScroll.tsx` qui wrappe les sections
- [x] Ajouter les keyframes CSS `fadeIn` dans `app/globals.css`
- [x] Ajouter la classe `.animate-fadeIn` (durée 0.8s, translateY 30px)
- [x] Exporter `AnimateOnScroll` depuis `components/ui/index.ts`
- [x] Appliquer sur les sections de la page d'accueil (ServicesGrid, HighlightsSection, ActivitiesPreview)

**Fichiers créés :** `hooks/useInView.ts`, `components/ui/AnimateOnScroll.tsx`

💡 **Fonctionnalité :** Les animations se relancent quand on remonte et redescend sur la page.

### Étape 8.4.2 : Ajouter composant Banner pour placeholder photo

- [x] Créer le composant `components/ui/Banner.tsx`
- [x] Accepter les props optionnelles `src` et `alt`
- [x] Si pas d'image : afficher un div gris (`h-64 bg-muted`)
- [x] Si image fournie : afficher l'image en `w-full object-cover`
- [x] Exporter depuis `components/ui/index.ts`
- [x] Ajouter `<Banner />` sur la page d'accueil avant le Hero

**Fichier créé :** `components/ui/Banner.tsx`

💡 **Utilisation :** `<Banner src="/image.jpg" alt="Description" />` ou `<Banner />` pour le placeholder.

### Étape 8.4.3 : Créer composant Skeleton loader

- [x] Créer `components/ui/Skeleton.tsx`
- [x] Accepter une prop `className` pour personnaliser la taille
- [x] Appliquer les classes `animate-pulse bg-muted rounded`
- [x] Exporter depuis `components/ui/index.ts`

**Fichier créé :** `components/ui/Skeleton.tsx`

💡 **Utilisation :** `<Skeleton className="w-32 h-4" />` pour un skeleton de texte.

---

## 8.5 Vérification finale

### Étape 8.5.1 : Test build production

- [x] Ouvrir un terminal
- [x] Exécuter `npm run build`
- [x] Corriger les erreurs (ajout de la prop `className` au composant Button)
- [x] Relancer le build → ✅ Succès !
- [x] Vérifier que toutes les pages sont générées

💡 **Correction effectuée :** Le composant `Button` n'acceptait pas la prop `className`. Ajouté dans l'interface `ButtonProps` et dans la fonction.

---

## ✅ Checkpoint Phase 8

À ce stade, vous devriez avoir :
- [x] Audit des 28 points réalisé
- [x] Bordure footer corrigée (vert visible)
- [x] Logo visible en dark mode
- [x] Texte muted lisible en dark mode
- [x] Page 404 personnalisée
- [x] Page politique RGPD (placeholder)
- [x] Page connexion (placeholder)
- [x] Fichier robots.txt
- [x] Sitemap automatique
- [x] Données structurées JSON-LD
- [x] Animations scroll
- [x] Composant Banner (placeholder photo accueil)
- [x] Skeleton loader
- [x] Test build production réussi

**Vérifications :**
- [x] `/une-page-inexistante` → affiche la page 404
- [x] `/politique-rgpd` → affiche la page placeholder
- [x] `/connexion` → affiche le formulaire
- [x] `/robots.txt` → affiche le contenu du fichier
- [x] `/sitemap.xml` → affiche le sitemap XML

---

## ✅ Phase 8 terminée !

**Toutes les tâches réalisées (59/59) :**
- ✅ Audit complet du site (28 points)
- ✅ Corrections visuelles (bordure footer, logo dark mode, texte muted)
- ✅ Page 404 personnalisée
- ✅ Page politique RGPD (placeholder)
- ✅ Page connexion (placeholder)
- ✅ robots.txt
- ✅ Sitemap automatique (`app/sitemap.ts`)
- ✅ Données structurées JSON-LD (`components/seo/JsonLd.tsx`)
- ✅ Animations scroll (`hooks/useInView.ts` + `components/ui/AnimateOnScroll.tsx`)
- ✅ Composant Banner (`components/ui/Banner.tsx`)
- ✅ Composant Skeleton (`components/ui/Skeleton.tsx`)
- ✅ Test build production réussi

**🎉 Phases 1-8 terminées !**

**En attente (dépendances externes) :**
- 🔗 URLs réseaux sociaux réelles
- 🔗 API backend pour formulaire contact
- 🔗 Contenu légal CGU/RGPD
- 🔗 Images réelles pour le Banner

---

# Phase 9 - Page Location (API + Affichage)

**Objectif :** Intégrer l'API Ubiflow pour récupérer les annonces et les afficher sur la page `/location`.

---

## 9.1 Configuration de l'API Ubiflow

### Étape 9.1.1 : Créer le fichier de variables d'environnement

#### Sous-étape A : Créer .env.local
- [x] À la racine du projet, créer un fichier `.env.local`
- [x] Ajouter les variables d'environnement :
```
# Credentials Ubiflow API
UBIFLOW_USERNAME=oiko_gestion
UBIFLOW_PASSWORD=votre_mot_de_passe
UBIFLOW_AUTH_URL=https://auth.ubiflow.net/api/login_check
UBIFLOW_PROD_ID=ag752969
```

⚠️ **IMPORTANT :** Ce fichier contient des secrets. Il est déjà dans `.gitignore` et ne doit JAMAIS être commité.

💡 **Explication :**
- `UBIFLOW_USERNAME` : Identifiant de connexion à l'API
- `UBIFLOW_PASSWORD` : Mot de passe de connexion
- `UBIFLOW_AUTH_URL` : URL pour obtenir le token JWT
- `UBIFLOW_PROD_ID` : Code de l'annonceur (identifiant OIKO)

- [x] Sauvegarder le fichier

---

## 9.2 Créer la librairie Ubiflow

### Étape 9.2.1 : Créer lib/ubiflow.ts

#### Sous-étape A : Créer le fichier
- [x] Dans le dossier `lib/`, créer un fichier `ubiflow.ts`
- [x] Ce fichier ne doit PAS avoir `"use client"` (il s'exécute côté serveur)

#### Sous-étape B : Ajouter les variables de cache
- [x] Au début du fichier, ajouter :
```typescript
// Cache du token côté serveur
// Le token est stocké en mémoire sur le serveur, jamais exposé au client

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

// Marge de sécurité : on renouvelle le token 5 minutes avant expiration
const EXPIRY_MARGIN = 5 * 60 * 1000; // 5 minutes en millisecondes
```

💡 **Explication :** Le token JWT est valide 1 heure. On le garde en mémoire pour éviter de demander un nouveau token à chaque requête. La marge de 5 minutes évite les erreurs si le token expire pendant une requête.

#### Sous-étape C : Créer la fonction getUbiflowToken
- [x] Ajouter la fonction pour récupérer le token :
```typescript
/**
 * Récupère un token valide (depuis le cache ou en demande un nouveau)
 */
export async function getUbiflowToken(): Promise<string> {
  // Si on a un token en cache et qu'il est encore valide
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - EXPIRY_MARGIN) {
    console.log("[Ubiflow] Token récupéré depuis le cache");
    return cachedToken;
  }

  // Sinon, on demande un nouveau token
  console.log("[Ubiflow] Demande d'un nouveau token...");

  const response = await fetch("https://auth.ubiflow.net/api/login_check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: process.env.UBIFLOW_USERNAME,
      password: process.env.UBIFLOW_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error("Échec de l'authentification Ubiflow");
  }

  const data = await response.json();

  // Stocker le token en cache
  cachedToken = data.token;

  // Le token expire dans 1h, on stocke l'heure d'expiration
  // (1h = 3600 secondes = 3600000 millisecondes)
  tokenExpiry = Date.now() + 60 * 60 * 1000;

  console.log("[Ubiflow] Nouveau token obtenu et mis en cache");

  return cachedToken;
}
```

#### Sous-étape D : Créer la fonction getAdsList
- [x] Ajouter la fonction pour récupérer les annonces :
```typescript
/**
 * Récupère la liste des annonces depuis l'API Ubiflow
 * @param page - Numéro de page (pagination)
 * @param adType - Type de transaction : "L" (location) ou "V" (vente)
 */
export async function getAdsList(
  page: number = 1,
  adType?: "L" | "V"
): Promise<unknown> {
  const token = await getUbiflowToken();
  const prodId = process.env.UBIFLOW_PROD_ID;

  if (!prodId) {
    throw new Error("UBIFLOW_PROD_ID non configuré dans .env.local");
  }

  // Construction de l'URL avec filtres optionnels
  let url = `https://api-classifieds.ubiflow.net/api/ads?advertiser.code=${prodId}&page=${page}`;

  // Ajouter le filtre par type de transaction si spécifié
  if (adType) {
    url += `&transaction.code=${adType}`;
  }

  console.log(`[Ubiflow] Récupération des annonces (page ${page}, type: ${adType || "tous"})...`);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Ubiflow] Erreur:", errorText);
    throw new Error(`Échec de la récupération des annonces: ${response.status}`);
  }

  const data = await response.json();
  console.log(`[Ubiflow] ${data["hydra:member"]?.length || "?"} annonces récupérées`);
  return data;
}
```

💡 **Codes de transaction Ubiflow :**
- `L` = Location
- `V` = Vente

- [x] Sauvegarder le fichier

**Fichier créé :** `lib/ubiflow.ts`

---

## 9.3 Créer les routes API

### Étape 9.3.1 : Créer la route /api/ubiflow/token

#### Sous-étape A : Créer le dossier
- [x] Créer le dossier `app/api/ubiflow/`
- [x] Créer le dossier `app/api/ubiflow/token/`

#### Sous-étape B : Créer le fichier route.ts
- [x] Dans `app/api/ubiflow/token/`, créer `route.ts`
- [x] Ajouter le code :
```typescript
import { NextResponse } from "next/server";
import { getUbiflowToken } from "@/lib/ubiflow";

export async function POST() {
  try {
    // Utilise le cache : si le token est valide, on le réutilise
    const token = await getUbiflowToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error("[API Token] Erreur:", error);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
```

⚠️ **IMPORTANT :** Le fichier DOIT s'appeler `route.ts` (pas `router.ts`). C'est une convention Next.js obligatoire.

- [x] Sauvegarder le fichier

**Fichier créé :** `app/api/ubiflow/token/route.ts`

### Étape 9.3.2 : Créer la route /api/ubiflow/annonces

#### Sous-étape A : Créer le dossier
- [x] Créer le dossier `app/api/ubiflow/annonces/`

#### Sous-étape B : Créer le fichier route.ts
- [x] Dans `app/api/ubiflow/annonces/`, créer `route.ts`
- [x] Ajouter le code :
```typescript
import { NextResponse } from "next/server";
import { getAdsList } from "@/lib/ubiflow";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Récupérer les paramètres de l'URL
    const page = parseInt(searchParams.get("page") || "1", 10);
    const type = searchParams.get("type") as "L" | "V" | null;

    // Récupérer les annonces avec filtres
    const annonces = await getAdsList(page, type || undefined);

    return NextResponse.json(annonces);
  } catch (error) {
    console.error("[API Annonces] Erreur:", error);
    return NextResponse.json(
      { error: "Échec de la récupération des annonces" },
      { status: 500 }
    );
  }
}
```

💡 **Utilisation :**
- `/api/ubiflow/annonces` → Toutes les annonces
- `/api/ubiflow/annonces?type=L` → Locations uniquement
- `/api/ubiflow/annonces?type=V` → Ventes uniquement
- `/api/ubiflow/annonces?type=L&page=2` → Locations, page 2

- [x] Sauvegarder le fichier

**Fichier créé :** `app/api/ubiflow/annonces/route.ts`

---

## 9.4 Tester l'API

### Étape 9.4.1 : Tester la récupération du token

- [x] Lancer `npm run dev`
- [x] Ouvrir la page `/location` (ou créer une page de test)
- [x] Dans la console du navigateur, exécuter :
```javascript
const response = await fetch("/api/ubiflow/token", { method: "POST" });
const data = await response.json();
console.log("Token récupéré :", data.token);
```
- [x] Vérifier qu'un token JWT est retourné (longue chaîne de caractères)

### Étape 9.4.2 : Tester la récupération des annonces

- [x] Dans la console du navigateur, exécuter :
```javascript
const response = await fetch("/api/ubiflow/annonces");
const data = await response.json();
console.log("Annonces récupérées :", data);
```
- [x] Vérifier que les annonces sont retournées (tableau d'objets)
- [x] Noter la structure d'une annonce pour créer les types TypeScript

💡 **Résultat attendu :** Un tableau avec ~25 annonces contenant des informations sur les biens (titre, prix, surface, photos, etc.)

---

## 9.5 Créer les types TypeScript

### Étape 9.5.1 : Comprendre la structure de l'API Ubiflow

💡 **Structure des données retournées par l'API :**

| Donnée | Chemin dans l'API | Description |
|--------|-------------------|-------------|
| ID | `id` | Identifiant unique de l'annonce |
| Titre | `title` | Titre de l'annonce |
| Description | `description` | Description détaillée |
| Prix | `transaction.price` | Loyer mensuel ou prix de vente |
| Référence | `transaction.reference` | Référence de l'annonce |
| Type transaction | `transaction.code` | "L" (location) ou "V" (vente) |
| Type de bien | `productType.description` | T2, T3, Maison, etc. |
| Caractéristiques | `data[]` | Tableau avec `{ code, description, value }` |
| Photos | `mediaSupports.pictures[]` | Tableau avec `{ url, urlMini }` |

**Le tableau `data[]` contient les caractéristiques avec ces codes :**

| Code API | Description |
|----------|-------------|
| `ville` | Nom de la ville |
| `code_postal` | Code postal |
| `surface_habitable` | Surface en m² |
| `nb_pieces_logement` | Nombre de pièces |
| `nombre_de_chambres` | Nombre de chambres |
| `nb_salles_de_bain` | Nombre de salles de bain |
| `etage` | Étage |
| `charges_locatives` | Charges mensuelles |
| `dpe_etiquette_conso` | Classe énergétique (A à G) |

⚠️ **IMPORTANT :** L'API retourne un tableau direct (pas de `hydra:member`). Les images sont dans `mediaSupports.pictures`, pas dans `medias`.

### Étape 9.5.2 : Créer le fichier de types

#### Sous-étape A : Créer le dossier types
- [x] Créer le dossier `types/` à la racine du projet

#### Sous-étape B : Créer property.ts
- [x] Dans `types/`, créer `property.ts`
- [x] Ajouter les interfaces :
```typescript
/**
 * Caractéristique d'un bien (équipement, quantité, etc.)
 */
export interface PropertyData {
  code: string;
  description: string;
  familyDescription?: string;
  value: boolean | number | string;
  unit?: string | null;
  public?: boolean;
}

/**
 * Transaction (location ou vente)
 */
export interface PropertyTransaction {
  code: "L" | "V";       // L = Location, V = Vente
  price: number;         // Loyer mensuel ou prix de vente
  reference: string;     // Référence de l'annonce
}

/**
 * Type de bien
 */
export interface PropertyType {
  code: string;
  description: string;   // "T2", "T3", "Maison", etc.
}

/**
 * Media (photo)
 */
export interface PropertyMedia {
  url: string;
  urlMini?: string;
  sourceUrl?: string;
}

/**
 * Annonce immobilière (données brutes de l'API)
 */
export interface PropertyRaw {
  id: string;
  title: string;
  description: string;
  transaction: PropertyTransaction;
  productType: PropertyType;
  data: PropertyData[];
  medias: PropertyMedia[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Annonce immobilière (avec champs extraits pour faciliter l'utilisation)
 */
export interface Property extends PropertyRaw {
  price: number;         // Alias de transaction.price
  city: string;
  postalCode: string;
  address: string;
  surface: number;
  rooms: number;
  bedrooms?: number;
  bathrooms?: number;
  images: string[];      // URLs extraites de mediaSupports.pictures[]
}
```

💡 **Important :** L'API retourne un tableau direct, pas un objet avec `hydra:member`. Les champs `price`, `city`, `surface`, etc. sont extraits par la fonction `mapApiToProperty`.

- [x] Sauvegarder le fichier

**Fichier créé :** `types/property.ts`

#### Sous-étape C : Créer une fonction de mapping
- [x] Dans `lib/`, créer `mapProperty.ts` pour transformer les données brutes :
```typescript
import type { Property, PropertyRaw, PropertyData } from "@/types/property";

/**
 * Extrait une valeur du tableau data par son code
 */
function getDataValue(
  data: PropertyData[],
  code: string
): boolean | number | string | undefined {
  if (!Array.isArray(data)) return undefined;
  const item = data.find((d) => d && d.code && d.code.toLowerCase() === code.toLowerCase());
  return item?.value;
}

/**
 * Transforme une annonce brute de l'API en Property utilisable
 */
export function mapApiToProperty(raw: any): Property {
  const data = raw.data || [];

  return {
    id: raw.id?.toString() || "",
    title: raw.title || raw.reference || "Sans titre",
    description: raw.description || "",
    transaction: raw.transaction || { code: "L", price: 0, reference: "" },
    productType: raw.productType || { code: "", description: "" },
    data: data,
    medias: raw.mediaSupports?.pictures || [],
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,

    // Champs extraits avec les codes Ubiflow
    price: raw.transaction?.price || 0,
    city: String(getDataValue(data, "ville") || ""),
    postalCode: String(getDataValue(data, "code_postal") || ""),
    address: String(getDataValue(data, "adresse2") || ""),
    surface: Number(getDataValue(data, "surface_habitable") || 0),
    rooms: Number(getDataValue(data, "nb_pieces_logement") || 0),
    bedrooms: Number(getDataValue(data, "nombre_de_chambres")) || undefined,
    bathrooms: Number(getDataValue(data, "nb_salles_de_bain")) || undefined,
    images: (raw.mediaSupports?.pictures || []).map((p: any) => p?.url).filter(Boolean),
  };
}

/**
 * Transforme un tableau d'annonces brutes en Property[]
 */
export function mapApiToProperties(rawList: any[]): Property[] {
  if (!Array.isArray(rawList)) return [];
  return rawList.map(mapApiToProperty);
}
```

⚠️ **Codes Ubiflow utilisés :**
- `ville` (pas "city")
- `code_postal` (pas "postalCode")
- `surface_habitable` (pas "surface")
- `nb_pieces_logement` (pas "rooms")
- `nombre_de_chambres` (pas "bedrooms")
- `nb_salles_de_bain` (pas "bathrooms")

⚠️ **Images :** Les photos sont dans `mediaSupports.pictures`, pas dans `medias`.

- [x] Sauvegarder le fichier

**Fichier créé :** `lib/mapProperty.ts`

#### Sous-étape D : Mettre à jour lib/ubiflow.ts
- [x] Ouvrir `lib/ubiflow.ts`
- [x] Ajouter l'import des types :
```typescript
import type { PropertyRaw } from "@/types/property";
```
- [x] Changer le type de retour de `getAdsList` (l'API retourne un tableau direct) :
```typescript
export async function getAdsList(
  page: number = 1,
  adType?: "L" | "V"
): Promise<PropertyRaw[]> {
```
- [x] Mettre à jour le log (l'API retourne `data.length`, pas `data["hydra:member"]`) :
```typescript
console.log(`[Ubiflow] ${data.length} annonces récupérées`);
return data;
```
- [x] Sauvegarder le fichier

---

## 9.6 Créer le composant PropertyCard

### Étape 9.6.1 : Créer le dossier annonces

- [x] Dans `components/`, créer un dossier `annonces`
- [x] Vérifier le chemin : `components/annonces/`

### Étape 9.6.2 : Créer PropertyCard.tsx

#### Sous-étape A : Créer le fichier
- [x] Dans `components/annonces/`, créer `PropertyCard.tsx`
- [x] Ajouter les imports :
```typescript
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Property } from "@/types/property";
```

#### Sous-étape B : Définir l'interface
- [x] Ajouter l'interface des props :
```typescript
interface PropertyCardProps {
  property: Property;
  type: "vente" | "location";
}
```

#### Sous-étape C : Implémenter le composant
- [x] Ajouter le composant :
```typescript
export default function PropertyCard({ property, type }: PropertyCardProps) {
  const mainPhoto = property.images[0];
  const hasImage = !!mainPhoto;

  // Formater le prix
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link href={`/${type}/${property.id}`}>
      <Card hover className="overflow-hidden h-full">
        {/* Image */}
        <div className="relative h-48 -mx-6 -mt-6 mb-4 bg-muted/20">
          {hasImage ? (
            <Image
              src={mainPhoto}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🏠</span>
            </div>
          )}
          {/* Badge type de transaction */}
          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
            {type === "vente" ? "À vendre" : "À louer"}
          </span>
        </div>

        {/* Contenu */}
        <div>
          <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-muted text-sm mb-2">
            {property.city}
            {property.postalCode && ` (${property.postalCode})`}
          </p>

          {/* Caractéristiques */}
          <div className="flex gap-4 text-sm text-muted mb-3">
            {property.surface > 0 && <span>{property.surface} m²</span>}
            {property.rooms > 0 && <span>{property.rooms} pièces</span>}
            {property.bedrooms && <span>{property.bedrooms} ch.</span>}
          </div>

          {/* Prix */}
          <p className="text-primary font-bold text-xl">
            {formattedPrice}
            {type === "location" && (
              <span className="text-sm font-normal">/mois</span>
            )}
          </p>
        </div>
      </Card>
    </Link>
  );
}
```

- [x] Sauvegarder le fichier

**Fichier créé :** `components/annonces/PropertyCard.tsx`

### Étape 9.6.3 : Créer index.ts

- [x] Dans `components/annonces/`, créer `index.ts`
- [x] Ajouter l'export :
```typescript
export { default as PropertyCard } from "./PropertyCard";
```
- [x] Sauvegarder le fichier

**Fichier créé :** `components/annonces/index.ts`

### Étape 9.6.4 : Configurer les images externes

- [x] Ouvrir `next.config.ts`
- [x] Ajouter la configuration pour les images Ubiflow :
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ubiflow.net",
      },
      {
        protocol: "https",
        hostname: "photos.ubiflow.net",
      },
    ],
  },
};

export default nextConfig;
```
- [x] Sauvegarder le fichier

⚠️ **IMPORTANT :** Sans cette configuration, Next.js bloquera les images externes de Ubiflow.

---

## 9.7 Afficher les annonces sur /location

### Étape 9.7.1 : Mettre à jour la page location

- [x] Ouvrir `app/location/page.tsx`
- [x] Remplacer tout le contenu par :
```typescript
import { Section, ScrollToTop } from "@/components/ui";
import { PropertyCard } from "@/components/annonces";
import { getAdsList } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";

// Force le rendu côté serveur (pas de pré-rendu au build)
export const dynamic = "force-dynamic";

export default async function LocationPage() {
  // Récupérer les annonces de location côté serveur
  const rawProperties = await getAdsList(1, "L");

  // Transformer les données brutes en Property[]
  const properties = mapApiToProperties(rawProperties);

  return (
    <main>
      <Section className="bg-background">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Biens à la location
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Découvrez nos biens disponibles à la location
          </p>
        </div>

        {/* Grille d'annonces */}
        {properties.length > 0 ? (
          <>
            <p className="text-muted mb-6">
              {properties.length} bien(s) disponible(s)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  type="location"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted text-lg">
              Aucun bien disponible à la location pour le moment.
            </p>
          </div>
        )}
      </Section>

      <ScrollToTop />
    </main>
  );
}
```

⚠️ **Notes importantes :**
- Cette page est un Server Component (pas de `"use client"`)
- `export const dynamic = "force-dynamic"` empêche le pré-rendu au build (évite les timeouts)
- Le filtre `"L"` dans `getAdsList(1, "L")` récupère uniquement les locations
- `mapApiToProperties` transforme les données brutes en objets `Property` utilisables

- [x] Sauvegarder le fichier

### Étape 9.7.2 : Test visuel

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/location
- [x] Vérifier que les annonces s'affichent en grille
- [x] Vérifier le responsive (mobile, tablette, desktop)
- [x] Vérifier que les images s'affichent (photos Ubiflow)
- [x] Vérifier que les prix sont formatés correctement (ex: 1 939 €/mois)
- [x] Cliquer sur une carte (le lien pointe vers `/location/[id]`)

---

## ✅ Checkpoint Phase 9

À ce stade, vous devriez avoir :
- [x] Fichier `.env.local` avec les credentials Ubiflow
- [x] `lib/ubiflow.ts` avec gestion du token et cache
- [x] Route API `/api/ubiflow/token` fonctionnelle
- [x] Route API `/api/ubiflow/annonces` fonctionnelle
- [x] Test de récupération du token réussi
- [x] Test de récupération des annonces réussi (25 annonces)
- [x] Types TypeScript pour les annonces (`types/property.ts`)
- [x] Fonction de mapping (`lib/mapProperty.ts`)
- [x] Composant `PropertyCard` créé (`components/annonces/PropertyCard.tsx`)
- [x] Configuration images externes (`next.config.ts`)
- [x] Page `/location` affichant les annonces en grille
- [x] Design responsive

**Vérifications :**
- [x] Les annonces s'affichent sur `/location`
- [x] Les images des biens sont visibles (photos Ubiflow)
- [x] Les prix sont formatés en euros
- [x] Le responsive fonctionne sur mobile
- [x] Aucune erreur TypeScript

**Fichiers créés/modifiés dans cette phase :**
| Fichier | Description |
|---------|-------------|
| `types/property.ts` | Interfaces TypeScript pour les annonces |
| `lib/mapProperty.ts` | Fonctions de mapping API → Property |
| `lib/ubiflow.ts` | Mise à jour avec type de retour |
| `components/annonces/PropertyCard.tsx` | Carte d'affichage d'une annonce |
| `components/annonces/index.ts` | Export du composant |
| `app/location/page.tsx` | Page liste des locations |
| `next.config.ts` | Config images externes |

---

# Phase 10 - Page Vente

**Objectif :** Créer la page `/vente` en réutilisant les composants de la Phase 9.

---

## 10.1 Créer la page Vente

### Étape 10.1.1 : Créer le dossier

- [x] Créer le dossier `app/vente/` (s'il n'existe pas)

### Étape 10.1.2 : Créer la page

- [x] Dans `app/vente/`, créer `page.tsx`
- [x] Ajouter le code (similaire à location mais avec `"V"` pour vente) :
```typescript
import { Section, ScrollToTop } from "@/components/ui";
import { PropertyCard } from "@/components/annonces";
import { getAdsList } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";

// Force le rendu côté serveur (pas de pré-rendu au build)
export const dynamic = "force-dynamic";

export default async function VentePage() {
  // Récupérer les annonces de vente côté serveur
  const rawProperties = await getAdsList(1, "V");

  // Transformer les données brutes en Property[]
  const properties = mapApiToProperties(rawProperties);

  return (
    <main>
      <Section className="bg-background">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Biens à la vente
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Découvrez nos biens disponibles à la vente
          </p>
        </div>

        {/* Grille d'annonces */}
        {properties.length > 0 ? (
          <>
            <p className="text-muted mb-6">
              {properties.length} bien(s) disponible(s)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  type="vente"
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted text-lg">
              Aucun bien disponible à la vente pour le moment.
            </p>
          </div>
        )}
      </Section>

      <ScrollToTop />
    </main>
  );
}
```

⚠️ **Différences avec la page location :**
- `getAdsList(1, "V")` → filtre sur les ventes (code "V")
- `type="vente"` sur `PropertyCard` → affiche "À vendre" au lieu de "À louer"
- Prix affiché sans "/mois"

- [x] Sauvegarder le fichier

**Fichier créé :** `app/vente/page.tsx`

### Étape 10.1.3 : Test visuel

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/vente
- [x] Vérifier que la page s'affiche correctement
- [x] Si pas d'annonces de vente dans l'API, le message "Aucun bien disponible" s'affiche
- [x] Vérifier le responsive

💡 **Note :** Si l'API ne contient pas d'annonces de vente (type "V"), la page affichera "Aucun bien disponible à la vente pour le moment." C'est le comportement attendu.

---

## ✅ Checkpoint Phase 10

À ce stade, vous devriez avoir :
- [x] Page `/vente` fonctionnelle
- [x] Réutilisation du composant `PropertyCard`
- [x] Filtrage correct via `getAdsList(1, "V")`
- [x] Design cohérent avec `/location`

**Vérifications :**
- [x] `/location` affiche les biens à louer (filtre "L")
- [x] `/vente` affiche les biens à vendre (filtre "V")
- [x] Les deux pages sont responsive
- [x] Navigation entre les pages fonctionnelle

**Fichiers créés dans cette phase :**
| Fichier | Description |
|---------|-------------|
| `app/vente/page.tsx` | Page liste des biens à vendre |

---

# Phase 11 - Filtres & Pages Détail

**Objectif :** Ajouter des filtres de recherche et créer les pages de détail pour chaque bien.

**Prérequis :** Phase 10 terminée (pages Location et Vente avec affichage des annonces)

---

## 11.1 Créer le composant de filtres

### Étape 11.1.1 : Créer PropertyFilters.tsx

**A. Créer le fichier**

- [x] Dans `components/annonces/`, créer un nouveau fichier `PropertyFilters.tsx`

**B. Ajouter le code suivant**

```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface PropertyFiltersProps {
  type: "location" | "vente";
  cities: string[]; // Liste des villes disponibles
}

export default function PropertyFilters({ type, cities }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // État des filtres (initialisé depuis l'URL)
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    surfaceMin: searchParams.get("surfaceMin") || "",
    surfaceMax: searchParams.get("surfaceMax") || "",
    rooms: searchParams.get("rooms") || "",
  });

  // Appliquer les filtres (met à jour l'URL)
  const applyFilters = () => {
    const params = new URLSearchParams();

    // Ajouter seulement les filtres non vides
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    // Naviguer vers l'URL avec les filtres
    router.push(`/${type}?${params.toString()}`);
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      city: "",
      priceMin: "",
      priceMax: "",
      surfaceMin: "",
      surfaceMax: "",
      rooms: "",
    });
    router.push(`/${type}`);
  };

  // Gérer le changement d'un filtre
  const handleChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-surface rounded-lg p-6 mb-8 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Filtrer les biens
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Filtre par ville */}
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Ville
          </label>
          <select
            value={filters.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Toutes les villes</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre prix min */}
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Prix min (€)
          </label>
          <input
            type="number"
            value={filters.priceMin}
            onChange={(e) => handleChange("priceMin", e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filtre prix max */}
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Prix max (€)
          </label>
          <input
            type="number"
            value={filters.priceMax}
            onChange={(e) => handleChange("priceMax", e.target.value)}
            placeholder="1000000"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filtre surface min */}
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Surface min (m²)
          </label>
          <input
            type="number"
            value={filters.surfaceMin}
            onChange={(e) => handleChange("surfaceMin", e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filtre surface max */}
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Surface max (m²)
          </label>
          <input
            type="number"
            value={filters.surfaceMax}
            onChange={(e) => handleChange("surfaceMax", e.target.value)}
            placeholder="500"
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filtre nombre de pièces */}
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Nombre de pièces
          </label>
          <select
            value={filters.rooms}
            onChange={(e) => handleChange("rooms", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Tous</option>
            <option value="1">1 pièce</option>
            <option value="2">2 pièces</option>
            <option value="3">3 pièces</option>
            <option value="4">4 pièces</option>
            <option value="5">5 pièces et +</option>
          </select>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={applyFilters}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Rechercher
        </button>
        <button
          onClick={resetFilters}
          className="px-6 py-2 border border-border text-muted rounded-md hover:bg-surface transition-colors"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
```

- [x] Sauvegarder le fichier

💡 **Explication :** Ce composant utilise les `searchParams` de Next.js pour persister les filtres dans l'URL. Cela permet de partager un lien filtré et de garder les filtres lors du rafraîchissement.

---

### Étape 11.1.2 : Créer la fonction de filtrage

**A. Créer le fichier utilitaire**

- [x] Dans `lib/`, créer un nouveau fichier `filterProperties.ts`

**B. Ajouter le code suivant**

```typescript
import { Property } from "@/types/property";

export interface FilterParams {
  city?: string;
  priceMin?: string;
  priceMax?: string;
  surfaceMin?: string;
  surfaceMax?: string;
  rooms?: string;
}

/**
 * Filtre les propriétés selon les critères donnés
 */
export function filterProperties(
  properties: Property[],
  filters: FilterParams
): Property[] {
  return properties.filter((property) => {
    // Filtre par ville
    if (filters.city && property.city !== filters.city) {
      return false;
    }

    // Filtre par prix minimum
    if (filters.priceMin && property.price < parseInt(filters.priceMin)) {
      return false;
    }

    // Filtre par prix maximum
    if (filters.priceMax && property.price > parseInt(filters.priceMax)) {
      return false;
    }

    // Filtre par surface minimum
    if (filters.surfaceMin && property.surface < parseInt(filters.surfaceMin)) {
      return false;
    }

    // Filtre par surface maximum
    if (filters.surfaceMax && property.surface > parseInt(filters.surfaceMax)) {
      return false;
    }

    // Filtre par nombre de pièces
    if (filters.rooms) {
      const roomsFilter = parseInt(filters.rooms);
      if (roomsFilter === 5) {
        // 5 pièces et plus
        if (property.rooms < 5) return false;
      } else {
        if (property.rooms !== roomsFilter) return false;
      }
    }

    return true;
  });
}

/**
 * Extrait la liste unique des villes depuis les propriétés
 */
export function extractCities(properties: Property[]): string[] {
  const cities = new Set(properties.map((p) => p.city));
  return Array.from(cities).sort();
}
```

- [x] Sauvegarder le fichier

---

### Étape 11.1.3 : Intégrer les filtres dans les pages

**A. Modifier app/location/page.tsx**

- [x] Ouvrir `app/location/page.tsx`
- [x] Importer `PropertyFilters` et les fonctions de filtrage
- [x] Ajouter le composant dans le JSX avant la grille d'annonces

```tsx
import PropertyFilters from "@/components/annonces/PropertyFilters";
import { filterProperties, extractCities } from "@/lib/filterProperties";

// Dans le composant, avant le return :
const cities = extractCities(locationProperties);
const filteredProperties = filterProperties(locationProperties, params);

// Dans le JSX :
<PropertyFilters type="location" cities={cities} />
```

- [x] Sauvegarder le fichier

**B. Faire de même pour app/vente/page.tsx**

- [x] Appliquer les mêmes modifications avec `type="vente"`

---

### Étape 11.1.4 : Test des filtres

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/location
- [x] Vérifier que les filtres s'affichent
- [x] Tester chaque filtre individuellement
- [x] Vérifier que l'URL se met à jour avec les filtres
- [x] Vérifier que le bouton "Réinitialiser" fonctionne

---

## 11.2 Créer le composant Pagination

### Étape 11.2.1 : Créer Pagination.tsx

**A. Créer le fichier**

- [x] Dans `components/ui/`, créer un nouveau fichier `Pagination.tsx`

**B. Ajouter le code suivant**

```tsx
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-surface"
        >
          ← Précédent
        </Link>
      ) : (
        <span className="px-4 py-2 border border-border rounded-md text-muted cursor-not-allowed">
          ← Précédent
        </span>
      )}

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted">...</span>
          ) : (
            <Link
              key={page}
              href={buildUrl(page as number)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "border border-border text-foreground hover:bg-surface"
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-surface"
        >
          Suivant →
        </Link>
      ) : (
        <span className="px-4 py-2 border border-border rounded-md text-muted cursor-not-allowed">
          Suivant →
        </span>
      )}
    </nav>
  );
}
```

- [x] Sauvegarder le fichier

---

## 11.3 Créer le composant PropertyGallery

### Étape 11.3.1 : Créer PropertyGallery.tsx

**A. Créer le fichier**

- [x] Dans `components/annonces/`, créer `PropertyGallery.tsx`

**B. Ajouter le code suivant**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-surface rounded-lg flex items-center justify-center">
        <span className="text-muted">Aucune image disponible</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative aspect-video bg-surface rounded-lg overflow-hidden">
        <Image
          src={images[selectedIndex]}
          alt={`${title} - Photo ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {selectedIndex + 1} / {images.length}
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => prev === images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 ${
                index === selectedIndex ? "border-primary" : "border-transparent hover:border-border"
              }`}
            >
              <Image src={image} alt={`Miniature ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [x] Sauvegarder le fichier

---

## 11.4 Créer le composant PropertyDetails

### Étape 11.4.1 : Créer PropertyDetails.tsx

**A. Créer le fichier**

- [x] Dans `components/annonces/`, créer `PropertyDetails.tsx`

**B. Ajouter le code suivant**

```tsx
import { Property } from "@/types/property";

interface PropertyDetailsProps {
  property: Property;
  type: "location" | "vente";
}

export default function PropertyDetails({ property, type }: PropertyDetailsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const characteristics = [
    { label: "Surface", value: `${property.surface} m²`, icon: "📐" },
    { label: "Pièces", value: `${property.rooms} pièce(s)`, icon: "🚪" },
    { label: "Chambres", value: `${property.bedrooms || "N/A"}`, icon: "🛏️" },
    { label: "Salle(s) de bain", value: `${property.bathrooms || "N/A"}`, icon: "🚿" },
  ];

  return (
    <div className="space-y-8">
      {/* En-tête avec prix */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{property.title}</h1>
          <p className="text-muted mt-1">📍 {property.address}, {property.city} {property.postalCode}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">
            {formatPrice(property.price)}
            {type === "location" && <span className="text-lg">/mois</span>}
          </p>
        </div>
      </div>

      {/* Caractéristiques */}
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Caractéristiques</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {characteristics.map((char) => (
            <div key={char.label} className="flex items-center gap-3">
              <span className="text-2xl">{char.icon}</span>
              <div>
                <p className="text-sm text-muted">{char.label}</p>
                <p className="font-medium text-foreground">{char.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
        <p className="text-muted whitespace-pre-line">
          {property.description || "Aucune description disponible."}
        </p>
      </div>

      {/* Bouton de contact */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/contact"
          className="flex-1 text-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium"
        >
          Nous contacter pour ce bien
        </a>
      </div>
    </div>
  );
}
```

- [x] Sauvegarder le fichier

---

## 11.5 Créer les pages de détail

### Étape 11.5.1 : Ajouter la fonction getAdById

**A. Ouvrir lib/ubiflow.ts**

- [x] Ajouter la fonction suivante à la fin du fichier :

```typescript
/**
 * Récupère une annonce par son ID depuis l'API Ubiflow
 */
export async function getAdById(id: string): Promise<unknown> {
  const token = await getUbiflowToken();
  const url = `https://api-classifieds.ubiflow.net/api/ads/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Échec récupération annonce: ${response.status}`);
  }

  return response.json();
}
```

- [x] Sauvegarder le fichier

---

### Étape 11.5.2 : Créer la page détail location

**A. Créer le dossier et fichier**

- [x] Créer `app/location/[id]/page.tsx`

**B. Ajouter le code suivant**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/ui/Section";
import PropertyGallery from "@/components/annonces/PropertyGallery";
import PropertyDetails from "@/components/annonces/PropertyDetails";
import { getAdById } from "@/lib/ubiflow";
import { Property } from "@/types/property";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = (await getAdById(id)) as Property | null;

  if (!property) {
    notFound();
  }

  const images = property.images || [];

  return (
    <main>
      <Section className="bg-background">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-muted hover:text-primary">Accueil</Link>
          <span className="mx-2 text-muted">/</span>
          <Link href="/location" className="text-muted hover:text-primary">Location</Link>
          <span className="mx-2 text-muted">/</span>
          <span className="text-foreground">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PropertyGallery images={images} title={property.title} />
          <PropertyDetails property={property} type="location" />
        </div>
      </Section>
    </main>
  );
}
```

- [x] Sauvegarder le fichier

---

### Étape 11.5.3 : Créer la page détail vente

- [x] Créer `app/vente/[id]/page.tsx` avec le même code
- [x] Remplacer "location" par "vente" et "Location" par "Vente"
- [x] Sauvegarder le fichier

---

### Étape 11.5.4 : Mettre à jour PropertyCard pour le lien

**A. Ouvrir PropertyCard.tsx**

- [x] Vérifier que le composant inclut un lien vers la page détail
- [x] Si non, entourer le contenu avec :

```tsx
import Link from "next/link";

<Link href={`/${type}/${property.id}`} className="block">
  {/* Contenu de la carte */}
</Link>
```

- [x] Sauvegarder le fichier

---

### Étape 11.5.5 : Test des pages détail

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/location
- [x] Cliquer sur une annonce → la page détail s'affiche
- [x] Vérifier la galerie photos
- [x] Vérifier les détails du bien
- [x] Vérifier le fil d'Ariane
- [x] Faire les mêmes tests sur `/vente` (pas de biens en vente dans l'API, code identique)

---

## ✅ Checkpoint Phase 11

À ce stade, vous devriez avoir :
- [x] Composant `PropertyFilters` avec filtres (ville, prix, surface, pièces)
- [x] Fonction `filterProperties` pour filtrer les annonces
- [x] Composant `Pagination` fonctionnel
- [x] Composant `PropertyGallery` avec navigation photos
- [x] Composant `PropertyDetails` avec caractéristiques
- [x] Fonction `getAdById` dans lib/ubiflow.ts
- [x] Page détail `/location/[id]`
- [x] Page détail `/vente/[id]`
- [x] Lien depuis les cartes vers les pages détail

**Vérifications :**
- [x] Les filtres fonctionnent et l'URL se met à jour
- [x] La pagination conserve les filtres
- [x] Les pages détail affichent toutes les informations
- [x] La galerie photos fonctionne

---

# Phase 12 - SEO & Performance

**Objectif :** Optimiser le référencement et les performances du site avec les annonces immobilières.

**Prérequis :** Phase 11 terminée (filtres et pages détail fonctionnelles)

---

## 12.1 Métadonnées dynamiques pour les pages détail

### Étape 12.1.1 : Ajouter generateMetadata pour la page location

**A. Ouvrir app/location/[id]/page.tsx**

- [x] Ouvrir le fichier `app/location/[id]/page.tsx`

**B. Ajouter la fonction generateMetadata**

Ajouter ce code au début du fichier (après les imports) :

```tsx
import type { Metadata } from "next";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = (await getAdById(id)) as Property | null;

  if (!property) {
    return {
      title: "Bien non trouvé | OIKO",
      description: "Ce bien n'est plus disponible.",
    };
  }

  const title = `${property.title} - Location à ${property.city} | OIKO`;
  const description = `${property.rooms} pièces, ${property.surface}m² à louer à ${property.city}. ${property.price}€/mois.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: property.images?.[0] ? [property.images[0]] : [],
    },
  };
}
```

- [x] Sauvegarder le fichier

💡 **Explication :** `generateMetadata` est une fonction spéciale de Next.js qui génère les balises meta côté serveur avant le rendu de la page.

---

### Étape 12.1.2 : Ajouter generateMetadata pour la page vente

**A. Ouvrir app/vente/[id]/page.tsx**

- [x] Copier la même fonction `generateMetadata`
- [x] Modifier `Location à` → `À vendre à`
- [x] Modifier `à louer` → `à vendre`
- [x] Modifier `€/mois` → `€`
- [x] Sauvegarder le fichier

---

### Étape 12.1.3 : Test des métadonnées

- [x] Lancer `npm run dev`
- [x] Ouvrir une page détail dans le navigateur
- [x] Inspecter le code source (Ctrl+U ou Cmd+U)
- [x] Vérifier que les balises `<title>` et `<meta name="description">` sont correctes

---

## 12.2 Mettre à jour le sitemap dynamique

### Étape 12.2.1 : Modifier app/sitemap.ts

**A. Ouvrir app/sitemap.ts**

- [x] Ouvrir le fichier `app/sitemap.ts`

**B. Remplacer le contenu par**

```typescript
import { MetadataRoute } from "next";
import { getAdsList } from "@/lib/ubiflow";
import { Property } from "@/types/property";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiko-gestion.fr";

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/activites`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vente`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Pages dynamiques (annonces)
  let dynamicPages: MetadataRoute.Sitemap = [];

  try {
    const response = await getAdsList(1);
    const properties: Property[] = response?.["hydra:member"] || [];

    dynamicPages = properties.map((property) => {
      const type = property.transaction === "location" ? "location" : "vente";
      return {
        url: `${baseUrl}/${type}/${property.id}`,
        lastModified: property.updatedAt ? new Date(property.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error("[Sitemap] Erreur:", error);
  }

  return [...staticPages, ...dynamicPages];
}
```

- [x] Sauvegarder le fichier

---

### Étape 12.2.2 : Ajouter la variable d'environnement

**A. Ouvrir .env.local**

- [x] Ajouter la ligne suivante :

```
NEXT_PUBLIC_SITE_URL=https://oiko-gestion.fr
```

- [x] Sauvegarder le fichier

---

### Étape 12.2.3 : Test du sitemap

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/sitemap.xml
- [x] Vérifier que les pages statiques sont listées
- [x] Vérifier que les annonces sont incluses

---

## 12.3 Ajouter Schema.org pour les annonces

### Étape 12.3.1 : Créer le composant PropertyJsonLd

**A. Créer le dossier et fichier**

- [x] Créer le dossier `components/seo/` (s'il n'existe pas)
- [x] Créer le fichier `components/seo/PropertyJsonLd.tsx`

**B. Ajouter le code suivant**

```tsx
import { Property } from "@/types/property";

interface PropertyJsonLdProps {
  property: Property;
  type: "location" | "vente";
}

export default function PropertyJsonLd({ property, type }: PropertyJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiko-gestion.fr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${baseUrl}/${type}/${property.id}`,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      postalCode: property.postalCode,
      addressCountry: "FR",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.surface,
      unitCode: "MTK",
    },
    numberOfRooms: property.rooms,
    ...(property.images?.[0] && { image: property.images }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

- [x] Sauvegarder le fichier

💡 **Explication :** Schema.org aide les moteurs de recherche à comprendre le contenu. Les annonces peuvent apparaître avec des rich snippets dans les résultats Google.

---

### Étape 12.3.2 : Intégrer PropertyJsonLd dans les pages détail

**A. Modifier app/location/[id]/page.tsx**

- [x] Ajouter l'import :

```tsx
import PropertyJsonLd from "@/components/seo/PropertyJsonLd";
```

- [x] Ajouter le composant juste après `<main>` :

```tsx
<main>
  <PropertyJsonLd property={property} type="location" />
  {/* ... reste du contenu */}
</main>
```

- [x] Sauvegarder le fichier

**B. Faire de même pour app/vente/[id]/page.tsx**

- [x] Ajouter avec `type="vente"`
- [x] Sauvegarder le fichier

---

### Étape 12.3.3 : Test du Schema.org

- [x] Lancer `npm run dev`
- [x] Ouvrir une page détail
- [x] Inspecter le code source
- [x] Vérifier que le script JSON-LD est présent
- [x] Optionnel : Valider avec https://search.google.com/test/rich-results

---

## 12.4 Configurer les images externes

### Étape 12.4.1 : Modifier next.config.js

**A. Ouvrir next.config.js (ou next.config.ts)**

- [x] Ajouter la configuration des images :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ubiflow.net",
      },
      {
        protocol: "https",
        hostname: "images.ubiflow.net",
      },
    ],
  },
};

module.exports = nextConfig;
```

- [x] Sauvegarder le fichier
- [x] Redémarrer le serveur de développement

⚠️ **Important :** Sans cette configuration, les images externes ne fonctionneront pas avec le composant `<Image>` de Next.js.

---

## 12.5 Ajouter le cache API

### Étape 12.5.1 : Modifier lib/ubiflow.ts pour le cache

**A. Ouvrir lib/ubiflow.ts**

- [x] Modifier la fonction `getAdsList` :

```typescript
const response = await fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": `Bearer ${token}`,
  },
  // Cache pendant 5 minutes
  next: { revalidate: 300 },
});
```

- [x] Faire de même pour `getAdById`
- [x] Sauvegarder le fichier

💡 **Explication :** `revalidate: 300` signifie que les données seront mises en cache pendant 5 minutes, réduisant les appels API.

---

## ✅ Checkpoint Phase 12

À ce stade, vous devriez avoir :
- [x] `generateMetadata` sur les pages détail location et vente
- [x] Sitemap dynamique incluant toutes les annonces
- [x] Composant `PropertyJsonLd` pour Schema.org
- [x] JSON-LD intégré dans les pages détail
- [x] Configuration des images externes dans next.config
- [x] Cache API configuré (revalidate: 300)

**Vérifications :**
- [x] Les meta tags sont corrects sur les pages détail (voir code source)
- [x] Le sitemap.xml liste toutes les annonces
- [x] Le JSON-LD est présent dans le code source
- [x] Les images externes s'affichent correctement

---

# Phase 13 - Contenus Légaux

**Objectif :** Ajouter les pages légales obligatoires pour la conformité RGPD et les mentions légales.

**Prérequis :** Phase 12 terminée

---

## 13.1 Créer la page CGU

### Étape 13.1.1 : Créer la page CGU

**A. Créer le dossier et fichier**

- [x] Créer le dossier `app/cgu/`
- [x] Créer le fichier `app/cgu/page.tsx`

**B. Ajouter le code suivant**

```tsx
import type { Metadata } from "next";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | OIKO",
  description: "Conditions générales d'utilisation du site OIKO Gestion.",
};

export default function CGUPage() {
  return (
    <main>
      <Section
        title="Conditions Générales d'Utilisation"
        className="bg-background"
      >
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-muted">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet
            de définir les modalités et conditions d'utilisation du site internet
            oiko-gestion.fr (ci-après « le Site »), ainsi que les droits et
            obligations des utilisateurs.
          </p>

          <h2>2. Acceptation des CGU</h2>
          <p>
            L'accès et l'utilisation du Site impliquent l'acceptation pleine et
            entière des présentes CGU. Si vous n'acceptez pas ces conditions,
            vous êtes invité à ne pas utiliser le Site.
          </p>

          <h2>3. Services proposés</h2>
          <p>Le Site propose les services suivants :</p>
          <ul>
            <li>Consultation d'annonces immobilières (vente et location)</li>
            <li>Informations sur les services de gestion locative</li>
            <li>Formulaire de contact</li>
          </ul>

          <h2>4. Accès au Site</h2>
          <p>
            Le Site est accessible gratuitement à tout utilisateur disposant d'un
            accès Internet. OIKO ne peut être tenue responsable en cas
            d'indisponibilité du Site pour des raisons techniques ou de maintenance.
          </p>

          <h2>5. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments constituant le Site (textes, images, logos,
            graphismes, etc.) est protégé par le droit de la propriété
            intellectuelle. Toute reproduction non autorisée est interdite.
          </p>

          <h2>6. Données personnelles</h2>
          <p>
            Les données personnelles collectées sur le Site sont traitées
            conformément à notre{" "}
            <a href="/politique-rgpd" className="text-primary hover:underline">
              Politique de Confidentialité
            </a>.
          </p>

          <h2>7. Droit applicable</h2>
          <p>
            Les présentes CGU sont soumises au droit français. Tout litige
            relève de la compétence des tribunaux français.
          </p>

          <h2>8. Contact</h2>
          <p>
            Pour toute question, contactez-nous via notre{" "}
            <a href="/contact" className="text-primary hover:underline">
              formulaire de contact
            </a>.
          </p>
        </div>
      </Section>
    </main>
  );
}
```

- [x] Sauvegarder le fichier

⚠️ **Important :** Ce contenu est un modèle. Le contenu juridique définitif doit être validé par un professionnel du droit.

---

## 13.2 Compléter la page RGPD

### Étape 13.2.1 : Mettre à jour la page Politique RGPD

**A. Ouvrir app/politique-rgpd/page.tsx**

- [x] Ouvrir le fichier existant `app/politique-rgpd/page.tsx`

**B. Remplacer ou compléter le contenu**

```tsx
import type { Metadata } from "next";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Politique de Confidentialité RGPD | OIKO",
  description: "Politique de confidentialité et protection des données personnelles.",
};

export default function PolitiqueRGPDPage() {
  return (
    <main>
      <Section
        title="Politique de Confidentialité"
        subtitle="Protection de vos données personnelles"
        className="bg-background"
      >
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-muted">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>Le responsable du traitement des données personnelles est :</p>
          <ul>
            <li><strong>Société :</strong> OIKO Gestion</li>
            <li><strong>Adresse :</strong> [Adresse de l'entreprise]</li>
            <li><strong>Email :</strong> contact@oiko-gestion.fr</li>
          </ul>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul>
            <li><strong>Formulaire de contact :</strong> nom, prénom, email, téléphone, message</li>
            <li><strong>Navigation :</strong> adresse IP, cookies (avec votre consentement)</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont collectées pour :</p>
          <ul>
            <li>Répondre à vos demandes de contact</li>
            <li>Vous informer sur nos biens immobiliers</li>
            <li>Améliorer notre site et nos services</li>
          </ul>

          <h2>4. Durée de conservation</h2>
          <ul>
            <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
            <li><strong>Cookies :</strong> 13 mois maximum</li>
          </ul>

          <h2>5. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
            <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
          </ul>
          <p>Pour exercer ces droits : contact@oiko-gestion.fr</p>

          <h2>6. Cookies</h2>
          <p>Notre site utilise des cookies pour :</p>
          <ul>
            <li>Assurer le bon fonctionnement du site (cookies techniques)</li>
            <li>Analyser la fréquentation (cookies analytiques - avec consentement)</li>
          </ul>

          <h2>7. Réclamation</h2>
          <p>
            Vous pouvez introduire une réclamation auprès de la CNIL :{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              www.cnil.fr
            </a>
          </p>
        </div>
      </Section>
    </main>
  );
}
```

- [x] Sauvegarder le fichier

---

## 13.3 Créer la page Mentions Légales

### Étape 13.3.1 : Créer la page Mentions Légales

**A. Créer le dossier et fichier**

- [x] Créer le dossier `app/mentions-legales/`
- [x] Créer le fichier `app/mentions-legales/page.tsx`

**B. Ajouter le code suivant**

```tsx
import type { Metadata } from "next";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Mentions Légales | OIKO",
  description: "Mentions légales du site OIKO Gestion.",
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <Section title="Mentions Légales" className="bg-background">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>1. Éditeur du site</h2>
          <ul>
            <li><strong>Raison sociale :</strong> OIKO Gestion</li>
            <li><strong>Forme juridique :</strong> [SAS/SARL/etc.]</li>
            <li><strong>Capital social :</strong> [Montant] €</li>
            <li><strong>Siège social :</strong> [Adresse complète]</li>
            <li><strong>SIRET :</strong> [Numéro SIRET]</li>
            <li><strong>RCS :</strong> [Ville + Numéro RCS]</li>
            <li><strong>Téléphone :</strong> [Numéro de téléphone]</li>
            <li><strong>Email :</strong> contact@oiko-gestion.fr</li>
          </ul>

          <h2>2. Directeur de la publication</h2>
          <p>[Nom du directeur], en qualité de [fonction].</p>

          <h2>3. Hébergeur</h2>
          <ul>
            <li><strong>Raison sociale :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
            <li><strong>Site web :</strong>{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                vercel.com
              </a>
            </li>
          </ul>

          <h2>4. Activité réglementée</h2>
          <p>OIKO Gestion exerce une activité de gestion immobilière soumise à la loi Hoguet :</p>
          <ul>
            <li><strong>Carte professionnelle :</strong> Carte G n° [Numéro] délivrée par la CCI de [Ville]</li>
            <li><strong>Garantie financière :</strong> [Nom de l'organisme] - [Montant] €</li>
            <li><strong>Assurance RCP :</strong> [Nom de l'assureur] - Contrat n° [Numéro]</li>
          </ul>

          <h2>5. Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu du site est protégé par les lois relatives à la propriété intellectuelle.
            Toute reproduction non autorisée est interdite.
          </p>

          <h2>6. Crédits</h2>
          <ul>
            <li><strong>Conception et développement :</strong> [Nom du développeur/agence]</li>
          </ul>
        </div>
      </Section>
    </main>
  );
}
```

- [x] Sauvegarder le fichier

⚠️ **Important :** Remplacer les informations entre crochets [xxx] par les vraies informations d'OIKO.

---

## 13.4 Créer le bandeau cookies

### Étape 13.4.1 : Créer le composant CookieBanner

**A. Créer le fichier**

- [x] Dans `components/ui/`, créer le fichier `CookieBanner.tsx`

**B. Ajouter le code suivant**

```tsx
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

          <div className="flex gap-3 shrink-0">
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
```

- [x] Sauvegarder le fichier

---

### Étape 13.4.2 : Intégrer le bandeau dans le layout

**A. Ouvrir app/layout.tsx**

- [x] Ajouter l'import :

```tsx
import CookieBanner from "@/components/ui/CookieBanner";
```

- [x] Ajouter le composant juste avant `</body>` :

```tsx
<CookieBanner />
</body>
```

- [x] Sauvegarder le fichier

---

### Étape 13.4.3 : Test du bandeau cookies

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000 (en navigation privée)
- [x] Vérifier que le bandeau s'affiche
- [x] Cliquer sur "Accepter" → le bandeau disparaît
- [x] Rafraîchir la page → le bandeau ne réapparaît pas
- [x] Supprimer le cookie dans les DevTools → le bandeau réapparaît

---

## 13.5 Mettre à jour le Footer avec les liens légaux

### Étape 13.5.1 : Modifier le Footer

**A. Ouvrir components/layout/Footer.tsx**

- [x] Ajouter une section "Informations légales" :

```tsx
{/* Liens légaux */}
<div>
  <h4 className="font-semibold text-foreground mb-4">Informations légales</h4>
  <ul className="space-y-2 text-sm">
    <li>
      <Link href="/mentions-legales" className="text-muted hover:text-primary transition-colors">
        Mentions légales
      </Link>
    </li>
    <li>
      <Link href="/cgu" className="text-muted hover:text-primary transition-colors">
        CGU
      </Link>
    </li>
    <li>
      <Link href="/politique-rgpd" className="text-muted hover:text-primary transition-colors">
        Politique de confidentialité
      </Link>
    </li>
  </ul>
</div>
```

- [x] Sauvegarder le fichier

---

### Étape 13.5.2 : Test des liens légaux

- [x] Vérifier que les liens apparaissent dans le footer
- [x] Cliquer sur chaque lien → les pages s'ouvrent correctement
- [x] Vérifier le responsive du footer

---

## ✅ Checkpoint Phase 13

À ce stade, vous devriez avoir :
- [x] Page `/cgu` avec les conditions générales d'utilisation
- [x] Page `/politique-rgpd` complète avec toutes les informations RGPD
- [x] Page `/mentions-legales` avec les informations de l'entreprise
- [x] Composant `CookieBanner` fonctionnel
- [x] Bandeau cookies intégré dans le layout
- [x] Liens légaux dans le footer

**Vérifications :**
- [x] Toutes les pages légales sont accessibles
- [x] Le bandeau cookies fonctionne correctement
- [x] Le consentement est mémorisé dans localStorage
- [x] Les liens du footer fonctionnent

---

# Phase 14 - Blog (Optionnel)

**Objectif :** Ajouter un blog pour améliorer le SEO avec du contenu éditorial sur l'immobilier.

**Prérequis :** Phase 13 terminée

---

## 14.1 Installer les dépendances

### Étape 14.1.1 : Installer gray-matter et remark

**A. Exécuter la commande**

- [x] Dans le terminal, exécuter :

```bash
npm install gray-matter remark remark-html
```

💡 **Explication :**
- `gray-matter` : parse le frontmatter YAML des fichiers Markdown
- `remark` : transforme le Markdown en HTML
- `remark-html` : plugin pour convertir en HTML

---

## 14.2 Créer la structure de contenu

### Étape 14.2.1 : Créer le dossier content/blog

**A. Créer la structure**

- [x] Créer le dossier `content/` à la racine du projet
- [x] Créer le sous-dossier `content/blog/`

---

### Étape 14.2.2 : Créer un premier article exemple

**A. Créer le fichier**

- [x] Créer le fichier `content/blog/conseils-investissement-locatif.md`

**B. Ajouter le contenu suivant**

```markdown
---
title: "5 conseils pour réussir son investissement locatif"
excerpt: "Découvrez nos conseils essentiels pour bien démarrer dans l'investissement immobilier locatif."
date: "2026-01-15"
author: "OIKO Gestion"
category: "conseils"
image: "/images/blog/investissement.jpg"
---

L'investissement locatif est une excellente façon de se constituer un patrimoine. Voici nos 5 conseils.

## 1. Définir son budget et ses objectifs

Avant de vous lancer, évaluez votre capacité d'emprunt et définissez vos objectifs.

## 2. Bien choisir l'emplacement

L'emplacement est le critère n°1. Privilégiez les zones dynamiques et bien desservies.

## 3. Calculer la rentabilité

Ne vous fiez pas uniquement au prix d'achat. Calculez le rendement net.

## 4. Anticiper la gestion locative

Pensez à confier cette gestion à un professionnel comme OIKO Gestion.

## 5. Se faire accompagner

Un premier investissement peut être complexe. N'hésitez pas à vous faire accompagner.

---

Besoin de conseils ? [Contactez-nous](/contact) !
```

- [x] Sauvegarder le fichier

---

## 14.3 Créer la bibliothèque de gestion du blog

### Étape 14.3.1 : Créer lib/blog.ts

**A. Créer le fichier**

- [x] Créer le fichier `lib/blog.ts`

**B. Ajouter le code suivant**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  content?: string;
}

/**
 * Récupère tous les articles de blog
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        author: data.author,
        category: data.category,
        image: data.image,
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Récupère un article par son slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    author: data.author,
    category: data.category,
    image: data.image,
    content: contentHtml,
  };
}

/**
 * Récupère tous les slugs pour generateStaticParams
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * Récupère les articles par catégorie
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Récupère toutes les catégories uniques
 */
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set(allPosts.map((post) => post.category));
  return Array.from(categories);
}
```

- [x] Sauvegarder le fichier

---

## 14.4 Créer les composants du blog

### Étape 14.4.1 : Créer le composant BlogCard

**A. Créer le dossier et fichier**

- [x] Créer le dossier `components/blog/`
- [x] Créer le fichier `components/blog/BlogCard.tsx`

**B. Ajouter le code suivant**

```tsx
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const categoryLabels: Record<string, string> = {
    conseils: "Conseils",
    actualites: "Actualités",
    immobilier: "Immobilier",
  };

  return (
    <article className="bg-surface rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video bg-background">
          {post.image ? (
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm">
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
            {categoryLabels[post.category] || post.category}
          </span>
          <span className="text-muted">{formatDate(post.date)}</span>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>

        <p className="text-muted text-sm line-clamp-3 mb-4">{post.excerpt}</p>

        <Link href={`/blog/${post.slug}`} className="text-primary font-medium text-sm hover:underline">
          Lire la suite →
        </Link>
      </div>
    </article>
  );
}
```

- [x] Sauvegarder le fichier

---

### Étape 14.4.2 : Créer le composant ShareButtons

**A. Créer le fichier**

- [x] Créer le fichier `components/blog/ShareButtons.tsx`

**B. Ajouter le code suivant**

```tsx
"use client";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiko-gestion.fr";
  const url = `${baseUrl}/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: "𝕏",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: "in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: "f",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    alert("Lien copié !");
  };

  return (
    <div className="flex gap-3">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-muted hover:bg-primary hover:text-white hover:border-primary transition-colors"
          aria-label={`Partager sur ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className="w-10 h-10 flex items-center justify-center border border-border rounded-full text-muted hover:bg-primary hover:text-white hover:border-primary transition-colors"
        aria-label="Copier le lien"
      >
        🔗
      </button>
    </div>
  );
}
```

- [x] Sauvegarder le fichier

---

## 14.5 Créer les pages du blog

### Étape 14.5.1 : Créer la page liste des articles

**A. Créer le dossier et fichier**

- [x] Créer le dossier `app/blog/`
- [x] Créer le fichier `app/blog/page.tsx`

**B. Ajouter le code suivant**

```tsx
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | OIKO Gestion",
  description: "Conseils immobiliers, actualités du marché et guides pratiques.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const categoryLabels: Record<string, string> = {
    conseils: "Conseils",
    actualites: "Actualités",
    immobilier: "Immobilier",
  };

  return (
    <main>
      <Section
        title="Blog"
        subtitle="Conseils immobiliers et actualités du marché"
        className="bg-background"
      >
        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/blog" className="px-4 py-2 bg-primary text-white rounded-full text-sm">
            Tous
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog/categorie/${category}`}
              className="px-4 py-2 bg-surface text-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
            >
              {categoryLabels[category] || category}
            </Link>
          ))}
        </div>

        {/* Grille d'articles */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted text-lg">Aucun article pour le moment.</p>
          </div>
        )}
      </Section>
    </main>
  );
}
```

- [x] Sauvegarder le fichier

---

### Étape 14.5.2 : Créer la page article

**A. Créer le dossier et fichier**

- [x] Créer le dossier `app/blog/[slug]/`
- [x] Créer le fichier `app/blog/[slug]/page.tsx`

**B. Ajouter le code suivant**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import ShareButtons from "@/components/blog/ShareButtons";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article non trouvé | OIKO" };
  }

  return {
    title: `${post.title} | Blog OIKO`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main>
      <Section className="bg-background">
        <article className="max-w-3xl mx-auto">
          {/* Fil d'Ariane */}
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-muted hover:text-primary">Accueil</Link>
            <span className="mx-2 text-muted">/</span>
            <Link href="/blog" className="text-muted hover:text-primary">Blog</Link>
            <span className="mx-2 text-muted">/</span>
            <span className="text-foreground">{post.title}</span>
          </nav>

          {/* En-tête */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>Par {post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          {/* Image principale */}
          {post.image && (
            <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          {/* Contenu */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {/* Partage */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted mb-4">Partager cet article :</p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* Retour */}
          <div className="mt-8">
            <Link href="/blog" className="text-primary hover:underline">
              ← Retour au blog
            </Link>
          </div>
        </article>
      </Section>
    </main>
  );
}
```

- [x] Sauvegarder le fichier

---

### Étape 14.5.3 : Créer la page catégorie

**A. Créer le dossier et fichier**

- [x] Créer le dossier `app/blog/categorie/[category]/`
- [x] Créer le fichier `app/blog/categorie/[category]/page.tsx`

**B. Ajouter le code suivant**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/blog/BlogCard";
import { getPostsByCategory, getAllCategories } from "@/lib/blog";
import Link from "next/link";

interface PageProps {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
  conseils: "Conseils",
  actualites: "Actualités",
  immobilier: "Immobilier",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category] || category;
  return {
    title: `${label} | Blog OIKO`,
    description: `Articles dans la catégorie ${label}.`,
  };
}

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  const allCategories = getAllCategories();

  if (!allCategories.includes(category)) {
    notFound();
  }

  const label = categoryLabels[category] || category;

  return (
    <main>
      <Section
        title={`Catégorie : ${label}`}
        subtitle={`${posts.length} article(s)`}
        className="bg-background"
      >
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/blog" className="px-4 py-2 bg-surface text-muted rounded-full text-sm hover:bg-primary hover:text-white transition-colors">
            Tous
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/blog/categorie/${cat}`}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                cat === category
                  ? "bg-primary text-white"
                  : "bg-surface text-muted hover:bg-primary hover:text-white"
              }`}
            >
              {categoryLabels[cat] || cat}
            </Link>
          ))}
        </div>

        {/* Grille */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted">Aucun article dans cette catégorie.</p>
            <Link href="/blog" className="text-primary hover:underline mt-4 inline-block">
              ← Retour au blog
            </Link>
          </div>
        )}
      </Section>
    </main>
  );
}
```

- [x] Sauvegarder le fichier

---

### Étape 14.5.4 : Ajouter le lien Blog dans la navigation

**A. Ouvrir le fichier de navigation (Header.tsx ou Navigation.tsx)**

- [x] Ajouter un lien vers `/blog` :

```tsx
<Link href="/blog" className="...">
  Blog
</Link>
```

- [x] Sauvegarder le fichier

---

### Étape 14.5.5 : Test du blog

- [x] Lancer `npm run dev`
- [x] Ouvrir http://localhost:3000/blog
- [x] Vérifier que les articles s'affichent
- [x] Cliquer sur un article → la page détail s'affiche
- [x] Vérifier les boutons de partage
- [x] Tester les filtres par catégorie
- [x] Vérifier le responsive

---

## 14.6 Configuration GitHub API (pour page admin)

Cette section permet d'ajouter une page admin pour créer des articles sans toucher au code.

### Étape 14.6.1 : Créer un token GitHub

**A. Générer le token**

- [ ] Aller sur https://github.com/settings/tokens
- [ ] Cliquer sur "Generate new token" → "Generate new token (classic)"
- [ ] Donner un nom : `oiko-blog-admin`
- [ ] Sélectionner les permissions : `repo` (accès complet au repo)
- [ ] Cliquer "Generate token"
- [ ] **Copier le token** (il ne sera plus visible après)

⚠️ **Important :** Ce token donne accès à ton repo. Ne le partage jamais publiquement.

---

### Étape 14.6.2 : Ajouter les variables d'environnement

**A. Ouvrir `.env.local`**

- [ ] Ajouter les variables suivantes :

```env
# GitHub API pour le blog admin
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=ton-username
GITHUB_REPO=site-oiko-v2
ADMIN_PASSWORD=un-mot-de-passe-secret
```

- [ ] Remplacer les valeurs par les vraies
- [ ] Sauvegarder le fichier

💡 **Explication :**
- `GITHUB_TOKEN` : Le token généré à l'étape précédente
- `GITHUB_OWNER` : Ton nom d'utilisateur GitHub
- `GITHUB_REPO` : Le nom du repo
- `ADMIN_PASSWORD` : Mot de passe pour accéder à la page admin

---

## 14.7 Créer l'API Route pour publier des articles

### Étape 14.7.1 : Créer l'API Route

**A. Créer le dossier et fichier**

- [ ] Créer le dossier `app/api/blog/`
- [ ] Créer le fichier `app/api/blog/route.ts`

**B. Ajouter le code suivant**

```typescript
import { NextRequest, NextResponse } from "next/server";

interface ArticleData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ArticleData = await request.json();

    // Vérification du mot de passe admin
    if (data.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Validation des champs
    if (!data.title || !data.content || !data.excerpt) {
      return NextResponse.json(
        { error: "Titre, extrait et contenu sont requis" },
        { status: 400 }
      );
    }

    // Générer le slug à partir du titre
    const slug = data.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
      .replace(/[^a-z0-9]+/g, "-") // Remplace les caractères spéciaux par des tirets
      .replace(/^-+|-+$/g, ""); // Supprime les tirets en début/fin

    // Créer le contenu Markdown
    const date = new Date().toISOString().split("T")[0];
    const markdownContent = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${date}"
author: "OIKO Gestion"
category: "${data.category || "actualites"}"
---

${data.content}
`;

    // Encoder le contenu en base64 (requis par GitHub API)
    const contentBase64 = Buffer.from(markdownContent).toString("base64");

    // Appel à l'API GitHub pour créer le fichier
    const githubResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${slug}.md`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Nouvel article: ${data.title}`,
          content: contentBase64,
          branch: "main",
        }),
      }
    );

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      console.error("[Blog API] Erreur GitHub:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la création sur GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slug,
      message: "Article créé ! Il sera visible dans ~2 minutes après le redéploiement.",
    });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

- [ ] Sauvegarder le fichier

---

## 14.8 Créer la page Admin

### Étape 14.8.1 : Créer la page admin

**A. Créer le dossier et fichier**

- [ ] Créer le dossier `app/admin/`
- [ ] Créer le fichier `app/admin/page.tsx`

**B. Ajouter le code suivant**

```tsx
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "actualites",
    password: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        // Réinitialiser le formulaire
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "actualites",
          password: formData.password, // Garder le mot de passe
        });
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Administration du Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Mot de passe admin
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
              required
            />
          </div>

          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre de l'article
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
              placeholder="Ex: 5 conseils pour investir dans l'immobilier"
              required
            />
          </div>

          {/* Extrait */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Extrait (résumé court)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
              rows={2}
              placeholder="Résumé de l'article en 1-2 phrases"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
            >
              <option value="actualites">Actualités</option>
              <option value="conseils">Conseils</option>
              <option value="immobilier">Immobilier</option>
            </select>
          </div>

          {/* Contenu */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Contenu (Markdown supporté)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground font-mono text-sm"
              rows={15}
              placeholder="Écrivez votre article ici...

## Sous-titre

Paragraphe de texte...

- Point 1
- Point 2

**Texte en gras**, *texte en italique*"
              required
            />
          </div>

          {/* Message de statut */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                status === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Bouton submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Publication en cours..." : "Publier l'article"}
          </button>
        </form>

        <div className="mt-8 p-4 bg-surface rounded-lg border border-border">
          <h2 className="font-semibold text-foreground mb-2">Comment ça marche ?</h2>
          <ol className="text-sm text-muted space-y-1 list-decimal list-inside">
            <li>Remplissez le formulaire avec votre article</li>
            <li>Cliquez sur "Publier"</li>
            <li>L'article est créé dans le repo GitHub</li>
            <li>Le site se redéploie automatiquement (~2 min)</li>
            <li>L'article apparaît sur /blog</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
```

- [ ] Sauvegarder le fichier

---

### Étape 14.8.2 : Test de la page admin

- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000/admin
- [ ] Vérifier que le formulaire s'affiche
- [ ] Tester avec un mauvais mot de passe → message d'erreur
- [ ] Tester avec le bon mot de passe → article créé sur GitHub

⚠️ **Note :** En local, l'article sera créé sur GitHub mais le site local ne se rebuildera pas automatiquement. L'article sera visible après un `git pull` ou en production après le redéploiement Vercel.

---

## 14.9 Protection de la page Admin

Cette section ajoute une authentification par mot de passe pour accéder à la page admin.

### Étape 14.9.1 : Créer l'API de login

**A. Créer le dossier et fichier**

- [ ] Créer le dossier `app/api/admin/`
- [ ] Créer le fichier `app/api/admin/login/route.ts`

**B. Ajouter le code suivant**

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Créer la réponse avec le cookie de session
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 heures
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

- [ ] Sauvegarder le fichier

---

### Étape 14.9.2 : Créer l'API de logout

**A. Créer le fichier**

- [ ] Créer le fichier `app/api/admin/logout/route.ts`

**B. Ajouter le code suivant**

```typescript
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Supprimer le cookie de session
  response.cookies.set("admin-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });

  return response;
}
```

- [ ] Sauvegarder le fichier

---

### Étape 14.9.3 : Créer la page de login

**A. Créer le dossier et fichier**

- [ ] Créer le dossier `app/admin/login/`
- [ ] Créer le fichier `app/admin/login/page.tsx`

**B. Ajouter le code suivant**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        setError("Mot de passe incorrect");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-surface border border-border rounded-lg p-8">
          <h1 className="text-2xl font-bold text-foreground text-center mb-6">
            Administration
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                placeholder="Entrez le mot de passe admin"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
```

- [ ] Sauvegarder le fichier

---

### Étape 14.9.4 : Créer le middleware de protection

**A. Créer le fichier middleware à la racine**

- [ ] Créer le fichier `middleware.ts` à la racine du projet (pas dans app/)

**B. Ajouter le code suivant**

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne protéger que /admin (sauf /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin-session");

    if (!session || session.value !== "authenticated") {
      // Rediriger vers la page de login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] Sauvegarder le fichier

---

### Étape 14.9.5 : Mettre à jour la page admin

**A. Modifier `app/admin/page.tsx`**

- [ ] Retirer le champ mot de passe du formulaire (plus nécessaire)
- [ ] Ajouter un bouton de déconnexion

**B. Remplacer le contenu par**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "actualites",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setFormData({
          title: "",
          excerpt: "",
          content: "",
          category: "actualites",
        });
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Administration du Blog
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-border rounded-lg text-muted hover:bg-surface transition-colors"
          >
            Déconnexion
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Titre de l'article
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
              placeholder="Ex: 5 conseils pour investir dans l'immobilier"
              required
            />
          </div>

          {/* Extrait */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Extrait (résumé court)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
              rows={2}
              placeholder="Résumé de l'article en 1-2 phrases"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
            >
              <option value="actualites">Actualités</option>
              <option value="conseils">Conseils</option>
              <option value="immobilier">Immobilier</option>
            </select>
          </div>

          {/* Contenu */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Contenu (Markdown supporté)
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground font-mono text-sm"
              rows={15}
              placeholder="Écrivez votre article ici...

## Sous-titre

Paragraphe de texte...

- Point 1
- Point 2

**Texte en gras**, *texte en italique*"
              required
            />
          </div>

          {/* Message de statut */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                status === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Bouton submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Publication en cours..." : "Publier l'article"}
          </button>
        </form>

        <div className="mt-8 p-4 bg-surface rounded-lg border border-border">
          <h2 className="font-semibold text-foreground mb-2">Comment ça marche ?</h2>
          <ol className="text-sm text-muted space-y-1 list-decimal list-inside">
            <li>Remplissez le formulaire avec votre article</li>
            <li>Cliquez sur "Publier"</li>
            <li>L'article est créé dans le repo GitHub</li>
            <li>Le site se redéploie automatiquement (~2 min)</li>
            <li>L'article apparaît sur /blog</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
```

- [ ] Sauvegarder le fichier

---

### Étape 14.9.6 : Mettre à jour l'API blog

**A. Modifier `app/api/blog/route.ts`**

L'API blog doit maintenant vérifier le cookie de session au lieu du mot de passe dans le body.

- [ ] Ouvrir `app/api/blog/route.ts`
- [ ] Remplacer la vérification du mot de passe par la vérification du cookie :

```typescript
import { NextRequest, NextResponse } from "next/server";

interface ArticleData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification via cookie
    const session = request.cookies.get("admin-session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const data: ArticleData = await request.json();

    // Validation des champs
    if (!data.title || !data.content || !data.excerpt) {
      return NextResponse.json(
        { error: "Titre, extrait et contenu sont requis" },
        { status: 400 }
      );
    }

    // Générer le slug à partir du titre
    const slug = data.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Créer le contenu Markdown
    const date = new Date().toISOString().split("T")[0];
    const markdownContent = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${date}"
author: "OIKO Gestion"
category: "${data.category || "actualites"}"
---

${data.content}
`;

    // Encoder le contenu en base64
    const contentBase64 = Buffer.from(markdownContent).toString("base64");

    // Appel à l'API GitHub
    const githubResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${slug}.md`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Nouvel article: ${data.title}`,
          content: contentBase64,
          branch: "main",
        }),
      }
    );

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      console.error("[Blog API] Erreur GitHub:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la création sur GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slug,
      message: "Article créé ! Il sera visible dans ~2 minutes après le redéploiement.",
    });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

- [ ] Sauvegarder le fichier

---

### Étape 14.9.7 : Test de la protection admin

- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000/admin → doit rediriger vers `/admin/login`
- [ ] Entrer un mauvais mot de passe → message d'erreur
- [ ] Entrer le bon mot de passe → redirection vers `/admin`
- [ ] Vérifier que le formulaire fonctionne sans champ mot de passe
- [ ] Cliquer sur "Déconnexion" → retour à `/admin/login`
- [ ] Réessayer d'accéder à `/admin` → doit rediriger vers login

---

## ✅ Checkpoint Phase 14

À ce stade, vous devriez avoir :
- [ ] Dépendances `gray-matter`, `remark`, `remark-html` installées
- [ ] Dossier `content/blog/` avec au moins un article markdown
- [ ] Fichier `lib/blog.ts` avec toutes les fonctions utilitaires
- [ ] Composant `BlogCard` pour les aperçus
- [ ] Composant `ShareButtons` pour le partage
- [ ] Page `/blog` avec la liste des articles
- [ ] Page `/blog/[slug]` pour les articles
- [ ] Page `/blog/categorie/[category]` pour le filtrage
- [ ] Lien Blog dans la navigation

**Administration du blog :**
- [ ] Token GitHub créé avec permissions `repo`
- [ ] Variables d'environnement configurées dans `.env.local`
- [ ] API Route `app/api/blog/route.ts` créée
- [ ] Page admin `app/admin/page.tsx` créée

**Protection admin :**
- [ ] API login `app/api/admin/login/route.ts` créée
- [ ] API logout `app/api/admin/logout/route.ts` créée
- [ ] Page login `app/admin/login/page.tsx` créée
- [ ] Middleware `middleware.ts` créé à la racine
- [ ] Page admin mise à jour (sans champ mot de passe, avec déconnexion)
- [ ] API blog mise à jour (vérification cookie)

**Vérifications :**
- [ ] Les articles s'affichent correctement
- [ ] La navigation entre articles fonctionne
- [ ] Les catégories filtrent correctement
- [ ] Les boutons de partage fonctionnent
- [ ] Les métadonnées SEO sont générées
- [ ] `/admin` redirige vers `/admin/login` si non connecté
- [ ] Connexion avec mot de passe fonctionne
- [ ] Formulaire de publication fonctionne
- [ ] Déconnexion fonctionne

---

# Phase 15 - Gestion des articles (Admin)

**Objectif :** Ajouter la possibilité de lister, modifier et supprimer des articles depuis la page admin.

**Prérequis :** Phase 14 terminée (sections 14.1 à 14.8)

---

## 15.1 Créer l'API pour lister les articles

### Étape 15.1.1 : Créer la route API pour récupérer les articles

**A. Créer le fichier**

- [x] Créer le fichier `app/api/blog/articles/route.ts`

**B. Ajouter le code suivant**

```typescript
import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des articles" },
      { status: 500 }
    );
  }
}
```

- [x] Sauvegarder le fichier

---

## 15.2 Créer l'API pour supprimer un article

### Étape 15.2.1 : Créer la route API de suppression

**A. Créer le fichier**

- [x] Créer le fichier `app/api/blog/delete/route.ts`

**B. Ajouter le code suivant**

```typescript
import { NextRequest, NextResponse } from "next/server";

interface DeleteData {
  slug: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: DeleteData = await request.json();

    // Vérification du mot de passe admin
    if (data.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    if (!data.slug) {
      return NextResponse.json(
        { error: "Slug de l'article requis" },
        { status: 400 }
      );
    }

    // Récupérer le SHA du fichier (requis par GitHub pour la suppression)
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${data.slug}.md`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!getFileResponse.ok) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    const fileData = await getFileResponse.json();

    // Supprimer le fichier sur GitHub
    const deleteResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${data.slug}.md`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Suppression article: ${data.slug}`,
          sha: fileData.sha,
          branch: "main",
        }),
      }
    );

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      console.error("[Blog API] Erreur GitHub:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la suppression sur GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article supprimé ! Le site se mettra à jour dans ~2 minutes.",
    });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

- [x] Sauvegarder le fichier

---

## 15.3 Créer l'API pour modifier un article

### Étape 15.3.1 : Créer la route API de modification

**A. Créer le fichier**

- [x] Créer le fichier `app/api/blog/update/route.ts`

**B. Ajouter le code suivant**

```typescript
import { NextRequest, NextResponse } from "next/server";

interface UpdateData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: UpdateData = await request.json();

    // Vérification du mot de passe admin
    if (data.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    if (!data.slug || !data.title || !data.content || !data.excerpt) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Récupérer le SHA du fichier existant
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${data.slug}.md`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!getFileResponse.ok) {
      return NextResponse.json(
        { error: "Article non trouvé" },
        { status: 404 }
      );
    }

    const fileData = await getFileResponse.json();

    // Créer le nouveau contenu Markdown
    const markdownContent = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${data.date}"
author: "OIKO Gestion"
category: "${data.category || "actualites"}"
---

${data.content}
`;

    // Encoder le contenu en base64
    const contentBase64 = Buffer.from(markdownContent).toString("base64");

    // Mettre à jour le fichier sur GitHub
    const updateResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${data.slug}.md`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Modification article: ${data.title}`,
          content: contentBase64,
          sha: fileData.sha,
          branch: "main",
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error("[Blog API] Erreur GitHub:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la modification sur GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article modifié ! Le site se mettra à jour dans ~2 minutes.",
    });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

- [x] Sauvegarder le fichier

---

## 15.4 Mettre à jour la page admin

### Étape 15.4.1 : Ajouter la liste des articles et les actions

**A. Remplacer le contenu de `app/admin/page.tsx`**

- [x] Ouvrir le fichier `app/admin/page.tsx`

**B. Remplacer par le code suivant**

```tsx
"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  content?: string;
}

type Mode = "create" | "edit" | "list";

export default function AdminPage() {
  const [mode, setMode] = useState<Mode>("list");
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    category: "actualites",
    date: "",
    password: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Charger les articles
  const loadArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/blog/articles");
      const data = await response.json();
      setArticles(data.posts || []);
    } catch {
      console.error("Erreur chargement articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      category: "actualites",
      date: "",
      password: formData.password,
    });
    setStatus("idle");
    setMessage("");
  };

  // Créer un article
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        resetForm();
        setMode("list");
        // Recharger après un délai (le fichier met du temps à apparaître)
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Modifier un article
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setMode("list");
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Supprimer un article
  const handleDelete = async (slug: string) => {
    if (!formData.password) {
      setMessage("Entrez le mot de passe admin d'abord");
      setStatus("error");
      return;
    }

    if (!confirm(`Voulez-vous vraiment supprimer l'article "${slug}" ?`)) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/blog/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password: formData.password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setTimeout(loadArticles, 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch {
      setStatus("error");
      setMessage("Erreur de connexion au serveur");
    }
  };

  // Charger un article pour modification
  const handleEdit = async (article: BlogPost) => {
    // Récupérer le contenu complet de l'article
    try {
      const response = await fetch(`/api/blog/articles?slug=${article.slug}`);
      const data = await response.json();

      setFormData({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: data.content || "",
        category: article.category,
        date: article.date,
        password: formData.password,
      });
      setMode("edit");
      setStatus("idle");
      setMessage("");
    } catch {
      setMessage("Erreur lors du chargement de l'article");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Administration du Blog
          </h1>
          {mode !== "list" && (
            <button
              onClick={() => { setMode("list"); resetForm(); }}
              className="px-4 py-2 text-muted hover:text-foreground"
            >
              ← Retour à la liste
            </button>
          )}
        </div>

        {/* Mot de passe global */}
        <div className="mb-6 p-4 bg-surface rounded-lg border border-border">
          <label className="block text-sm font-medium text-foreground mb-2">
            Mot de passe admin (requis pour toutes les actions)
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full max-w-xs px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            placeholder="Entrez le mot de passe"
          />
        </div>

        {/* Message de statut */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              status === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* MODE: Liste des articles */}
        {mode === "list" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Articles existants ({articles.length})
              </h2>
              <button
                onClick={() => { setMode("create"); resetForm(); }}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                + Nouvel article
              </button>
            </div>

            {loading ? (
              <p className="text-muted">Chargement...</p>
            ) : articles.length === 0 ? (
              <p className="text-muted">Aucun article pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div
                    key={article.slug}
                    className="p-4 bg-surface rounded-lg border border-border flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{article.title}</h3>
                      <p className="text-sm text-muted mt-1">{article.excerpt}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted">
                        <span>📅 {article.date}</span>
                        <span>📁 {article.category}</span>
                        <span>🔗 {article.slug}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(article)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(article.slug)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* MODE: Créer / Modifier un article */}
        {(mode === "create" || mode === "edit") && (
          <form onSubmit={mode === "create" ? handleCreate : handleUpdate} className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">
              {mode === "create" ? "Nouvel article" : `Modifier: ${formData.title}`}
            </h2>

            {/* Titre */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Titre de l'article
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
                placeholder="Ex: 5 conseils pour investir dans l'immobilier"
                required
              />
            </div>

            {/* Extrait */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Extrait (résumé court)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
                rows={2}
                placeholder="Résumé de l'article en 1-2 phrases"
                required
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground"
              >
                <option value="actualites">Actualités</option>
                <option value="conseils">Conseils</option>
                <option value="immobilier">Immobilier</option>
              </select>
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Contenu (Markdown supporté)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg bg-surface text-foreground font-mono text-sm"
                rows={15}
                placeholder="Écrivez votre article ici..."
                required
              />
            </div>

            {/* Bouton submit */}
            <button
              type="submit"
              disabled={status === "loading" || !formData.password}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {status === "loading"
                ? "En cours..."
                : mode === "create"
                ? "Publier l'article"
                : "Enregistrer les modifications"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
```

- [x] Sauvegarder le fichier

---

### Étape 15.4.2 : Mettre à jour l'API articles pour récupérer le contenu

**A. Modifier `app/api/blog/articles/route.ts`**

- [x] Remplacer le contenu par :

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // Si un slug est fourni, retourner l'article complet avec son contenu
    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    // Sinon retourner la liste de tous les articles
    const posts = getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des articles" },
      { status: 500 }
    );
  }
}
```

- [x] Sauvegarder le fichier

---

## 15.5 Tests de la gestion des articles

### Étape 15.5.1 : Tester les fonctionnalités

- [x] Lancer `npm run dev`
- [x] Aller sur http://localhost:3000/admin
- [x] Entrer le mot de passe admin
- [x] Vérifier que la liste des articles s'affiche
- [x] Cliquer sur "Nouvel article" → créer un article de test
- [x] Vérifier que l'article apparaît dans la liste
- [x] Cliquer sur "Modifier" → modifier le titre
- [x] Vérifier que la modification est prise en compte
- [x] Cliquer sur "Supprimer" → confirmer la suppression
- [x] Vérifier que l'article est supprimé

---

## ✅ Checkpoint Phase 15

- [x] API liste articles fonctionnelle (`/api/blog/articles`)
- [x] API suppression fonctionnelle (`/api/blog/delete`)
- [x] API modification fonctionnelle (`/api/blog/update`)
- [x] Page admin mise à jour avec liste, création, modification, suppression
- [x] Tests de toutes les fonctionnalités passés

---

# Phase 16 - Points à revoir

**Objectif :** Liste des éléments en attente avant mise en production.

**Prérequis :** Phases précédentes terminées

---

## 16.1 Contenus légaux à compléter

- [ ] **Page CGU** (`app/cgu/page.tsx`) → ajouter le contenu réel
- [ ] **Page RGPD** (`app/politique-rgpd/page.tsx`) → ajouter le contenu réel
- [ ] **Page Mentions Légales** (`app/mentions-legales/page.tsx`) → vérifier les infos (SIRET, hébergeur...)

---

## 16.2 Fonctionnalités à finaliser

- [ ] **Liens réseaux sociaux** → mettre les vrais liens (actuellement vers page connexion)
- [ ] **Numéro de téléphone Paris** → ajouter le numéro dans `content/contact.json` (section offices → Paris)
- [ ] **Formulaire de contact** → relier à un backend pour l'envoi d'emails

---

## 16.3 Authentification utilisateur (pour plus tard)

La page `/connexion` existe déjà (`app/connexion/page.tsx`) mais n'est pas fonctionnelle.

**Décision à prendre :**
- [ ] Si espace client nécessaire → implémenter l'authentification
- [ ] Si pas d'espace client → supprimer la page `/connexion`

**Si implémentation nécessaire :**
- [ ] **Système d'authentification** → NextAuth, Clerk ou autre solution
- [ ] **Base de données** → pour stocker les comptes utilisateurs
- [ ] **Espace propriétaires** → tableau de bord, documents, etc.
- [ ] **Espace locataires** → accès aux informations personnelles

💡 **Note :** Actuellement, seule l'administration du blog est protégée par mot de passe (via `/admin/login`). Un système d'authentification complet pour les clients nécessitera une base de données externe.

---

## 16.4 Vérifications production

- [ ] Performance Lighthouse (viser le vert)
- [ ] Tests responsive mobile
- [ ] Configuration domaine de production
- [ ] Variables d'environnement configurées sur l'hébergeur

---

## 16.5 Migration middleware vers proxy (Next.js 16+)

**Objectif :** Migrer le fichier `middleware.ts` vers la nouvelle convention "proxy" de Next.js.

- [x] Lire la documentation : https://nextjs.org/docs/messages/middleware-to-proxy
- [x] Renommer `middleware.ts` → `proxy.ts`
- [x] Renommer la fonction `middleware()` → `proxy()`

✅ **Terminé :** Le proxy fonctionne sur Node.js runtime (plus sécurisé que Edge).

---

## 16.6 Images des articles de blog

**Décision à prendre :** Comment gérer les images personnalisées pour chaque article ?

**Options possibles :**
- [ ] **Option 1 - Upload sur GitHub** : Stocker les images dans `public/images/blog/` via l'API GitHub (repo plus lourd)
- [ ] **Option 2 - Service externe** : Utiliser Cloudinary, Imgur ou autre pour héberger les images
- [ ] **Option 3 - URL manuelle** : Ajouter un champ URL dans le formulaire admin (images Unsplash, etc.)
- [ ] **Option 4 - Image par défaut uniquement** : Garder la même image pour tous les articles

💡 **État actuel :** Une image par défaut Unsplash est utilisée quand aucune image n'est définie.

---

## ✅ Checkpoint Phase 16

- [ ] Tous les contenus légaux sont validés
- [ ] Liens réseaux sociaux fonctionnels
- [ ] Formulaire de contact envoie des emails
- [ ] Authentification utilisateur documentée (pour plus tard)
- [ ] Site testé et prêt pour la production

---

## 🎉 Projet OIKO v2 complet !

Félicitations ! Vous avez complété toutes les phases du projet :

- ✅ Phase 1-8 : Fondations, Layout, Pages statiques, Thème, Animations
- ✅ Phase 9 : Page Location avec API Ubiflow
- ✅ Phase 10 : Page Vente
- ✅ Phase 11 : Filtres et Pages Détail
- ✅ Phase 12 : SEO & Performance
- ✅ Phase 13 : Contenus Légaux
- ✅ Phase 14 : Blog (optionnel)
- ✅ Phase 15 : Gestion des articles (Admin)
- ✅ Phase 16 : Points à revoir

---

**Dernière mise à jour :** 26 janvier 2026
**Document créé par :** Claude Code
