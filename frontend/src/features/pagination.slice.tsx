import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    totalPage: 0,
    currentPage: 1,
  },
  reducers: {
    increaseCurrentPage: (state) => {
      state.currentPage += 1;
      if (state.currentPage > state.totalPage) {
        state.currentPage = 1;
      }
    },
    decreaseCurrentPage: (state) => {
      state.currentPage -= 1;
      if (state.currentPage <= 0) {
        state.currentPage = state.totalPage;
      }
    },

    changePage: (state, action: { payload: number }) => {
      const page = action.payload;
      if (!(state.totalPage < page || page <= 0)) {
        state.currentPage = page;
      }
    },

    setTotalPage: (state, action: { payload: number }) => {
      state.totalPage = action.payload;
    },
  },
});

export const {
  increaseCurrentPage,
  decreaseCurrentPage,
  setTotalPage,
  changePage,
} = paginationSlice.actions;

export default paginationSlice.reducer;
