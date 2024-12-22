import { v4 as uuidv4 } from 'uuid';
import {postInQueue} from "../notification";

export type chat = {
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
    }

    createRoom(userId1: number, userId2: number) {
        const room = {uuid:uuidv4(), userIds:[userId1, userId2], chats: []};

        this.chatRooms.add(room);
        return room;
    }

    addMessage(userId1: number, userId2:number, message: chat) {
        const room = this.getRoomByPlayerIds(userId1, userId2);
        if (room !== undefined) {
            room.chats.push(message);
        }
    }

    getChat(userId1: number, userId2: number) {
        return Array.from(this.chatRooms).find((room) => room.userIds.includes(userId1) && room.userIds.includes(userId2));
    }

    getRoomByPlayerIds(player1: number, player2: number) {
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