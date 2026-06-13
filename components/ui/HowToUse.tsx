"use client";

import { motion } from "framer-motion";
import { Clock, Droplets, MapPin, Sparkles } from "lucide-react";

export function HowToUse() {
  return (
    <div id="how-to-use" className="w-full bg-[#0f0f0f] border-t border-white/5 py-24">
      <div className="max-w-7xl mx-auto px-[20px] lg:px-[70px] grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">

        {/* Left Side: Importing & Quality Credentials (Based on the uploaded image) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-12"
        >
          <div className="mb-4">
            <h3 className="font-serif text-3xl text-foreground mb-4">The Meckella Standard</h3>
            <p className="text-[#A1A1A1] max-w-sm">Crafted with the highest quality standards, crossing borders to bring you unparalleled luxury.</p>
          </div>

          <div className="space-y-10">
            {/* Bottled in India */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center group-hover:border-[#C9A96E] transition-colors duration-500 overflow-hidden relative">
                {/* Simplified CSS Indian Flag Representation */}
                <div className="w-8 h-8 rounded-full border border-gray-400 flex flex-col overflow-hidden">
                  <div className="h-1/3 w-full bg-[#FF9933]"></div>
                  <div className="h-1/3 w-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full border border-blue-800"></div>
                  </div>
                  <div className="h-1/3 w-full bg-[#138808]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-foreground uppercase tracking-[0.15em] text-sm font-semibold mb-1">Bottled In India</h4>
                <p className="text-[#A1A1A1] text-xs max-w-[200px]">Proudly packaged locally ensuring fresh delivery.</p>
              </div>
            </div>

            {/* Imported from France */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center group-hover:border-[#C9A96E] transition-colors duration-500 overflow-hidden relative">
                {/* Simplified CSS French Flag Representation */}
                <div className="w-8 h-8 rounded-full border border-gray-400 flex overflow-hidden">
                  <div className="w-1/3 h-full bg-[#002654]"></div>
                  <div className="w-1/3 h-full bg-white"></div>
                  <div className="w-1/3 h-full bg-[#ED2939]"></div>
                </div>
              </div>
              <div>
                <h4 className="text-foreground uppercase tracking-[0.15em] text-sm font-semibold mb-1">Imported From France</h4>
                <p className="text-[#A1A1A1] text-xs max-w-[200px]">Pure, concentrated perfume oils directly from Grasse.</p>
              </div>
            </div>

            {/* Long Lasting */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6 group">
              <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center group-hover:border-[#C9A96E] transition-colors duration-500 text-foreground">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-foreground uppercase tracking-[0.15em] text-sm font-semibold mb-1">Up To 8h+ Longevity</h4>
                <p className="text-[#A1A1A1] text-xs max-w-[200px]">Long-lasting premium perfumes designed to stay with you.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: How to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#1A1A1A] p-8 lg:p-12 border border-white/5 relative overflow-hidden"
        >
          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/5 rounded-bl-full" />

          <h3 className="font-serif text-3xl text-foreground mb-8">The Ritual of Application</h3>

          <div className="space-y-8 relative z-10">
            <div className="flex gap-4">
              <div className="mt-1 text-accent-gold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-foreground tracking-wider uppercase text-sm mb-2">Pulse Points</h4>
                <p className="text-[#A1A1A1] text-sm leading-relaxed">Spray directly onto your pulse points: the inside of your wrists, behind the ears, and the base of your throat. These warm areas help project the scent.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 text-accent-gold">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-foreground tracking-wider uppercase text-sm mb-2">Do Not Rub</h4>
                <p className="text-[#A1A1A1] text-sm leading-relaxed">After applying to your wrists, resist the urge to rub them together. The friction breaks down the delicate top notes of the fragrance.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 text-accent-gold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-foreground tracking-wider uppercase text-sm mb-2">The Scent Cloud</h4>
                <p className="text-[#A1A1A1] text-sm leading-relaxed">For a subtle, all-over aura, spray a cloud of perfume in the air and walk through it immediately before dressing.</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
