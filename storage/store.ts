import { configureStore } from "@reduxjs/toolkit";
import notificatonsReducer from "./reducers/notificatonsReducer";

const store = configureStore({
  reducer: {
    notifications: notificatonsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
