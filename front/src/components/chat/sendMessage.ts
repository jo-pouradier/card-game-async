import { socket } from "../../socket/socket";

export default (input: string, chatId: number, userId: number) => {
  if (!input) {
    return false;
  }

  console.info("Sending message:", input);
  socket.emit(
    "message",
    { message: input, from: userId, to: chatId, date: new Date() },
    chatId,
  );
  return true;
};
