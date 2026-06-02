import { CardProduct } from "@/components/CardProduct";

import { client } from "@/sanity/lib/client";

async function getAllProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    amazonLink
  }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="pt-20 pb-16 px-[20px] lg:px-[70px] max-w-7xl mx-auto w-full text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-[#EDEDED] mb-6">The Collection</h1>
        <p className="text-[#A1A1A1] max-w-2xl mx-auto">
          Explore our complete range of signature fragrances, each meticulously crafted to evoke distinct emotions and capture unforgettable moments.
        </p>
      </div>

      {/* Future Filter Section */}
      <div className="border-y border-white/5 bg-[#0B0B0B] sticky top-24 z-30">
        <div className="max-w-7xl mx-auto px-[20px] lg:px-[70px] py-4 flex justify-between items-center text-sm text-[#A1A1A1] uppercase tracking-widest">
           <span>Filters</span>
           <span>Sort By</span>
        </div>
      </div>

      <div className="py-12 md:py-20 px-[20px] lg:px-[70px] max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24">
          {products.map((product: any, index: number) => (
            <div 
              key={product.slug} 
              className={`transition-all duration-1000 ${
                index % 3 === 1 ? "lg:mt-32" : "" // Push the middle column down for asymmetric look
              } ${index % 3 === 2 ? "lg:mt-16" : ""}`}
            >
              <CardProduct {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
