import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FridgeItem } from "../../constants/Types";
import * as Notifications from "expo-notifications";

export interface FridgeState {
  fridge: FridgeItem[];
}

const initialState: FridgeState = {
  fridge: [],
};

export const fridgeSlice = createSlice({
  name: "fridge",
  initialState,
  reducers: {
    addFridgeItem: (state, action: PayloadAction<FridgeItem>) => {
      // get last id
      const lastId =
        state.fridge.length > 0 ? state.fridge[state.fridge.length - 1].id : 0;

      // update id
      action.payload.id = lastId + 1;

      // add to fridge
      state.fridge.push(action.payload);
    },
    deleteFridgeItem: (state, action: PayloadAction<number>) => {
      // find index
      const index = state.fridge.findIndex(
        (item) => item.id === action.payload
      );

      if (index === -1) return;

      // cancel notification
      let notificationsIdentifier = state.fridge[index].notificationsIdentifier;
      if (notificationsIdentifier) {
        notificationsIdentifier.forEach((id) => {
          Notifications.cancelScheduledNotificationAsync(id);
        });
      }

      // remove item
      state.fridge.splice(index, 1);
    },
  },
});

export const { addFridgeItem, deleteFridgeItem } = fridgeSlice.actions;

export default fridgeSlice.reducer;
