# Guide pas-à-pas - OIKO v2

**Phases couvertes :** 1 à 7
**Dernière mise à jour :** 19 janvier 2026

Ce guide contient toutes les étapes détaillées pour implémenter les 7 phases du projet OIKO v2. Chaque tâche est découpée en micro-étapes à suivre dans l'ordre.

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
| **Total** | **373/373 (100%)** | |

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
- Phase 8 : Intégration API (en attente de l'API)
- Phase 9 : Pages Vente/Location (dépend de Phase 8)
- Phase 10 : Authentification (dépend de Phase 8)

---

**Dernière mise à jour :** 20 janvier 2026
**Document créé par :** Claude Code
