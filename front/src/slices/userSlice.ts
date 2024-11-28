import { createSlice } from "@reduxjs/toolkit";
import IUser from "../types/IUser";
import {
  UserSlice,
  UserSliceActions,
  UserSliceState,
} from "../types/UserSlice";
import { UserReducer } from "../types/UserReducer";

const initialState: UserSliceState = {
  user: {} as IUser,
  submitted_user: {} as IUser,
};

export const userSlice: UserSlice = createSlice({
  name: "User",
  // Define initial state of the reducer/slice
  initialState,
  // Define the reducers
  reducers: {
    update_user_action: (state:UserSliceState, action: UserSliceActions) => {
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

export default userSlice.reducer as UserReducer;
