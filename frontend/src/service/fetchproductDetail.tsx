import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helper/axiosInstance";
import { setCurrentProduct } from "../features/products.slice";
import { handleFaliureMessage } from "../features/message.slice";

export const fetchProductDetails = createAsyncThunk(
  "/product/detail",
  async (data: string, { dispatch }) => {
    try {
      const response = await axiosInstance.get(`/product/${data}`);
      dispatch(setCurrentProduct(response.data));
    } catch (error) {
      dispatch(handleFaliureMessage("Unable to get products"));
    }
  }
);
