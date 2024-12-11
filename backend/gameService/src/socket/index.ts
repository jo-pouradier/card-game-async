import { Server } from "socket.io";
import { server } from "../app";

export const io = new Server(server, {
    cors: {
        origin: '*', // On autorise tout le monde à se connecter
        methods: ['GET', 'POST'],
    },
});


io.on('connection', (socket) => {
    console.log('Un client est connecté');

    // User connection
    socket.on('user', (message) => {
        socket.emit('notification', message);
    })


    // Déconnexion
    socket.on('disconnect', () => {
        console.log('Un client est déconnecté');
    });


    socket.on('message', (msg) => {
        io.emit('message', msg);
    })
});