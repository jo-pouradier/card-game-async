import { PayloadAction, Slice } from "@reduxjs/toolkit";
import IUser from "./IUser";

export type UserSliceActions = PayloadAction<{ user: IUser }>;
export type UserConnectSliceActions = PayloadAction<{ user: {username: string, password: string} }>;

export type UserSliceState = {
  user: IUser;
  submitted_user: IUser;
};

export type UserSlice = Slice<
  UserSliceState,
  {
    connect_user_action: (
      state: UserSliceState,
      action: UserSliceActions,
    ) => void;
    update_user_action: (
      state: UserSliceState,
      action: UserSliceActions,
    ) => void;
    submit_user_action: (
      state: UserSliceState,
      action: UserSliceActions,
    ) => void;
    delete_user_action: (state: UserSliceState) => void;
  }
>;
