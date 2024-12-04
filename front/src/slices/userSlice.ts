import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IUser from "../types/IUser";
import {
  UserSlice,
  UserSliceActions,
  UserSliceState
} from "../types/UserSlice";

const initialState: UserSliceState = {
  user: {id: 0} as IUser,
  submitted_user: {} as IUser,
};

export const userSlice: UserSlice = createSlice({
  name: "User",
  // Define initial state of the reducer/slice
  initialState,
  // Define the reducers
  reducers: {
    connect_user_action: (
      state: UserSliceState,
      action: UserSliceActions,
    ) => {
      state.user = action.payload.user;
    },
    update_user_action: (state: UserSliceState, action: UserSliceActions) => {
      state.user = action.payload.user;
    },
    submit_user_action: (state: UserSliceState, action: UserSliceActions) => {
      console.log("User to Submit");
      console.log(action.payload.user);
      state.submitted_user = action.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update_user_action, submit_user_action } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer.user;
export default userSlice.reducer;
