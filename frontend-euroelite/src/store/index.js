import { configureStore } from "@reduxjs/toolkit";
import narudzbenicaSlice from "./reducers/narudzbenicaSlice";
import menuSlice from "./reducers/menuSlice";
import nacinOtpremeSlice from "./reducers/nacinOtpremeSlice";

const store = configureStore({
  reducer: {
    narudzbenica: narudzbenicaSlice,
    menu: menuSlice,
    nacinOtpreme: nacinOtpremeSlice,
  },
});

export default store;
