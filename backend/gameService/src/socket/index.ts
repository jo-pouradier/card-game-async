import { DefaultEventsMap, Server, Socket} from "socket.io";
import {server} from "../app";
// @ts-ignore
import {IUser} from "../models/User";
import userRepository from "./userRepository";
import roomRepository from "./roomRepository";
import chatRepository from "./chatRepository";

export const io = new Server(server, {
    cors: {
        origin: '*', // On autorise tout le monde à se connecter
        methods: ['GET', 'POST'],
    },
});

const userRepo = new userRepository();
const rooms = new roomRepository();
const chatRepo = new chatRepository();

io.on('connection', (socket) => {

    socket.on('message', (msg, toWhom) => {
        // @ts-ignore
        const sender:number  = userRepo.getUserId(socket.id);
        // @ts-ignore
        const receiver:number = userRepo.getUserId(toWhom);
        if (toWhom === 'all') {
            socket.broadcast.emit('message', {msg, sender});
            return;
        } else if (receiver !== undefined) {
            if (chatRepo.isRoomExist(sender, receiver)) {
                chatRepo.addMessage(sender, receiver, msg);
            } else {
                chatRepo.createRoom(sender, receiver);
                chatRepo.addMessage(sender, receiver, msg);
            }
        }
        socket.to(toWhom).emit('message', {msg, sender});
        console.log(`Message envoyé à ${userRepo.getUserName(receiver)} depuis ${userRepo.getUserName(sender)} : ${msg.message}`);

    })

    socket.on('login', (user: IUser) => {
        userRepo.addUser(user.id, socket.id);
        userRepo.setUserName(user.id, user.surName);
        console.log(`Utilisateur ajouté au repo : ${userRepo.getUserName(user.id)}  with id : ${user.id}`);
    })

    socket.on('getPlayers', () => {
        io.to(socket.id).emit('players', userRepo.getAllUsers());
    });


    // Recherche de combat
    socket.on("findMatch", (deck: Set<number>, userID: number) => {
        if (rooms.getRoomByPlayer(userID) === undefined) {
            userRepo.setDeck(userID, deck);
            if (rooms.getRoomByPlayer(userID) === undefined) {
                if (rooms.isEmpty(0)) {
                    rooms.addPlayer(0, userID);
                    io.emit('notification', `Un joueur a rejoint la file d'attente`);
                } else {
                    const roomId = rooms.createRoom();
                    rooms.addPlayer(roomId, userID);
                    // @ts-ignore
                    const player = rooms.waitingRoom.players[0];
                    if (typeof player === "number") {
                        rooms.removePlayer(player);
                        rooms.addPlayer(roomId, player);
                        io.emit('notification', `Un combat a été trouvé entre ${userRepo.getUserName(userID)} et ${userRepo.getUserName(player)}`);
                    }
                }
            }}
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
