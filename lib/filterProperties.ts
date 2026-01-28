import { Property } from "@/types/property";

export interface FilterParams {
  city?: string;
  priceMin?: string;
  priceMax?: string;
  surfaceMin?: string;
  surfaceMax?: string;
  rooms?: string;
  sort?: string;
}

/**
 * Filtre et trie les propriétés selon les critères donnés
 */
export function filterProperties(
  properties: Property[],
  filters: FilterParams
): Property[] {
  // Filtrage
  const filtered = properties.filter((property) => {
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

  // Tri
  if (filters.sort) {
    switch (filters.sort) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "surface_asc":
        filtered.sort((a, b) => a.surface - b.surface);
        break;
      case "surface_desc":
        filtered.sort((a, b) => b.surface - a.surface);
        break;
    }
  }

  return filtered;
}

/**
 * Extrait la liste unique des villes depuis les propriétés
 */
export function extractCities(properties: Property[]): string[] {
  const cities = new Set(properties.map((p) => p.city));
  return Array.from(cities).sort();
}