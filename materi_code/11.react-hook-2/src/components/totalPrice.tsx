import { atomCart } from "@/atoms/atomCart";
import { useAtomValue } from "jotai";

export const TotalPrice = () => {
  const cartData = useAtomValue(atomCart);

  const totalPrice = cartData.reduce(
    (total, product) => total + product.price,
    0,
  );

  if (cartData.length === 0) return null;

  return (
    <div className="mt-4 p-2 bg-blue-100 rounded-lg">
      <div className="text-xl font-bold">
        Total: USD {totalPrice.toFixed(2)}
      </div>
    </div>
  );
};
