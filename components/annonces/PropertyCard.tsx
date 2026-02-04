import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import type { Property } from "@/types/property";
import { BLUR_DATA_URL } from "@/lib/image-placeholder";

interface PropertyCardProps {
  property: Property;
  type: "vente" | "location";
}

// Vérifie si le bien est nouveau (moins de 7 jours)
function isNewProperty(createdAt?: string): boolean {
  if (!createdAt) return false;
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export default function PropertyCard({ property, type }: PropertyCardProps) {
  const mainPhoto = property.images[0];
  const hasImage = !!mainPhoto;
  const isNew = isNewProperty(property.createdAt);

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
              alt={`${property.title} - ${type === "vente" ? "À vendre" : "À louer"} - ${property.rooms} pièces, ${property.surface}m² à ${property.city}`}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🏠</span>
            </div>
          )}
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            <span className="bg-primary text-gray-900 text-xs px-2 py-1 rounded">
              {type === "vente" ? "À vendre" : "À louer"}
            </span>
            {isNew && (
              <span className="bg-green-500 text-gray-900 text-xs px-2 py-1 rounded font-medium">
                Nouveau
              </span>
            )}
          </div>
        </div>

        {/* Contenu */}
        <div>
          <h3 className="font-semibold text-foreground text-base sm:text-lg mb-1 line-clamp-1">
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
