"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItemProps {
  title: string;
  value: string;
}

export function Accordion({ items }: { items: AccordionItemProps[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="border-t border-white/10">
      {items.map((item, index) => (
        <div key={index} className="border-b border-white/10">
          <button
            onClick={() => toggle(index)}
            className="w-full py-5 flex justify-between items-center text-left focus:outline-none"
          >
            <span className="font-sans text-[#EDEDED] uppercase tracking-widest text-sm">
              {item.title}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#C9A96E] transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pb-5 pt-1 text-[#A1A1A1] font-sans text-sm">
                  {item.value}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
