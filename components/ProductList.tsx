"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardProduct } from "@/components/CardProduct";
import { Search } from "lucide-react";

export function ProductList({ products }: { products: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique scent profiles for filters
  const filterOptions = useMemo(() => {
    const profiles = new Set<string>();
    products.forEach((p) => {
      if (p.scentProfile && Array.isArray(p.scentProfile)) {
        p.scentProfile.forEach((sp: string) => profiles.add(sp));
      }
    });
    return ["All", ...Array.from(profiles)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = activeFilter === "All" || (p.scentProfile && p.scentProfile.includes(activeFilter));
      
      return matchesSearch && matchesFilter;
    });
  }, [products, searchQuery, activeFilter]);

  return (
    <div className="w-full">
      {/* Search and Filter Section */}
      <div className="border-y border-white/5 bg-[#0B0B0B]/90 backdrop-blur-md sticky top-24 z-30 py-4 mb-12">
        <div className="max-w-7xl mx-auto px-[20px] lg:px-[70px] flex flex-col md:flex-row justify-between gap-6 items-center">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`uppercase tracking-widest text-[10px] sm:text-xs px-3 sm:px-4 py-2 transition-all duration-300 border ${
                  activeFilter === filter 
                    ? "border-[#C9A96E] text-[#C9A96E] bg-[#C9A96E]/10" 
                    : "border-transparent text-[#A1A1A1] hover:text-[#EDEDED]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1A1]" />
            <input 
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 pl-10 pr-4 py-2 text-sm text-[#EDEDED] placeholder:text-[#A1A1A1] focus:outline-none focus:border-[#C9A96E] transition-colors"
            />
          </div>

        </div>
      </div>

      {/* Product Grid */}
      <div className="px-[20px] lg:px-[70px] max-w-7xl mx-auto w-full pb-24 min-h-[50vh]">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
             <p className="text-[#A1A1A1] font-sans text-lg">No fragrances found matching your criteria.</p>
             <button onClick={() => { setSearchQuery(""); setActiveFilter("All"); }} className="mt-6 text-[#C9A96E] uppercase tracking-widest text-xs border-b border-[#C9A96E] pb-1 hover:text-[#EDEDED] transition-colors">
               Clear Filters
             </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  // Add cascading margin classes based on original visual logic if needed
                  // but we let Framer Motion handle the layout shifts now.
                >
                  <CardProduct {...product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
