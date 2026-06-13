import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative px-[20px] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A96E]/5 via-background to-[#0B0B0B] pointer-events-none" />

      {/* Decorative frame */}
      <div className="absolute inset-0 border border-white/5 m-8 pointer-events-none" />

      <div className="relative z-10 text-center flex flex-col items-center max-w-xl">
        <span className="text-accent-gold font-serif italic text-7xl md:text-9xl mb-6 block tracking-widest opacity-80 select-none">
          404
        </span>

        <h1 className="font-serif text-3xl md:text-4xl text-foreground uppercase tracking-[0.2em] mb-6">
          Lost in the Scent
        </h1>

        <div className="w-12 h-px bg-[#C9A96E] mb-8" />

        <p className="text-[#A1A1A1] text-sm md:text-base leading-relaxed mb-12 font-sans">
          The page you are looking for does not exist or has been moved. Like a fleeting top note, it has dissipated into the air. Let us guide you back to our collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button className="w-full sm:w-auto uppercase tracking-widest font-sans px-10 py-5 rounded-none bg-[#C9A96E] hover:bg-[#b0935d] text-[#0B0B0B] border-none transition-all duration-300">
              Return Home
            </Button>
          </Link>

          <Link href="/products">
            <Button variant="outline" className="w-full sm:w-auto uppercase tracking-widest font-sans px-10 py-5 rounded-none border-white/20 text-foreground hover:bg-white hover:text-black transition-all duration-300">
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
