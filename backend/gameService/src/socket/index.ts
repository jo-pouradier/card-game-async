import { DefaultEventsMap, Server, Socket} from "socket.io";
import {server} from "../app";

export const io = new Server(server, {
    cors: {
        origin: '*', // On autorise tout le monde à se connecter
        methods: ['GET', 'POST'],
    },
});

let waitingPlayer: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null= null;

io.on('connection', (socket) => {

    socket.on('message', (msg) => {
        io.emit('message', msg);
    })

    socket.on('login', user => {
        io.emit('notification', user);
    })


    // Rejoindre une room
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`${socket.id} a rejoint la room ${roomName}`);

        // Notifier les autres dans la room
        socket.to(roomName).emit('message', `${socket.id} a rejoint la room`);
    });


    // Quitter une room
    socket.on('leaveRoom', (roomName) => {
        socket.leave(roomName);
        console.log(`${socket.id} a quitté la room ${roomName}`);

        // Notifier les autres dans la room
        socket.to(roomName).emit('message', `${socket.id} a quitté la room`);
    });


    // Recherche de combat
    socket.on('findMatch', () => {
        if (waitingPlayer) {
            // Trouver un adversaire
            const roomName = `match_${waitingPlayer.id}_${socket.id}`;
            console.log(`Création de la room ${roomName}`);

            // Ajouter les deux joueurs dans la room
            waitingPlayer.join(roomName);
            socket.join(roomName);

            // Notifier les joueurs
            io.to(roomName).emit('matchFound', { roomName, players: [waitingPlayer.id, socket.id] });

            // Réinitialiser l'attente
            waitingPlayer = null;
        } else {
            // Pas d'adversaire, attendre
            waitingPlayer = socket;
            socket.emit('waitingForMatch');
            console.log(`Joueur en attente : ${socket.id}`);
        }
    });

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
    });
});



