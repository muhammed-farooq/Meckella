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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0B0B] text-[#EDEDED]"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Minimalist Loading Graphic */}
            <div className="relative w-12 h-16 border-t border-[#C9A96E] overflow-hidden">
               <motion.div 
                 initial={{ y: "100%" }}
                 animate={{ y: "0%" }}
                 transition={{ duration: 2, ease: "easeInOut" }}
                 className="absolute inset-0 bg-gradient-to-t from-[#C9A96E]/40 to-transparent"
               />
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
              className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#C9A96E]"
            >
              Initializing Perfume Mode
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
