import Chat from "../components/chat/Chat";
import ConnectedUserList from "../components/chat/ConnectedUserList";
import { socket } from "../socket/socket";

const ChatPage = () => {
  return (
    <>
      <ConnectedUserList />
      <Chat sendMessage={sendMessage} />
    </>
  );
};

export default ChatPage;
export const sendMessage = (input: string, chatId: number, userId: number) => {
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