import { Box, Container, Grid2 as Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addNotification } from "../../slices/notificationSlice";
import { selectUser } from "../../slices/userSlice";
import { Message } from "../../slices/chatSlice";



export interface ChatProps {
  messages: Message[];
  sendMessage: (message: string) => boolean;
}

const Chat = (props: ChatProps) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const user = useAppSelector(selectUser);

  const sendMessage = () => {
    const ok = props.sendMessage(input);
    if (ok) {
      setInput("");
    } else {
      dispatch(addNotification({ id: Math.round(Math.random() * 100000), message: "Message cannot be empty", severity: "error" }));
    }
  };


  return (
      <Container maxWidth="sm"
                 sx={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
        {/* Chat messages */}
        <Box sx={{flexGrow: 1, overflowY: "auto", p: 2}}>
          <Grid container spacing={2} direction="column">
            {props.messages.map((message, index) => (
                <Grid
                    key={index}
                    container
                    justifyContent={user.id === message.from ? "flex-end" : "flex-start"}
                >
                  <Grid size={8}>
                    <Paper
                        elevation={3}
                        sx={{
                          p: 1.5,
                          backgroundColor: user.id === message.from ? "#e3f2fd" : "#f1f1f1",
                          borderRadius: 2,
                        }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        {message.from}
                      </Typography>
                      <Typography variant="body1">{message.message}</Typography>
{/* add message.date at the bottom */}
                      <Typography variant="caption" color="textSecondary">
                        {message.date.toLocaleString().split('.')[0].replace('T', ' ')}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
            ))}
          </Grid>
        </Box>

        {/* Input area */}
        <Box sx={{display: "flex", p: 2, gap: 1, borderTop: "1px solid #ccc"}}>
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
)
  ;
};

export default Chat;
