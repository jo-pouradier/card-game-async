import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardReducer from "./slices/cardSlice";
import socketReducer from "./slices/socketSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    cardReducer: cardReducer,
    notificationReducer: notificationReducer,
    socketReducer: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
