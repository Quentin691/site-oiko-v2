import { Property } from "@/types/property";

interface PropertyJsonLdProps {
  property: Property;
  type: "location" | "vente";
}

export default function PropertyJsonLd({ property, type }: PropertyJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiko-gestion.fr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${baseUrl}/${type}/${property.id}`,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      postalCode: property.postalCode,
      addressCountry: "FR",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.surface,
      unitCode: "MTK",
    },
    numberOfRooms: property.rooms,
    ...(property.images?.[0] && { image: property.images }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}