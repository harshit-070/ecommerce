import { createSlice } from "@reduxjs/toolkit";

const headersInitialState = {
  authorization: "",
  "x-refresh": "",
};

const userInitialState = {
  _id: "",
  name: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: localStorage.getItem("isLogin")
      ? JSON.parse(localStorage.getItem("isLogin") as string)
      : false,
    headers: localStorage.getItem("headers")
      ? JSON.parse(localStorage.getItem("headers") as string)
      : headersInitialState,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : userInitialState,
  },
  reducers: {
    loginUser: (
      state,
      action: {
        payload: {
          accessToken: string;
          refreshToken: string;
          user: { _id: string; name: string; email: string };
        };
      }
    ) => {
      state.isLogin = true;
      state.headers.authorization = action.payload.accessToken;
      state.headers["x-refresh"] = action.payload.refreshToken;
      state.user = action.payload.user;
      localStorage.setItem("isLogin", JSON.stringify(state.isLogin));
      localStorage.setItem("headers", JSON.stringify(state.headers));
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logoutUser: (state) => {
      state.isLogin = false;
      state.headers = headersInitialState;
      state.user = userInitialState;
      localStorage.setItem("isLogin", "false");
      localStorage.setItem("headers", "");
      localStorage.setItem("user", "");
    },

    updateAccessToken: (state, action: { payload: string }) => {
      state.headers.authorization = action.payload;
    },
  },
});

export const { loginUser, logoutUser, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
