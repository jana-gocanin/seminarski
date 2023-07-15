import { configureStore } from "@reduxjs/toolkit";
import orderCaseSlice from "./reducers/orderCaseSlice";
import narudzbenicaSlice from "./reducers/narudzbenicaSlice";

const store = configureStore({
  reducer: {
    orderCaseSlice: orderCaseSlice,
    narudzbenica: narudzbenicaSlice,
  },
});

export default store;
