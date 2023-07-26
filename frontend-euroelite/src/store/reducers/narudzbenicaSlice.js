import { createSlice } from "@reduxjs/toolkit";

const brojNarudzbeniceFromStorage = JSON.parse(
  localStorage.getItem("brojNarudzbenice")
);

const initialState = {
  brojNarudzbenice: brojNarudzbeniceFromStorage || "",
  datumNarudzbenice: "",
  ziroRacun: "",
  nacinOtpreme: "",
  rokIsporuke: "",
  unosDobavljaca: "",
  dobavljac: null,
  dobavljaci: [],
  stavke: [],
};

const narudzbenicaSlice = createSlice({
  name: "narudzbenica",
  initialState,
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
    addStavka: (state, action) => {
      state.stavke.push(action.payload);
    },
    removeStavka: (state, action) => {
      const stavkaId = action.payload;
      const index = state.stavke.findIndex((stavka) => stavka.id === stavkaId);

      if (index !== -1) {
        state.stavke.splice(index, 1);
      }
    },
    updateStavka: (state, action) => {
      const { index, stavka } = action.payload;
      state.stavke[index] = stavka;
    },
    deleteNarudzbenica: (state) => {
      // Reset the state to initial values or clear the narudzbenica data
      state.brojNarudzbenice = "";
      state.datumNarudzbenice = "";
      state.ziroRacun = "";
      state.nacinOtpreme = "";
      state.rokIsporuke = "";
      state.unosDobavljaca = "";
      state.dobavljac = null;
      state.dobavljaci = [];
      state.stavke = [];
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
  addStavka,
  removeStavka,
  updateStavka,
  deleteNarudzbenica,
} = narudzbenicaSlice.actions;

export default narudzbenicaSlice.reducer;
