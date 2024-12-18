import { DefaultEventsMap, Server, Socket } from "socket.io";
import { server } from "../app";
import userRepository, { IUser } from "./userRepository";
import roomRepository from "./roomRepository";
import chatRepository, { chat } from "./chatRepository";

export const io = new Server(server, {
  cors: {
    origin: "*", // On autorise tout le monde à se connecter
    methods: ["GET", "POST"],
  },
});

const userRepo = new userRepository();
const roomRepo = new roomRepository();
const chatRepo = new chatRepository();

io.on("connection", (socket: Socket) => {
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
      io.emit("message", msg);
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
      io.to(receiverSocket).emit("notification", "Vous avez reçu un message");
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
    if (user.id && user.id < 0 && user.surName && user.surName.length > 0) {
      return;
    }
    if (user.id === null || user.surName === null) {
      return;
    }
    userRepo.addUser(user.id, socket.id);
    userRepo.setUserName(user.id, user.surName);
    const userSocket = userRepo.getSocketId(user.id);
    console.log(
      `Utilisateur ajouté au repo : ${userRepo.getUserName(
        user.id
      )}  with id : ${user.id}, socket: ${socket.id}`
    );
    io.emit("newPlayer", userSocket);
  });

  socket.on("getPlayers", () => {
    const users = userRepo.getAllUsers();
    io.to(socket.id).emit("players", users);
  });

  // Recherche de combat
  socket.on("findMatch", (deck: number[], user: IUser) => {
    if (user.id === null || user.id === undefined) {
      socket.emit(
        "notification",
        "Error with identification, did not receive a IUser object"
      );
      console.log(
        "Error with identification, did not receive a IUser object, socket:" +
          socket.id
      );
      return;
    }
    console.log(`findMatch: `+ user);
    if (roomRepo.getRoomByPlayer(user.id) !== undefined) {
      socket.emit("notification", "Somthing went worng you are olready in game")
      return;
    }

    if (deck.length !== 5) {
      socket.emit(
        "notification",
        "You need 5 cards, you only have " + deck.length + "."
      );
      console.log(`${user.surName} needs 5 cards, he only have ${deck.length}`);
      return;
    }
    userRepo.setDeck(user.id, deck);
    console.log("Recherche de combat pour :", userRepo.getUserName(user.id));
    console.log(`current waitingRoom: ${roomRepo.waitingRoom.players}`);
    if (roomRepo.waitingRoom.players[0].userId === null) {
      roomRepo.waitingRoom.players[0].userId = user.id;
      io.emit("notification", `Un joueur a rejoint la file d'attente`);
      console.log(
        "Un joueur a rejoint la file d'attente:",
        roomRepo.waitingRoom.players
      );
    } else {
      const roomId = roomRepo.createRoom();
      roomRepo.addPlayer(roomId, user.id);
      const player = roomRepo.waitingRoom.players[0].userId;
      if (typeof player === "number") {
        // roomRepo.removePlayer(player); // ? useless ?
        roomRepo.waitingRoom.players[0].userId = null;
        roomRepo.addPlayer(roomId, player);
        const playerSocket = userRepo.getSocketId(player) ?? "";
        io.to([socket.id, playerSocket]).emit(
          "notification",
          `Un combat a été trouvé entre ${userRepo.getUserName(
            user.id
          )} et ${userRepo.getUserName(player)}`
        );
        console.log("Combat trouvé")
        io.to([socket.id, playerSocket]).emit("gameFound", roomId);
      }
    }
  });

  socket.on("readyToPlay", (userId: number | null | undefined) => {
    if (userId === undefined || userId === null) {
      socket.emit(
        "notification",
        "You need to send your userId to be ready to play"
      );
      return;
    }
    const room = roomRepo.getRoomByPlayer(userId);
    if (room === undefined) {
      return;
    }

    room.players.forEach((player) => {
      if (player.userId === userId) player.isReadyToPlay = true;
    });
    // check both ready
    if (
      room.players.filter((player) => player.isReadyToPlay === true).length ===
      2
    ) {
      // emit both deck in the right order
      const deckCurrentPlayer = Array.from(userRepo.getDeck(userId) ?? []);
      const otherPlayerId =
        room.players.filter((player) => player.userId !== userId)[0].userId ??
        0;
      const deckOtherPlayer = userRepo.getDeck(otherPlayerId);

      socket.emit("decks", {
        deck1: deckCurrentPlayer,
        deck2: deckOtherPlayer,
      });
      io.to(userRepo.getSocketId(otherPlayerId) ?? "").emit("decks", {
        deck2: deckCurrentPlayer,
        deck1: deckOtherPlayer,
      });
    }
  });
  // Quitter la recherche de combat
  socket.on("cancelMatchmaking", (userId: number) => {
    if (roomRepo.getRoomByPlayer(userId)?.id === 0) {
      roomRepo.removePlayer(userId);
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

  socket.on("getDecks", (userId: number, socketId: number) => {
    console.log("GetDecks", userId, socketId);
    console.log("soso", socket.id);
    io.emit(
      "decks",
      userRepo.getDeck(userId),
      userRepo.getDeck(roomRepo.getRoomByPlayer(userId)?.players[0].userId || 0)
    );
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté :", socket.id);
    userRepo.deleteUser(socket.id);
    roomRepo.removePlayer(userRepo.getUserId(socket.id));
  });

  socket.on("error", (err) => {
    console.error("Erreur détectée :", err);
  });
});
