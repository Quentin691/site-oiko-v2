import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/ui/Section";
import PropertyGallery from "@/components/annonces/PropertyGallery";
import PropertyDetails from "@/components/annonces/PropertyDetails";
import { getAdById } from "@/lib/ubiflow";
import { mapApiToProperty } from "@/lib/mapProperty";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
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
      <Section className="bg-background">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-muted hover:text-primary">Accueil</Link>
          <span className="mx-2 text-muted">/</span>
          <Link href="/location" className="text-muted hover:text-primary">Location</Link>
          <span className="mx-2 text-muted">/</span>
          <span className="text-foreground">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PropertyGallery images={property.images} title={property.title} />
          <PropertyDetails property={property} type="location" />
        </div>
      </Section>
    </main>
  );
}