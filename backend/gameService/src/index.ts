import { server } from "./app";
import { io } from "./socket";
import { initNotification } from "./notification";

initNotification(io, CONFIG.stompitOptions);

//in last
server.listen(CONFIG.port, () => {
  console.log(`Serveur Socket.IO lancé sur le port ${CONFIG.port}`);
});
