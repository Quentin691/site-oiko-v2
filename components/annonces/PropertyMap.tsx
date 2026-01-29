"use client";

interface PropertyMapProps {
  address: string;
  city: string;
  postalCode: string;
}

export default function PropertyMap({ address, city, postalCode }: PropertyMapProps) {
  const fullAddress = `${address}, ${postalCode} ${city}, France`;
  const encodedAddress = encodeURIComponent(fullAddress);

  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className="bg-surface rounded-lg overflow-hidden">
      <h2 className="text-lg font-semibold text-foreground p-4 pb-0">Localisation</h2>
      <div className="p-4">
        <iframe
          src={mapUrl}
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "0.5rem" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Carte de ${fullAddress}`}
        />
        <p className="text-sm text-muted mt-2">📍 {fullAddress}</p>
      </div>
    </div>
  );
}
