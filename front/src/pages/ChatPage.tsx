import Chat from "../components/chat/Chat";
import ConnectedUserList from "../components/chat/ConnectedUserList";
import sendMessage from "../components/chat/sendMessage";

const ChatPage = () => {
  return (
    <>
      <ConnectedUserList />
      <Chat sendMessage={sendMessage} />
    </>
  );
};

export default ChatPage;
