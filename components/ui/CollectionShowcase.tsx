"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <div className="w-full flex flex-col items-center bg-[#0B0B0B] py-24 lg:py-32 overflow-hidden border-y border-white/5">
      <div className="text-center mb-16 relative z-10 px-4">
        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#EDEDED] mb-4">
          <span className="font-serif italic text-[#C9A96E]">Fragrances</span> that<br />Define your Essence
        </h2>
      </div>

      <div className="w-full h-[60vh] md:h-[70vh] flex flex-col md:flex-row max-w-[1600px] mx-auto px-4 gap-2 md:gap-0">
        {products.slice(0, 5).map((product, index) => {
          const isHovered = hoveredIndex === index;
          const bgGradient = productColors[index] || "bg-gradient-to-t from-[#333] to-transparent";
          const highlightText = textColors[index] || "text-[#C9A96E]";

          return (
            <motion.div
              key={product.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex-1 rounded-2xl md:rounded-none overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group ${
                isHovered ? "md:flex-[2.5]" : hoveredIndex !== null ? "md:flex-[0.8] opacity-50 grayscale" : "md:flex-1"
              }`}
            >
              {/* Background Color Match */}
              <div className={`absolute inset-0 opacity-20 transition-opacity duration-700 ${isHovered ? "opacity-50" : ""} ${bgGradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent z-10" />

              <Link href={`/products/${product.slug}`} className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-8 md:pb-16 h-full">
                
                {/* Bottle Image */}
                {product.imageUrl && (
                  <motion.div 
                    className="relative w-full h-[50%] md:h-[60%] flex items-end justify-center mb-6"
                    animate={{ 
                      scale: isHovered ? 1.15 : 1,
                      y: isHovered ? -20 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="relative w-[180px] h-[250px] md:w-[220px] md:h-[300px]">
                      <Image 
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Text Content */}
                <div className="text-center px-4 transition-transform duration-500 transform translate-y-0">
                  <h3 className={`font-serif text-2xl md:text-3xl mb-2 transition-colors duration-500 ${isHovered ? "text-[#EDEDED]" : highlightText}`}>
                    {product.name}
                  </h3>
                  
                  <div className={`overflow-hidden transition-all duration-700 ease-out flex justify-center ${isHovered ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                    <span className="uppercase tracking-[0.2em] text-xs border border-white/20 px-6 py-2 text-[#EDEDED] backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
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
