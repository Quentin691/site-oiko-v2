# Guide pas-à-pas - OIKO v2

**Phases couvertes :** 1 à 6
**Dernière mise à jour :** 15 janvier 2026

Ce guide contient toutes les étapes détaillées pour implémenter les 6 phases du projet OIKO v2. Chaque tâche est découpée en micro-étapes à suivre dans l'ordre.

---

## 📊 Progression

| Phase | Progression | Statut |
|-------|-------------|--------|
| Phase 1 - Configuration et fondations | 65/65 (100%) | ✅ Terminée |
| Phase 2 - Layout global | 0/54 (0%) | ⏳ À faire |
| Phase 3 - Page Accueil | 0/44 (0%) | ⏳ À faire |
| Phase 4 - Page Activités | 0/40 (0%) | ⏳ À faire |
| Phase 5 - Page À propos | 0/62 (0%) | ⏳ À faire |
| Phase 6 - Page Contact | 0/52 (0%) | ⏳ À faire |
| **Total** | **65/317 (21%)** | |

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

- [ ] Dans `components/`, créer un dossier `layout`
- [ ] Déplacer `Header.tsx` dans `components/layout/`
- [ ] Déplacer `Navbar.tsx` dans `components/layout/`
- [ ] Mettre à jour les imports dans `app/layout.tsx` :
  - Remplacer `import Header from "@/components/Header"` par `import Header from "@/components/layout/Header"`
  - Remplacer `import Navbar from "@/components/Navbar"` par `import Navbar from "@/components/layout/Navbar"`

💡 **Organisation :** On groupe tous les composants de layout ensemble.

⚠️ **Important :** Les imports doivent être mis à jour en même temps que le déplacement des fichiers, sinon le site ne compilera pas.

### Étape 2.1.2 : Ajouter les réseaux sociaux au Header

#### Sous-étape A : Préparer la structure
- [ ] Ouvrir `components/layout/Header.tsx`
- [ ] Identifier la div avec les réseaux sociaux (ligne 18)

#### Sous-étape B : Créer le composant d'icône social
- [ ] Avant la fonction `Header`, ajouter un composant helper :
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
- [ ] Remplacer `<p>réseaux sociaux</p>` par :
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
- [ ] En haut du fichier, vérifier que React est importé :
```typescript
import React from "react";
```

- [ ] Sauvegarder le fichier

⚠️ **Note :** Les URLs des réseaux sociaux sont des placeholders. Remplacer par les vraies URLs OIKO plus tard.

### Étape 2.1.3 : Améliorer le responsive

- [ ] Dans `Header.tsx`, modifier la div principale :
```typescript
<div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
```

💡 **Explication :** `flex-wrap sm:flex-nowrap` permet de passer à la ligne sur mobile si nécessaire.

- [ ] Pour la section réseaux + connexion, ajouter un wrapper responsive :
```typescript
<div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
  {/* réseaux sociaux */}
  <div className="hidden sm:flex items-center gap-4">
    {/* ... les SocialLink ... */}
  </div>

  <ButtonLink href="/connexion">
    Connexion
  </ButtonLink>
</div>
```

💡 **Explication :** `hidden sm:flex` cache les réseaux sociaux sur mobile mais les affiche sur écrans >= 640px.

- [ ] Sauvegarder le fichier

---

## 2.2 Mise à jour Navbar

### Étape 2.2.1 : Ajouter la logique de scroll

#### Sous-étape A : Préparer les imports
- [ ] Ouvrir `components/layout/Navbar.tsx`
- [ ] Vérifier que `"use client"` est en première ligne
- [ ] Ajouter les imports nécessaires :
```typescript
import { useState, useEffect } from "react";
```

#### Sous-étape B : Ajouter le state pour le scroll
- [ ] Dans la fonction `Navbar`, avant le `return`, ajouter :
```typescript
const [showLogo, setShowLogo] = useState(false);
```

#### Sous-étape C : Ajouter le useEffect pour détecter le scroll
- [ ] Après le state, ajouter :
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
- [ ] Modifier la div principale de la navbar pour inclure le logo :
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

- [ ] Sauvegarder le fichier

### Étape 2.2.2 : Améliorer le responsive de la navbar

⚠️ **Note :** Pour l'instant, on fait une version simple. Un menu burger mobile sera ajouté plus tard si nécessaire.

- [ ] Modifier les gaps pour mobile :
```typescript
<ul className="flex gap-4 sm:gap-8 md:gap-16 text-sm">
```

💡 **Explication :** Gap plus petit sur mobile, plus grand sur desktop.

- [ ] Optionnel : Cacher certains liens sur très petit écran :
```typescript
<li className="hidden sm:block"><Link href="/vente" className="hover:text-gray-500">Vente</Link></li>
<li className="hidden sm:block"><Link href="/location" className="hover:text-gray-500">Location</Link></li>
```

- [ ] Sauvegarder le fichier

---

## 2.3 Créer PageAnchors

### Étape 2.3.1 : Créer le fichier

- [ ] Dans `components/layout/`, créer `PageAnchors.tsx`
- [ ] Ajouter `"use client"` en première ligne
- [ ] Ajouter les imports :
```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
```

### Étape 2.3.2 : Définir l'interface

- [ ] Ajouter les interfaces :
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
- [ ] Ajouter le composant :
```typescript
export default function PageAnchors({ anchors }: PageAnchorsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // TODO: Détecter la section active au scroll

  return (
    <nav className="bg-card border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex gap-8 overflow-x-auto py-4">
          {anchors.map((anchor) => (
            <li key={anchor.id} className="flex-shrink-0">
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
- [ ] Remplacer le `// TODO` par :
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

- [ ] Sauvegarder le fichier

---

## 2.4 Créer Footer

### Étape 2.4.1 : Créer le fichier

- [ ] Dans `components/layout/`, créer `Footer.tsx`
- [ ] Ajouter les imports :
```typescript
import Link from "next/link";
import footerData from "@/content/footer.json";
```

### Étape 2.4.2 : Créer le mapping des liens

- [ ] Ajouter le mapping avant le composant :
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
- [ ] Ajouter le composant :
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
- [ ] Avant le composant Footer, ajouter :
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
- [ ] Remplacer les commentaires par les vraies colonnes :
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

- [ ] Sauvegarder le fichier

### Étape 2.4.4 : Ajouter Footer au layout principal

- [ ] Ouvrir `app/layout.tsx`
- [ ] Ajouter l'import :
```typescript
import Footer from "@/components/layout/Footer";
```
- [ ] Avant la balise fermante `</body>`, ajouter :
```typescript
<Footer />
```
- [ ] Sauvegarder le fichier

### Étape 2.4.5 : Mettre à jour les imports du Header et Navbar

- [ ] Ouvrir `app/layout.tsx`
- [ ] Modifier les imports :
```typescript
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
```
- [ ] Sauvegarder le fichier

---

## ✅ Checkpoint Phase 2

À ce stade, vous devriez avoir :
- [x] Header avec réseaux sociaux
- [x] Navbar avec logo qui apparaît au scroll
- [x] Composant PageAnchors fonctionnel
- [x] Footer complet avec mapping des liens
- [x] Tous les composants dans `components/layout/`

**Test visuel :**
- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000
- [ ] Vérifier que Header et Footer s'affichent
- [ ] Scroller et vérifier que le logo apparaît dans la navbar
- [ ] Vérifier le responsive (réduire la fenêtre)

---

# Phase 3 - Page Accueil

## 3.1 Créer les composants spécifiques

### Étape 3.1.1 : Créer le dossier

- [ ] Dans `components/`, créer un dossier `accueil`
- [ ] Vérifier le chemin : `components/accueil/`

### Étape 3.1.2 : Créer Hero.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/accueil/`, créer `Hero.tsx`
- [ ] Ajouter les imports :
```typescript
import { Button } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [ ] Ajouter l'interface :
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
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

- [ ] Sauvegarder le fichier

### Étape 3.1.3 : Créer ServicesGrid.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/accueil/`, créer `ServicesGrid.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
import Link from "next/link";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
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
- [ ] Ajouter le composant :
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

- [ ] Sauvegarder le fichier

### Étape 3.1.4 : Créer HighlightsSection.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/accueil/`, créer `HighlightsSection.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
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
- [ ] Ajouter le composant :
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

- [ ] Sauvegarder le fichier

### Étape 3.1.5 : Créer ActivitiesPreview.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/accueil/`, créer `ActivitiesPreview.tsx`
- [ ] Ajouter les imports :
```typescript
import { Stats, Button } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
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
- [ ] Ajouter le composant :
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

- [ ] Sauvegarder le fichier

### Étape 3.1.6 : Créer index.ts pour les exports

- [ ] Dans `components/accueil/`, créer `index.ts`
- [ ] Ajouter les exports :
```typescript
export { default as Hero } from "./Hero";
export { default as ServicesGrid } from "./ServicesGrid";
export { default as HighlightsSection } from "./HighlightsSection";
export { default as ActivitiesPreview } from "./ActivitiesPreview";
```
- [ ] Sauvegarder le fichier

---

## 3.2 Implémenter la page Accueil

### Étape 3.2.1 : Mettre à jour page.tsx

- [ ] Ouvrir `app/page.tsx`
- [ ] Remplacer tout le contenu par :
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

- [ ] Sauvegarder le fichier

### Étape 3.2.2 : Test visuel

- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000
- [ ] Vérifier que toutes les sections s'affichent
- [ ] Vérifier le responsive (mobile, tablette, desktop)
- [ ] Tester les liens des cartes services
- [ ] Scroller et vérifier que le bouton "Retour en haut" apparaît
- [ ] Cliquer sur le bouton pour tester le scroll vers le haut

---

## ✅ Checkpoint Phase 3

À ce stade, vous devriez avoir :
- [x] 4 composants créés dans `components/accueil/`
- [x] Page d'accueil complète avec toutes les sections
- [x] Bouton ScrollToTop fonctionnel
- [x] Design responsive
- [x] Tous les liens fonctionnels

**Vérifications :**
- [ ] Aucune erreur TypeScript
- [ ] Toutes les sections s'affichent correctement
- [ ] Le contenu provient bien de `accueil.json`
- [ ] Le responsive fonctionne sur tous les écrans

---

# Phase 4 - Page Activités

## 4.1 Créer les composants spécifiques

### Étape 4.1.1 : Créer le dossier

- [ ] Dans `components/`, créer un dossier `activites`
- [ ] Vérifier le chemin : `components/activites/`

### Étape 4.1.2 : Créer ActivitySection.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/activites/`, créer `ActivitySection.tsx`
- [ ] Ajouter les imports :
```typescript
import { Section, Card, Stats } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
```typescript
interface Feature {
  text: string;
}

interface Paragraph {
  title?: string;
  content: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ActivitySectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features?: Feature[];
  paragraphs?: Paragraph[];
  stats?: Stat[];
}
```

💡 **Explication :** Les `?` indiquent que ces props sont optionnelles.

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
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
          <p className="text-xl text-gray-600 mb-4">
            {subtitle}
          </p>
          <p className="text-gray-700">
            {description}
          </p>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Caractéristiques
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-foreground flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Paragraphes */}
        {paragraphs.length > 0 && (
          <div className="mb-12 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <div key={index}>
                {paragraph.title && (
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {paragraph.title}
                  </h3>
                )}
                <p className="text-gray-700 leading-relaxed">
                  {paragraph.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Stats key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
```

- [ ] Sauvegarder le fichier

### Étape 4.1.3 : Créer index.ts

- [ ] Dans `components/activites/`, créer `index.ts`
- [ ] Ajouter l'export :
```typescript
export { default as ActivitySection } from "./ActivitySection";
```
- [ ] Sauvegarder le fichier

---

## 4.2 Implémenter la page Activités

### Étape 4.2.1 : Mettre à jour la page

- [ ] Ouvrir `app/activites/page.tsx`
- [ ] Remplacer tout le contenu par :
```typescript
import { ActivitySection } from "@/components/activites";
import { PageAnchors } from "@/components/layout/PageAnchors";
import { ScrollToTop } from "@/components/ui";
import activitiesContent from "@/content/activites.json";

export default function ActivitiesPage() {
  // Définir les ancres pour PageAnchors
  const anchors = [
    { id: "property-management", label: "Property Management" },
    { id: "asset-management", label: "Asset Management" },
    { id: "project-management", label: "Project Management" },
    { id: "transaction", label: "Transaction" },
  ];

  return (
    <main>
      <PageAnchors anchors={anchors} />

      {/* Property Management */}
      <ActivitySection
        id="property-management"
        title={activitiesContent.propertyManagement.title}
        subtitle={activitiesContent.propertyManagement.subtitle}
        description={activitiesContent.propertyManagement.description}
        features={activitiesContent.propertyManagement.features}
        paragraphs={activitiesContent.propertyManagement.paragraphs}
        stats={activitiesContent.propertyManagement.stats}
      />

      {/* Asset Management */}
      <ActivitySection
        id="asset-management"
        title={activitiesContent.assetManagement.title}
        subtitle={activitiesContent.assetManagement.subtitle}
        description={activitiesContent.assetManagement.description}
        features={activitiesContent.assetManagement.features}
        paragraphs={activitiesContent.assetManagement.paragraphs}
        stats={activitiesContent.assetManagement.stats}
      />

      {/* Project Management */}
      <ActivitySection
        id="project-management"
        title={activitiesContent.projectManagement.title}
        subtitle={activitiesContent.projectManagement.subtitle}
        description={activitiesContent.projectManagement.description}
        features={activitiesContent.projectManagement.features}
        paragraphs={activitiesContent.projectManagement.paragraphs}
        stats={activitiesContent.projectManagement.stats}
      />

      {/* Transaction */}
      <ActivitySection
        id="transaction"
        title={activitiesContent.transaction.title}
        subtitle={activitiesContent.transaction.subtitle}
        description={activitiesContent.transaction.description}
        features={activitiesContent.transaction.features}
        paragraphs={activitiesContent.transaction.paragraphs}
        stats={activitiesContent.transaction.stats}
      />

      <ScrollToTop />
    </main>
  );
}
```

⚠️ **Important :** Le chemin de l'import PageAnchors doit être correct.

- [ ] Sauvegarder le fichier

### Étape 4.2.2 : Corriger l'import de PageAnchors

- [ ] Ouvrir `components/layout/PageAnchors.tsx`
- [ ] Vérifier qu'il n'y a pas d'export de dossier manquant
- [ ] Si besoin, créer `components/layout/index.ts` :
```typescript
export { default as Header } from "./Header";
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
export { default as PageAnchors } from "./PageAnchors";
```
- [ ] Sauvegarder le fichier

### Étape 4.2.3 : Mettre à jour l'import dans la page

- [ ] Retourner dans `app/activites/page.tsx`
- [ ] Modifier l'import :
```typescript
import PageAnchors from "@/components/layout/PageAnchors";
```
- [ ] Sauvegarder le fichier

### Étape 4.2.4 : Test visuel complet

- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000/activites
- [ ] Vérifier que PageAnchors s'affiche en haut
- [ ] Cliquer sur chaque lien d'ancre et vérifier le scroll
- [ ] Vérifier que le lien actif change selon le scroll
- [ ] Vérifier que les 4 sections s'affichent correctement
- [ ] Tester le responsive (mobile, tablette, desktop)
- [ ] Vérifier que le bouton ScrollToTop fonctionne

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
- [ ] Aucune erreur TypeScript
- [ ] Toutes les sections visibles
- [ ] Navigation par ancres fluide
- [ ] Contenu provient bien de `activites.json`
- [ ] Responsive OK sur mobile et desktop

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

- [ ] Dans `components/`, créer un dossier `a-propos`
- [ ] Vérifier le chemin : `components/a-propos/`

### Étape 5.1.2 : Créer Timeline.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/a-propos/`, créer `Timeline.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
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
- [ ] Ajouter le composant :
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
              <div className={`md:flex md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
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

- [ ] Sauvegarder le fichier

### Étape 5.1.3 : Créer ToolsGrid.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/a-propos/`, créer `ToolsGrid.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
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
- [ ] Ajouter le composant :
```typescript
export default function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Card key={tool.name} hover>
          <div className="flex items-start gap-4">
            {/* Icône placeholder */}
            <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center flex-shrink-0">
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

- [ ] Sauvegarder le fichier

### Étape 5.1.4 : Créer VideoSection.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/a-propos/`, créer `VideoSection.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [ ] Ajouter l'interface :
```typescript
interface VideoSectionProps {
  title: string;
  description: string;
  videoUrl?: string;
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
```typescript
export default function VideoSection({ title, description, videoUrl }: VideoSectionProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>

      <Card>
        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              className="w-full h-full rounded-lg"
              allowFullScreen
              title={title}
            />
          ) : (
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
          )}
        </div>
      </Card>
    </div>
  );
}
```

💡 **Explication :** Si pas de videoUrl, affiche un placeholder.

- [ ] Sauvegarder le fichier

### Étape 5.1.5 : Créer TestimonialsCarousel.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/a-propos/`, créer `TestimonialsCarousel.tsx`
- [ ] Ajouter `"use client"` en première ligne (composant interactif)
- [ ] Ajouter les imports :
```typescript
"use client";

import { useState } from "react";
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
```typescript
interface Testimonial {
  name: string;
  role: string;
  text: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
```typescript
export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <div className="relative px-8 py-6">
          {/* Citation */}
          <svg
            className="w-10 h-10 text-gray-300 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
            "{currentTestimonial.text}"
          </p>

          <div>
            <p className="font-semibold text-foreground">
              {currentTestimonial.name}
            </p>
            <p className="text-sm text-gray-600">
              {currentTestimonial.role}
            </p>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Témoignage précédent"
              >
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Indicateurs */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${
                      index === currentIndex ? "bg-foreground w-6" : "bg-gray-300"
                    }`}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Témoignage suivant"
              >
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
```

💡 **Explication :** Carrousel avec navigation manuelle et indicateurs.

- [ ] Sauvegarder le fichier

### Étape 5.1.6 : Créer JobsGrid.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/a-propos/`, créer `JobsGrid.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
```typescript
interface Job {
  title: string;
  description: string;
  profiles: string[];
}

interface JobsGridProps {
  jobs: Job[];
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
```typescript
export default function JobsGrid({ jobs }: JobsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <Card key={job.title}>
          <h3 className="text-xl font-semibold text-foreground mb-3">
            {job.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {job.description}
          </p>

          {job.profiles && job.profiles.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Profils recherchés :
              </h4>
              <ul className="space-y-1">
                {job.profiles.map((profile, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>{profile}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
```

- [ ] Sauvegarder le fichier

### Étape 5.1.7 : Créer BarometreCard.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/a-propos/`, créer `BarometreCard.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [ ] Ajouter l'interface :
```typescript
interface BarometreCardProps {
  score: number;
  description: string;
  year: string;
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
```typescript
export default function BarometreCard({ score, description, year }: BarometreCardProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Baromètre de l'expérience salarié
          </h3>

          <div className="inline-flex items-baseline gap-2 mb-4">
            <span className="text-6xl font-bold text-foreground">{score}</span>
            <span className="text-3xl text-gray-600">/ 100</span>
          </div>

          <p className="text-gray-600 mb-2">
            {description}
          </p>
          <p className="text-sm text-gray-500">
            Année {year}
          </p>

          {/* Barre de progression */}
          <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-foreground h-3 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
```

- [ ] Sauvegarder le fichier

### Étape 5.1.8 : Créer index.ts

- [ ] Dans `components/a-propos/`, créer `index.ts`
- [ ] Ajouter tous les exports :
```typescript
export { default as Timeline } from "./Timeline";
export { default as ToolsGrid } from "./ToolsGrid";
export { default as VideoSection } from "./VideoSection";
export { default as TestimonialsCarousel } from "./TestimonialsCarousel";
export { default as JobsGrid } from "./JobsGrid";
export { default as BarometreCard } from "./BarometreCard";
```
- [ ] Sauvegarder le fichier

---

## 5.2 Implémenter la page À propos

### Étape 5.2.1 : Mettre à jour la page

- [ ] Ouvrir `app/a-propos-de-nous/page.tsx`
- [ ] Remplacer tout le contenu par :
```typescript
import {
  Timeline,
  ToolsGrid,
  VideoSection,
  TestimonialsCarousel,
  JobsGrid,
  BarometreCard,
} from "@/components/a-propos";
import PageAnchors from "@/components/layout/PageAnchors";
import { Section, ScrollToTop } from "@/components/ui";
import aproposContent from "@/content/a-propos.json";

export default function AProposPage() {
  // Définir les ancres
  const anchors = [
    { id: "notre-histoire", label: "Notre histoire" },
    { id: "nos-outils", label: "Nos outils" },
    { id: "presentation", label: "Présentation" },
    { id: "nos-metiers", label: "Nos métiers" },
  ];

  return (
    <main>
      <PageAnchors anchors={anchors} />

      {/* Section Histoire */}
      <Section id="notre-histoire" background="white">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Notre histoire
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aproposContent.histoire.introduction}
          </p>
        </div>
        <Timeline events={aproposContent.histoire.timeline} />
      </Section>

      {/* Section Outils */}
      <Section id="nos-outils" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Nos outils digitaux
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {aproposContent.outils.description}
          </p>
        </div>
        <ToolsGrid tools={aproposContent.outils.liste} />
      </Section>

      {/* Section Présentation */}
      <Section id="presentation" background="white">
        <VideoSection
          title={aproposContent.presentation.title}
          description={aproposContent.presentation.description}
          videoUrl={aproposContent.presentation.videoUrl}
        />

        {aproposContent.temoignages && aproposContent.temoignages.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-foreground text-center mb-12">
              Témoignages
            </h3>
            <TestimonialsCarousel testimonials={aproposContent.temoignages} />
          </div>
        )}
      </Section>

      {/* Section Métiers */}
      <Section id="nos-metiers" background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Nos métiers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {aproposContent.metiers.description}
          </p>
        </div>
        <JobsGrid jobs={aproposContent.metiers.liste} />

        {aproposContent.barometre && (
          <div className="mt-16">
            <BarometreCard
              score={aproposContent.barometre.score}
              description={aproposContent.barometre.description}
              year={aproposContent.barometre.annee}
            />
          </div>
        )}
      </Section>

      <ScrollToTop />
    </main>
  );
}
```

- [ ] Sauvegarder le fichier

### Étape 5.2.2 : Test visuel complet

- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000/a-propos-de-nous
- [ ] Vérifier que PageAnchors s'affiche
- [ ] Tester la navigation par ancres
- [ ] Vérifier la Timeline (alternance gauche/droite sur desktop)
- [ ] Vérifier la grille des outils (7 outils)
- [ ] Tester le carrousel de témoignages (flèches + indicateurs)
- [ ] Vérifier la grille des métiers (6 métiers)
- [ ] Vérifier le BarometreCard avec la barre de progression
- [ ] Tester le responsive sur mobile et tablette
- [ ] Vérifier que ScrollToTop fonctionne

---

## ✅ Checkpoint Phase 5

À ce stade, vous devriez avoir :
- [x] 6 composants créés dans `components/a-propos/`
- [x] Page À propos complète avec 4 sections
- [x] Timeline avec alternance gauche/droite
- [x] Carrousel de témoignages interactif
- [x] BarometreCard avec barre de progression
- [x] PageAnchors fonctionnel
- [x] Design responsive

**Vérifications :**
- [ ] Aucune erreur TypeScript
- [ ] Toutes les sections visibles
- [ ] Carrousel fonctionnel
- [ ] Contenu provient de `a-propos.json`
- [ ] Responsive OK

---

# Phase 6 - Page Contact

## 6.1 Créer les composants spécifiques

### Étape 6.1.1 : Créer le dossier

- [ ] Dans `components/`, créer un dossier `contact`
- [ ] Vérifier le chemin : `components/contact/`

### Étape 6.1.2 : Créer FormField.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/contact/`, créer `FormField.tsx`
- [ ] Ajouter les imports :
```typescript
import { ReactNode } from "react";
```

#### Sous-étape B : Définir les interfaces
- [ ] Ajouter les interfaces :
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

- [ ] Sauvegarder le fichier

### Étape 6.1.3 : Créer ContactForm.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/contact/`, créer `ContactForm.tsx`
- [ ] Ajouter `"use client"` en première ligne
- [ ] Ajouter les imports :
```typescript
"use client";

import { useState, FormEvent } from "react";
import { Card, Button } from "@/components/ui";
import FormField from "./FormField";
```

#### Sous-étape B : Définir l'interface
- [ ] Ajouter l'interface :
```typescript
interface ContactFormProps {
  subjects: string[];
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
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

- [ ] Sauvegarder le fichier

### Étape 6.1.4 : Créer AddressCard.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/contact/`, créer `AddressCard.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [ ] Ajouter l'interface :
```typescript
interface Address {
  ville: string;
  rue: string;
  codePostal: string;
  pays: string;
  telephone: string;
}

interface AddressCardProps {
  address: Address;
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
```typescript
export default function AddressCard({ address }: AddressCardProps) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        {/* Icône localisation */}
        <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center flex-shrink-0">
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

- [ ] Sauvegarder le fichier

### Étape 6.1.5 : Créer ContactInfo.tsx

#### Sous-étape A : Créer le fichier
- [ ] Dans `components/contact/`, créer `ContactInfo.tsx`
- [ ] Ajouter les imports :
```typescript
import { Card } from "@/components/ui";
```

#### Sous-étape B : Définir l'interface
- [ ] Ajouter l'interface :
```typescript
interface ContactInfoProps {
  email: string;
  phone: string;
}
```

#### Sous-étape C : Implémenter le composant
- [ ] Ajouter le composant :
```typescript
export default function ContactInfo({ email, phone }: ContactInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Email */}
      <Card hover>
        <a href={`mailto:${email}`} className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center flex-shrink-0">
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
          <div className="w-12 h-12 rounded-lg bg-foreground flex items-center justify-center flex-shrink-0">
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

- [ ] Sauvegarder le fichier

### Étape 6.1.6 : Créer index.ts

- [ ] Dans `components/contact/`, créer `index.ts`
- [ ] Ajouter les exports :
```typescript
export { default as ContactForm } from "./ContactForm";
export { default as FormField } from "./FormField";
export { default as AddressCard } from "./AddressCard";
export { default as ContactInfo } from "./ContactInfo";
```
- [ ] Sauvegarder le fichier

---

## 6.2 Implémenter la page Contact

### Étape 6.2.1 : Mettre à jour la page

- [ ] Ouvrir `app/contactez-nous/page.tsx`
- [ ] Remplacer tout le contenu par :
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
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600">
            Une question ? Un projet ? N'hésitez pas à nous contacter, notre équipe vous répondra dans les plus brefs délais.
          </p>
        </div>

        {/* Contact info */}
        <div className="max-w-4xl mx-auto mb-16">
          <ContactInfo
            email={contactContent.contact.email}
            phone={contactContent.contact.telephone}
          />
        </div>

        {/* Formulaire */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Envoyez-nous un message
          </h2>
          <ContactForm subjects={contactContent.formulaire.objets} />
        </div>
      </Section>

      {/* Nos bureaux */}
      <Section background="gray">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Nos bureaux
          </h2>
          <p className="text-gray-600">
            Retrouvez-nous dans nos agences à Paris et Marseille
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactContent.adresses.map((address, index) => (
            <AddressCard key={index} address={address} />
          ))}
        </div>
      </Section>

      <ScrollToTop />
    </main>
  );
}
```

- [ ] Sauvegarder le fichier

### Étape 6.2.2 : Test visuel complet

- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000/contactez-nous
- [ ] Vérifier le titre et l'intro
- [ ] Cliquer sur l'email et le téléphone (doivent ouvrir les apps)
- [ ] Tester le formulaire :
  - [ ] Remplir tous les champs
  - [ ] Vérifier la validation (champs requis)
  - [ ] Tester le captcha
  - [ ] Soumettre le formulaire
  - [ ] Vérifier le message de succès
- [ ] Vérifier les 2 cartes d'adresses (Paris et Marseille)
- [ ] Tester le responsive
- [ ] Vérifier ScrollToTop

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
- [ ] Aucune erreur TypeScript
- [ ] Formulaire se soumet correctement
- [ ] Validation fonctionne
- [ ] Message de succès s'affiche
- [ ] Liens email/téléphone fonctionnels
- [ ] Contenu provient de `contact.json`
- [ ] Responsive OK

---

## 🎉 Phases 5-6 terminées !

Félicitations ! Vous avez maintenant complété :
- ✅ Phase 5 - Page À propos (6 composants)
- ✅ Phase 6 - Page Contact (4 composants)

**Total créé dans les phases 5-6 :**
- 10 nouveaux composants
- 2 pages complètes et interactives
- Carrousel de témoignages
- Formulaire de contact avec validation
- Timeline visuelle

**Récapitulatif complet (Phases 1-6) :**
- 19 composants créés au total
- 4 pages complètes fonctionnelles (Accueil, Activités, À propos, Contact)
- Layout global complet (Header, Navbar, Footer, PageAnchors)
- Design system cohérent

**Prochaine étape (Phase 7) :**
- Phase 7 : Page Connexion (simple, 1h de travail)

---

**Dernière mise à jour :** 14 janvier 2026
**Document créé par :** Claude Code
