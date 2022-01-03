import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleFaliureMessage } from "../features/message.slice";
import { getPageProducts, setPageProducts } from "../features/products.slice";
import { RootState } from "../features/store";
import axiosInstance from "../helper/axiosInstance";

export const fetchProductList = createAsyncThunk(
  "/products/list",
  async (data, { dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      const { currentPage } = state.pagination;
      const { pagesFetched } = state.products;
      if (pagesFetched.indexOf(currentPage) === -1) {
        const response = await axiosInstance.get("/product", {
          params: { page: currentPage },
        });
        dispatch(setPageProducts({ page: currentPage, data: response.data }));
      } else {
        dispatch(getPageProducts(currentPage));
      }
    } catch (error) {
      dispatch(
        handleFaliureMessage("Unable to fetch the product at this time")
      );
    }
  }
);
