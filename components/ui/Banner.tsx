"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

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
      });
    }
  }, []);

  return (
    <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden relative">
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
        <Image
            src={src}
            alt={alt || "Image de bannière"}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
      ) : (
        <div className="w-full h-full bg-muted" />
      )}
    </div>
  );
}
