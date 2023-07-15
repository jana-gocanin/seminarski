import { configureStore } from "@reduxjs/toolkit";
import orderCaseSlice from "./reducers/orderCaseSlice";

const store = configureStore({
  reducer: {
    // Ovde stavljam reducere
    orderCaseSlice: orderCaseSlice,
  },
});

export default store;
