import { DefaultEventsMap, Server, Socket} from "socket.io";
import {server} from "../app";
// @ts-ignore
import {IUser} from "../models/User";
import userRepository from "./userRepository";
import roomRepository from "./roomRepository";

export const io = new Server(server, {
    cors: {
        origin: '*', // On autorise tout le monde à se connecter
        methods: ['GET', 'POST'],
    },
});

const userRepo = new userRepository();
const rooms = new roomRepository();

io.on('connection', (socket) => {

    socket.on('message', (msg) => {
        io.emit('message', msg);
    })

    socket.on('login', (user: IUser) => {
        userRepo.addUser(user.id, socket.id);
        userRepo.setUserName(user.id, user.surName);
    })

    socket.on('getPlayers', () => {
        io.emit('players', userRepo.getAllUsers());
    });


    // Recherche de combat
    socket.on("findMatch", (deck: Set<number>, userID: number) => {
        userRepo.setDeck(userID, deck);
        if (rooms.getRoomByPlayer(userID) === undefined) {
            if (rooms.isEmpty(0)) {
                rooms.addPlayer(0, userID);
            } else {
                const roomId = rooms.createRoom();
                rooms.addPlayer(roomId, userID);
                // @ts-ignore
                const player = rooms.getRoom(0).players[0];
                if (typeof player === "number") {
                    rooms.addPlayer(roomId, player);
                    rooms.removePlayer(player);
                }
            }
        }
    });

    // Quitter la recherche de combat
    socket.on('cancelMatchmaking', (userID: number) => {
        if (rooms.getRoomByPlayer(userID)?.id === 0) {
            rooms.removePlayer(userID);
        }
    });


    socket.on('joinRoom', (roomId: string) => {
        socket.join(roomId);
        console.log(`${socket.id} a rejoint la room ${roomId}`);
    });


    socket.on('leaveRoom', (roomId: string) => {
        socket.leave(roomId);
        console.log(`${socket.id} a quitté la room ${roomId}`);
    });


    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté :', socket.id);
        userRepo.deleteUser(socket.id);
    });


    socket.on('error', (err) => {
        console.error('Erreur détectée :', err);
    });

});
