"use client";

import { useRef, useState } from "react";

interface PropertyMapProps {
  address: string;
  city: string;
  postalCode: string;
}

export default function PropertyMap({ address, city, postalCode }: PropertyMapProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const fullAddress = `${address}, ${postalCode} ${city}, France`;
  const encodedAddress = encodeURIComponent(fullAddress);

  // URL pour l'iframe avec paramètres stables
  const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&z=16&hl=fr&output=embed`;

  // URL pour ouvrir dans Google Maps (nouvelle fenêtre)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const handleRecenter = () => {
    // Recharge l'iframe en réassignant la même URL
    if (iframeRef.current) {
      iframeRef.current.src = mapUrl;
    }
  };

  const loadMap = () => {
    setIsMapLoaded(true);
  };

  return (
    <div className="bg-surface rounded-lg overflow-hidden">
      <h2 className="text-lg font-semibold text-foreground p-4 pb-0">Localisation</h2>
      <div className="p-4">
        <div className="relative">
          {!isMapLoaded ? (
            // Placeholder avant chargement de la carte
            <div
              className="w-full h-75 rounded-lg bg-muted/30 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/40 transition-colors"
              onClick={loadMap}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted mb-3"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-foreground font-medium mb-1">Voir sur la carte</span>
              <span className="text-muted text-sm">Cliquez pour charger Google Maps</span>
            </div>
          ) : (
            <>
              <iframe
                ref={iframeRef}
                src={mapUrl}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "0.5rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Carte de ${fullAddress}`}
              />
              {/* Boutons sur la carte */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                  onClick={handleRecenter}
                  className="p-2 rounded-md bg-white shadow-md hover:bg-gray-100 transition-colors"
                  title="Recentrer la carte"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                  </svg>
                </button>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-white shadow-md hover:bg-gray-100 transition-colors"
                  title="Ouvrir dans Google Maps"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-700"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </>
          )}
        </div>
        <p className="text-sm text-muted mt-2">📍 {fullAddress}</p>
      </div>
    </div>
  );
}
