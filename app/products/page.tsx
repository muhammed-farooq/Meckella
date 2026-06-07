import { client } from "@/sanity/lib/client";
import { ProductList } from "@/components/ProductList";

async function getAllProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    name,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    amazonLink,
    scentProfile
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
      <div className="pt-20 pb-8 px-[20px] lg:px-[70px] max-w-7xl mx-auto w-full text-center">
        <h1 className="font-serif text-5xl md:text-6xl text-[#EDEDED] mb-6">The Collection</h1>
        <p className="text-[#A1A1A1] max-w-2xl mx-auto">
          Explore our complete range of signature fragrances, each meticulously crafted to evoke distinct emotions and capture unforgettable moments.
        </p>
      </div>

      <ProductList products={products} />
    </div>
  );
}

