import { createFileRoute } from "@tanstack/react-router";
import { HeaderCard } from "@/components/HeaderCard";
import { ProductCard } from "@/components/ProductCard";
//gunakan import type untuk memanggil interface
import type { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com/products";
export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    //data perlu di assign kalu diatur oleh interface Product
    return data as Product[];
  },
});

function App() {
  //useLoaderData untuk menampung data dari loader
  const products = Route.useLoaderData();

  return (
    <>
      <div>Hello ini halaman index ya !!!</div>
      <HeaderCard />
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
    </>
  );
}
