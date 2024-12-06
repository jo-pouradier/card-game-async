import { createSlice } from "@reduxjs/toolkit";
import {
    SocketSlice,
    SocketSliceAction,
    SocketSliceState,
} from "../types/SocketSlice";
import { RootState } from "../store";

const initialState: SocketSliceState = {
    socket: null,
};

export const socketSlice: SocketSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        setSocket: (
            state: SocketSliceState,
            action: SocketSliceAction,
        )=> {
            state.socket = action.payload.socket
        }
    },
});

export const { setSocket} =
    socketSlice.actions;
export const selectSocket = (state: RootState) =>
    state.socketReducer.socket;
export default socketSlice.reducer;
