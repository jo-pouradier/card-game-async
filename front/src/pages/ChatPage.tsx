import { useState } from "react";
import Chat from "../components/chat/Chat";
import ConnectedUserList from "../components/chat/ConnectedUserList";
import { useAppSelector } from "../hooks";
import { Message, selectChat } from "../slices/chatSlice";
import { selectUser } from "../slices/userSlice";
import { socket } from "../socket/socket";

const ChatPage = () => {
  console.log('SELECTUSER' , selectUser)
  const user = useAppSelector(selectUser);
  const globalMessages = useAppSelector(selectChat);
  const [chatId, setChatId] = useState<number>(-1);
  const [currentDiscussion, setCurrentDiscussion] = useState<Message[]>([]);

  // Initialize discussions
  // if (chatId === -1 && globalMessages.length > 0) {
  //   console.log("Initializing global chat");
  //   console.log('GLOBALMESSAGES', globalMessages)
  //   setCurrentDiscussion(
  //     globalMessages
  //       .filter((msg) => msg.to === chatId)
  //       .map((msg) => ({ ...msg, isRead: true })),
  //   );
  // }

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

  const setCurrentChat = (userId: number) => {
    setChatId(userId);
    console.log("Setting chat to:", userId);

    setCurrentDiscussion(
      globalMessages
        .filter((msg) => msg.to === userId)
        .map((msg) => ({ ...msg, isRead: true })),
    );
  };

  return (
    <>
      <ConnectedUserList setCurrentChat={setCurrentChat} />
      <Chat messages={currentDiscussion} sendMessage={sendMessage} />
    </>
  );
};

export default ChatPage;
