import { DefaultEventsMap, Server, Socket} from "socket.io";
import {server} from "../app";
// @ts-ignore
import {IUser} from "../models/User";
import userRepository from "./userRepository";

export const io = new Server(server, {
    cors: {
        origin: '*', // On autorise tout le monde à se connecter
        methods: ['GET', 'POST'],
    },
});

const userRepo = new userRepository();
let waitingPlayer: IUser | null = null;

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
    socket.on("findMatch", (deck: Set<number>, user:IUser) => {
        // @ts-ignore
        if (waitingPlayer) {
            // @ts-ignore
            const player1 = waitingPlayer;
            // @ts-ignore
            const player2 = user;
            waitingPlayer = null;
            console.log(`Match trouvé entre ${player1.surName} et ${player2.surName}`);
            io.emit('matchFound', player1, player2);
        } else {
            waitingPlayer = user;
            console.log(`${user.surName} est en attente d'un adversaire`);

    }});

    // Quitter la recherche de combat
    socket.on('cancelMatchmaking', () => {
        if (waitingPlayer === socket) {
            waitingPlayer = null;
            console.log(`${socket.id} a quitté la file d'attente`);
        }
    });




    // Déconnexion
    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté :', socket.id);
        if (mapUser.has(socket)) {
            const user = users.values().next().value;
            io.emit('notification', user.surName + ' s\'est déconnecté');
            mapUser.delete(socket);
            mapSocket.delete(user.id);
            users.delete(user);
        }
    });
});

io.on("findMatch", (id: number) => {
    console.log(`cherche un adversaire`+id);
})



