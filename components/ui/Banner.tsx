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
    <div className="w-full h-75 md:h-100 lg:h-125 overflow-hidden relative">
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
          <track kind="captions" srcLang="fr" src="/captions.vtt" default />
        </video>
      ) : src ? (
        <img src={src} alt={alt || "Image de bannière"} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-muted" />
      )}
    </div>
  );
}
