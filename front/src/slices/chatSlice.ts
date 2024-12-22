import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Message {
  from: number;
  to: number;
  message: string;
  date: string;
  isRead: boolean;
}
export type ChatSliceActions = PayloadAction<Message>;
export interface ChatSliceState {
  messages: Message[];
}

export type ChatSlice = Slice<
  ChatSliceState,
  {
    add_chat_message_action: (
      state: ChatSliceState,
      action: ChatSliceActions,
    ) => void;
    set_chat_messages_action: (
      state: ChatSliceState,
      action: PayloadAction<Message[]>,
    ) => void;
  }
>;

const initialState: ChatSliceState = {
  messages: [],
};

export const chatSlice: ChatSlice = createSlice({
  name: "Chat",
  // Define initial state of the reducer/slice
  initialState,
  // Define the reducers
  reducers: {
    add_chat_message_action: (
      state: ChatSliceState,
      action: ChatSliceActions,
    ) => {
      state.messages.push(action.payload);
    },
    set_chat_messages_action: (
      state: ChatSliceState,
      action: PayloadAction<Message[]>,
    ) => {
      state.messages = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add_chat_message_action } = chatSlice.actions;
export const selectChat = (state: RootState) => state.chatReducer.messages;
export default chatSlice.reducer;
