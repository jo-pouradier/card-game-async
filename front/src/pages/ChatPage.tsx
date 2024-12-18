import { useCallback, useEffect, useState } from "react";
import Chat, { Message } from "../components/chat/Chat";
import ConnectedUserList from "../components/chat/ConnectedUserList";
import { socket } from "../socket/socket";
import { useAppSelector } from "../hooks";
import { selectUser } from "../slices/userSlice";

const ChatPage = () => {
  const user = useAppSelector(selectUser);
  const [chatId, setChatId] = useState<number>(-1);
  const [currentDiscussion, setCurrentDiscussion] = useState<Message[]>([]);
  const [discussions, setDiscussions] = useState<{ [key: number]: Message[] }>(
    {},
  );

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

  const handleNewMessage = useCallback(
    (message: Message) => {
      console.log("Received message:", message);

      // Update discussions
      setDiscussions((prevDiscussions) => {
        const userMessages = prevDiscussions[message.from] || [];
        return {
          ...prevDiscussions,
          [message.to]: [...userMessages, message],
        };
      });

      // Update current discussion if it matches chatId
      setCurrentDiscussion((prevDiscussion) => {
        if (chatId === message.to) {
          return [...prevDiscussion, message];
        }
        return prevDiscussion;
      });
    },
    [chatId],
  );

  useEffect(() => {
    socket.on("message", handleNewMessage);

    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [handleNewMessage]);

  const setCurrentChat = (userId: number) => {
    setChatId(userId);
    console.log("Setting chat to:", userId);
    console.log("Discussions:", discussions);
    setCurrentDiscussion(discussions[userId] ?? []);
  };

  return (
    <>
      <ConnectedUserList setCurrentChat={setCurrentChat} />
      <Chat messages={currentDiscussion} sendMessage={sendMessage} />
    </>
  );
};

export default ChatPage;
