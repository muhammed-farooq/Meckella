import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { client } from "@/sanity/lib/client";
import { FounderCarousel } from "@/components/ui/FounderCarousel";

async function getAboutPageData() {
  const query = `*[_type == "aboutPage"][0] {
    title,
    "headerImageUrl": headerImage.asset->url,
    philosophy,
    ingredients {
      heading, text, "imageUrl": image.asset->url
    },
    promise {
      heading, text
    },
    founders[] {
      name, bio, "imageUrl": image.asset->url
    }
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export const metadata = {
  title: "Our Story - Meckella Luxe",
  description: "Discover the heritage, philosophy, and exquisite ingredient sourcing behind Meckella perfumes.",
};

export default async function AboutPage() {
  const data = await getAboutPageData();

  // Fallbacks if CMS is empty
  const pageTitle = data?.title || "The Pursuit of Perfection";
  const headerBg = data?.headerImageUrl;
  const philosophyHeading = data?.philosophy?.heading || "\"A fragrance is not simply an aroma; it is an invisible garment that dresses the soul...\"";
  const philosophyText = data?.philosophy?.text || "At Meckella, our philosophy is anchored in the belief that luxury is found in the meticulous details. We craft not merely perfumes, but lingering memories and olfactory signatures. Our creations are bold, unapologetic, and designed for individuals who command presence.";
  
  const ingredients = data?.ingredients || {
    heading: "Globally Curated, Masterfully Blended",
    text: "The secret to our long-lasting and evocative scents lies in our uncompromising approach to raw materials. We travel to the heart of Grasse for the finest Jasmine, to the deep forests of Southeast Asia for aged Oud, and to the Mediterranean shores for vibrant Bergamot. Every drop is a testament to sustainable farming and ethical partnerships.",
    imageUrl: null
  };

  const promise = data?.promise || {
    heading: "The Meckella Standard: 8 Hours of Presence",
    text: "A true luxury fragrance shouldn't fade before your day is done. Every Meckella Eau de Parfum is formulated with a high oil concentration, specifically engineered to provide an extraordinary 8+ hours of longevity. Whether you are commanding a boardroom or exploring the city at night, your essence will remain bold, captivating, and distinctly yours."
  };

  // Fallback to empty array if no founders are set yet
  const founders = data?.founders || [];

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#0B0B0B]">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-[#1A1A1A]">
            {headerBg ? (
              <Image 
                src={headerBg} 
                alt={pageTitle} 
                fill 
                className="object-cover opacity-60" 
                priority 
              />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C9A96E]/10 via-[#0B0B0B] to-[#0B0B0B]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/50 to-transparent z-10" />
         </div>
         <div className="relative z-20 text-center px-[20px] max-w-4xl mx-auto pt-16 md:pt-24">
            <span className="text-[#C9A96E] uppercase tracking-widest text-xs mb-4 md:mb-6 block">Our Heritage</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#EDEDED]">{pageTitle}</h1>
         </div>
      </section>

      {/* Brand Philosophy */}
      <section className="py-24 lg:py-32 px-[20px] lg:px-[70px] max-w-5xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-[#EDEDED] mb-12 leading-relaxed italic opacity-90">
          {philosophyHeading}
        </h2>
        <p className="text-[#A1A1A1] text-lg leading-loose font-sans max-w-3xl mx-auto">
          {philosophyText}
        </p>
      </section>

      {/* Ingredient Sourcing Narrative */}
      <section className="py-24 lg:py-32 bg-[#0f0f0f] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-[20px] lg:px-[70px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 flex flex-col gap-8">
               <span className="text-[#C9A96E] uppercase tracking-[0.25em] text-xs">The Sourcing</span>
               <h3 className="font-serif text-4xl lg:text-5xl text-[#EDEDED]">{ingredients.heading}</h3>
               <p className="text-[#A1A1A1] text-lg leading-relaxed whitespace-pre-line">
                 {ingredients.text}
               </p>
             </div>
             <div className="order-1 lg:order-2 aspect-[4/5] bg-[#1A1A1A] relative group overflow-hidden">
               {ingredients.imageUrl ? (
                 <Image 
                   src={ingredients.imageUrl} 
                   alt="Raw Ingredients" 
                   fill 
                   className="object-cover transition-transform duration-[1500ms] group-hover:scale-105" 
                 />
               ) : (
                 <div className="absolute inset-0 bg-gradient-to-bl from-[#C9A96E]/20 to-transparent" />
               )}
               <div className="absolute inset-0 border border-[#C9A96E]/20 m-4 z-10 pointer-events-none" />
             </div>
          </div>
        </div>
      </section>

      {/* The Promise Section */}
      <section className="py-24 lg:py-32 px-[20px] lg:px-[70px] max-w-5xl mx-auto text-center">
        <span className="text-[#C9A96E] uppercase tracking-[0.25em] text-xs mb-6 block">Our Commitment</span>
        <h2 className="font-serif text-3xl md:text-5xl text-[#EDEDED] mb-8 leading-relaxed">
          {promise.heading}
        </h2>
        <p className="text-[#A1A1A1] text-lg leading-loose font-sans max-w-3xl mx-auto">
          {promise.text}
        </p>
      </section>

      {/* The Founders (Restored Layout with Fade/Pagination) */}
      <FounderCarousel founders={founders} />

      {/* CTA */}
      <section className="py-32 text-center px-[20px] bg-[#0f0f0f] border-t border-white/5">
        <h3 className="font-serif text-4xl text-[#EDEDED] mb-10">Discover Your Signature</h3>
        <Link href="/products">
          <Button size="lg" className="uppercase tracking-[0.2em] font-sans px-12 py-6 rounded-none bg-[#C9A96E] hover:bg-[#EDEDED] text-[#0B0B0B] border-none transition-all duration-500 hover:scale-105">
            Explore The Collection
          </Button>
        </Link>
      </section>
    </div>
  );
}
