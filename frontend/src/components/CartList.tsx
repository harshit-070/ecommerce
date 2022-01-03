import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import CartCard from "./CartCard";

function CartList() {
  const { products } = useSelector((state: RootState) => state.cart);
  return (
    <div>
      {products.map((product) => (
        <CartCard product={product} key={product._id} />
      ))}
    </div>
  );
}

export default CartList;
