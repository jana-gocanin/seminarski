import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proizvod: "", // Dodali smo proizvod i kolicinu u stanje
  kolicina: "",
  izabraniProizvod: null, // Dodali smo izabraniProizvod u stanje
  stavke: [
    {
      id: 0,
      kolicina: 0,
      iznos: 0,
      proizvod: "",
      narudzbenica_id: 0,
    },
  ],
};

const stavkaNarudzbeniceSlice = createSlice({
  name: "stavkaNarudzbenice",
  initialState,
  reducers: {
    setProizvod: (state, action) => {
      state.proizvod = action.payload;
    },
    setKolicina: (state, action) => {
      state.kolicina = action.payload;
    },
    setIzabraniProizvod: (state, action) => {
      state.izabraniProizvod = action.payload;
    },
    deleteStavke: (state) => {
      state.proizvod = ""; // Dodali smo proizvod i kolicinu u stanje
      state.kolicina = "";
      state.izabraniProizvod = null; // Dodali smo izabraniProizvod u stanje
      state.stavke = [];
    },

    // addStavka: (state, action) => {
    //   state.stavke.push(action.payload);
    // },
    // updateStavka: (state, action) => {
    //   const updatedStavka = action.payload;
    //   const index = state.stavke.findIndex(
    //     (stavka) => stavka.id === updatedStavka.id
    //   );
    //   if (index !== -1) {
    //     state.stavke[index] = updatedStavka;
    //   }
    // },
    // deleteStavka: (state, action) => {
    //   const stavkaId = action.payload;
    //   state.stavke = state.stavke.filter((stavka) => stavka.id !== stavkaId);
    // },
  },
});

export const { setProizvod, setKolicina, setIzabraniProizvod, deleteStavke } =
  stavkaNarudzbeniceSlice.actions;
export default stavkaNarudzbeniceSlice.reducer;
