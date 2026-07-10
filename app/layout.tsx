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
  metadataBase: new URL("https://www.meckellaluxe.com"),
  title: {
    default: "Meckella Luxe | Premium Luxury Perfumes & Fragrances",
    template: "%s | Meckella Luxe",
  },
  description:
    "Discover Meckella Luxe — premium luxury Eau de Parfum crafted for presence and confidence. Long-lasting, cruelty-free fragrances with sustainably sourced ingredients. Shop our signature collection.",
  keywords: [
    "Meckella perfume",
    "Meckella Luxe",
    "luxury perfume",
    "premium fragrance",
    "Eau de Parfum",
    "long lasting perfume",
    "cruelty free perfume",
    "luxury fragrance brand",
    "signature scent",
    "buy perfume online",
  ],
  authors: [{ name: "Meckella Luxe" }],
  creator: "Meckella Luxe",
  publisher: "Meckella Luxe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.meckellaluxe.com",
    siteName: "Meckella Luxe",
    title: "Meckella Luxe | Premium Luxury Perfumes & Fragrances",
    description:
      "Discover Meckella Luxe — premium luxury Eau de Parfum crafted for presence and confidence. Long-lasting, cruelty-free fragrances with sustainably sourced ingredients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meckella Luxe | Premium Luxury Perfumes & Fragrances",
    description:
      "Discover Meckella Luxe — premium luxury Eau de Parfum crafted for presence and confidence.",
    creator: "@meckellaluxe",
    site: "@meckellaluxe",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  alternates: {
    canonical: "https://www.meckellaluxe.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let announcements: string[] = [];
  let socialLinks: { platform: string; url: string }[] = [];

  try {
    const data = await client.fetch(
      `*[_type == "homePage"][0] { announcementBar, socialLinks }`,
      {},
      { next: { revalidate: 60 } }
    );
    if (data?.announcementBar) {
      announcements = data.announcementBar;
    }
    if (data?.socialLinks) {
      socialLinks = data.socialLinks;
    }
  } catch (error) {
    console.error("Failed to fetch layout data:", error);
  }

  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.meckellaluxe.com/#organization",
                  name: "Meckella Luxe",
                  url: "https://www.meckellaluxe.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://www.meckellaluxe.com/logo.svg",
                  },
                  description:
                    "Meckella Luxe is a premium luxury fragrance house crafting long-lasting, cruelty-free Eau de Parfum with sustainably sourced ingredients.",
                  sameAs: socialLinks.map((s) => s.url).filter(Boolean),
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.meckellaluxe.com/#website",
                  url: "https://www.meckellaluxe.com",
                  name: "Meckella Luxe",
                  publisher: {
                    "@id": "https://www.meckellaluxe.com/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://www.meckellaluxe.com/products?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ClientLayout announcements={announcements} socialLinks={socialLinks}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

