import {Button} from "@mui/material";
import {socket} from "../../socket/socket.ts";
import {useNavigate} from "react-router-dom";

const WaitingRoom = () => {
    const navigate = useNavigate();

    function cancelGame() {
        socket.emit('cancelMatchmaking');
        navigate('/game/selection');
    }

    return (
        <>
            <div>
                <h1>Waiting Room</h1>
            </div>
            <Button variant="contained" color="primary" onClick={() => cancelGame()}>
                Cancel Matchmaking
                </Button></>
    )}


export default WaitingRoom;