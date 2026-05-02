import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

export const metadata = {
  title: "Journal - Meckella Luxe",
  description: "Insights, stories, and musings from the world of Meckella.",
};

async function getPosts() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    "imageUrl": image.asset->url
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#0B0B0B]">
      <section className="pt-32 pb-16 px-[20px] lg:px-[70px] max-w-7xl mx-auto w-full text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-[#EDEDED] mb-6">The Journal</h1>
        <p className="text-[#A1A1A1] max-w-2xl mx-auto text-lg leading-relaxed">
          Musings on luxury, the art of perfumery, and the lifestyle of the bold.
        </p>
      </section>

      <section className="py-12 px-[20px] lg:px-[70px] max-w-7xl mx-auto w-full">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-[#A1A1A1]">No journal entries found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post: any) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative flex flex-col gap-6">
                <div className="aspect-[4/5] bg-[#1A1A1A] relative overflow-hidden">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 to-transparent flex items-end p-6">
                      <span className="text-[#C9A96E] uppercase tracking-widest text-xs">Article</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#A1A1A1] text-xs uppercase tracking-widest">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h2 className="font-serif text-2xl text-[#EDEDED] group-hover:text-[#C9A96E] transition-colors">
                    {post.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
