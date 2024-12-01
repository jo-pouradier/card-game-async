import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  CardSlice,
  CardSliceActions,
  CardSliceState,
} from "../types/CardSlice";
import ICard from "../types/ICard";

const initialState: CardSliceState = {
  card: {} as ICard,
  submitted_card: {} as ICard,
};

export const cardSlice: CardSlice = createSlice({
  name: "Card",
  // Define initial state of the reducer/slice
  initialState,
  // Define the reducers
  reducers: {
    update_card_action: (state: CardSliceState, action: CardSliceActions) => {
      state.card = action.payload.card;
    },
    submit_card_action: (state: CardSliceState, action: CardSliceActions) => {
      console.log("User to Submit");
      console.log(action.payload.card);
      state.submitted_card = action.payload.card;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update_card_action, submit_card_action } = cardSlice.actions;
export const selectCard = (state: RootState) => state.cardReducer.card;
export default cardSlice.reducer;
