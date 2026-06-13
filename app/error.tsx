"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-[70vh] bg-background text-foreground flex flex-col items-center justify-center relative px-[20px] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A96E]/5 via-background to-[#0B0B0B] pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center max-w-xl">
        <span className="text-accent-gold font-serif italic text-6xl md:text-8xl mb-6 block tracking-widest opacity-80 select-none">
          Oops
        </span>

        <h1 className="font-serif text-3xl md:text-4xl text-foreground uppercase tracking-[0.2em] mb-6">
          Something Went Wrong
        </h1>

        <div className="w-12 h-px bg-[#C9A96E] mb-8" />

        <p className="text-[#A1A1A1] text-sm md:text-base leading-relaxed mb-12 font-sans">
          The delicate balance of our fragrance collection was briefly disrupted. Please try again or return later.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto uppercase tracking-widest font-sans px-10 py-5 rounded-none bg-[#C9A96E] hover:bg-[#b0935d] text-[#0B0B0B] border-none transition-all duration-300"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
