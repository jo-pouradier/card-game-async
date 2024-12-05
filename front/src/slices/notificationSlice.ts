import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  NotificationSlice,
  NotificationSliceActions,
  NotificationSliceState,
} from "../types/NotificationSlice";
import { RootState } from "../store";

const initialState: NotificationSliceState = {
  notifications: [],
};

export const notificationSlice: NotificationSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    addNotification: (
      state: NotificationSliceState,
      action: NotificationSliceActions,
    ) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (
      state: NotificationSliceState,
      action: PayloadAction<{ id: number }>,
    ) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id,
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export const selectNotifications = (state: RootState) =>
  state.notificationReducer.notifications;
export default notificationSlice.reducer;
