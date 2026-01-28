import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PropertyGallery from "@/components/annonces/PropertyGallery";
import PropertyDetails from "@/components/annonces/PropertyDetails";
import { getAdById } from "@/lib/ubiflow";
import { mapApiToProperty } from "@/lib/mapProperty";
import { PropertyJsonLd, BreadcrumbJsonLd } from "@/components/seo";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const rawProperty = await getAdById(id);

  if (!rawProperty) {
    return {
      title: "Bien non trouvé | OIKO",
      description: "Ce bien n'est plus disponible.",
    };
  }

  const property = mapApiToProperty(rawProperty);
  const title = `${property.title} - À vendre à ${property.city} | OIKO`;
  const description = `${property.rooms} pièces, ${property.surface}m² à vendre à ${property.city}. ${property.price}€.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: property.images?.[0] ? [property.images[0]] : [],
    },
  };
}

export default async function VenteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const rawProperty = await getAdById(id);

  if (!rawProperty) {
    notFound();
  }

  const property = mapApiToProperty(rawProperty);

  return (
    <main>
      <PropertyJsonLd property={property} type="vente" />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Vente", url: "/vente" },
          { name: property.title, url: `/vente/${property.id}` },
        ]}
      />
      <Section className="bg-background">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-muted hover:text-primary">Accueil</Link>
          <span className="mx-2 text-muted">/</span>
          <Link href="/vente" className="text-muted hover:text-primary">Vente</Link>
          <span className="mx-2 text-muted">/</span>
          <span className="text-foreground">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PropertyGallery images={property.images} title={property.title} />
          <PropertyDetails property={property} type="vente" />
        </div>
      </Section>
    </main>
  );
}