import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeMode: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export default uiSlice.reducer;
export const { changeMode } = uiSlice.actions;
