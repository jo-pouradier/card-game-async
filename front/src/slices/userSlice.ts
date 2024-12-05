import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import IUser from "../types/IUser";
import {
  UserSlice,
  UserSliceActions,
  UserSliceState,
} from "../types/UserSlice";

const initialState: UserSliceState = {
  user: { id: 0 } as IUser,
  modified_user: { id: 0 } as IUser,
  submitted_user: {} as IUser,
};

export const userSlice: UserSlice = createSlice({
  name: "User",
  // Define initial state of the reducer/slice
  initialState,
  // Define the reducers
  reducers: {
    connect_user_action: (state: UserSliceState, action: UserSliceActions) => {
      state.user = action.payload.user;
      state.modified_user = action.payload.user;
      state.submitted_user = action.payload.user;
    },
    update_user_action: (state: UserSliceState, action: UserSliceActions) => {
      state.modified_user = action.payload.user;
    },
    submit_user_action: (state: UserSliceState, action: UserSliceActions) => {
      console.log("User to Submit");
      console.log(action.payload.user);
      state.submitted_user = action.payload.user;
    },
    delete_user_action: (state: UserSliceState) => {
      state.user = { id: 0 } as IUser;
      state.modified_user = { id: 0 } as IUser;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  connect_user_action,
  update_user_action,
  submit_user_action,
  delete_user_action,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer.user;
export const selectModifiedUser = (state: RootState) =>
  state.userReducer.modified_user;
export const selectSubmittedUser = (state: RootState) =>
  state.userReducer.submitted_user;
export default userSlice.reducer;
