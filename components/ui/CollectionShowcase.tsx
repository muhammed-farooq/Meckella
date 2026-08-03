"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sanityImage } from "@/lib/utils";

interface Product {
  name: string;
  slug: string;
  imageUrl?: string;
  description: string;
}

interface CollectionShowcaseProps {
  products: Product[];
}

export function CollectionShowcase({ products }: CollectionShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Mapping specific colors to the 5 products based on the reference image
  // 1: Red (Eternal Flame), 2: Beige (Dark Ember), 3: Yellow (Oud Prime), 4: Light Green (Iron Pulse), 5: Blue (Mountain Stream)
  const productColors = [
    "bg-gradient-to-t from-[#E63946] to-[#E63946]/5",
    "bg-gradient-to-t from-[#D4A373] to-[#D4A373]/5",
    "bg-gradient-to-t from-[#FCA311] to-[#FCA311]/5",
    "bg-gradient-to-t from-[#E9F5DB] to-[#E9F5DB]/5",
    "bg-gradient-to-t from-[#A8DADC] to-[#A8DADC]/5"
  ];

  const textColors = [
    "text-[#E63946]",
    "text-[#D4A373]",
    "text-[#FCA311]",
    "text-[#E9F5DB]",
    "text-[#A8DADC]"
  ];

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center bg-background py-14 sm:py-16 md:py-20 lg:py-28 overflow-hidden border-y border-white/5">
      <div className="text-center mb-8 sm:mb-12 md:mb-16 relative z-10 px-4">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-3 sm:mb-4">
          <span className="font-serif italic text-accent-gold">Fragrances</span> that<br />Define your Essence
        </h2>
      </div>

      {/* DESKTOP VERSION (xl and above): 100% Exact original interactive accordion design */}
      <div className="hidden xl:flex w-full overflow-visible max-w-[1600px] mx-auto px-[70px] h-[70vh] items-stretch">
        {products.slice(0, 5).map((product, index) => {
          const isHovered = hoveredIndex === index;
          const bgGradient = productColors[index] || "bg-gradient-to-t from-[#333] to-transparent";
          const highlightText = textColors[index] || "text-accent-gold";

          return (
            <motion.div
              key={`desktop-${product.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex-shrink overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group h-full ${isHovered ? "flex-[2]" : hoveredIndex !== null ? "flex-[0.8] opacity-50 grayscale" : "flex-1"
                }`}
            >
              {/* Background Color Match */}
              {/* <div className={`absolute inset-0 opacity-20 transition-opacity duration-700 ${isHovered ? "opacity-50" : ""} ${bgGradient}`} /> */}
              {/* <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10" /> */}

              <Link href={`/products/${product.slug}`} className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-16 h-full">
                {/* Bottle Image */}
                {product.imageUrl && (
                  <motion.div
                    className="relative w-full h-[60%] flex items-end justify-center mb-6"
                    animate={{
                      scale: isHovered ? 1.01 : 1,
                      y: isHovered ? -20 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="relative w-[250px] h-[350px]">
                      <Image
                        src={sanityImage(product.imageUrl, { w: 600, q: 85 })}
                        alt={product.name}
                        fill
                        sizes="(max-width: 1536px) 30vw, 25vw"
                        quality={85}
                        className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Text Content */}
                <div className="text-center px-4 transition-transform duration-500 transform translate-y-0">
                  <h3 className={`font-serif text-2xl mb-2 transition-colors duration-500 ${isHovered ? "text-foreground" : "text-accent-gold"}`}>
                    {product.name}
                  </h3>

                  <div className={`overflow-hidden transition-all duration-700 ease-out flex justify-center ${isHovered ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}>
                    <span className="uppercase tracking-[0.2em] text-xs border border-white/20 px-6 py-2 text-foreground backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                      Discover
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE & TABLET VERSION (<xl): Touch-friendly responsive horizontal carousel */}
      <div className="w-full flex xl:hidden flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide max-w-[1600px] mx-auto px-[20px] sm:px-[30px] md:px-[50px] lg:px-[70px] gap-4 sm:gap-6 h-[380px] sm:h-[430px] md:h-[480px] lg:h-[520px] items-stretch">
        {products.slice(0, 5).map((product, index) => {
          const highlightText = textColors[index] || "text-accent-gold";

          return (
            <div
              key={`mobile-${product.slug}`}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group snap-center w-[78vw] max-w-[280px] sm:w-[320px] sm:max-w-none md:w-[360px] lg:w-[400px] h-full"
            >
              {/* Full Card Background Image for Mobile/Tablet */}
              {product.imageUrl && (
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#121212]">
                  <Image
                    src={sanityImage(product.imageUrl, { w: 800, q: 85 })}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1280px) 50vw, 40vw"
                    quality={85}
                    className="object-cover object-center"
                  />
                </div>
              )}

              {/* Sophisticated Dark Gradient Overlays for Readability & Luxury Atmosphere */}
              <div className="absolute inset-0 bg-black/20 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 via-40% to-transparent z-10 pointer-events-none" />

              {/* Foreground Content Docked at Bottom */}
              <Link href={`/products/${product.slug}`} className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 md:p-10 h-full">
                <div className="text-center w-full flex flex-col items-center justify-end">
                  <h3 className={`font-serif text-2xl sm:text-3xl mb-2 text-accent-gold`}>
                    {product.name}
                  </h3>

                  <div className="flex justify-center w-full mt-3">
                    <span className="uppercase tracking-[0.2em] text-[11px] sm:text-xs border border-white/20 px-6 py-2.5 text-foreground backdrop-blur-md rounded-full bg-black/40 shadow-lg">
                      Discover
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
