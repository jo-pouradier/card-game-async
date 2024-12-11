import {Box, Button, Container, Grid2 as Grid, Paper, TextField, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import { socket } from "../../socket/socket";

export interface Message {
  user: string;
  message: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { user: "me", message: "Hello" },
    { user: "you", message: "Hi" },
    { user: "test", message: "How are you?" },
  ]);
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

  const sendMessage = () => {
    if (input) {
      setInput("");
      console.info("Sending message:", input);
      socket.emit("message", { user: user.login, message: input });
    }
  };

  const findBattle = () => {
    console.info("Finding battle...");
    socket.emit("findMatch");
  };

  // @ts-ignore
  return (
    <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      {/* Chat messages */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        <Grid container spacing={2} direction="column">
          {messages.map((message, index) => (
            <Grid
              key={index}
              container
              justifyContent={user.login === message.user ? "flex-end" : "flex-start"}
            >
              <Grid size={8}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 1.5,
                    backgroundColor: user.login === message.user ? "#e3f2fd" : "#f1f1f1",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {message.user}
                  </Typography>
                  <Typography variant="body1">{message.message}</Typography>
                </Paper>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Input area */}
      <Box sx={{ display: "flex", p: 2, gap: 1, borderTop: "1px solid #ccc" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button variant="contained" onClick={findBattle}>
          Find Battle
        </Button>
      </Box>
    </Container>
  );
};

export default Chat;
