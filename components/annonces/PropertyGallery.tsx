"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        <Image
          src={images[selectedIndex]}
          alt={`${title} - Vue ${selectedIndex + 1} sur ${images.length}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {selectedIndex + 1} / {images.length}
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80"
            >
              ←
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => prev === images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80"
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
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                index === selectedIndex ? "border-primary" : "border-transparent hover:border-border"
              }`}
            >
              <Image src={image} alt={`${title} - Miniature ${index + 1}`} fill className="object-cover" sizes="80px" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}