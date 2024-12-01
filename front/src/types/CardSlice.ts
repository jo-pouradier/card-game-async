import { PayloadAction, Slice } from "@reduxjs/toolkit";
import ICard from "./ICard";

export type CardSliceActions = PayloadAction<{ card: ICard }>;

export type CardSliceState = {
  card: ICard;
  submitted_card: ICard;
};

export type CardSlice = Slice<
  CardSliceState,
  {
    update_card_action: (
      state: CardSliceState,
      action: CardSliceActions,
    ) => void;
    submit_card_action: (
      state: CardSliceState,
      action: CardSliceActions,
    ) => void;
  }
>;
