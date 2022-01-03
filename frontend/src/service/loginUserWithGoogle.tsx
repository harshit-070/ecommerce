import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleFaliureMessage } from "../features/message.slice";
import axiosInstance from "../helper/axiosInstance";
import { fetchCartId } from "./fetchCart";

export const loginUserWithGoogle = createAsyncThunk(
  "/auth/google",
  async (data, { dispatch }) => {
    try {
      const response = await axiosInstance.get("/session/google");
      dispatch(fetchCartId());
    } catch (error) {
      dispatch(handleFaliureMessage("Unable to Login this time"));
    }
  }
);
