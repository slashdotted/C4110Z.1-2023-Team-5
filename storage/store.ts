import { configureStore } from "@reduxjs/toolkit";
import notificatonsReducer from "./reducers/notificatonsReducer";
import productsReducer from "./reducers/productsReducer";

const store = configureStore({
  reducer: {
    notifications: notificatonsReducer,
    products: productsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
