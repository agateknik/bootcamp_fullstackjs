import { atomCart } from "@/atoms/atomCart";
import { productAtom } from "@/atoms/productAtom";
import { useAtomValue, useAtom } from "jotai";

export const Product = () => {
  const products = useAtomValue(productAtom);
  const [cartData, setCartData] = useAtom(atomCart);

  function addToCart(index: number) {
    setCartData([...cartData, products[index]]);
  }

  return (
    <div className="p-4 space-y-2">
      {products.map((product, index) => {
        return (
          <div key={product.id} className="p-4 border rounded-lg">
            <div className="font-bold">{product.title}</div>
            <div className="text-3xl text-red-500 font-medium">
              USD {product.price}
            </div>
            <div>{product.description}</div>
            <button
              type="button"
              className="bg-blue-600 text-white font-medium p-2 rounded-lg mt-2 mb-2"
              onClick={() => addToCart(index)}
            >
              Add to Cart
            </button>
            <img src={product.image} alt={product.title} width={150}></img>
          </div>
        );
      })}
      <div></div>
    </div>
  );
};
