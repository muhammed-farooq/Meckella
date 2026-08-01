"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sanityImage } from "@/lib/utils";

interface HeroCrossfadeProps {
  images: string[];
}

export function HeroCrossfade({ images }: HeroCrossfadeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({ 0: false });
  const prefetchedRef = useRef<Set<number>>(new Set());

  // Lazily prefetch only the NEXT slide ~2 s before it appears.
  // This avoids hammering the network with all images at once on slow connections.
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const nextIndex = (currentIndex + 1) % images.length;
    if (prefetchedRef.current.has(nextIndex)) return;

    const timer = setTimeout(() => {
      const img = new window.Image();
      img.src = sanityImage(images[nextIndex], { w: 1920, q: 70 });
      img.onload = () => {
        prefetchedRef.current.add(nextIndex);
        setLoadedMap((prev) => ({ ...prev, [nextIndex]: true }));
      };
    }, 2000); // start prefetch 2 s after current slide becomes active

    return () => clearTimeout(timer);
  }, [currentIndex, images]);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A96E]/20 via-background to-[#0B0B0B] opacity-50" />
    );
  }

  return (
    <div className="absolute inset-0">
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
            src={sanityImage(images[currentIndex], { w: 1920, q: 70 })}
            alt="Hero Background"
            fill
            sizes="100vw"
            quality={70}
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
