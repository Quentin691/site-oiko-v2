import type { Metadata } from "next";
import { Section, ScrollToTop } from "@/components/ui";
import { PropertyListClient } from "@/components/annonces";
import { getAdsPage } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";

export const metadata: Metadata = {
  title: "Biens à la Location | OIKO",
  description: "Trouvez votre bien en location à Paris et Marseille. Appartements, maisons, locaux - OIKO vous accompagne dans votre recherche locative.",
  openGraph: {
    title: "Biens à la Location | OIKO",
    description: "Trouvez votre bien en location à Paris et Marseille.",
  },
};

// Force le rendu côté serveur (pas de pré-rendu au build)
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function LocationPage({ searchParams }: PageProps) {
  // Récupérer les paramètres de recherche
  const params = await searchParams;

  // Récupérer seulement la première page côté serveur (rapide)
  const { data: rawProperties } = await getAdsPage(1, "L");
  const initialProperties = mapApiToProperties(rawProperties);

  return (
    <main>
      <Section className="bg-background">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Biens à la location
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Découvrez nos biens disponibles à la location
          </p>
        </div>

        {/* Liste des biens avec chargement progressif */}
        <PropertyListClient
          initialData={initialProperties}
          type="location"
          searchParams={params}
        />
      </Section>

      <ScrollToTop />
    </main>
  );
}
