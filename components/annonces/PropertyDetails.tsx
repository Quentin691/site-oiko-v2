import { Property } from "@/types/property";

interface PropertyDetailsProps {
  property: Property;
  type: "location" | "vente";
}

export default function PropertyDetails({ property, type }: PropertyDetailsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const characteristics = [
    { label: "Surface", value: `${property.surface} m²`, icon: "📐" },
    { label: "Pièces", value: `${property.rooms} pièce(s)`, icon: "🚪" },
    { label: "Chambres", value: `${property.bedrooms || "N/A"}`, icon: "🛏️" },
    { label: "Salle(s) de bain", value: `${property.bathrooms || "N/A"}`, icon: "🚿" },
  ];

  return (
    <div className="space-y-8">
      {/* En-tête avec prix */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{property.title}</h1>
          <p className="text-muted mt-1"><span aria-hidden="true">📍</span> {property.address}, {property.city} {property.postalCode}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">
            {formatPrice(property.price)}
            {type === "location" && <span className="text-lg">/mois</span>}
          </p>
        </div>
      </div>

      {/* Caractéristiques */}
      <div className="bg-surface rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Caractéristiques</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {characteristics.map((char) => (
            <div key={char.label} className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">{char.icon}</span>
              <div>
                <p className="text-sm text-muted">{char.label}</p>
                <p className="font-medium text-foreground">{char.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
        <p className="text-muted whitespace-pre-line">
          {property.description || "Aucune description disponible."}
        </p>
      </div>

    </div>
  );
}