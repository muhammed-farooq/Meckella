import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    // Serve modern formats — Next.js Image Optimization will auto-pick the
    // best format the browser supports (AVIF > WebP > original).
    formats: ["image/avif", "image/webp"],

    // Only generate variants at these widths to avoid redundant transforms.
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384, 512],

    // Keep optimized images in the server cache for 30 days (default is 60s).
    minimumCacheTTL: 60 * 60 * 24 * 30,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
