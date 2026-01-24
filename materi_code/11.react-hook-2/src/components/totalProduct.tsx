import { atomCart } from "@/atoms/atomCart";
import { useAtomValue } from "jotai";

export const TotalProduct = () => {
  const cartData = useAtomValue(atomCart);
  return (
    <>
      <div>You have {cartData.length} product in cart</div>
    </>
  );
};
