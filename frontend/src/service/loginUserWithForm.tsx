import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../features/auth.slice";
import { handleFaliureMessage } from "../features/message.slice";
import axiosInstance from "../helper/axiosInstance";
import { IUser } from "../interface/user.interface";
import { fetchCartId } from "./fetchCart";

const loginUserWithForm = createAsyncThunk(
  "/auth/loginWithForm",
  async (data: Omit<IUser, "name">, { dispatch }) => {
    try {
      const response = await axiosInstance.post("/session", data);
      dispatch(loginUser(response.data));
      dispatch(fetchCartId());
    } catch (error) {
      console.log(error);
      dispatch(handleFaliureMessage("Email/password is not correct"));
    }
  }
);

export default loginUserWithForm;
