import { io } from "socket.io-client";
import { addNotification } from "../slices/notificationSlice.ts";

export const socket = io("http://localhost:8080");

export const initSocket = () => {
  function onNotification(data: object) {
    addNotification({
      id: Math.random() * 100,
      message: data.toString(),
      severity: "info",
    });
  }

  socket.on("notification", onNotification);

  return () => {
    socket.off("notification", onNotification);
  };
};
