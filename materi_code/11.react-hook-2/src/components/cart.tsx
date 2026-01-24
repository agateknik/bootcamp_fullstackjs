import { atomCart } from "@/atoms/atomCart";
import { useAtomValue } from "jotai";

export const Cart = () => {
  const cartData = useAtomValue(atomCart);

  return (
    <div className="p-4 bg-zinc-50 rounded-lg">
      <div></div>
      <div className="text-3xl font-medium mb-2">My Cart</div>
      {cartData.length === 0 ? <div>No product in cart </div> : null}
      <div className="space-y-2">
        {cartData.map((product) => {
          return (
            <div className="border p-4 rounded-lg" key={product.id}>
              <div>{product.title}</div>
              <div className="font-bold">{product.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
