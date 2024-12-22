import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import { Select, MenuItem } from "@mui/material";

export interface UserSocket {
    userId: number;
    socketId: string;
    userName: string;
    deck: Set<number>| null;
};

export interface ConnectedUserListProps {
    setCurrentChat: (userId: number) => void;
};

const ConnectedUserList = (props: ConnectedUserListProps) => {
  const [users, setUsers] = useState<UserSocket[]>([]);

  useEffect(() => {
    socket.emit("getPlayers");

    socket.on("players", (players: UserSocket[]) => {
      setUsers(players);
    });

    socket.on("newPlayer", (newPlayer: UserSocket) => {
        console.info("New player connected:", newPlayer);
      setUsers((prevUsers) => [...prevUsers, newPlayer]);
    });

    socket.on("playerDisconnected", (disconnectedPlayerId: number) => {
        console.info("Player disconnected:", disconnectedPlayerId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== disconnectedPlayerId),
      );
    });

    return () => {
      socket.off("players");
      socket.off("newPlayer");
      socket.off("playerDisconnected");
    };
  }, []);

  return (
    <div>
      <h2>Connected Users</h2>
      <Select defaultValue={-1} onChange={(e) => props.setCurrentChat(Number(e.target.value))}>
        <MenuItem value={-1}>Global Chat</MenuItem>
        {users.map((user: UserSocket, index: number) => (
          <MenuItem key={index} value={user.userId}>
            {user.userName}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ConnectedUserList;
