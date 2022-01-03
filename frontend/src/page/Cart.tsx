import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CartCard from "../components/CartCard";
import CartList from "../components/CartList";
import { fetchCart } from "../service/fetchCart";

function Cart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <div>
      <CartList />
    </div>
  );
}

export default Cart;
