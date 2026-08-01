export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Build an optimized Sanity CDN image URL.
 *
 * Sanity's Image Transformation API lets us request exactly the size we need,
 * in WebP/AVIF format, at a controlled quality — saving 60-90% of bytes vs
 * the raw original URL.
 *
 * @param url   Raw `image.asset->url` string from GROQ
 * @param opts  Optional overrides
 */
export function sanityImage(
  url: string | null | undefined,
  opts: {
    /** Max width in px (default 1200) */
    w?: number;
    /** Max height in px */
    h?: number;
    /** 1-100, default 75 */
    q?: number;
    /** Output format — 'webp' | 'jpg' | 'png' (default 'webp') */
    fm?: "webp" | "jpg" | "png";
    /** Fit mode when both w and h are set */
    fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  } = {}
): string {
  if (!url) return "";
  const { w = 1200, h, q = 75, fm = "webp", fit } = opts;

  // Sanity CDN supports query-string transforms on cdn.sanity.io URLs
  const base = url.split("?")[0]; // strip any existing params
  const params = new URLSearchParams();
  params.set("auto", "format"); // auto picks best format the browser accepts
  params.set("fm", fm);         // explicit fallback format
  params.set("q", String(q));
  params.set("w", String(w));
  if (h) params.set("h", String(h));
  if (fit) params.set("fit", fit);

  return `${base}?${params.toString()}`;
}
