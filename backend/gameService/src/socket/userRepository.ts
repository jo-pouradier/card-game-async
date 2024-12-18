type UserSocket = {
    userId: number;
    socketId: string;
    userName: string;
    deck: Set<number>| null;
};
export interface IUser {
  id: number | null;
  account: number | null;
  login: string | null;
  surName: string | null;
  lastName: string | null;
  email: string | null;
  pwd: string | null;
  money: number | null;
  cardList: number[] | null;
}

class UserSocketRepository {
    private users: Set<UserSocket>; // Map de userId -> socketId

    constructor() {
        this.users = new Set();
    }


    addUser(userId: number, socketId: string) {
        this.users.add({ userId, socketId, userName: "", deck: null });
    }


    deleteUser(socketId: string) {
        const user = Array.from(this.users).find((user) => user.socketId === socketId);
        if (user) {
            this.users.delete(user);
        }
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

    getUser(userId: number) {
        return Array.from(this.users).find((user) => user.userId === userId);
    }


    getUserName(userId: number) {
        return Array.from(this.users).find((user) => user.userId === userId)?.userName;
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


    setDeck(userId: number, deck: number[]) {
        this.users.forEach((user) => {
            if (user.userId === userId) {
                user.deck = new Set(deck);
            }
        });
    }

    getDeck(userId: number) {
        return Array.from(this.users).find((user) => user.userId === userId)?.deck;
    }

}

export default UserSocketRepository;
export type { UserSocket };