"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sanityImage } from "@/lib/utils";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group flex flex-col h-full"
    >
      {/* Image */}
      <Link
        href={`/products/${slug}`}
        className="block overflow-hidden relative aspect-[3/4] bg-[#141414]"
      >
        {imageUrl ? (
          <Image
            src={sanityImage(imageUrl, { w: 600, q: 80 })}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={80}
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-108"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#A1A1A1] font-serif text-xl tracking-widest text-center px-4">
            {name}
          </div>
        )}

        {/* gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Discover CTA */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
          <span className="text-accent-gold uppercase tracking-[0.2em] text-[10px] border border-[#C9A96E]/70 px-8 py-3 bg-black/50 backdrop-blur-sm">
            Discover
          </span>
        </div>
      </Link>

      {/* Card body */}
      <div className="mt-6 flex flex-col flex-1">
        {/* Thin gold rule */}
        <div className="w-8 h-px bg-[#C9A96E]/40 mb-4" />

        <h3 className="font-serif text-xl lg:text-2xl text-foreground mb-2 group-hover:text-accent-gold transition-colors duration-500 leading-snug">
          {name}
        </h3>

        <p className="text-[#606060] text-xs leading-relaxed line-clamp-2 mb-5">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-5 mt-auto">
          <Link
            href={`/products/${slug}`}
            className="text-[#A1A1A1] text-[10px] uppercase tracking-[0.18em] hover:text-accent-gold transition-colors border-b border-transparent hover:border-[#C9A96E] pb-0.5"
          >
            Explore
          </Link>
          {amazonLink && (
            <>
              <span className="w-px h-3 bg-white/10" />
              <a
                href={amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1A1] text-[10px] uppercase tracking-[0.18em] hover:text-accent-gold transition-colors border-b border-transparent hover:border-[#C9A96E] pb-0.5"
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
