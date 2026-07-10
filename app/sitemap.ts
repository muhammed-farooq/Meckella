import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.meckellaluxe.com";

async function getSlugs() {
  try {
    const [products, posts] = await Promise.all([
      client.fetch<{ slug: string; _updatedAt: string }[]>(
        `*[_type == "product"]{ "slug": slug.current, _updatedAt }`,
        {},
        { next: { revalidate: 3600 } }
      ),
      client.fetch<{ slug: string; _updatedAt: string }[]>(
        `*[_type == "blog"]{ "slug": slug.current, _updatedAt }`,
        {},
        { next: { revalidate: 3600 } }
      ),
    ]);
    return { products, posts };
  } catch {
    return { products: [], posts: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products, posts } = await getSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
