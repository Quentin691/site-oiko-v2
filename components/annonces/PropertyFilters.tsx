"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";

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

  // Bloquer les caractères invalides et soumettre avec Entrée
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "-", "+", "."].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      applyFilters();
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
          <label htmlFor="filter-city" className="block text-sm font-medium text-muted mb-1">
            Ville
          </label>
          <select
            id="filter-city"
            value={filters.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full h-9 px-3 py-1.5 pr-8 appearance-none border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent bg-no-repeat bg-size-[16px] bg-position-[right_8px_center] bg-[url('data:image/svg+xml,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3e%3cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3e%3c%2Fsvg%3e')]"
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
          <label htmlFor="filter-priceMin" className="block text-sm font-medium text-muted mb-1">
            Prix min (€)
          </label>
          <input
            id="filter-priceMin"
            type="number"
            value={filters.priceMin}
            onChange={(e) => handleChange("priceMin", e.target.value)}
            onKeyDown={handleKeyDown}
            min="0"
            placeholder="0"
            className="w-full h-9 px-3 py-1.5 appearance-none border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* Filtre prix max */}
        <div>
          <label htmlFor="filter-priceMax" className="block text-sm font-medium text-muted mb-1">
            Prix max (€)
          </label>
          <input
            id="filter-priceMax"
            type="number"
            value={filters.priceMax}
            onChange={(e) => handleChange("priceMax", e.target.value)}
            onKeyDown={handleKeyDown}
            min="0"
            placeholder="1000000"
            className="w-full h-9 px-3 py-1.5 appearance-none border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* Filtre surface min */}
        <div>
          <label htmlFor="filter-surfaceMin" className="block text-sm font-medium text-muted mb-1">
            Surface min (m²)
          </label>
          <input
            id="filter-surfaceMin"
            type="number"
            value={filters.surfaceMin}
            onChange={(e) => handleChange("surfaceMin", e.target.value)}
            onKeyDown={handleKeyDown}
            min="0"
            placeholder="0"
            className="w-full h-9 px-3 py-1.5 appearance-none border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* Filtre surface max */}
        <div>
          <label htmlFor="filter-surfaceMax" className="block text-sm font-medium text-muted mb-1">
            Surface max (m²)
          </label>
          <input
            id="filter-surfaceMax"
            type="number"
            value={filters.surfaceMax}
            onChange={(e) => handleChange("surfaceMax", e.target.value)}
            onKeyDown={handleKeyDown}
            min="0"
            placeholder="500"
            className="w-full h-9 px-3 py-1.5 appearance-none border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>

        {/* Filtre nombre de pièces */}
        <div>
          <label htmlFor="filter-rooms" className="block text-sm font-medium text-muted mb-1">
            Nombre de pièces
          </label>
          <select
            id="filter-rooms"
            value={filters.rooms}
            onChange={(e) => handleChange("rooms", e.target.value)}
            className="w-full h-9 px-3 py-1.5 pr-8 appearance-none border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent bg-no-repeat bg-size-[16px] bg-position-[right_8px_center] bg-[url('data:image/svg+xml,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3e%3cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3e%3c%2Fsvg%3e')]"
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
          <label htmlFor="filter-sort" className="block text-sm font-medium text-muted mb-1">
            Trier par
          </label>
          <select
            id="filter-sort"
            value={filters.sort}
            onChange={(e) => handleChange("sort", e.target.value)}
            className="w-full h-9 px-3 py-1.5 pr-8 appearance-none border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent bg-no-repeat bg-size-[16px] bg-position-[right_8px_center] bg-[url('data:image/svg+xml,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3e%3cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3e%3c%2Fsvg%3e')]"
          >
            <option value="">Par défaut</option>
            <option value="date_desc">Plus récents</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="surface_asc">Surface croissante</option>
            <option value="surface_desc">Surface décroissante</option>
          </select>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-4 mt-6">
        <Button
          onClick={applyFilters}
          disabled={disabled}
          variant="primary"
          className="px-6! py-2!"
        >
          {disabled ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
              Chargement...
            </span>
          ) : (
            "Rechercher"
          )}
        </Button>
        <Button onClick={resetFilters} variant="secondary" className="px-6! py-2!">
          Réinitialiser
        </Button>
      </div>
    </div>
  );
}