
import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    selectedOption: null,
  },
  reducers: {
    selectOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { selectOption } = menuSlice.actions;

export const selectSelectedOption = (state) => state.menu.selectedOption;

export default menuSlice.reducer;
