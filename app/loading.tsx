import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] bg-[#0B0B0B] text-[#EDEDED] flex flex-col items-center justify-center relative px-[20px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A96E]/5 via-[#0B0B0B] to-[#0B0B0B] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <Loader2 className="w-12 h-12 text-[#C9A96E] animate-spin mb-6" />
        <h2 className="font-serif text-2xl uppercase tracking-[0.2em] text-[#EDEDED] mb-2 animate-pulse">
          Awakening the Senses
        </h2>
        <p className="text-[#A1A1A1] font-sans text-sm tracking-widest uppercase">
          Please wait...
        </p>
      </div>
    </div>
  );
}
