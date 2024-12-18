import { DefaultEventsMap, Server, Socket } from "socket.io";
import { server } from "../app";
// @ts-ignore
import { IUser } from "../models/User";
import userRepository from "./userRepository";
import roomRepository from "./roomRepository";
import chatRepository, { chat } from "./chatRepository";

export const io = new Server(server, {
  cors: {
    origin: "*", // On autorise tout le monde à se connecter
    methods: ["GET", "POST"],
  },
});

const userRepo = new userRepository();
const rooms = new roomRepository();
const chatRepo = new chatRepository();

io.on("connection", (socket) => {
  socket.on("message", (msg: chat) => {
    const sender: number = msg.from;
    if (sender === undefined) {
      return;
    }

    const receiver: number = msg.to;
    const receiverSocket = userRepo.getSocketId(receiver);
    if (
      receiver === -1 &&
      receiver !== undefined &&
      receiverSocket !== undefined
    ) {
      console.log(`Utilisateur ${receiver} inconnu`);
      socket.emit("notification", "Utilisateur inconnu");
      return;
    }
    if (receiver === -1) {
      io.emit("message",msg);
      console.log(`Message envoyé à tout le monde : ${msg.message}`);
      return;
    } else if (receiver !== undefined) {
      if (chatRepo.isRoomExist(sender, receiver)) {
        chatRepo.addMessage(sender, receiver, msg);
        console.info("Add message to existing room");
      } else {
        chatRepo.createRoom(sender, receiver);
        chatRepo.addMessage(sender, receiver, msg);
      }
    }
    if (receiverSocket) {
      io.to([receiverSocket, socket.id]).emit("message", msg);
      io
        .to(receiverSocket)
        .emit("notification", "Vous avez reçu un message");
      console.log(
        `Message envoyé à ${userRepo.getUserName(
          receiver
        )} depuis ${userRepo.getUserName(sender)} : ${msg.message}`
      );
    } else {
      console.log(`Utilisateur ${receiver} inconnu`);
      socket.emit("notification", "Utilisateur inconnu");
    }
  });

  socket.on("login", (user: IUser) => {
    userRepo.addUser(user.id, socket.id);
    userRepo.setUserName(user.id, user.surName);
    const userSocket = userRepo.getSocketId(user.id);
    console.log(
      `Utilisateur ajouté au repo : ${userRepo.getUserName(
        user.id
      )}  with id : ${user.id}`
    );
    io.emit("newPlayer", userSocket);
  });

  socket.on("getPlayers", () => {
    const users = userRepo.getAllUsers();
    io.to(socket.id).emit("players", users);
  });

  // Recherche de combat
  socket.on("findMatch", (deck: Set<number>, userID: number) => {
    console.log(`Recherche de combat pour ${userRepo.getUserName(userID)}`);
    if (rooms.getRoomByPlayer(userID) === undefined) {
      userRepo.setDeck(userID, deck);
      if (rooms.getRoomByPlayer(userID) === undefined) {
        if (rooms.isEmpty(0)) {
          rooms.addPlayer(0, userID);
          io.emit("notification", `Un joueur a rejoint la file d'attente`);
        } else {
          const roomId = rooms.createRoom();
          rooms.addPlayer(roomId, userID);
          // @ts-ignore
          const player = rooms.waitingRoom.players[0];
          if (typeof player === "number") {
            rooms.removePlayer(player);
            rooms.addPlayer(roomId, player);
            io.emit(
              "notification",
              `Un combat a été trouvé entre ${userRepo.getUserName(
                userID
              )} et ${userRepo.getUserName(player)}`
            );
          }
        }
      }
    }
  });

  // Quitter la recherche de combat
  socket.on("cancelMatchmaking", (userID: number) => {
    if (rooms.getRoomByPlayer(userID)?.id === 0) {
      rooms.removePlayer(userID);
    }
  });

  socket.on("joinRoom", (roomId: string) => {
    socket.join(roomId);
    console.log(`${socket.id} a rejoint la room ${roomId}`);
  });

  socket.on("leaveRoom", (roomId: string) => {
    socket.leave(roomId);
    console.log(`${socket.id} a quitté la room ${roomId}`);
  });

  socket.on('getDecks', (userId: number, socketId:number) => {
        console.log('GetDecks', userId, socketId);
        console.log('soso',socket.id)
        io.emit('decks', userRepo.getDeck(userId), userRepo.getDeck(rooms.getRoomByPlayer(userId)?.players[0] || 0));
    });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté :", socket.id);
    const user = userRepo.getUserId(socket.id);
    userRepo.deleteUser(socket.id);
    io.emit("playerDisconnected", user);
  });

  socket.on("error", (err) => {
    console.error("Erreur détectée :", err);
  });
});
