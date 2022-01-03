import { createSlice } from "@reduxjs/toolkit";

interface ICartProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialState: {
  _id: string;
  products: ICartProduct[] | [];
} = {
  _id: localStorage.getItem("cartId")
    ? JSON.parse(localStorage.getItem("cartId") as string)
    : "",
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProductInCart: (
      state,
      action: { payload: { product: ICartProduct; quantity: number }[] }
    ) => {
      const productArray = action.payload.map((element) => {
        return { ...element.product, quantity: element.quantity };
      });
      state.products = productArray;
    },

    setCartId: (state, action: { payload: string }) => {
      state._id = action.payload;
      localStorage.setItem("cartId", JSON.stringify(state._id));
    },

    updateQuantityOfProduct: (
      state,
      action: { payload: { _id: string; quantity: number } }
    ) => {
      const { _id, quantity } = action.payload;
      state.products = state.products.map((product) =>
        product._id === _id ? { ...product, quantity } : product
      );
    },

    removeProduct: (state, action: { payload: string }) => {
      const _id = action.payload;

      state.products = state.products.filter((product) => product._id !== _id);
    },
  },
});

export const {
  setProductInCart,
  updateQuantityOfProduct,
  setCartId,
  removeProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
