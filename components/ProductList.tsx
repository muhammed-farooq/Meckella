"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CardProduct } from "@/components/CardProduct";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

export function ProductList({ products }: { products: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description &&
          p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter =
        activeFilter === "All" ||
        (p.scentProfile && p.scentProfile.includes(activeFilter));
      return matchesSearch && matchesFilter;
    });
  }, [products, searchQuery, activeFilter]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel =
    activeFilter === "All" ? "All Fragrances" : activeFilter;

  return (
    <div className="w-full">
      {/* ── Filter / Search Bar ─────────────────────────────────────────── */}
      <div className="border-y border-white/5 bg-[#0B0B0B]/95 backdrop-blur-md sticky top-[72px] z-30 py-5">
        <div className="max-w-7xl mx-auto px-5 lg:px-[70px] flex flex-col sm:flex-row items-center gap-4">

          {/* Left: label + dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#C9A96E] shrink-0" />
            <span className="uppercase tracking-widest text-[10px] text-[#A1A1A1] shrink-0 hidden sm:block">
              Filter
            </span>

            {/* Dropdown trigger */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-3 border border-white/10 hover:border-[#C9A96E]/60 bg-white/[0.03] hover:bg-[#C9A96E]/5 transition-all duration-300 px-4 py-2.5 min-w-[220px] group"
              >
                {/* Active dot */}
                {activeFilter !== "All" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" />
                )}
                <span className="uppercase tracking-widest text-[10px] text-foreground flex-1 text-left truncate">
                  {activeLabel}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#C9A96E] transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ transformOrigin: "top" }}
                    className="absolute top-full left-0 mt-1 w-full min-w-[260px] bg-[#111111] border border-white/10 shadow-2xl shadow-black/60 z-50 overflow-hidden"
                  >
                    {filterOptions.map((filter, i) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setActiveFilter(filter);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest transition-all duration-200 flex items-center gap-3 border-b border-white/[0.04] last:border-b-0 ${
                          activeFilter === filter
                            ? "text-[#C9A96E] bg-[#C9A96E]/8"
                            : "text-[#A1A1A1] hover:text-foreground hover:bg-white/[0.04]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                            activeFilter === filter
                              ? "bg-[#C9A96E]"
                              : "bg-white/10"
                          }`}
                        />
                        {filter === "All" ? "All Fragrances" : filter}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active filter badge pill */}
            <AnimatePresence>
              {activeFilter !== "All" && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveFilter("All")}
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#C9A96E] border border-[#C9A96E]/30 bg-[#C9A96E]/8 px-3 py-1.5 hover:bg-[#C9A96E]/15 transition-colors"
                >
                  ✕ Clear
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-5 w-px bg-white/10 mx-2" />

          {/* Right: result count + search */}
          <div className="flex items-center gap-4 w-full sm:w-auto sm:ml-auto">
            <span className="text-[#A1A1A1] text-[10px] uppercase tracking-widest hidden md:block shrink-0">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "result" : "results"}
            </span>

            {/* Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A1A1A1]" />
              <input
                type="text"
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 focus:border-[#C9A96E]/60 pl-9 pr-4 py-2.5 text-xs text-foreground placeholder:text-[#4a4a4a] focus:outline-none focus:bg-[#C9A96E]/5 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Grid ────────────────────────────────────────────────── */}
      <div className="px-5 lg:px-[70px] max-w-7xl mx-auto w-full pb-24 pt-16 min-h-[50vh]">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#A1A1A1] font-sans text-lg">
              No fragrances found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="mt-6 text-accent-gold uppercase tracking-widest text-xs border-b border-[#C9A96E] pb-1 hover:text-foreground transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
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
