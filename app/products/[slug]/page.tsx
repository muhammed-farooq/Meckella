import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { client } from "@/sanity/lib/client";
import { HowToUse } from "@/components/ui/HowToUse";

async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    name,
    description,
    emotionalSection,
    topNotes,
    middleNotes,
    baseNotes,
    scentProfile,
    keyHighlights,
    accordionSpecs,
    "imageUrl": image.asset->url,
    "gallery": gallery[] {
      "url": asset->url,
      "mimeType": asset->mimeType
    },
    amazonLink
  }`;
  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export default async function ProductDetailsPage({ params, searchParams }: { params: any, searchParams?: any }) {
  // In newer Next.js versions, params might behave as a promise
  const resolvedParams = await Promise.resolve(params);
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    return (
      <div className="w-full flex flex-col min-h-[70vh] bg-[#0B0B0B] text-[#EDEDED] items-center justify-center pt-24 px-[20px]">
        <h1 className="font-serif text-4xl mb-6">Product Not Found</h1>
        <p className="text-[#A1A1A1] max-w-lg text-center leading-relaxed">
          We couldn't locate tracking details for <span className="text-[#C9A96E]">{resolvedParams.slug}</span>. 
          Please make sure the product is fully <strong>Published</strong> in your Sanity Studio, and not just a Draft!
        </p>
        <Link href="/products" className="mt-8">
          <Button variant="outline" className="uppercase tracking-widest text-sm px-8 border-[#C9A96E] text-[#C9A96E]">
            Back to Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#0B0B0B] text-[#EDEDED]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-16 pt-20 pb-20 px-[20px] lg:px-[70px]">
        
        {/* Left Pane - Image */}
        <div className="relative">
          <div className="lg:sticky lg:top-32 aspect-[3/4] bg-[#1A1A1A] w-full overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[#A1A1A1] font-serif text-2xl tracking-widest text-center px-4">
                {product.name}
              </div>
            )}
          </div>
        </div>

        {/* Right Pane - Content */}
        <div className="flex flex-col pt-12 lg:pt-0">
          <div className="mb-10">
            <h1 className="font-serif text-5xl md:text-6xl text-[#EDEDED] mb-4 leading-tight">
              {product.name}
            </h1>
            {product.emotionalSection && (
              <p className="text-[#C9A96E] font-serif text-xl italic tracking-wide">
                "{product.emotionalSection}"
              </p>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-8">
              <p className="text-[#A1A1A1] leading-relaxed text-lg font-sans">
                {product.description}
              </p>
            </div>
          )}

          {/* Jump Link to How To Use & Origins */}
          <div className="mb-12">
            <a href="#how-to-use" className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#EDEDED] transition-colors border-b border-[#C9A96E] hover:border-[#EDEDED] pb-1 uppercase tracking-widest text-xs">
              Discover Quality & Origins <span className="text-[10px]">↓</span>
            </a>
          </div>

          {/* Scent Profile Tags */}
          {product.scentProfile && product.scentProfile.length > 0 && (
            <div className="mb-12">
              <span className="text-[#EDEDED] uppercase tracking-widest text-xs mb-4 block">Scent Profile</span>
              <div className="flex flex-wrap gap-3">
                {product.scentProfile.map((tag: string, index: number) => (
                  <span key={index} className="px-4 py-2 border border-white/10 text-[#A1A1A1] text-xs uppercase tracking-wider rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fragrance Pyramid (Visual UI) */}
          {(product.topNotes || product.middleNotes || product.baseNotes) && (
            <div className="mb-12 border border-white/10 p-8 relative overflow-hidden bg-[#0f0f0f]">
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E] opacity-5 blur-[100px] rounded-full" />
              
              <h3 className="font-serif text-2xl text-[#EDEDED] mb-8">Fragrance Pyramid</h3>
              
              <div className="flex flex-col gap-6">
                {product.topNotes && product.topNotes.length > 0 && (
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0 text-[#C9A96E] uppercase tracking-widest text-xs pt-1">Top Notes</div>
                    <div className="text-[#A1A1A1] font-sans">{product.topNotes.join(" • ")}</div>
                  </div>
                )}
                {product.middleNotes && product.middleNotes.length > 0 && (
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0 text-[#C9A96E] uppercase tracking-widest text-xs pt-1">Heart Notes</div>
                    <div className="text-[#A1A1A1] font-sans">{product.middleNotes.join(" • ")}</div>
                  </div>
                )}
                {product.baseNotes && product.baseNotes.length > 0 && (
                  <div className="flex gap-4">
                    <div className="w-24 shrink-0 text-[#C9A96E] uppercase tracking-widest text-xs pt-1">Base Notes</div>
                    <div className="text-[#A1A1A1] font-sans">{product.baseNotes.join(" • ")}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Key Highlights */}
          {product.keyHighlights && product.keyHighlights.length > 0 && (
            <div className="mb-12">
              <span className="text-[#EDEDED] uppercase tracking-widest text-xs mb-4 block">Highlights</span>
              <ul className="flex flex-col gap-3">
                {product.keyHighlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-[#A1A1A1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Accordion Specs */}
          {product.accordionSpecs && product.accordionSpecs.length > 0 && (
            <div className="mb-16">
              <Accordion items={product.accordionSpecs} />
            </div>
          )}

          {/* Amazon CTA Button */}
          {product.amazonLink && (
            <Link href={product.amazonLink} target="_blank" rel="noopener noreferrer" className="mt-auto inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full uppercase tracking-widest font-sans px-12 py-6 rounded-none bg-[#C9A96E] hover:bg-[#b0935d] text-[#0B0B0B] border-none">
                Shop on Amazon
              </Button>
            </Link>
          )}

        </div>
      </div>
      
      {/* Product Media Gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <section className="w-full py-16 bg-[#0B0B0B]">
          <div className="max-w-7xl mx-auto px-[20px] lg:px-[70px]">
            <div className="flex flex-col gap-8 lg:gap-12 w-full items-center">
              {product.gallery.map((media: any, index: number) => {
                const isVideo = media.mimeType?.startsWith('video/');
                
                return (
                  <div key={index} className="relative bg-[#1a1a1a] overflow-hidden group rounded-md w-full">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                    
                    {isVideo ? (
                      <video 
                        src={media.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto object-cover"
                      />
                    ) : (
                      <Image 
                        src={media.url}
                        alt={`${product.name} Media ${index + 1}`}
                        width={1200}
                        height={675}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="group-hover:scale-105 transition-transform duration-[1200ms]"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <HowToUse />

      {/* Floating Sticky Amazon Button */}
      {product.amazonLink && (
        <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none flex justify-center md:justify-end">
          <Link href={product.amazonLink} target="_blank" rel="noopener noreferrer" className="pointer-events-auto shadow-[0_0_40px_rgba(201,169,110,0.3)]">
            <Button size="lg" className="uppercase tracking-widest font-sans px-10 py-6 rounded-full bg-[#C9A96E] hover:bg-[#b0935d] text-[#0B0B0B] border-none">
              Shop on Amazon
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
