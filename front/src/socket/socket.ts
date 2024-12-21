import { io } from "socket.io-client";
import { addNotification } from "../slices/notificationSlice.ts";
import { AppDispatch } from "../store.ts";
import {Dispatch, SetStateAction} from "react";
import {Message} from "../components/chat/Chat.tsx";

export const socket = io("http://localhost:3000");

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


export const initChat = (setMessages: Dispatch<SetStateAction<Message[]>>) => {
  function onMessage(msg: Message) {
    setMessages(previous => [...previous, msg])
  }
  socket.on("message", onMessage);

  return () => {
    socket.off("message", onMessage);
  };
};







