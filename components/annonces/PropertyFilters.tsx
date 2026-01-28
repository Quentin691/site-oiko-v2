"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface PropertyFiltersProps {
  type: "location" | "vente";
  cities: string[]; // Liste des villes disponibles
  disabled?: boolean; // Désactiver pendant le chargement
}

export default function PropertyFilters({ type, cities, disabled = false }: PropertyFiltersProps) {
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
    sort: searchParams.get("sort") || "",
  });

  // Appliquer les filtres (met à jour l'URL)
  const applyFilters = () => {
    // Copie des filtres pour validation
    const validatedFilters = { ...filters };

    // Validation prix : inverser si min > max
    if (validatedFilters.priceMin && validatedFilters.priceMax) {
      const min = parseInt(validatedFilters.priceMin);
      const max = parseInt(validatedFilters.priceMax);
      if (min > max) {
        validatedFilters.priceMin = max.toString();
        validatedFilters.priceMax = min.toString();
      }
    }

    // Validation surface : inverser si min > max
    if (validatedFilters.surfaceMin && validatedFilters.surfaceMax) {
      const min = parseInt(validatedFilters.surfaceMin);
      const max = parseInt(validatedFilters.surfaceMax);
      if (min > max) {
        validatedFilters.surfaceMin = max.toString();
        validatedFilters.surfaceMax = min.toString();
      }
    }

    // Mettre à jour l'état avec les valeurs validées
    setFilters(validatedFilters);

    const params = new URLSearchParams();

    // Ajouter seulement les filtres non vides
    Object.entries(validatedFilters).forEach(([key, value]) => {
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
      sort: "",
    });
    router.push(`/${type}`);
  };

  // Bloquer les caractères invalides dans les champs numériques (e, E, -, +)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "-", "+", "."].includes(e.key)) {
      e.preventDefault();
    }
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
            onKeyDown={handleKeyDown}
            min="0"
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
            onKeyDown={handleKeyDown}
            min="0"
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
            onKeyDown={handleKeyDown}
            min="0"
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
            onKeyDown={handleKeyDown}
            min="0"
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

        {/* Tri */}
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Trier par
          </label>
          <select
            value={filters.sort}
            onChange={(e) => handleChange("sort", e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Par défaut</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="surface_asc">Surface croissante</option>
            <option value="surface_desc">Surface décroissante</option>
          </select>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={applyFilters}
          disabled={disabled}
          title={disabled ? "Veuillez attendre que tous les biens soient chargés" : undefined}
          className={`px-6 py-2 rounded-md transition-colors ${
            disabled
              ? "bg-muted/50 text-muted cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {disabled ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              Chargement...
            </span>
          ) : (
            "Rechercher"
          )}
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