"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Navigation fonctions
  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Navigation clavier
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    // Empêcher le scroll du body quand lightbox ouverte
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goToPrevious, goToNext, closeLightbox]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-surface rounded-lg flex items-center justify-center">
        <span className="text-muted">Aucune image disponible</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <div className="relative aspect-video bg-surface rounded-lg overflow-hidden">
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label="Agrandir l'image"
        />
        <Image
          src={images[selectedIndex]}
          alt={`${title} - Vue ${selectedIndex + 1} sur ${images.length}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm pointer-events-none">
          {selectedIndex + 1} / {images.length}
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 z-20"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 z-20"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden border-2 ${
                index === selectedIndex ? "border-primary" : "border-transparent hover:border-border"
              }`}
            >
              <Image src={image} alt={`${title} - Miniature ${index + 1}`} fill className="object-cover" sizes="80px" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox (plein écran) */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Bouton fermer */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white w-12 h-12 flex items-center justify-center text-3xl hover:bg-white/10 rounded-full z-10"
            aria-label="Fermer"
          >
            ×
          </button>

          {/* Compteur */}
          <div className="absolute top-4 left-4 text-white text-lg">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Image en plein écran */}
          <div
            className="relative w-full h-full max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${title} - Vue ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/20 text-2xl"
                aria-label="Image précédente"
              >
                ←
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/20 text-2xl"
                aria-label="Image suivante"
              >
                →
              </button>
            </>
          )}

          {/* Miniatures en bas */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                  className={`relative w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 ${
                    index === selectedIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={image} alt={`Miniature ${index + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}