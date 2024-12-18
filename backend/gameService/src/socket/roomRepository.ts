
type Room = {
    id: number;
    players: [number|null, number|null];
    date : Date | null;
}


class RoomRepository {
    private rooms: Set<Room>;
    private idRoom: number;
    waitingRoom: Room;
    
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
        // @ts-ignore
        this.rooms.delete(this.getRoom(id));
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
        if (room !== undefined) {
            if (room.players[0] === null) {
                room.players[0] = userId;
            } else if (room.players[1] === null) {
                room.players[1] = userId;
            }
        }
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