import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import { Grid2 } from "@mui/material";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";

interface Message {
    user: string;
    message: string;
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const user = useAppSelector(selectUser);

    useEffect(() => {
        socket.on("message", (message: Message) => {
        setMessages([...messages, message]);
        });
        return () => {
        socket.off("message");
        };
    }, [messages]);
    
    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input) {
        setMessages([...messages, { user: "me", message: input }]);
        setInput("");
        }
    };
    
    return (
        <div>
        <Grid2 container spacing={2}>
            {messages.map((message, index) => (
            <Grid2 key={index} size={2} offset={user.login === message.user ? 'auto': 0}>
                <p>{message.user}: {message.message}</p>
            </Grid2>
            ))}
        </Grid2>
        <form onSubmit={sendMessage}>
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
        </div>
    );
    }