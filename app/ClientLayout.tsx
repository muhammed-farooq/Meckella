"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/ui/Preloader";

export default function ClientLayout({ children, announcements = [] }: { children: React.ReactNode, announcements?: string[] }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1 w-full flex flex-col">{children}</main>;
  }

  return (
    <>
      <Preloader />
      <Navbar announcements={announcements} />
      <main className={`flex-1 bg-background ${announcements && announcements.length > 0 ? "pt-[120px]" : "pt-24"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
