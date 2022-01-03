import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCartId, setProductInCart } from "../features/cart.slice";
import { RootState } from "../features/store";
import axiosInstance from "../helper/axiosInstance";

export const fetchCart = createAsyncThunk(
  "/cart/fetch",
  async (data, { dispatch, getState }) => {
    try {
      const store = getState() as RootState;

      const { _id: cartId } = store.cart;

      const cartDetails = await axiosInstance.get("/cart/details", {
        params: {
          cart: cartId,
        },
      });
      dispatch(setProductInCart(cartDetails.data.products));
      dispatch(setCartId(cartDetails.data._id));
    } catch (error) {}
  }
);

export const fetchCartId = createAsyncThunk(
  "/cart/fetchId",
  async (data, { dispatch }) => {
    try {
      const response = await axiosInstance.get("/cart");
      const cartId = response.data._id as string;

      dispatch(setCartId(cartId));
    } catch (error) {}
  }
);
