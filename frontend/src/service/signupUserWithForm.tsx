import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleFaliureMessage } from "../features/message.slice";
import axiosInstance from "../helper/axiosInstance";
import { IUser } from "../interface/user.interface";
import loginUserWithForm from "./loginUserWithForm";

const signupUserWithForm = createAsyncThunk(
  "/auth/signup",
  async (data: IUser, { dispatch }) => {
    try {
      const response = await axiosInstance.post("/user", data);
      dispatch(loginUserWithForm(data));
    } catch (error) {
      dispatch(
        handleFaliureMessage("Unable to Signup. Please try again later")
      );
    }
  }
);

export default signupUserWithForm;
