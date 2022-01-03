import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleFaliureMessage } from "../features/message.slice";
import { pushReviews } from "../features/review.slice";
import { RootState } from "../features/store";
import axiosInstance from "../helper/axiosInstance";

export const fetchReviewsList = createAsyncThunk(
  "/review/fetch",
  async (productId: string, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const {
        review: { page },
      } = state;
      if (productId.length === 0) {
        return;
      }
      const response = await axiosInstance.get("/review", {
        params: { page, product: productId },
      });

      dispatch(pushReviews(response.data));
    } catch (error) {
      dispatch(handleFaliureMessage("Unable to get Reviews"));
    }
  }
);
