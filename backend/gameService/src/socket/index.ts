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
        const sender:number|undefined  = userRepo.getUserId(socket.id);
        if (sender === undefined) {
            return;
        }

        const receiver: number | undefined = userRepo.getUserId(toWhom);
        if (receiver === undefined) {
            console.log(`Utilisateur ${toWhom} inconnu`);
            socket.emit('notification', 'Utilisateur inconnu');
            return;
        }
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
        io.to(toWhom).emit('message', {msg, sender});
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
    socket.on("findMatch", (deck: number[], user: IUser) => {
        if (rooms.getRoomByPlayer(user.id) === undefined) {
            userRepo.setDeck(user.id, deck);
            console.log(user.id)
            console.log('Recherche de combat pour :', userRepo.getUserName(user.id));
            console.log(rooms.waitingRoom.players);
            if (rooms.waitingRoom.players[0] === null) {
                rooms.waitingRoom.players[0] = user.id;
                io.emit('notification', `Un joueur a rejoint la file d'attente`);
                console.log('Un joueur a rejoint la file d\'attente:', rooms.waitingRoom.players);
            } else {
                const roomId = rooms.createRoom();
                rooms.addPlayer(roomId, user.id);
                // @ts-ignore
                const player = rooms.waitingRoom.players[0];
                if (typeof player === "number") {
                    rooms.removePlayer(player);
                    rooms.addPlayer(roomId, player);
                    io.emit('notification', `Un combat a été trouvé entre ${userRepo.getUserName(user.id)} et ${userRepo.getUserName(player)}`);
                    io.emit('gameFound', roomId);
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

    socket.on('getDecks', (userId: number, socketId:number) => {
        console.log('GetDecks', userId, socketId);
        console.log('soso',socket.id)
        io.emit('decks', userRepo.getDeck(userId), userRepo.getDeck(rooms.getRoomByPlayer(userId)?.players[0] || 0));
    });


    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté :', socket.id);
        userRepo.deleteUser(socket.id);
        rooms.removePlayer(userRepo.getUserId(socket.id));
    });


    socket.on('error', (err) => {
        console.error('Erreur détectée :', err);
    });

});
