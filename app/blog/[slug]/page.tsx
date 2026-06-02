import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";

async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    title,
    publishedAt,
    content,
    "imageUrl": image.asset->url
  }`;
  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#0B0B0B]">
      <article className="max-w-3xl mx-auto w-full px-[20px] pt-32 pb-24">
        
        <header className="mb-16 text-center">
          <span className="text-[#C9A96E] uppercase tracking-widest text-xs mb-6 block">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#EDEDED] leading-tight mb-10">
            {post.title}
          </h1>
          
          {post.imageUrl && (
            <div className="aspect-[16/9] w-full relative bg-[#1A1A1A] overflow-hidden mt-10">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-p:text-[#A1A1A1] prose-h2:font-serif prose-h2:text-[#EDEDED] prose-h3:font-serif prose-a:text-[#C9A96E] max-w-none font-sans text-lg leading-loose">
          {post.content ? (
            <PortableText value={post.content} />
          ) : (
             <p className="text-[#A1A1A1] italic text-center">Story coming soon...</p>
          )}
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex justify-center">
          <Link href="/blog" className="text-[#C9A96E] uppercase tracking-widest text-sm hover:text-[#EDEDED] transition-colors">
            ← Back to Journal
          </Link>
        </div>

      </article>
    </div>
  );
}
