
type Room = {
    id: number;
    players: [number|null, number|null];
    date : Date | null;
}


class RoomRepository {
    private rooms: Set<Room>;
    private idRoom: number;
    private waitingRoom: Room;
    
    constructor() {
        this.rooms = new Set();
        this.idRoom = 1;
        this.waitingRoom = {id: 0, players: [null, null], date: null};
    }

    createRoom() {
        this.rooms.add({id: this.idRoom, players: [null, null], date: new Date()});
        this.idRoom++;
        return this.idRoom - 1;
    }

    deleteRoom(id: number) {
        const room = this.getRoom(id);
        if (room) {
            this.rooms.delete(room);
            return true;
        }
        return false;
    }

    getRoom(id: number) {
        return Array.from(this.rooms).find((room) => room.id === id);
    }

    getRoomByPlayer(userId: number) {
        return Array.from(this.rooms).find((room) => room.players.includes(userId));
    }


    isEmpty(roomId: number) {
        return this.getRoom(roomId)?.players[0] === null && this.getRoom(roomId)?.players[1] === null;
    }


    addPlayer(roomId: number, userId: number) {
        const room = this.getRoom(roomId);
        if (!room) {
            return false;
        }
        const playerIndex = room.players.indexOf(null);
        if (playerIndex !== -1) {
            room.players[playerIndex] = userId;
            return true;
        }
        return false;
    }

    removePlayer(userId: number | undefined) {
        if (userId === undefined) {
            return;
        }
        this.rooms.forEach((room) => {
            if (room.players.includes(userId)) {
                room.players[room.players.indexOf(userId)] = null;
            }
        });
    }
}


export default RoomRepository;