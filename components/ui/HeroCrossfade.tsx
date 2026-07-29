"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeroCrossfadeProps {
  images: string[];
}

export function HeroCrossfade({ images }: HeroCrossfadeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({ 0: false });

  // Preload ALL images on mount so they are cached before their slide appears
  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((src, i) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () =>
        setLoadedMap((prev) => ({ ...prev, [i]: true }));
    });
  }, [images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per slide for a slow, cinematic feel

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A96E]/20 via-background to-[#0B0B0B] opacity-50" />
    );
  }

  return (
    <div className="absolute inset-0">
      {/* Hidden preload layer — renders all images off-screen so the browser
          fetches & caches them before they are needed for the crossfade */}
      <div aria-hidden className="sr-only">
        {images.slice(1).map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="1px"
            priority          // tell Next.js / browser to fetch these eagerly
            className="opacity-0 pointer-events-none"
          />
        ))}
      </div>

      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: loadedMap[currentIndex] ? 1 : 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Hero Background"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority={currentIndex === 0}
            onLoad={() =>
              setLoadedMap((prev) => ({ ...prev, [currentIndex]: true }))
            }
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

