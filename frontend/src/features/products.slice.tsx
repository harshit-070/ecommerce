import { createSlice } from "@reduxjs/toolkit";

const initalCurrentProduct = {
  _id: "",
  name: "",
  image: "",
  description: "",
  price: 0,
  ratingSum: 0,
  numberOfRatings: 0,
};

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  ratingSum: number;
  numberOfRatings: number;
  description?: string;
}

const initialState: {
  allProducts: { page: number; products: IProduct[] | [] }[] | [];
  currentPageProducts: IProduct[];
  pagesFetched: number[];
  currentProduct: IProduct;
} = {
  allProducts: [],
  currentPageProducts: [],
  pagesFetched: [],
  currentProduct: initalCurrentProduct,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getPageProducts: (state, action: { payload: number }) => {
      const currentPageProducts = state.allProducts.filter(
        (product) => product.page === action.payload
      );
      if (currentPageProducts.length !== 0) {
        state.currentPageProducts = currentPageProducts[0].products;
      }
    },

    setPageProducts: (
      state,
      action: {
        payload: {
          page: number;
          data: IProduct[];
        };
      }
    ) => {
      state.currentPageProducts = [
        ...action.payload.data.map((product) => {
          return { ...product, page: action.payload.page };
        }),
      ];

      state.allProducts = [
        ...state.allProducts,
        { page: action.payload.page, products: state.currentPageProducts },
      ];
      state.pagesFetched.push(action.payload.page);
    },

    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
});

export const { getPageProducts, setPageProducts, setCurrentProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
