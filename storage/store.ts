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
import settingsReducer from "./reducers/settingsReducer";

const persistConfig = {
  key: "foodx",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  notifications: notificatonsReducer,
  products: productsReducer,
  ingredients: ingredientsReducer,
  fridge: fridgeReducer,
  settings: settingsReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET") {
    AsyncStorage.removeItem("persist:foodx");

    return reducer(undefined, action);
  }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
