import { Section, ScrollToTop, Pagination, AnimateOnScroll } from "@/components/ui";
import { PropertyCard } from "@/components/annonces";
import { getAllAds } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";
import PropertyFilters from "@/components/annonces/PropertyFilters";
import { filterProperties, extractCities } from "@/lib/filterProperties";

// Force le rendu côté serveur (pas de pré-rendu au build)
export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 24;

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function VentePage({ searchParams }: PageProps) {
  // Récupérer les paramètres de recherche
  const params = await searchParams;

  // Récupérer TOUTES les annonces de vente côté serveur
  const rawProperties = await getAllAds("V");

  // Transformer les données brutes en Property[]
  const properties = mapApiToProperties(rawProperties);

  // Extraire les villes et filtrer les propriétés
  const cities = extractCities(properties);
  const filteredProperties = filterProperties(properties, params);

  // Pagination
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

        {/* Filtres */}
        <PropertyFilters type="vente" cities={cities} />

        {/* Grille d'annonces */}
        {filteredProperties.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted">
                {filteredProperties.length} bien(s) disponible(s)
                {totalPages > 1 && ` - Page ${currentPage} sur ${totalPages}`}
              </p>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath="/vente"
                  searchParams={params}
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProperties.map((property) => (
                <AnimateOnScroll key={property.id}>
                  <PropertyCard
                    property={property}
                    type="vente"
                  />
                </AnimateOnScroll>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/vente"
              searchParams={params}
            />
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
