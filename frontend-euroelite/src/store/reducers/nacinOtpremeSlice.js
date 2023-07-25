import { BASE_URL } from "../../config/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asinhrona funkcija za dobijanje svih načina otpreme
export const fetchNaciniOtpreme = createAsyncThunk(
  "nacinOtpreme/fetchNaciniOtpreme",
  async () => {
    try {
      const response = await fetch(`${BASE_URL}/vratiSveNacinOtpreme`);
      if (!response.ok) {
        throw new Error("Greška pri dohvatanju načina otpreme.");
      }
      const data = await response.json();
      return data; // Podaci o načinima otpreme koji će se sačuvati u Redux stanju
    } catch (error) {
      throw new Error("Greška pri komunikaciji sa serverom.");
    }
  }
);

const initialState = {
  naciniOtpreme: [],
  nacinOtpreme: "",
};

const nacinOtpremeSlice = createSlice({
  name: "nacinOtpreme",
  initialState,
  reducers: {
    setNacinOtpreme: (state, action) => {
      state.nacinOtpreme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNaciniOtpreme.fulfilled, (state, action) => {
      state.naciniOtpreme = action.payload;
    });
  },
});

export const { setNacinOtpreme } = nacinOtpremeSlice.actions;

export default nacinOtpremeSlice.reducer;
