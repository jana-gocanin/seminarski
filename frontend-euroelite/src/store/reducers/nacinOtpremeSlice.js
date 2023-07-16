import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  naciniOtpreme: [],
};

const nacinOtpremeSlice = createSlice({
  name: "nacinOtpreme",
  initialState,
  reducers: {
    sacuvajNacinOtpreme: (state, action) => {
      state.naciniOtpreme.push(action.payload);
    },
  },
});

export const { sacuvajNacinOtpreme } = nacinOtpremeSlice.actions;

export default nacinOtpremeSlice.reducer;
