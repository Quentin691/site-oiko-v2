import type { Metadata } from "next";
import { Section, ScrollToTop } from "@/components/ui";
import { PropertyListClient } from "@/components/annonces";
import { getAdsPage } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";

export const metadata: Metadata = {
  title: "Biens à la Vente | OIKO",
  description: "Découvrez nos biens immobiliers à vendre à Paris et Marseille. Appartements, maisons, locaux commerciaux - OIKO vous accompagne dans votre projet d'achat.",
  openGraph: {
    title: "Biens à la Vente | OIKO",
    description: "Découvrez nos biens immobiliers à vendre à Paris et Marseille.",
  },
};

// Force le rendu côté serveur (pas de pré-rendu au build)
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function VentePage({ searchParams }: PageProps) {
  // Récupérer les paramètres de recherche
  const params = await searchParams;

  // Récupérer seulement la première page côté serveur (rapide)
  const { data: rawProperties } = await getAdsPage(1, "V");
  const initialProperties = mapApiToProperties(rawProperties);

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

        {/* Liste des biens avec chargement progressif */}
        <PropertyListClient
          initialData={initialProperties}
          type="vente"
          searchParams={params}
        />
      </Section>

      <ScrollToTop />
    </main>
  );
}
