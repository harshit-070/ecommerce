import { createSlice } from "@reduxjs/toolkit";

interface IReview {
  _id: string;
  statement: string;
  rating: number;
  user: { name: string; _id: string };
}

const initialState: {
  reviews: IReview[];
  product: string;
  page: number;
  moreAvailable: boolean;
} = {
  reviews: [],
  product: "",
  page: 1,
  moreAvailable: true,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setProductId: (state, action: { payload: string }) => {
      state.product = action.payload;
      state.page = 1;
      state.moreAvailable = true;
    },

    pushReviews: (
      state,
      action: {
        payload: IReview[] | [];
      }
    ) => {
      const reviewPerPage = 15;
      if (action.payload.length < reviewPerPage) {
        state.moreAvailable = false;
      }
      state.reviews = [...state.reviews, ...action.payload];
      state.page += 1;
    },

    setMoreAvailable: (state, action: { payload: boolean }) => {
      state.moreAvailable = action.payload;
    },

    resetReviews: (state) => {
      state.reviews = [];
      state.product = "";
      state.page = 1;
      state.moreAvailable = true;
    },
  },
});

export const { setProductId, pushReviews, setMoreAvailable, resetReviews } =
  reviewSlice.actions;

export default reviewSlice.reducer;
