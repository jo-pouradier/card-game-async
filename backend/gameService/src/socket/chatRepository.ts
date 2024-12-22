import { v4 as uuidv4 } from "uuid";
import { postInQueue } from "../notification";
// @ts-ignore
import CONFIG from "../../config.json";

export type chat = {
  uuid: string;
  from: number;
  to: number;
  message: string;
  date: Date;
}

type chatRoom = {
  uuid: string;
  userIds: number[];
  chats: chat[];
}

class ChatRepository {
  private chatRooms: Set<chatRoom>;


  constructor({}) {
    this.chatRooms = new Set();
    // Init global chat room
    const globalRoom = { uuid: "00000000-0000-0000-0000-000000000000", userIds: [-1], chats: [] };
    this.chatRooms.add(globalRoom);
    this.notifySpringNewChatRoom(globalRoom);
  }

  createRoom(userId1: number, userId2: number) {
    const room = { uuid: uuidv4(), userIds: [userId1, userId2], chats: [] };
    // this.notifySpringNewChatRoom(room);
    this.chatRooms.add(room);
    return room;
  }

  notifySpringNewChatRoom(room: chatRoom) {
    postInQueue(
      {
        uuid: room.uuid,
        isGlobal: room.userIds.includes(-1),
        users: room.userIds,
        messages: []
      }, CONFIG.connectOptions, "ChatRoomDTO");
  }

  addMessage(sender: number, receiver: number, message: chat) {
    message.uuid = uuidv4();
    const room = this.getRoomByPlayerIds(sender, receiver);
    if (room !== undefined) {
      room.chats.push(message);
      // this.notifySpringNewMessage(message, room);
    }

  }

  notifySpringNewMessage(message: chat, room: chatRoom) {
    postInQueue(
      {
        uuid: message.uuid,
        content: message.message,
        userId: message.from,
        timestamp: new Date().getTime(),
        roomUuid: room.uuid
      }, CONFIG.connectOptions, "ChatMessageDTO");
  }

  getChat(userId1: number, userId2: number) {
    return Array.from(this.chatRooms).find((room) => room.userIds.includes(userId1) && room.userIds.includes(userId2));
  }

  getRoomByPlayerIds(player1: number, player2: number) {
    if (player1 === -1 || player2 === -1) {
      return Array.from(this.chatRooms).find((room) => room.userIds.includes(-1));
    }
    return Array.from(this.chatRooms).find((room) => room.userIds.includes(player1) && room.userIds.includes(player2));
  }

  isRoomExist(player1: number, player2: number) {
    return this.getRoomByPlayerIds(player1, player2) !== undefined;
  }

  getRoomByUUID(uuid: string) {
    return Array.from(this.chatRooms).find((room) => room.uuid === uuid);
  }

}


export default new ChatRepository({});