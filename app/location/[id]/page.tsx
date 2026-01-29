import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PropertyGallery from "@/components/annonces/PropertyGallery";
import PropertyDetails from "@/components/annonces/PropertyDetails";
import PropertyMap from "@/components/annonces/PropertyMap";
import ShareButtons from "@/components/blog/ShareButtons";
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
  const title = `${property.title} - Location à ${property.city} | OIKO`;
  const description = `${property.rooms} pièces, ${property.surface}m² à louer à ${property.city}. ${property.price}€/mois.`;

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

export default async function LocationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const rawProperty = await getAdById(id);

  if (!rawProperty) {
    notFound();
  }

  const property = mapApiToProperty(rawProperty);

  return (
    <main>
      <PropertyJsonLd property={property} type="location" />
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Location", url: "/location" },
          { name: property.title, url: `/location/${property.id}` },
        ]}
      />
      <Section className="bg-background">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-muted hover:text-primary">Accueil</Link>
          <span className="mx-2 text-muted">/</span>
          <Link href="/location" className="text-muted hover:text-primary">Location</Link>
          <span className="mx-2 text-muted">/</span>
          <span className="text-foreground">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PropertyGallery images={property.images} title={property.title} />
            {/* Carte visible uniquement sur desktop */}
            <div className="hidden lg:block">
              <PropertyMap
                address={property.address}
                city={property.city}
                postalCode={property.postalCode}
              />
            </div>
          </div>
          <PropertyDetails property={property} type="location" />
          {/* Carte visible uniquement sur mobile, après la description */}
          <div className="lg:hidden">
            <PropertyMap
              address={property.address}
              city={property.city}
              postalCode={property.postalCode}
            />
          </div>
        </div>

        {/* Partage */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted mb-4">Partager ce bien :</p>
          <ShareButtons title={property.title} path={`/location/${property.id}`} />
        </div>
      </Section>
    </main>
  );
}