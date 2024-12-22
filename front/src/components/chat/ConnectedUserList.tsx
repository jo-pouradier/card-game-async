import { MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectConnectedUser,
  selectCurrentUserId,
  set_current_user_action,
} from "../../slices/connectedUserSlice";
import { selectUser } from "../../slices/userSlice";

export interface UserSocket {
  userId: number;
  socketId: string;
  userName: string;
  deck: Set<number> | null;
}

const ConnectedUserList = (_props: unknown) => {
  const user = useAppSelector(selectUser);
  const connectedUsers = useAppSelector(selectConnectedUser);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Connected Users</h2>
      <Select
        defaultValue={currentUserId}
        onChange={(e) =>
          dispatch(set_current_user_action(Number(e.target.value)))
        }
      >
        <MenuItem value={-1}>Global Chat</MenuItem>
        {connectedUsers.map((connectedUser, index: number) => {
          if (connectedUser.id === user.id) {
            return;
          }
          return (
            <MenuItem
              key={index}
              value={connectedUser.id}
              disabled={!connectedUser.isConnected}
            >
              {connectedUser.username}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default ConnectedUserList;
