import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Player = {
  id: number;
  username: string;
  isConnected: boolean;
};

export interface ConnectedUserSliceState {
  currentUserId: number;
  connectedUsers: Player[];
}
export type ConnectedUserSliceActions = PayloadAction<number>;

export type ConnectedUserSlice = Slice<
  ConnectedUserSliceState,
  {
    set_all_users_action: (
      state: ConnectedUserSliceState,
      action: PayloadAction<Player[]>,
    ) => void;
    set_current_user_action: (
      state: ConnectedUserSliceState,
      action: PayloadAction<number>,
    ) => void;
    add_connected_user_action: (
      state: ConnectedUserSliceState,
      action: ConnectedUserSliceActions,
    ) => void;
    remove_connected_user_action: (
      state: ConnectedUserSliceState,
      action: ConnectedUserSliceActions,
    ) => void;
  }
>;

const initialState: ConnectedUserSliceState = {
  currentUserId: -1,
  connectedUsers: [],
};

export const connectedUserSlice: ConnectedUserSlice = createSlice({
  name: "ConnectedUser",
  // Define initial state of the reducer/slice
  initialState,
  // Define the reducers
  reducers: {
    set_all_users_action: (
      state: ConnectedUserSliceState,
      action: PayloadAction<Player[]>,
    ) => {
      state.connectedUsers = action.payload;
      // set connected user firts in the list
      state.connectedUsers = state.connectedUsers.sort((a, b) => {
        if (a.isConnected && b.isConnected) {
          return 0;
        }
        if (a.isConnected && !b.isConnected) {
          return 1;
        }
        return -1;
      });
    },
    set_current_user_action: (
      state: ConnectedUserSliceState,
      action: PayloadAction<number>,
    ) => {
      state.currentUserId = action.payload;
    },
    add_connected_user_action: (
      state: ConnectedUserSliceState,
      action: ConnectedUserSliceActions,
    ) => {
      state.connectedUsers.map((user) => {
        if (user.id === action.payload) {
          user.isConnected = true;
        }
      });
      state.connectedUsers = state.connectedUsers.sort((a, b) => {
        if (a.isConnected && b.isConnected) {
          return 0;
        }
        if (a.isConnected && !b.isConnected) {
          return -1;
        }
        return 1;
      });
    },
    remove_connected_user_action: (
      state: ConnectedUserSliceState,
      action: ConnectedUserSliceActions,
    ) => {
      state.connectedUsers = state.connectedUsers.filter(
        (user) => user.id !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  set_all_users_action,
  set_current_user_action,
  add_connected_user_action,
  remove_connected_user_action,
} = connectedUserSlice.actions;
export const selectConnectedUser = (state: RootState) =>
  state.connectedUserReducer.connectedUsers;
export const selectCurrentUserId = (state: RootState) =>
  state.connectedUserReducer.currentUserId;
export default connectedUserSlice.reducer;
