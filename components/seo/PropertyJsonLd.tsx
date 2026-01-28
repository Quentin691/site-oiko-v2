import { Property } from "@/types/property";

interface PropertyJsonLdProps {
  property: Property;
  type: "location" | "vente";
}

export default function PropertyJsonLd({ property, type }: PropertyJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://oiko-gestion.fr";
  const isRental = type === "location";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `${baseUrl}/${type}/${property.id}`,
    datePosted: property.createdAt,
    dateModified: property.updatedAt,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ...(isRental && {
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: property.price,
          priceCurrency: "EUR",
          unitText: "mois",
        },
      }),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      postalCode: property.postalCode,
      addressRegion: property.city === "Paris" ? "Île-de-France" : "Provence-Alpes-Côte d'Azur",
      addressCountry: "FR",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.surface,
      unitCode: "MTK",
      unitText: "m²",
    },
    numberOfRooms: property.rooms,
    ...(property.bedrooms && { numberOfBedrooms: property.bedrooms }),
    ...(property.bathrooms && { numberOfBathroomsTotal: property.bathrooms }),
    ...(property.images?.length > 0 && {
      image: property.images,
      photo: property.images.map((img, index) => ({
        "@type": "ImageObject",
        url: img,
        name: `${property.title} - Photo ${index + 1}`,
      })),
    }),
    broker: {
      "@type": "RealEstateAgent",
      name: "OIKO",
      url: baseUrl,
      telephone: "+33491330871",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "128 rue la Boétie",
          addressLocality: "Paris",
          postalCode: "75008",
          addressCountry: "FR",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "42 rue Paradis",
          addressLocality: "Marseille",
          postalCode: "13001",
          addressCountry: "FR",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
