import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ClientLayout from "./ClientLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meckella - Premium Luxury Perfumes",
  description: "Experience the Essence of Meckella. Crafted for presence and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0B0B0B] text-[#EDEDED]">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
