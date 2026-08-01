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

      {/* Horizontal scroll carousel on mobile & tablet (<xl), interactive flex accordion on desktop (>=xl) */}
      <div className="w-full flex flex-row overflow-x-auto xl:overflow-visible snap-x snap-mandatory xl:snap-none scrollbar-hide max-w-[1600px] mx-auto px-[20px] sm:px-[30px] md:px-[50px] lg:px-[70px] gap-4 sm:gap-6 xl:gap-0 h-[380px] sm:h-[430px] md:h-[480px] lg:h-[520px] xl:h-[620px] 2xl:h-[680px] items-stretch">
        {products.slice(0, 5).map((product, index) => {
          const isHovered = hoveredIndex === index;
          const bgGradient = "bg-gradient-to-t from-[#333] to-transparent";
          const highlightText = "text-accent-gold";

          return (
            <motion.div
              key={product.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex-shrink-0 xl:flex-shrink rounded-2xl xl:rounded-none overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group snap-center w-[78vw] max-w-[280px] sm:w-[320px] sm:max-w-none md:w-[360px] lg:w-[400px] xl:w-auto h-full ${
                isHovered ? "xl:flex-[2.5]" : hoveredIndex !== null ? "xl:flex-[0.8] xl:opacity-50 xl:grayscale" : "xl:flex-1"
              }`}
            >
              {/* Background Color Match */}
              <div className={`absolute inset-0 opacity-20 transition-opacity duration-700 ${isHovered ? "opacity-50" : ""} ${bgGradient}`} />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-10" />

              <Link href={`/products/${product.slug}`} className="absolute inset-0 z-30 flex flex-col items-center justify-between pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 xl:pb-14 h-full">
                {/* Bottle Image */}
                {product.imageUrl && (
                  <motion.div
                    className="relative w-full flex-1 flex items-center justify-center my-auto px-4"
                    animate={{
                      scale: isHovered ? 1.12 : 1,
                      y: isHovered ? -12 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="relative w-[160px] h-[210px] sm:w-[180px] sm:h-[240px] md:w-[210px] md:h-[270px] xl:w-[230px] xl:h-[320px]">
                      <Image
                        src={sanityImage(product.imageUrl, { w: 600, q: 85 })}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 25vw"
                        quality={85}
                        className="object-contain object-center drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Text Content */}
                <div className="text-center px-4 w-full flex flex-col items-center justify-end flex-shrink-0 pt-2">
                  <h3 className={`font-serif text-xl md:text-2xl mb-1 xl:mb-2 transition-colors duration-500 ${isHovered ? "text-foreground" : highlightText}`}>
                    {product.name}
                  </h3>

                  <div className={`overflow-hidden transition-all duration-700 ease-out flex justify-center w-full mt-3 ${
                    isHovered ? "max-h-24 opacity-100" : "max-h-24 opacity-100 xl:max-h-0 xl:opacity-0 xl:mt-0"
                  }`}>
                    <span className="uppercase tracking-[0.2em] text-[11px] sm:text-xs border border-white/20 px-5 py-2 sm:px-6 sm:py-2 text-foreground backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                      Discover
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
