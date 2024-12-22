import Chat from "../components/chat/Chat";
import ConnectedUserList from "../components/chat/ConnectedUserList";
import { useAppSelector } from "../hooks";
import { selectCurrentUserId } from "../slices/connectedUserSlice";
import { selectUser } from "../slices/userSlice";
import { socket } from "../socket/socket";

const ChatPage = () => {
  const user = useAppSelector(selectUser);
  const chatId = useAppSelector(selectCurrentUserId);

  const sendMessage = (input: string) => {
    if (!input) {
      return false;
    }

    console.info("Sending message:", input);
    socket.emit(
      "message",
      { message: input, from: user.id, to: chatId, date: new Date() },
      chatId,
    );
    return true;
  };

  // const handleNewMessage = useCallback(
  //   (message: Message) => {
  //     console.log("Received message:", message);

  //     // Update discussions
  //     setDiscussions((prevDiscussions) => {
  //       const userMessages = prevDiscussions[message.from] || [];
  //       return {
  //         ...prevDiscussions,
  //         [message.to]: [...userMessages, message],
  //       };
  //     });

  //     // Update current discussion if it matches chatId
  //     setCurrentDiscussion((prevDiscussion) => {
  //       if (chatId === message.to) {
  //         return [...prevDiscussion, message];
  //       }
  //       return prevDiscussion;
  //     });
  //   },
  //   [chatId],
  // );

  return (
    <>
      <ConnectedUserList />
      <Chat sendMessage={sendMessage} />
    </>
  );
};

export default ChatPage;
