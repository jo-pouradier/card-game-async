import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export interface RootState {
  userReducer: ReturnType<typeof userReducer>;
}

export default configureStore<RootState>({
  reducer: {
    userReducer: userReducer,
  },
});
