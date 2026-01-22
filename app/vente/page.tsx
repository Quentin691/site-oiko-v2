import { Section, ScrollToTop } from "@/components/ui";
import { PropertyCard } from "@/components/annonces";
import { getAdsList } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";
import PropertyFilters from "@/components/annonces/PropertyFilters";
import { filterProperties, extractCities } from "@/lib/filterProperties";

// Force le rendu côté serveur (pas de pré-rendu au build)
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function VentePage({ searchParams }: PageProps) {
  // Récupérer les paramètres de recherche
  const params = await searchParams;

  // Récupérer les annonces de vente côté serveur
  const rawProperties = await getAdsList(1, "V");

  // Transformer les données brutes en Property[]
  const properties = mapApiToProperties(rawProperties);

  // Extraire les villes et filtrer les propriétés
  const cities = extractCities(properties);
  const filteredProperties = filterProperties(properties, params);

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
            <p className="text-muted mb-6">
              {filteredProperties.length} bien(s) disponible(s)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
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
