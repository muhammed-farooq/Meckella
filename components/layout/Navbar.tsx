"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Journal", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-[20px] lg:px-[70px] h-24 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-widest text-[#EDEDED] uppercase">
          Meckella
        </Link>
        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "text-sm uppercase tracking-wider transition-colors hover:text-[#C9A96E]",
                pathname === link.path ? "text-[#C9A96E]" : "text-[#A1A1A1]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
