import {
  Box,
  Container,
  Grid2 as Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Message, selectChat } from "../../slices/chatSlice";
import { selectCurrentUserId } from "../../slices/connectedUserSlice";
import { addNotification } from "../../slices/notificationSlice";
import { selectUser } from "../../slices/userSlice";

export interface ChatProps {
  sendMessage: (message: string) => boolean;
}

const Chat = (props: ChatProps) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const user = useAppSelector(selectUser);
  const messages = useAppSelector(selectChat);
  const userId = useAppSelector(selectCurrentUserId);

  const [discussions, setDiscussions] = useState<Message[]>([]);
  const [currentDiscussion, setCurrentDiscussion] = useState<number>(-1);
  useEffect(() => {
    setDiscussions(() => [...messages]);
  }, [messages]);
  useEffect(() => {
    setCurrentDiscussion(userId);
  }, [userId]);

  const sendMessage = () => {
    const ok = props.sendMessage(input);
    if (ok) {
      setInput("");
    } else {
      dispatch(
        addNotification({
          id: Math.round(Math.random() * 100000),
          message: "Message cannot be empty",
          severity: "error",
        }),
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* Chat messages */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        <Grid container spacing={2} direction="column">
          {discussions
            .filter((msg) => {
              if (msg.to === -1 && currentDiscussion === -1) {
                return true;
              }
              if (msg.to === currentDiscussion && msg.from === user.id) {
                return true;
              }
              if (msg.to === user.id && msg.from === currentDiscussion) {
                return true;
              }
              return false;
            })
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            )
            .map((message, index) => (
              <Grid
                key={index}
                container
                justifyContent={
                  user.id === message.from ? "flex-end" : "flex-start"
                }
              >
                <Grid size={8}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 1.5,
                      backgroundColor:
                        user.id === message.from ? "#e3f2fd" : "#f1f1f1",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {message.from}
                    </Typography>
                    <Typography variant="body1">{message.message}</Typography>
                    {/* add message.date at the bottom */}
                    <Typography variant="caption" color="textSecondary">
                      {message.date
                        .toLocaleString()
                        .split(".")[0]
                        .replace("T", " ")}
                    </Typography>
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
      </Box>
    </Container>
  );
};

export default Chat;
