import { createFileRoute } from "@tanstack/react-router";
import { TotalProduct } from "@/components/totalProduct";
import { Product } from "@/components/product";
import { Cart } from "@/components/cart";
import { useHydrateAtoms } from "jotai/utils";
import { productAtom } from "@/atoms/productAtom";
import { TotalPrice } from "@/components/totalPrice";

export const Route = createFileRoute("/")({
  component: App,
  //ambil data dari fakeApiStore menggunakan loader
  loader: async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  },
});

function App() {
  const products = Route.useLoaderData();
  useHydrateAtoms([[productAtom, products]]);

  return (
    <main className="grid grid-cols-2 gap-4">
      <Product />
      <div>
        <Cart />
        <TotalProduct />
        <TotalPrice />
      </div>
    </main>
  );
}
