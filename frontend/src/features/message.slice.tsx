import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: "",
    show: false,
    type: "",
  },
  reducers: {
    showSuccessMessage: (state, action: { payload: string }) => {
      state.show = true;
      state.message = action.payload;
      state.type = "success";
    },
    showFaliureMessage: (state, action: { payload: string }) => {
      state.show = true;
      state.message = action.payload;
      state.type = "danger";
    },
    hideMessage: (state) => {
      state.type = "";
      state.message = "";
      state.show = false;
    },
  },
});

export const handleSuccessMessage = createAsyncThunk(
  "/message/success",
  (data: string, { dispatch }) => {
    dispatch(showSuccessMessage(data));
    setTimeout(() => {
      dispatch(hideMessage());
    }, 3000);
  }
);

export const handleFaliureMessage = createAsyncThunk(
  "/message/faliure",
  (data: string, { dispatch }) => {
    dispatch(showFaliureMessage(data));
    setTimeout(() => {
      dispatch(hideMessage());
    }, 3000);
  }
);

export const { showSuccessMessage, showFaliureMessage, hideMessage } =
  messageSlice.actions;

export default messageSlice.reducer;
