import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CardProduct } from "@/components/CardProduct";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { SplitText } from "@/components/ui/SplitText";
import { HeroCrossfade } from "@/components/ui/HeroCrossfade";
import { CollectionShowcase } from "@/components/ui/CollectionShowcase";

import { client } from "@/sanity/lib/client";

async function getHomePageData() {
  const homePageQuery = `*[_type == "homePage"][0] {
    hero {
      heading,
      subheading,
      text,
      "backgroundImages": backgroundImages[].asset->url
    },
    promotionalBanners[] {
      title, subtitle, "imageUrl": image.asset->url, linkUrl
    },
    marquee,
    craftsmanship[] {
      step, title, description
    },
    moods[] {
      title, description, "imageUrl": image.asset->url, "productSlug": linkedProduct->slug.current
    },
    featuredProducts[]-> {
      name,
      "slug": slug.current,
      description,
      "imageUrl": image.asset->url,
      amazonLink,
      topNotes,
      middleNotes,
      baseNotes
    }
  }`;

  const allProductsQuery = `*[_type == "product" && featured == true][0...5] {
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url
  }`;

  try {
    const [homePageData, showcaseProducts] = await Promise.all([
      client.fetch(homePageQuery),
      client.fetch(allProductsQuery)
    ]);

    return { ...homePageData, showcaseProducts };
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export default async function Home() {
  const data = await getHomePageData();

  // Fallbacks if CMS is completely empty
  const heroHeading = data?.hero?.heading || "Experience the Essence of Meckella";
  const heroSubheading = data?.hero?.subheading || "Introducing";
  const heroText = data?.hero?.text || "A bold and seductive fragrance crafted for presence and confidence.";
  const heroBgImages = data?.hero?.backgroundImages || [];
  
  const promotionalBanners = data?.promotionalBanners || [];
  const marqueeItems = data?.marquee || ["Cruelty Free", "Long Lasting", "Sustainably Sourced", "Premium Quality"];
  const gridProducts = data?.featuredProducts || [];
  const showcaseProducts = data?.showcaseProducts || [];
  const moods = data?.moods || [];
  const craftsmanship = data?.craftsmanship || [];

  return (
    <div className="flex flex-col w-full">
      {/* Cinematic Hero Section with Crossfade */}
      <section className="relative min-h-[75svh] md:min-h-[80svh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0B0B]">
          <HeroCrossfade images={heroBgImages} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/40 via-transparent to-[#0B0B0B] z-10" />
        
        <div className="relative z-20 flex flex-col items-center text-center px-[20px] max-w-5xl mx-auto pt-16 md:pt-24">
          <SplitText 
            text={heroSubheading} 
            className="text-[#C9A96E] uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base mb-4 md:mb-6"
            delay={1}
          />
          <SplitText 
            text={heroHeading}
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-[#EDEDED] mb-6 md:mb-8 leading-tight"
            delay={2}
          />
          <p className="font-sans text-[#A1A1A1] text-base sm:text-lg max-w-2xl mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            {heroText}
          </p>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            <Link href="/products">
              <Button size="lg" variant="outline" className="px-12 rounded-none uppercase tracking-widest text-sm border-[#C9A96E]/50 text-[#EDEDED] hover:bg-[#C9A96E] hover:text-[#0B0B0B] transition-all duration-500">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Infinite Marquee */}
      <InfiniteMarquee items={marqueeItems} />

      {/* Promotional Sub-Banners (Grid) */}
      {promotionalBanners.length > 0 && (
        <section className="py-16 md:py-[120px] px-[20px] lg:px-[70px] max-w-[1400px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotionalBanners.map((banner: any, idx: number) => (
              <Link href={banner.linkUrl || "/products"} key={idx} className="relative group overflow-hidden block aspect-square bg-[#1a1a1a]">
                <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                {banner.imageUrl && (
                  <Image 
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms]"
                  />
                )}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8">
                  {banner.subtitle && (
                    <span className="text-[#C9A96E] uppercase tracking-[0.3em] text-xs mb-4">{banner.subtitle}</span>
                  )}
                  <h3 className="font-serif text-4xl lg:text-5xl text-[#EDEDED] group-hover:scale-105 transition-transform duration-700">{banner.title}</h3>
                  <div className="mt-8 flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                     <span className="text-xs uppercase tracking-widest text-[#EDEDED] border-b border-[#C9A96E] pb-1">Shop Now</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Collection Showcase (The Accordion) */}
      {showcaseProducts.length > 0 && (
        <CollectionShowcase products={showcaseProducts} />
      )}



      {/* Bento Grid: Designed For Every Mood */}
      {moods.length > 0 && (
        <section className="py-16 md:py-[120px] bg-[#0f0f0f] border-t border-white/5">
          <div className="max-w-[1400px] mx-auto px-[20px] lg:px-[70px]">
             <div className="mb-10 md:mb-20">
               <h2 className="font-serif text-4xl sm:text-5xl text-[#EDEDED] mb-6">A Study in Atmosphere</h2>
               <div className="w-12 h-px bg-[#C9A96E]"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
               {moods.map((mood: any, idx: number) => {
                 const className = `relative group overflow-hidden block bg-[#1a1a1a] ${idx === 0 ? "md:row-span-2 aspect-square md:aspect-[4/5]" : "aspect-[4/3]"}`;
                 
                 const content = (
                   <>
                     <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                     {mood.imageUrl && (
                       <Image 
                         src={mood.imageUrl}
                         alt={mood.title}
                         fill
                         className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                       />
                     )}
                     <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                        <h3 className="font-serif text-3xl text-[#EDEDED] mb-3 group-hover:text-[#C9A96E] transition-colors">{mood.title}</h3>
                        <p className="text-[#A1A1A1] text-sm max-w-sm group-hover:text-[#EDEDED] transition-colors">{mood.description}</p>
                     </div>
                     {mood.productSlug && (
                       <div className="absolute top-6 right-6 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                         <span className="bg-[#0B0B0B]/80 backdrop-blur-sm border border-white/10 text-[#C9A96E] text-[10px] uppercase tracking-widest px-4 py-2 hover:bg-[#C9A96E] hover:text-[#0B0B0B] transition-colors">Discover Fragrance</span>
                       </div>
                     )}
                   </>
                 );

                 return mood.productSlug ? (
                   <Link href={`/products/${mood.productSlug}`} key={idx} className={className}>
                     {content}
                   </Link>
                 ) : (
                   <div key={idx} className={className}>
                     {content}
                   </div>
                 );
               })}
             </div>
          </div>
        </section>
      )}

      {/* Craftsmanship Timeline (LOREN Inspiration) */}
      {craftsmanship.length > 0 && (
        <section className="py-16 md:py-[120px] lg:py-[160px] px-[20px] lg:px-[70px] max-w-5xl mx-auto w-full">
          <div className="text-center mb-12 md:mb-24">
            <span className="text-[#C9A96E] uppercase tracking-[0.3em] text-xs mb-6 block">The Process</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#EDEDED] mb-6">Tradition & Innovation</h2>
          </div>

          <div className="flex flex-col gap-10 md:gap-16 relative before:absolute before:inset-0 before:ml-[23px] md:before:mx-auto md:before:w-px before:h-full before:bg-[#333]">
             {craftsmanship.map((item: any, idx: number) => (
               <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full`}>
                 {/* Node */}
                 <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full border border-[#333] bg-[#0B0B0B] text-[#C9A96E] flex items-center justify-center font-serif text-sm z-10 -translate-x-0 md:-translate-x-1/2 group-hover:border-[#C9A96E] transition-colors duration-500">
                   {item.step}
                 </div>
                 
                 {/* Content */}
                 <div className="w-full pl-20 md:pl-0 md:w-5/12">
                   <div className="p-6 md:p-8 border border-transparent group-hover:border-[#333] transition-colors duration-500 bg-[#0f0f0f] relative hover:-translate-y-2 transition-transform">
                     <h3 className="font-serif text-2xl text-[#EDEDED] mb-4">{item.title}</h3>
                     <p className="text-[#A1A1A1] text-sm leading-relaxed">{item.description}</p>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </section>
      )}
    </div>
  );
}
