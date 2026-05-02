"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1 w-full flex flex-col">{children}</main>;
  }

  return (
    <>
      <Preloader />
      <Navbar />
      <main className="flex-1 pt-24 bg-[#0B0B0B]">
        {children}
      </main>
      <Footer />
    </>
  );
}
