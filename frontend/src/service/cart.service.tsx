import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeProduct } from "../features/cart.slice";
import { handleFaliureMessage } from "../features/message.slice";
import { RootState } from "../features/store";
import axiosInstance from "../helper/axiosInstance";

export const changeQuantity = createAsyncThunk(
  "/cart/changeQuantity",
  async (data: { _id: string; quantity: number }, { dispatch, getState }) => {
    const { quantity, _id: productId } = data;

    const store = getState() as RootState;

    const { _id: cartId } = store.cart;

    try {
      const response = await axiosInstance.patch("/cart/quantity", {
        product: productId,
        cart: cartId,
        quantity,
      });
    } catch (error) {
      dispatch(handleFaliureMessage("Unable to update the quantity"));
    }
  }
);

export const removeProductForCart = createAsyncThunk(
  "/cart/removeProdcut",
  async (data: string, { dispatch, getState }) => {
    try {
      const store = getState() as RootState;

      const { _id: cartId } = store.cart;
      const productId = data;

      const response = await axiosInstance.delete("/cart/remove", {
        data: { cart: cartId, product: productId },
      });

      dispatch(removeProduct(productId));
    } catch (error) {
      dispatch(handleFaliureMessage("Unable to remove the product"));
    }
  }
);
