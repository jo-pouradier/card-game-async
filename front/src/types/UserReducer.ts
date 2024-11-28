import { Reducer } from "@reduxjs/toolkit";
import IUser from "./IUser";

export type UserReducer = Reducer<{
    user: IUser;
    submitted_user: IUser;
}>