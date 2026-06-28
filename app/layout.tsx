import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ClientLayout from "./ClientLayout";
import { client } from "@/sanity/lib/client";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meckella - Premium Luxury Perfumes",
  description: "Experience the Essence of Meckella. Crafted for presence and confidence.",
  icons: {
    icon: [
      { url: '/favicon_io/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon_io/site.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let announcements: string[] = [];
  try {
    const data = await client.fetch(`*[_type == "homePage"][0] { announcementBar }`, {}, { next: { revalidate: 60 } });
    if (data?.announcementBar) {
      announcements = data.announcementBar;
    }
  } catch (error) {
    console.error("Failed to fetch announcements:", error);
  }

  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ClientLayout announcements={announcements}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
