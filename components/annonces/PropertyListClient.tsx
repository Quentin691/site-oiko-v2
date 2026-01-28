"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimateOnScroll, Pagination } from "@/components/ui";
import PropertyCard from "./PropertyCard";
import PropertyFilters from "./PropertyFilters";
import { filterProperties, extractCities } from "@/lib/filterProperties";
import type { Property } from "@/types/property";

interface PropertyListClientProps {
  initialData: Property[];
  type: "location" | "vente";
  searchParams: { [key: string]: string | undefined };
}

// Cache global pour garder les données entre les navigations
const dataCache: Record<string, { data: Property[]; complete: boolean }> = {};

const ITEMS_PER_PAGE = 24;

export default function PropertyListClient({
  initialData,
  type,
  searchParams,
}: PropertyListClientProps) {
  const cacheKey = type === "location" ? "L" : "V";

  // Initialiser avec le cache si disponible, sinon avec les données initiales
  const [allProperties, setAllProperties] = useState<Property[]>(() => {
    if (dataCache[cacheKey]?.complete) {
      return dataCache[cacheKey].data;
    }
    return initialData;
  });

  const [isLoadingMore, setIsLoadingMore] = useState(() => {
    // Si le cache est complet, pas besoin de charger plus
    return !dataCache[cacheKey]?.complete;
  });

  const [loadingProgress, setLoadingProgress] = useState(0);

  // Charger le reste des données en arrière-plan
  useEffect(() => {
    // Si déjà en cache et complet, ne pas recharger
    if (dataCache[cacheKey]?.complete) {
      setAllProperties(dataCache[cacheKey].data);
      setIsLoadingMore(false);
      return;
    }

    const loadAllData = async () => {
      try {
        const apiType = type === "location" ? "L" : "V";
        const response = await fetch(`/api/annonces?type=${apiType}&all=true`);

        if (!response.ok) throw new Error("Erreur de chargement");

        const result = await response.json();

        // Mettre à jour le state et le cache
        setAllProperties(result.data);
        dataCache[cacheKey] = { data: result.data, complete: true };
        setIsLoadingMore(false);

      } catch (error) {
        console.error("Erreur chargement complet:", error);
        setIsLoadingMore(false);
      }
    };

    // Petit délai pour laisser la page s'afficher d'abord
    const timer = setTimeout(loadAllData, 100);
    return () => clearTimeout(timer);
  }, [type, cacheKey]);

  // Extraire les villes des données actuelles (même pendant le chargement)
  const cities = useMemo(() => {
    return extractCities(allProperties);
  }, [allProperties]);

  // Filtrer les propriétés
  const filteredProperties = useMemo(() => {
    // Si des filtres sont appliqués mais données pas complètes, utiliser ce qu'on a
    return filterProperties(allProperties, searchParams);
  }, [allProperties, searchParams]);

  // Pagination
  const currentPage = Math.max(1, parseInt(searchParams.page || "1", 10));
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      {/* Filtres - bouton désactivé pendant le chargement complet */}
      <PropertyFilters
        type={type}
        cities={cities}
        disabled={isLoadingMore}
      />

      {/* Indicateur de chargement en arrière-plan */}
      {isLoadingMore && (
        <div className="mb-4 text-sm text-muted flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          Chargement des autres biens en cours...
        </div>
      )}

      {/* Grille d'annonces */}
      {filteredProperties.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted">
              {filteredProperties.length} bien(s) disponible(s)
              {isLoadingMore && " (chargement en cours...)"}
              {totalPages > 1 && ` - Page ${currentPage} sur ${totalPages}`}
            </p>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/${type}`}
                searchParams={searchParams}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProperties.map((property) => (
              <AnimateOnScroll key={property.id}>
                <PropertyCard property={property} type={type} />
              </AnimateOnScroll>
            ))}
          </div>

          {/* Pagination bas */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/${type}`}
              searchParams={searchParams}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted text-lg">
            {isLoadingMore
              ? "Chargement en cours..."
              : `Aucun bien disponible ${type === "location" ? "à la location" : "à la vente"} pour le moment.`}
          </p>
        </div>
      )}
    </>
  );
}
