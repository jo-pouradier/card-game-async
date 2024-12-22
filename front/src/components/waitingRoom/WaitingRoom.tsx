import { Button } from "@mui/material";
import { socket } from "../../socket/socket.ts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WaitingRoom = () => {
  const navigate = useNavigate();

  function cancelGame() {
    socket.emit("cancelMatchmaking");
    navigate("/game/selection");
  }

  useEffect(() => {
    socket.on("gameFound", () => navigate("/game/playing"));
  }, [navigate]);

  return (
    <>
      <div>
        <h1>Waiting Room</h1>
      </div>
      <Button variant="contained" color="primary" onClick={() => cancelGame()}>
        Cancel Matchmaking
      </Button>
    </>
  );
};

export default WaitingRoom;
