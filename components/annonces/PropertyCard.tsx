import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
  type: "vente" | "location";
}

export default function PropertyCard({ property, type }: PropertyCardProps) {
  const mainPhoto = property.images[0];
  const hasImage = !!mainPhoto;

  // Formater le prix
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link href={`/${type}/${property.id}`}>
      <Card hover className="overflow-hidden h-full">
        {/* Image */}
        <div className="relative h-48 -mx-6 -mt-6 mb-4 bg-muted/20 overflow-hidden">
          {hasImage ? (
            <Image
              src={mainPhoto}
              alt={`${property.title} - ${property.surface}m² à ${property.city}`}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🏠</span>
            </div>
          )}
          {/* Badge type de transaction */}
          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
            {type === "vente" ? "À vendre" : "À louer"}
          </span>
        </div>

        {/* Contenu */}
        <div>
          <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
            {property.title}
          </h3>
          <p className="text-muted text-sm mb-2">
            {property.city}
            {property.postalCode && ` (${property.postalCode})`}
          </p>

          {/* Caractéristiques */}
          <div className="flex gap-4 text-sm text-muted mb-3">
            {property.surface > 0 && <span>{property.surface} m²</span>}
            {property.rooms > 0 && <span>{property.rooms} pièces</span>}
            {property.bedrooms && <span>{property.bedrooms} ch.</span>}
          </div>

          {/* Prix */}
          <p className="text-primary font-bold text-xl">
            {formattedPrice}
            {type === "location" && (
              <span className="text-sm font-normal">/mois</span>
            )}
          </p>
        </div>
      </Card>
    </Link>
  );
}
