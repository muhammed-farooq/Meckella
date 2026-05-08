"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0B0B0B] py-12 md:py-20 mt-auto">
      <div className="max-w-7xl mx-auto px-[20px] lg:px-[70px] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-[#A1A1A1] text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-serif text-2xl text-[#EDEDED] uppercase tracking-widest mb-4 md:mb-6">Meckella</h3>
          <p className="font-sans text-sm leading-relaxed max-w-sm">
            Experience the essence of Meckella. Crafted for presence and confidence.
          </p>
        </div>
        
        <div>
          <h4 className="font-sans text-sm uppercase tracking-widest text-[#EDEDED] mb-4 md:mb-6">Explore</h4>
          <ul className="space-y-3 md:space-y-4 text-sm">
            <li><Link href="/products" className="hover:text-[#C9A96E] transition-colors">Collection</Link></li>
            <li><Link href="/about" className="hover:text-[#C9A96E] transition-colors">Our Story</Link></li>
            <li><Link href="/blog" className="hover:text-[#C9A96E] transition-colors">Journal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-sm uppercase tracking-widest text-[#EDEDED] mb-4 md:mb-6">Connect</h4>
          <ul className="space-y-3 md:space-y-4 text-sm">
            <li><Link href="/contact" className="hover:text-[#C9A96E] transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-[#C9A96E] transition-colors">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-[20px] lg:px-[70px] mt-12 md:mt-20 pt-8 border-t border-white/5 text-xs flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Meckella. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <Link href="#" className="hover:text-[#EDEDED]">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#EDEDED]">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
