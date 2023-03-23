import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../constants/Types";

export interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [
    {
      id: "1",
      title: "Notification 1",
      status: "success",
      date: new Date().toISOString(),
    },
  ],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification) => {
        return notification.id !== action.payload;
      });
    },
    deleteAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, deleteNotification, deleteAllNotifications } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
