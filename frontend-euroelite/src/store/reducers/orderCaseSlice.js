// store/slicers/orderCaseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderCaseSlice = createSlice({
  name: "orderCase",
  initialState: "",
  reducers: {
    setOrderCase: (state, action) => {
      return action.payload;
    },
    createOrder: (state) => {
      // Logika za kreiranje narudžbenice
      return "kreiraj"; // Vrati postojeće stanje ako ne trebaš izvršiti promjenu
    },
    editOrder: (state) => {
      // Logika za izmjenu narudžbenice
      return "izmeni"; // Vrati postojeće stanje ako ne trebaš izvršiti promjenu
    },
    deleteOrder: (state) => {
      // Logika za brisanje narudžbenice
      return "obrisi"; // Vrati postojeće stanje ako ne trebaš izvršiti promjenu
    },
  },
});

export const { setOrderCase, createOrder, editOrder, deleteOrder } =
  orderCaseSlice.actions;
export default orderCaseSlice.reducer;

// Selektor za orderCase
export const selectOrderCase = (state) => state.orderCase;
