import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stavke: [
    {
      id: 0,
      kolicina: 0,
      iznos: 0,
      proizvod_id: 0,
      narudzbenica_id: 0,
    },
  ],
};

const stavkaNarudzbeniceSlice = createSlice({
  name: "stavkaNarudzbenice",
  initialState,
  reducers: {
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

export const {} = stavkaNarudzbeniceSlice.actions;
export default stavkaNarudzbeniceSlice.reducer;
