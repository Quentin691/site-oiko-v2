# Site OIKO v2

Refonte du site OIKO - Application Next.js 16.1.1 avec TypeScript et Tailwind CSS 4

## 🎯 Technologies

- **Next.js** 16.1.1 (App Router)
- **React** 19.2.3
- **TypeScript** 5 (mode strict)
- **Tailwind CSS** 4
- **ESLint** 9

## 🎨 Design

### Couleurs
- **Fond global** : `#F5F5F5` (gris très clair)
- **Texte** : `#1F1F1F` (quasi noir)
- **Sections** : `#FFFFFF` (blanc)

### Structure
- **Header** : Logo à gauche, réseaux sociaux centre-droite, bouton connexion à droite
- **Navbar** : Sticky, 6 liens, logo apparaît au scroll
- **PageAnchors** : Navigation interne non-sticky pour pages longues
- **Footer** : Sobre, délimité, fond blanc

## 📋 Plan d'implémentation

### **Phase 1 - Configuration et fondations** 🔴 (2-3h)

#### 1.1 Configuration Tailwind
- [ ] Mettre à jour `globals.css` avec les variables de couleurs
- [ ] Configurer les classes de scroll-margin pour les ancres

#### 1.2 Conversion TypeScript
- [x] Renommer composants en `.tsx` (Header, Navbar, ButtonLink)
- [ ] Ajouter les types TypeScript manquants

#### 1.3 Composants UI de base (5 composants)
- [ ] **Button** - Bouton réutilisable avec variants
- [ ] **Section** - Container de section avec padding cohérent
- [ ] **Card** - Carte de contenu avec ombre et bordure
- [ ] **Stats** - Affichage de statistiques
- [ ] **ScrollToTop** - Bouton retour en haut qui apparaît au scroll

---

### **Phase 2 - Layout global** 🟠 (3-4h)

#### 2.1 Mise à jour Header
- [ ] Ajouter les icônes réseaux sociaux
- [ ] Repositionner le bouton connexion
- [ ] Rendre responsive

#### 2.2 Mise à jour Navbar
- [ ] Implémenter la logique "logo apparaît au scroll"
- [ ] Assurer le responsive

#### 2.3 Nouveau composant PageAnchors
- [ ] Créer `components/PageAnchors.tsx`
- [ ] Props: `anchors: Array<{id: string, label: string}>`
- [ ] Smooth scroll + highlight du lien actif
- [ ] Responsive: scroll horizontal sur mobile

#### 2.4 Créer Footer
- [x] Créer `footer.json`
- [ ] Créer `components/Footer.tsx`
- [ ] Design sobre avec délimitation claire
- [ ] Responsive

---

### **Phase 3 - Page Accueil** 🟡 (2-3h)

#### 3.1 Composants spécifiques
- [ ] **Hero** - Section principale
- [ ] **ServicesGrid** - Grille des 4 services
- [ ] **HighlightsSection** - OIKO TECH/CARRIERE/UNE
- [ ] **ActivitiesPreview** - Aperçu activités avec stats

#### 3.2 Implémentation page
- [ ] Importer le contenu de `accueil.json`
- [ ] Composer la page avec les 4 composants
- [ ] Vérifier responsive

---

### **Phase 4 - Page Activités** 🟡 (2-3h)

#### 4.1 Composants spécifiques
- [ ] **ActivitySection** - Section réutilisable x4
- [ ] **FeaturesList** - Liste caractéristiques

#### 4.2 Implémentation page
- [ ] Importer le contenu de `activites.json`
- [ ] Ajouter **PageAnchors** avec les 4 sections
- [ ] Ajouter IDs pour les ancres
- [ ] Configurer scroll-margin

---

### **Phase 5 - Page À propos** 🟡 (4-5h)

#### 5.1 Composants spécifiques
- [ ] **Timeline** - Frise chronologique 2017-2024
- [ ] **ToolsGrid** - Grille des 7 outils
- [ ] **VideoSection** - Section vidéo
- [ ] **TestimonialsCarousel** - Carrousel témoignages
- [ ] **JobsGrid** - Grille des 6 métiers
- [ ] **BarometreCard** - Carte baromètre salarié

#### 5.2 Implémentation page
- [ ] Importer le contenu de `a-propos.json`
- [ ] Ajouter **PageAnchors**
- [ ] Implémenter toutes les sections

---

### **Phase 6 - Page Contact** 🟢 (2-3h)

#### 6.1 Composants spécifiques
- [ ] **ContactForm** - Formulaire complet
- [ ] **FormField** - Champ générique
- [ ] **AddressCard** - Carte adresse (Paris, Marseille)
- [ ] **ContactInfo** - Email/téléphone

#### 6.2 Implémentation page
- [ ] Importer le contenu de `contact.json`
- [ ] Formulaire avec validation
- [ ] Section adresses et contact

---

### **Phase 7 - Page Connexion** 🟢 (1h)

- [ ] Créer `app/connexion/page.tsx`
- [ ] Formulaire simple (email + mot de passe)
- [ ] Design cohérent
- [ ] Fonctionnalité à implémenter plus tard

---

### **Phase 8 - Pages Vente/Location** 🟢 ⏸️ (2h - quand API dispo)

#### 8.1 Composants spécifiques
- [ ] **SearchFilters** - Filtres de recherche
- [ ] **EmptyState** - Message temporaire

#### 8.2 Implémentation pages
- [ ] Page Vente avec `vente.json`
- [ ] Page Location avec `location.json`
- [ ] Message en attendant l'API

---

### **Phase 9 - Intégration API** ⚪ (Plus tard)

- [ ] Créer dossier `lib/api/`
- [ ] Créer les types TypeScript pour `Property`
- [ ] Fonction `getProperties(filters)`
- [ ] **PropertyCard** et **PropertyList**
- [ ] Intégration complète

---

## 📊 Résumé

**Total : 23 composants à créer**
- 🔴 Urgent : 2 (Footer, Page connexion)
- 🟠 Haute : 3 (Section, Card, Stats)
- 🟡 Moyenne : 15 (Composants de pages)
- 🟢 Basse : 3 (PropertyCard, PropertyList, SearchFilters)

**Durée estimée : 18-24h** (sans Phase 9)

---

## 🚀 Installation

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

## 🛠️ Développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 📁 Structure du projet

```
site-oiko-v2/
├── app/                    # Pages Next.js (App Router)
│   ├── activites/
│   ├── a-propos-de-nous/
│   ├── contactez-nous/
│   ├── location/
│   ├── vente/
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Composants React
│   ├── Header.tsx
│   ├── Navbar.tsx
│   └── ButtonLink.tsx
├── content/               # Fichiers JSON de contenu
│   ├── accueil.json
│   ├── activites.json
│   ├── a-propos.json
│   ├── contact.json
│   ├── location.json
│   ├── vente.json
│   └── footer.json
└── public/                # Assets statiques
```

## ✅ État actuel

**Pages créées (6) :**
- ✅ `/` (Accueil) - placeholder
- ✅ `/activites` - placeholder
- ✅ `/a-propos-de-nous` - placeholder
- ✅ `/contactez-nous` - placeholder
- ✅ `/location` - placeholder
- ✅ `/vente` - placeholder

**Composants existants (3) :**
- ✅ Header.tsx
- ✅ Navbar.tsx
- ✅ ButtonLink.tsx

**Contenu JSON (7 fichiers) :**
- ✅ accueil.json
- ✅ activites.json
- ✅ a-propos.json
- ✅ contact.json
- ✅ location.json
- ✅ vente.json
- ✅ footer.json
