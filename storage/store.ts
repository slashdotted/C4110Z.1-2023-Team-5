import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import fridgeReducer from "./reducers/fridgeReducer";
import ingredientsReducer from "./reducers/ingredientsReducer";
import notificatonsReducer from "./reducers/notificatonsReducer";
import productsReducer from "./reducers/productsReducer";

const persistConfig = {
  key: "foodx",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  notifications: notificatonsReducer,
  products: productsReducer,
  ingredients: ingredientsReducer,
  fridge: fridgeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
