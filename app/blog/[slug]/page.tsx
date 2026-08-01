import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Metadata } from "next";
import { sanityImage } from "@/lib/utils";

const BASE_URL = "https://www.meckellaluxe.com";

async function getPost(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    title,
    publishedAt,
    excerpt,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const description =
    post.excerpt ||
    `Read "${post.title}" on the Meckella Luxe Journal — insights, stories, and musings from the world of luxury perfumery.`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `${BASE_URL}/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${post.title} | Meckella Journal`,
      description,
      url: `${BASE_URL}/blog/${resolvedParams.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      siteName: "Meckella Luxe",
      images: post.imageUrl
        ? [{ url: post.imageUrl, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Meckella Journal`,
      description,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  };
}



export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      <article className="max-w-3xl mx-auto w-full px-[20px] pt-32 pb-24">

        <header className="mb-16 text-center">
          <span className="text-accent-gold uppercase tracking-widest text-xs mb-6 block">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-10">
            {post.title}
          </h1>

          {post.imageUrl && (
            <div className="aspect-[16/9] w-full relative bg-[#1A1A1A] overflow-hidden mt-10">
              <Image
                src={sanityImage(post.imageUrl, { w: 1200, q: 80 })}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                quality={80}
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div className="prose prose-invert prose-p:text-[#A1A1A1] prose-h2:font-serif prose-h2:text-foreground prose-h3:font-serif prose-a:text-accent-gold max-w-none font-sans text-lg leading-loose">
          {post.content ? (
            <PortableText value={post.content} />
          ) : (
            <p className="text-[#A1A1A1] italic text-center">Story coming soon...</p>
          )}
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex justify-center">
          <Link href="/blog" className="text-accent-gold uppercase tracking-widest text-sm hover:text-foreground transition-colors">
            ← Back to Journal
          </Link>
        </div>

      </article>
    </div>
  );
}
