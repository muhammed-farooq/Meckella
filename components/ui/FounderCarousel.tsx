"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Founder {
  name: string;
  bio: string;
  imageUrl?: string;
}

export function FounderCarousel({ founders }: { founders: Founder[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!founders || founders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % founders.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [founders]);

  if (!founders || founders.length === 0) return null;

  const currentFounder = founders[currentIndex];

  return (
    <section className="py-24 lg:py-40 px-[20px] lg:px-[70px] max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* Left Side: Image with Fade Transition */}
        <div className="lg:col-span-5 aspect-[3/4] bg-[#1A1A1A] relative overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {currentFounder.imageUrl ? (
                <Image
                  src={currentFounder.imageUrl}
                  alt={currentFounder.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#333] to-[#111]" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Text & Pagination */}
        <div className="lg:col-span-7 flex flex-col gap-8 lg:pl-12">
          <span className="text-accent-gold uppercase tracking-[0.25em] text-xs">The Nose</span>

          <div className="min-h-[300px] md:min-h-[250px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-8"
              >
                <h3 className="font-serif text-5xl lg:text-6xl text-foreground">{currentFounder.name}</h3>
                <p className="text-[#A1A1A1] text-lg leading-relaxed whitespace-pre-line max-w-2xl">
                  {currentFounder.bio}
                </p>
                <div className="mt-2">
                  <div className="font-serif text-3xl text-accent-gold/50 italic">{currentFounder.name.charAt(0)}.</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots (Only show if more than 1 founder) */}
          {founders.length > 1 && (
            <div className="flex gap-3 mt-8">
              {founders.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-12 h-1 transition-all duration-500 ${currentIndex === idx ? "bg-[#C9A96E]" : "bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`View founder ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
