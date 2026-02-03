import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAdById } from "@/lib/ubiflow";
import { mapApiToProperty } from "@/lib/mapProperty";
import { Section } from "@/components/ui";
import { ContactForm } from "@/components/contact";
import { BLUR_DATA_URL } from "@/lib/image-placeholder";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Générer les métadonnées dynamiquement
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const rawProperty = await getAdById(id);

  if (!rawProperty) {
    return {
      title: "Bien non trouvé | OIKO",
    };
  }

  const property = mapApiToProperty(rawProperty);

  return {
    title: `Contact - ${property.title} | OIKO`,
    description: `Contactez-nous pour le bien ${property.title} situé à ${property.city}.`,
    robots: {
      index: false, // Ne pas indexer les pages de contact
    },
  };
}

export default async function ContactBienPage({ params }: PageProps) {
  const { id } = await params;
  const rawProperty = await getAdById(id);

  if (!rawProperty) {
    notFound();
  }

  const property = mapApiToProperty(rawProperty);

  // Déterminer le type de transaction pour le lien retour
  const transactionType = property.transaction.code === "V" ? "vente" : "location";

  // Formater le prix
  const formatPrice = (price: number, type: "L" | "V") => {
    const formatted = new Intl.NumberFormat("fr-FR").format(price);
    return type === "V" ? `${formatted} €` : `${formatted} €/mois`;
  };

  return (
    <main>
      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Lien retour */}
          <Link
            href={`/${transactionType}/${property.id}`}
            className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-6 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Retour au bien
          </Link>

          {/* En-tête */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Contacter pour ce bien
          </h1>

          {/* Résumé du bien */}
          <div className="bg-surface rounded-lg overflow-hidden shadow-sm mb-8">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
                {property.images && property.images.length > 0 ? (
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 256px"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                ) : (
                  <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="p-6 flex flex-col justify-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {property.title}
                </h2>
                <p className="text-muted mb-2">
                  {property.city} {property.postalCode && `(${property.postalCode})`}
                </p>
                <p className="text-primary font-bold text-lg">
                  {formatPrice(property.price, property.transaction.code)}
                </p>
                {property.surface > 0 && (
                  <p className="text-sm text-muted mt-1">
                    {property.surface} m² • {property.rooms} pièce{property.rooms > 1 ? "s" : ""}
                  </p>
                )}
                <p className="text-xs text-muted mt-2">
                  Réf : {property.transaction.reference || property.id}
                </p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <ContactForm
            propertyId={property.id}
            propertyTitle={property.title}
            propertyReference={property.transaction.reference || property.id}
            contactEmail={property.contactEmail}
          />
        </div>
      </Section>
    </main>
  );
}
