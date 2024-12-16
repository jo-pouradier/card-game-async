type UserSocket = {
    userId: number;
    socketId: string;
    userName: string;
    deck: Set<number>| null;
};

class UserSocketRepository {
    private users: Set<UserSocket>; // Map de userId -> socketId

    constructor() {
        this.users = new Set();
    }


    addUser(userId: number, socketId: string) {
        this.users.add({ userId, socketId, userName: "", deck: null });
    }


    deleteUser(socketId: string) {
        // @ts-ignore
        this.users.delete(Array.from(this.users).find((user) => user.socketId === socketId));
    }


    setUserName(userId: number, userName: string) {
        this.users.forEach((user) => {
            if (user.userId === userId) {
                user.userName = userName;
            }
        });
    }


    getAllUsers() {
        return Array.from(this.users);
    }


    getSocketId(userId: number) {
        return Array.from(this.users).find((user) => user.userId === userId)?.socketId;
    }

    setSocketId(userId: number, socketId: string) {
        this.users.forEach((user) => {
            if (user.userId === userId) {
                user.socketId = socketId;
            }
        });
    }


    getUserId(socketId: string) {
        return Array.from(this.users).find((user) => user.socketId === socketId)?.userId;
    }


    setDeck(userId: number, deck: Set<number>) {
        this.users.forEach((user) => {
            if (user.userId === userId && user.deck === null && deck.size === 5) {
                user.deck = deck;
            }
        });

    }

    getDeck(userId: number) {
        return Array.from(this.users).find((user) => user.userId === userId)?.deck;
    }
}

export default UserSocketRepository;