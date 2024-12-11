import { io } from "socket.io-client";
import { addNotification } from "../slices/notificationSlice.ts";
import { AppDispatch } from "../store.ts";

export const socket = io("http://localhost:8080");

export const initSocket = (dispatch: AppDispatch) => {
  function onNotification(data: object) {
    console.info("Notification received:", data);
    dispatch(addNotification({
      id: Math.random() * 100,
      message: data.toString(),
      severity: "info",
    }));
  }

  socket.on("notification", onNotification);

  return () => {
    socket.off("notification", onNotification);
  };
};
