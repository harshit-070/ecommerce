import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import messageReducer from "./message.slice";
import productsReducer from "./products.slice";
import paginationReducer from "./pagination.slice";
import reviewReducer from "./review.slice";
import cartReview from "./cart.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    products: productsReducer,
    pagination: paginationReducer,
    review: reviewReducer,
    cart: cartReview,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
