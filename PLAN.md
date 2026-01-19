# Plan d'implémentation - OIKO v2

**Dernière mise à jour :** 14 janvier 2026
**Statut :** Phase 1 - En cours

---

## 🎯 Objectif du projet

Refonte complète du site web OIKO (secteur immobilier) avec une architecture moderne Next.js 16, TypeScript strict et Tailwind CSS 4. Le site doit être facilement maintenable par des développeurs juniors et permettre aux non-développeurs de modifier le contenu textuel.

---

## 📊 Vue d'ensemble

**Total estimé :** 18-24 heures (sans Phase 9 - API)
**Composants à créer :** 23
**Pages à compléter :** 6

### Progression globale

- [x] Phase 1 - Configuration et fondations (2-3h) ✅
- [x] Phase 2 - Layout global (3-4h) ✅
- [x] Phase 3 - Page Accueil (2-3h) ✅
- [x] Phase 4 - Page Activités (2-3h) ✅
- [x] Phase 5 - Page À propos (4-5h) ✅
- [x] Phase 6 - Page Contact (2-3h) ✅
- [ ] Phase 7 - Esthétique / Thème (2-3h)
- [ ] Phase 8 - Intégration API (TBD - en attente)
- [ ] Phase 9 - Pages Vente/Location (2h - dépend Phase 8)
- [ ] Phase 10 - Authentification / Connexion (TBD - dépend Phase 8)

---

## 🎨 Spécifications design

### Couleurs
- **Fond global** : `#F5F5F5` (gris très clair)
- **Texte** : `#1F1F1F` (quasi noir)
- **Sections** : `#FFFFFF` (blanc)

### Structure de navigation
```
┌─────────────────────────────────────────┐
│ HEADER (blanc)                          │
│ - Logo à gauche                         │
│ - Réseaux sociaux (centre-droite)      │
│ - Bouton connexion à droite             │
├─────────────────────────────────────────┤
│ NAVBAR (sticky, blanc)                  │
│ - 6 liens : Accueil, Activités,        │
│   À propos, Vente, Location, Contact   │
│ - Logo apparaît au scroll               │
├─────────────────────────────────────────┤
│ PAGE ANCHORS (pages longues)           │
│ - Navigation interne non-sticky        │
│ - Style: liens horizontaux              │
└─────────────────────────────────────────┘
   Contenu de la page

┌─────────────────────────────────────────┐
│ FOOTER (blanc, sobre, délimité)        │
└─────────────────────────────────────────┘
```

### Fonctionnalités spéciales
- Bouton "Retour en haut" qui apparaît au scroll
- Logo dans navbar apparaît quand header n'est plus visible
- Barre d'ancres sur pages Activités et À propos
- Scroll offset pour éviter que navbar cache les titres

---

## Phase 1 - Configuration et fondations 🔴

**Priorité :** Urgente
**Durée estimée :** 2-3h
**Statut :** 🟡 En cours

### 1.1 Configuration Tailwind

- [ ] Mettre à jour `globals.css` avec les variables de couleurs
  ```css
  :root {
    --background: #F5F5F5;
    --foreground: #1F1F1F;
    --card: #FFFFFF;
  }
  ```
- [ ] Configurer les classes de scroll-margin pour les ancres

### 1.2 Conversion TypeScript

- [x] Renommer `Header.jsx` → `Header.tsx`
- [x] Renommer `ButtonLink.jsx` → `ButtonLink.tsx`
- [x] Renommer `Navbar.jsx` → `Navbar.tsx`
- [ ] Ajouter les types TypeScript manquants aux composants existants

### 1.3 Composants UI de base (5 composants)

- [ ] **Button** - Bouton réutilisable avec variants (primary, secondary, outline)
- [ ] **Section** - Container de section avec padding cohérent
- [ ] **Card** - Carte de contenu avec ombre et bordure
- [ ] **Stats** - Affichage de statistiques (nombre + label)
- [ ] **ScrollToTop** - Bouton retour en haut (apparaît au scroll)

**Localisation :** `components/ui/`

---

## Phase 2 - Layout global 🟠

**Priorité :** Haute
**Durée estimée :** 3-4h
**Statut :** ⏳ À faire

### 2.1 Mise à jour Header

- [ ] Ajouter les icônes réseaux sociaux (centre-droite)
- [ ] Repositionner le bouton connexion (droite)
- [ ] Assurer le fond blanc et bon spacing
- [ ] Rendre responsive (mobile)

### 2.2 Mise à jour Navbar

- [ ] Implémenter la logique "logo apparaît au scroll"
  - Détection scroll avec `useState` + `useEffect`
  - Transition smooth pour l'apparition du logo
- [ ] Les 6 liens sont déjà en place (vérifier)
- [ ] S'assurer que sticky fonctionne correctement
- [ ] Version mobile responsive

### 2.3 Nouveau composant PageAnchors

- [ ] Créer `components/PageAnchors.tsx`
- [ ] Props: `anchors: Array<{id: string, label: string}>`
- [ ] Style: fond blanc, bordure bas, liens horizontaux
- [ ] Smooth scroll vers les sections
- [ ] Highlight du lien actif selon scroll position
- [ ] Responsive: scroll horizontal sur mobile

### 2.4 Créer Footer

- [x] Créer `footer.json` avec labels (sans liens)
- [ ] Créer `components/Footer.tsx`
- [ ] Mapping des labels vers les liens dans le composant
- [ ] Design sobre avec délimitation claire
- [ ] Sections : Navigation, Activités, Locataires, Adresses
- [ ] Responsive

**Fichiers concernés :**
- `components/Header.tsx`
- `components/Navbar.tsx`
- `components/PageAnchors.tsx` (nouveau)
- `components/Footer.tsx` (nouveau)
- `content/footer.json` ✅

---

## Phase 3 - Page Accueil 🟡

**Priorité :** Moyenne
**Durée estimée :** 2-3h
**Statut :** ⏳ À faire

### 3.1 Composants spécifiques (4 composants)

- [ ] **Hero** - Section principale avec titre, description, CTA
- [ ] **ServicesGrid** - Grille des 4 services (Property, Asset, Project, Transaction)
- [ ] **HighlightsSection** - 3 highlights (OIKO TECH, CARRIERE, UNE)
- [ ] **ActivitiesPreview** - Aperçu des activités avec stats

**Localisation :** `components/accueil/`

### 3.2 Implémentation page

- [ ] Importer le contenu de `accueil.json`
- [ ] Composer la page avec les 4 composants
- [ ] Vérifier responsive (mobile, tablette, desktop)
- [ ] Tester les liens vers autres pages

**Fichiers concernés :**
- `app/page.tsx`
- `content/accueil.json` ✅

---

## Phase 4 - Page Activités 🟡

**Priorité :** Moyenne
**Durée estimée :** 2-3h
**Statut :** ⏳ À faire

### 4.1 Composants spécifiques (2 composants)

- [ ] **ActivitySection** - Section réutilisable pour chaque activité
  - Titre, subtitle, description
  - Features list
  - Paragraphes
  - Stats
- [ ] **FeaturesList** - Liste de caractéristiques avec icônes

**Localisation :** `components/activites/`

### 4.2 Implémentation page

- [ ] Importer le contenu de `activites.json`
- [ ] Ajouter **PageAnchors** avec les 4 sections
- [ ] Créer les 4 sections (Property, Asset, Project, Transaction)
- [ ] Ajouter IDs pour les ancres (`id="property-management"`, etc.)
- [ ] Configurer scroll-margin pour offset navbar
- [ ] Vérifier responsive

**Fichiers concernés :**
- `app/activites/page.tsx`
- `content/activites.json` ✅

---

## Phase 5 - Page À propos 🟡

**Priorité :** Moyenne
**Durée estimée :** 4-5h
**Statut :** ⏳ À faire

### 5.1 Composants spécifiques (6 composants)

- [ ] **Timeline** - Frise chronologique 2017-2024 (8 étapes)
- [ ] **ToolsGrid** - Grille des 7 outils digitaux
- [ ] **VideoSection** - Section avec vidéo présentation
- [ ] **TestimonialsCarousel** - Carrousel de témoignages
- [ ] **JobsGrid** - Grille des 6 métiers avec profils
- [ ] **BarometreCard** - Carte baromètre expérience salarié

**Localisation :** `components/a-propos/`

### 5.2 Implémentation page

- [ ] Importer le contenu de `a-propos.json`
- [ ] Ajouter **PageAnchors** avec sections (Histoire, Outils, Présentation, Métiers)
- [ ] Implémenter toutes les sections avec leurs IDs
- [ ] Configurer scroll-margin
- [ ] Vérifier responsive

**Fichiers concernés :**
- `app/a-propos-de-nous/page.tsx`
- `content/a-propos.json` ✅

---

## Phase 6 - Page Contact 🟢

**Priorité :** Basse
**Durée estimée :** 2-3h
**Statut :** ⏳ À faire

### 6.1 Composants spécifiques (4 composants)

- [ ] **ContactForm** - Formulaire complet
- [ ] **FormField** - Champ générique (input, textarea, select, checkbox)
- [ ] **AddressCard** - Carte adresse bureau (Paris, Marseille)
- [ ] **ContactInfo** - Affichage email et téléphone

**Localisation :** `components/contact/`

### 6.2 Implémentation page

- [ ] Importer le contenu de `contact.json`
- [ ] Formulaire avec tous les champs (prénom, nom, email, tél, objet, message)
- [ ] Checkbox callback + RGPD
- [ ] Captcha simple
- [ ] Section adresses (2 bureaux)
- [ ] Section contact (email + tél)
- [ ] Validation formulaire (côté client)
- [ ] Vérifier responsive

**Fichiers concernés :**
- `app/contactez-nous/page.tsx`
- `content/contact.json` ✅

---

## Phase 7 - Esthétique / Thème 🟢

**Priorité :** Moyenne
**Durée estimée :** 2-3h
**Statut :** ⏳ À faire

### Tâches

- [ ] Ajouter la couleur verte OIKO (`#2ECC71`) comme accent
- [ ] Boutons, icônes, focus, hover en vert
- [ ] Thème sombre (optionnel)
- [ ] Animations et transitions

**Note :** Cette phase peut être réalisée indépendamment de l'API.

---

## Phase 8 - Intégration API 🟡

**Priorité :** Haute
**Durée estimée :** TBD
**Statut :** ⏳ En attente de l'API

### Prérequis

- API externe disponible et documentée
- Clés d'API et credentials

### Tâches

- [ ] Créer dossier `lib/api/`
- [ ] Créer les types TypeScript pour `Property`
  ```typescript
  interface Property {
    id: string;
    title: string;
    price: number;
    location: string;
    rooms: number;
    surface: number;
    type: 'vente' | 'location';
    images: string[];
  }
  ```
- [ ] Fonction `getProperties(filters)` pour fetch API
- [ ] Gestion du loading et des erreurs
- [ ] Tests avec données réelles

**Localisation :**
- `lib/api/properties.ts` (nouveau)
- `types/property.ts` (nouveau)

**Note :** Cette phase est le socle pour les phases 9 et 10. Elle doit être complétée en premier.

---

## Phase 9 - Pages Vente/Location 🟢

**Priorité :** Moyenne
**Durée estimée :** 2h
**Statut :** ⏳ En attente de la Phase 8

### 9.1 Composants spécifiques (4 composants)

- [ ] **SearchFilters** - Filtres de recherche
  - Localisation
  - Type de bien
  - Pièces
  - Budget
- [ ] **PropertyCard** - Carte bien immobilier
- [ ] **PropertyList** - Liste de biens
- [ ] **EmptyState** - Message si aucun résultat

**Localisation :** `components/recherche/`

### 9.2 Implémentation pages

- [ ] Page Vente : importer `vente.json` + données API
- [ ] Page Location : importer `location.json` + données API
- [ ] Formulaire de recherche avec tous les filtres
- [ ] Affichage des biens depuis l'API
- [ ] Vérifier responsive

**Fichiers concernés :**
- `app/vente/page.tsx`
- `app/location/page.tsx`
- `content/vente.json` ✅
- `content/location.json` ✅

**Dépendance :** Phase 8 (API) doit être terminée

---

## Phase 10 - Authentification / Connexion 🟢

**Priorité :** Moyenne
**Durée estimée :** TBD
**Statut :** ⏳ En attente de la Phase 8

### 10.1 Pages à créer

- [ ] `/connexion` - Page de connexion
- [ ] `/inscription` - Page d'inscription
- [ ] `/mot-de-passe-oublie` - Page de récupération

### 10.2 Composants spécifiques

- [ ] **LoginForm** - Formulaire de connexion (email + mot de passe)
- [ ] **RegisterForm** - Formulaire d'inscription (prénom, nom, email, téléphone, mot de passe)
- [ ] **ResetPasswordForm** - Formulaire de récupération (email ou téléphone)
- [ ] **AuthCard** - Card centrée pour les formulaires d'auth

**Localisation :** `components/auth/`

### 10.3 Fonctionnalités

- [ ] Connexion avec email + mot de passe
- [ ] Inscription avec téléphone obligatoire (pour récupération)
- [ ] Récupération par email OU par téléphone
- [ ] Intégration avec l'API d'authentification

**Fichiers concernés :**
- `app/connexion/page.tsx`
- `app/inscription/page.tsx`
- `app/mot-de-passe-oublie/page.tsx`
- `content/auth.json` (labels)

**Dépendance :** Phase 8 (API) doit être terminée

**Note :** Les détails du parcours de récupération de compte sont encore à définir.

---

## 📝 Décisions techniques importantes

### 2026-01-14 : Gestion du contenu
**Décision :** Séparer le contenu textuel (JSON) de la structure et des liens (composants TypeScript).

**Raison :**
- Les non-développeurs peuvent modifier les textes sans risque de casser la navigation
- Les liens restent contrôlés par les développeurs
- Meilleure maintenabilité

**Implémentation :**
- Labels et textes → fichiers JSON dans `content/`
- Routes et liens → mappings hardcodés dans les composants
- Exemple : `footer.json` contient "Accueil", `Footer.tsx` mappe vers "/"

### 2026-01-14 : Architecture des composants
**Décision :** Organisation par contexte plutôt que par type.

**Structure :**
```
components/
├── ui/              # Composants réutilisables
├── layout/          # Header, Navbar, Footer
├── accueil/         # Composants spécifiques page Accueil
├── activites/       # Composants spécifiques page Activités
└── ...
```

**Raison :** Facilite la navigation et la maintenance du code.

### 2026-01-14 : Fichier .clinerules
**Décision :** Création d'un fichier `.clinerules` à la racine avec toutes les conventions du projet.

**Contenu :**
- Stack technique obligatoire
- Design system
- Conventions de code
- Règles de gestion du contenu
- Best practices

**Avantage :** Claude lira automatiquement ces règles au début de chaque nouvelle conversation.

---

## 📋 État actuel du projet

### ✅ Fait

**Fichiers de contenu JSON (7) :**
- `content/accueil.json`
- `content/activites.json`
- `content/a-propos.json`
- `content/contact.json`
- `content/location.json`
- `content/vente.json`
- `content/footer.json`

**Composants de base (3) :**
- `components/Header.tsx` (à améliorer)
- `components/Navbar.tsx` (à améliorer)
- `components/ButtonLink.tsx` (à typer)

**Configuration :**
- `.clinerules` créé avec toutes les conventions
- `README.md` mis à jour avec le plan complet

**Pages (6 - placeholders) :**
- `/` (Accueil)
- `/activites`
- `/a-propos-de-nous`
- `/contactez-nous`
- `/location`
- `/vente`

### 🔴 Manquant - Priorité haute

- Footer complet
- 5 composants UI de base (Button, Section, Card, Stats, ScrollToTop)
- Configuration Tailwind avec bonnes couleurs
- Types TypeScript pour tous les composants

### 🟡 Manquant - Priorité moyenne

- 18 composants spécifiques aux pages
- Implémentation complète des 6 pages
- PageAnchors component
- Logique de scroll pour navbar

---

## 🎯 Prochaines étapes

### Immédiatement (Phase 1)
1. Mettre à jour `globals.css` avec les bonnes couleurs
2. Ajouter les types TypeScript à `ButtonLink.tsx`
3. Créer les 5 composants UI de base dans `components/ui/`

### Ensuite (Phase 2)
4. Améliorer Header avec réseaux sociaux
5. Améliorer Navbar avec logo au scroll
6. Créer Footer complet
7. Créer PageAnchors

### Puis (Phases 3-7)
8. Implémenter les pages une par une
9. Tester responsive sur chaque page
10. Valider l'UX et le design

---

## 📊 Métriques de progression

**Composants créés :** 3/26 (11%)
**Pages complètes :** 0/6 (0%)
**Fichiers JSON :** 7/7 (100%)
**Configuration :** 2/3 (67%)

**Phase actuelle :** Phase 1 - Configuration et fondations
**Progression Phase 1 :** 2/6 items (33%)

---

## 📚 Ressources

- [Plan détaillé complet](C:\Users\quent\.claude\plans\stateful-beaming-steele.md)
- [README.md](README.md)
- [.clinerules](.clinerules)
- [Documentation Next.js 16](https://nextjs.org/docs)
- [Documentation Tailwind CSS 4](https://tailwindcss.com/docs)

---

**Dernière modification :** 14 janvier 2026
**Modifié par :** Claude Code
