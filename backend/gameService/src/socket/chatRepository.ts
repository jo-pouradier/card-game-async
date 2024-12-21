export type chat = {
    from: number;
    to: number;
    message: string;
    date: Date;
}

type chatRoom = {
    userIds: number[];
    chats: chat[];
}

class ChatRepository {
    private chatRooms: Set<chatRoom>;
    private readonly ids: number = 0;

    constructor({}) {
        this.chatRooms = new Set();
    }

    createRoom(userId1: number, userId2: number) {
        this.chatRooms.add({userIds:[userId1, userId2], chats: []});
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

}


export default new ChatRepository({});