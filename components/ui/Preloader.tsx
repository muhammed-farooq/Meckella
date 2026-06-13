"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you might wait for specific image assets to load,
    // but Next.js Server Components already fetch data before sending HTML.
    // This preloader fulfills the "Perfume mode" splash requirement to ensure 
    // all initial client hydration and CSS is perfectly smoothed out.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5s cinematic entrance

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Perfume Bottle Loading Graphic */}
            <div className="flex flex-col items-center mb-2">
              {/* Cap (Spherical, Glossy Black) */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a4a4a] via-background to-[#000000] border border-white/10 z-20 shadow-xl relative overflow-hidden">
                <div className="absolute top-1.5 left-2 w-4 h-3 bg-white/20 rounded-full blur-[1px] rotate-12"></div>
              </div>

              {/* Neck */}
              <div className="w-8 h-2 bg-background z-10 border-x border-white/20" />
              <div className="w-14 h-1.5 bg-gradient-to-r from-[#b3955b] via-[#C9A96E] to-[#b3955b] rounded-full z-20 shadow-sm" />

              {/* Body (Cylindrical Glass) */}
              <div className="relative w-24 h-24 rounded-b-xl rounded-t-sm border border-white/20 overflow-hidden bg-white/5 mt-0.5 shadow-2xl backdrop-blur-sm flex justify-center items-center">
                {/* Liquid fill animation (Red liquid like in the image) */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: "10%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-b from-[#e63900] to-[#cc0000] opacity-90"
                >
                  {/* Liquid surface */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff4d00]/50" />
                </motion.div>

                {/* Bottle Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 drop-shadow-md">
                  <div className="flex items-center -ml-1">
                    <span className="font-serif text-[32px] leading-none tracking-tighter text-[#0B0B0B]">M</span>
                    <span className="font-serif text-[28px] leading-none tracking-tighter text-[#0B0B0B] -ml-1">C</span>
                  </div>
                  <span className="font-sans text-[6px] tracking-[0.2em] text-[#0B0B0B] uppercase font-bold mt-1">Meckella</span>
                </div>

                {/* Bottle Highlight (Glass effect) */}
                <div className="absolute top-1 bottom-1 left-2 w-2 bg-white/10 blur-[2px] rounded-full"></div>
                <div className="absolute top-1 bottom-1 right-1 w-1 bg-white/20 blur-[1px] rounded-full"></div>
              </div>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                className="font-serif text-3xl tracking-[0.2em] font-light"
              >
                MECKELLA
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent-gold"
            >
              Initializing Perfume Mode
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
