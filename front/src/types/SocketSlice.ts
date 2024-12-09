import { PayloadAction, Slice } from "@reduxjs/toolkit";
import {Socket} from "socket.io";

export interface SocketSliceState {
    socket: Socket | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SocketSliceAction
    extends PayloadAction<Socket> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SocketSlice
    extends Slice<
        SocketSliceState,
        {
            setSocket : (
                state: SocketSliceState,
                action: SocketSliceAction,
            ) => void;
        }
    > {}
