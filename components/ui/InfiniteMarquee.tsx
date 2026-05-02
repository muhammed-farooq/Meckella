"use client";

import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
  items: string[];
}

export function InfiniteMarquee({ items }: InfiniteMarqueeProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-[#0B0B0B] border-y border-white/5 py-4 flex flex-nowrap items-center">
      <motion.div
        className="flex whitespace-nowrap gap-12 sm:gap-24 px-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30, // Adjust speed based on content length
        }}
        // Duplicate the items array to allow seamless infinite scrolling
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-12 sm:gap-24">
            <span className="text-[#C9A96E] uppercase tracking-[0.2em] text-xs sm:text-sm font-sans flex items-center justify-center">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#333] hidden sm:block"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
