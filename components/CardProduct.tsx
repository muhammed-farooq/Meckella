"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  amazonLink?: string;
  topNotes?: string[];
  middleNotes?: string[];
  baseNotes?: string[];
}

export function CardProduct({ 
  name, slug, description, imageUrl, amazonLink, topNotes, middleNotes, baseNotes 
}: ProductCardProps) {
  const hasNotes = (topNotes && topNotes.length > 0) || (middleNotes && middleNotes.length > 0) || (baseNotes && baseNotes.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group flex flex-col h-full"
    >
      <Link href={`/products/${slug}`} className="block overflow-hidden relative aspect-[3/4] bg-[#1a1a1a]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#A1A1A1] font-serif text-xl tracking-widest text-center px-4">
            {name}
          </div>
        )}
        
        {/* Dark film that slides up slightly more intensely */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Clean Discover Hover Reveal */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="text-[#C9A96E] uppercase tracking-widest text-xs border border-[#C9A96E] px-8 py-3 bg-[#0B0B0B]/50 backdrop-blur-sm">Discover</span>
        </div>
      </Link>
      
      <div className="mt-8 flex flex-col items-center text-center">
        <h3 className="font-serif text-3xl text-[#EDEDED] mb-3 group-hover:text-[#C9A96E] transition-colors duration-500">{name}</h3>
        <p className="text-[#A1A1A1] text-sm line-clamp-2 max-w-[280px] mb-6 leading-relaxed hidden sm:block">{description}</p>
        <div className="flex items-center justify-center gap-6 mt-auto">
          <Link
             href={`/products/${slug}`}
             className="text-[#EDEDED] text-xs uppercase tracking-widest hover:text-[#C9A96E] transition-colors border-b border-transparent hover:border-[#C9A96E] pb-1"
          >
            Explore
          </Link>
          {amazonLink && (
            <>
              <div className="w-1 h-1 rounded-full bg-[#333]" />
              <a
                href={amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EDEDED] text-xs uppercase tracking-widest hover:text-[#C9A96E] transition-colors border-b border-transparent hover:border-[#C9A96E] pb-1"
              >
                Buy on Amazon
              </a>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
