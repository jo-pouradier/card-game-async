import { io } from "socket.io-client";
import { add_chat_message_action, Message } from "../slices/chatSlice.ts";
import { addNotification } from "../slices/notificationSlice.ts";
import { AppDispatch } from "../store.ts";
import { getUsers } from "../api/user/index.ts";
import {
  add_connected_user_action,
  remove_connected_user_action,
  set_all_users_action,
} from "../slices/connectedUserSlice.ts";

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
    dispatch(add_chat_message_action({ ...msg, isRead: false }));
    dispatch(
      addNotification({
        id: Math.random() * 100000,
        message: "New message",
        severity: "info",
      }),
    );
  }
  socket.on("message", onMessage);

  return () => {
    socket.off("message", onMessage);
  };
};

export const initConnectedUsers = (dispatch: AppDispatch) => {
  getUsers().then((users) => {
    const connectedUsers =
      users?.map((user) => ({
        id: user.id,
        username: user.login,
        isConnected: false,
      })) ?? [];
    dispatch(set_all_users_action(connectedUsers));
    socket.emit("getPlayers");
  });

  const onConnectedUser = (userId: number) => {
    console.info("Connected users:", userId);
    dispatch(
      addNotification({
        id: Math.random() * 100000,
        message: "New Connected users",
        severity: "info",
      }),
    );
    dispatch(add_connected_user_action(userId));
  };

  const onDisconnectedUser = (userId: number) => {
    console.info("Disconnected users:", userId);
    dispatch(
      addNotification({
        id: Math.random() * 100000,
        message: "New Disconnected users",
        severity: "info",
      }),
    );
    dispatch(remove_connected_user_action(userId));
  };

  const getAllConnectedUsers = (users: number[]) => {
    users.forEach((userId) => {
      dispatch(add_connected_user_action(userId));
    });
  };

  socket.on("newPlayer", onConnectedUser);
  socket.on("playerDisconnected", onDisconnectedUser);
  socket.on("players", getAllConnectedUsers);

  return () => {
    socket.off("connectedUsers", onConnectedUser);
    socket.off("disconnectedUsers", onDisconnectedUser);
    socket.off("allConnectedUsers", getAllConnectedUsers);
  };
};
