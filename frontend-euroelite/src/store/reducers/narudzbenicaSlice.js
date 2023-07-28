import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brojNarudzbenice: "",
  datumNarudzbenice: "",
  ziroRacun: "",
  nacinOtpreme: "",
  rokIsporuke: "",
  unosDobavljaca: "",
  dobavljac: null,
  ukupanIznos: 0,
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
      state.ukupanIznos += action.payload.iznos;
    },
    removeStavka: (state, action) => {
      const stavkaId = action.payload;
      const index = state.stavke.findIndex((stavka) => stavka.id === stavkaId);

      if (index !== -1) {
        const removedStavka = state.stavke.splice(index, 1)[0];
        state.ukupanIznos -= removedStavka.iznos;
      }
    },
    setStavke: (state, action) => {
      state.stavke = action.payload;
      state.ukupanIznos = action.payload.reduce(
        (total, stavka) => total + parseFloat(stavka.iznos),
        0
      );
    },
    updateStavka: (state, action) => {
      const { index, stavka } = action.payload;
      state.stavke[index] = stavka;
      state.ukupanIznos = state.stavke.reduce(
        (total, stavka) => total + stavka.iznos,
        0
      );
    },

    deleteNarudzbenica: (state) => {
      // Reset the state to initial values or clear the narudzbenica data
      state.brojNarudzbenice = "";
      state.datumNarudzbenice = "";
      state.ziroRacun = "";
      state.nacinOtpreme = "";
      state.rokIsporuke = "";
      state.unosDobavljaca = "";
      state.dobavljac = "";
      state.dobavljaci = [];
      state.stavke = [];
    },
    setEditedStavka: (state, action) => {
      const { index, isEditing } = action.payload;
      state.stavke[index].isEditing = isEditing;
    },
    updateStavkaKolicina: (state, action) => {
      const { index, kolicina } = action.payload;
      state.stavke[index].kolicina = kolicina;
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
  setEditedStavka,
  updateStavkaKolicina,
  deleteNarudzbenica,
  setStavke,
} = narudzbenicaSlice.actions;

export default narudzbenicaSlice.reducer;
