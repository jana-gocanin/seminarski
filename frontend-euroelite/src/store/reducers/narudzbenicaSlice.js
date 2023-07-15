import { createSlice } from "@reduxjs/toolkit";

const narudzbenicaSlice = createSlice({
  name: "narudzbenica",
  initialState: {
    brojNarudzbenice: "",
    datumNarudzbenice: "",
    ziroRacun: "",
    nacinOtpreme: "",
    rokIsporuke: "",
    unosDobavljaca: "",
    dobavljac: null,
    dobavljaci: [],
  },
  reducers: {
    setBrojNarudzbenice: (state, action) => {
      state.brojNarudzbenice = action.payload;
    },
    setDatumNarudzbenice: (state, action) => {
      state.datumNarudzbenice = action.payload;
    },
    setZiroRacun: (state, action) => {
      state.ziroRacun = action.payload;
    },
    setNacinOtpreme: (state, action) => {
      state.nacinOtpreme = action.payload;
    },
    setRokIsporuke: (state, action) => {
      state.rokIsporuke = action.payload;
    },
    setUnosDobavljaca: (state, action) => {
      state.unosDobavljaca = action.payload;
    },
    setDobavljac: (state, action) => {
      state.dobavljac = action.payload;
    },
    setDobavljaci: (state, action) => {
      state.dobavljaci = action.payload;
    },
  },
});

export const {
  setBrojNarudzbenice,
  setDatumNarudzbenice,
  setZiroRacun,
  setNacinOtpreme,
  setRokIsporuke,
  setUnosDobavljaca,
  setDobavljac,
  setDobavljaci,
} = narudzbenicaSlice.actions;

export default narudzbenicaSlice.reducer;
