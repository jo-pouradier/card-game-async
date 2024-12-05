import { AlertProps } from "@mui/material";
import { PayloadAction, Slice } from "@reduxjs/toolkit";

export interface NotificationSliceState {
    notifications: NotificationData[];
} 

export interface NotificationData {
    id: number;
    message: string;
    severity?: AlertProps["severity"];
    duration?: number;
}   

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NotificationSliceActions extends PayloadAction<NotificationData> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NotificationSlice extends Slice<NotificationSliceState, {
    addNotification: (state: NotificationSliceState, action: NotificationSliceActions) => void;
    removeNotification: (state: NotificationSliceState, action: PayloadAction<{id: number}>) => void;
}> {}