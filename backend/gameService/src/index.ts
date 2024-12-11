import {server} from './app'

server.listen(CONFIG.port, () => {
    console.log(`Serveur Socket.IO lancé sur le port ${CONFIG.port}`);
});