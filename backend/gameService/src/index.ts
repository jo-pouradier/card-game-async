import { server } from "./app";
import { io } from "./socket";
import { initNotification } from "./notification";
// @ts-ignore
import CONFIG from "../config.json"
initNotification(io, CONFIG.connectOptions);


//in last
server.listen(CONFIG.port, () => {
  console.log(`Serveur Socket.IO lancé sur le port ${CONFIG.port}`);
});
