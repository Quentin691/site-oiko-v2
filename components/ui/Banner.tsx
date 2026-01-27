"use client";

import { useRef, useEffect } from "react";

interface BannerProps {
  src?: string;
  alt?: string;
  videoSrc?: string;
}

export function Banner({ src, alt, videoSrc }: BannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Forcer la lecture de la vidéo
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignorer l'erreur si autoplay bloqué
        console.log("Autoplay bloqué par le navigateur");
      });
    }
  }, []);

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden relative">
      {videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-muted" />
      )}
    </div>
  );
}
