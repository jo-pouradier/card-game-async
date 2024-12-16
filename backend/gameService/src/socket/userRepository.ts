type UserSocket = {
    userId: string;
    socketId: string;
    userName: string;
};

class UserSocketRepository {
    private users: Set<UserSocket>; // Map de userId -> socketId

    constructor() {
        this.users = new Set();
    }

    addUser(userId: string, socketId: string) {
        this.users.add({ userId, socketId, userName: "" });
    }

    setUserName(userId: string, userName: string) {
        this.users.forEach((user) => {
            if (user.userId === userId) {
                user.userName = userName;
            }
        });
    }

    getAllUsers() {
        return Array.from(this.users);
    }

    getSocketId(userId: string) {
        return Array.from(this.users).find((user) => user.userId === userId)?.socketId;
    }

    getUserId(socketId: string) {
        return Array.from(this.users).find((user) => user.socketId === socketId)?.userId;
    }
}

type Room = {
    roomId: string;
    players: [string, string];
}


class RoomRepository {
    private rooms: Set<Room>;

    constructor() {
        this.rooms = new Set();
    }

    addRoom(roomId: string, players: [string, string]) {
        this.rooms.add({ roomId, players });
    }

    getRoom(roomId: string) {
        return Array.from(this.rooms).find((room) => room.roomId === roomId);
    }

    getRoomByPlayer(userId: string) {
        return Array.from(this.rooms).find((room) => room.players.includes(userId));
    }

    removeRoom(roomId: string) {
        this.rooms.delete(this.getRoom(roomId));}
}










export default UserSocketRepository;