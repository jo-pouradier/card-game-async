import {io} from "socket.io-client";
import IUser from "../types/IUser.ts";
import {addNotification} from "../slices/notificationSlice.ts";
import {AppDispatch} from "../store.ts";

const socketConnection = (dispatch: AppDispatch) => {
    // Connecter au serveur Socket.IO
    const socket = io('http://localhost:8080');

    // Écouter une notification
    socket.on('notification', (data) => {
        dispatch(
            addNotification({
                id: Math.random() * 100,
                message: data.toString(),
                severity: "info",
            })
        )

    })


    // Nettoyage à la déconnexion
    return () => {
        socket.disconnect();
    };
}

export const userSocket = (userData: IUser, dispatch:AppDispatch) => {
    const socket = io('http://localhost:8080');

    socket.emit('user', userData);

    socket.on('notification', (data) => {
        dispatch(
            addNotification({
                id: Math.random() * 100,
                message: data.toString(),
                severity: "info",
            })
        )

    })
}

export default socketConnection;
