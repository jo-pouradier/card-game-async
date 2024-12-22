import { io } from "socket.io-client";
import { add_chat_message_action, Message } from "../slices/chatSlice.ts";
import { addNotification } from "../slices/notificationSlice.ts";
import { AppDispatch } from "../store.ts";

export const socket = io("http://localhost:3000");

export const initSocket = (dispatch: AppDispatch) => {
  function onNotification(data: object) {
    console.info("Notification received:", data);
    dispatch(
      addNotification({
        id: Math.random() * 100,
        message: data.toString(),
        severity: "info",
      }),
    );
  }
  socket.on("notification", onNotification);

  return () => {
    socket.off("notification", onNotification);
  };
};

export const initChat = (dispatch: AppDispatch) => {
  function onMessage(msg: Omit<Message, "isRead">) {
    console.info("Message received:", msg);
    dispatch(add_chat_message_action({...msg, isRead: false}));
    dispatch(addNotification({ id: Math.random() * 100000, message: "New message", severity: "info" }));
  }
  socket.on("message", onMessage);

  return () => {
    socket.off("message", onMessage);
  };
};
