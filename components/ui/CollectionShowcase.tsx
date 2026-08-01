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

  const highlightText = "text-accent-gold";
  const bgGradient = "bg-gradient-to-t from-[#333] to-transparent";

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center bg-background py-16 md:py-24 lg:py-32 overflow-hidden border-y border-white/5">
      <div className="text-center mb-8 md:mb-16 relative z-10 px-4">
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
          <span className="font-serif italic text-accent-gold">Fragrances</span> that<br />Define your Essence
        </h2>
      </div>

      {/* ─── MOBILE: horizontal snap-scroll (< 768px) ─────────────────────────── */}
      <div className="md:hidden w-full flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[20px] gap-4 sm:gap-6 h-[480px] sm:h-[520px] items-stretch max-w-[1600px] mx-auto">
        {products.slice(0, 5).map((product, index) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="relative flex-shrink-0 snap-center w-[72vw] max-w-[260px] sm:w-[75vw] sm:max-w-[290px] h-full rounded-2xl overflow-hidden group"
          >
            <div className={`absolute inset-0 opacity-20 ${bgGradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />

            {product.imageUrl && (
              <div className="absolute inset-0 z-20 flex items-end justify-center pb-4">
                <div className="relative w-[130px] h-[190px] sm:w-[155px] sm:h-[220px]">
                  <Image
                    src={sanityImage(product.imageUrl, { w: 400, q: 80 })}
                    alt={product.name}
                    fill
                    sizes="75vw"
                    quality={80}
                    className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 z-30 pb-6 text-center px-3">
              <h3 className={`font-serif text-xl mb-2 ${highlightText}`}>{product.name}</h3>
              <span className="uppercase tracking-[0.2em] text-xs border border-white/20 px-5 py-2 text-foreground backdrop-blur-md rounded-full">
                Discover
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── TABLET: 2-column + 1 wide-row grid (768px – 1023px) ──────────────── */}
      <div className="hidden md:grid lg:hidden w-full max-w-[1000px] mx-auto px-[20px] gap-4 grid-cols-2 auto-rows-[320px]">
        {products.slice(0, 5).map((product, index) => {
          // First card spans 2 columns as a hero card
          const isHero = index === 0;
          return (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className={`relative overflow-hidden rounded-2xl group bg-[#111] ${isHero ? "col-span-2 !auto-rows-[380px]" : ""}`}
              style={isHero ? { height: "380px" } : {}}
            >
              <div className={`absolute inset-0 opacity-20 ${bgGradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />

              {product.imageUrl && (
                <div className="absolute inset-0 z-20 flex items-end justify-center pb-6">
                  <motion.div
                    whileHover={{ scale: 1.08, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`relative ${isHero ? "w-[200px] h-[280px]" : "w-[140px] h-[200px]"}`}
                  >
                    <Image
                      src={sanityImage(product.imageUrl, { w: 500, q: 80 })}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      quality={80}
                      className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                    />
                  </motion.div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 z-30 pb-6 text-center px-4">
                <h3 className={`font-serif ${isHero ? "text-2xl" : "text-xl"} mb-3 ${highlightText} group-hover:text-foreground transition-colors duration-400`}>
                  {product.name}
                </h3>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-[0.2em] text-xs border border-white/20 px-5 py-2 text-foreground backdrop-blur-md rounded-full inline-block">
                  Discover
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── DESKTOP: hover-accordion (1024px+) ──────────────────────────────── */}
      <div className="hidden lg:flex w-full max-w-[1600px] mx-auto px-[70px] gap-0 h-[70vh] items-stretch">
        {products.slice(0, 5).map((product, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={product.slug}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group h-full ${
                isHovered
                  ? "flex-[2.5]"
                  : hoveredIndex !== null
                  ? "flex-[0.8] opacity-50 grayscale"
                  : "flex-1"
              }`}
            >
              <div className={`absolute inset-0 opacity-20 transition-opacity duration-700 ${isHovered ? "opacity-50" : ""} ${bgGradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />

              <Link href={`/products/${product.slug}`} className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-16 h-full">
                {product.imageUrl && (
                  <motion.div
                    className="relative w-full h-[60%] flex items-end justify-center mb-6"
                    animate={{ scale: isHovered ? 1.15 : 1, y: isHovered ? -20 : 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="relative w-[220px] h-[300px]">
                      <Image
                        src={sanityImage(product.imageUrl, { w: 500, q: 80 })}
                        alt={product.name}
                        fill
                        sizes="20vw"
                        quality={80}
                        className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="text-center px-4">
                  <h3 className={`font-serif text-2xl mb-2 transition-colors duration-500 ${isHovered ? "text-foreground" : highlightText}`}>
                    {product.name}
                  </h3>
                  <div className={`overflow-hidden transition-all duration-700 ease-out flex justify-center ${isHovered ? "max-h-24 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}>
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
    </div>
  );
}
