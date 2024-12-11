import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import stompit from "stompit";
import CONFIG from "./config.json" with { "type": "json" }

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Adresse de votre app React
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



server.listen(CONFIG.port, () => {
    console.log(`Serveur Socket.IO lancé sur le port ${CONFIG.port}`);
});



stompit.connect(CONFIG.connectOptions, (error, client) => {
    if (error) {
        console.error('Connection error: ' + error.message);
        return;
    }

    const subscribeHeaders = {
        'destination': 'notification-queue',
        'ack': "client-individual",
    };

    client.subscribe(subscribeHeaders, (error, message) => {
        if (error) {
            console.error('Subscription error: ' + error.message);
            return;
        }

        message.readString('utf-8', (error, body) => {
            if (error) {
                console.error('Failed to read message: ' + error.message);
                return;
            }
            console.log('Received message: ' + body);
            let data = JSON.parse(body);
            io.emit('notification', data);
            client.ack(message);
        });
    });
});

