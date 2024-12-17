
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
        this.idRoom = 0;
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
        return this.getRoom(roomId)?.players.every((player) => player === null);
    }


    addPlayer(roomId: number, userId: number) {
        // @ts-ignore
        this.getRoom(roomId)?.players[this.getRoom(roomId)?.players.indexOf(null)] = userId;
    }

    removePlayer(userId: number) {
        this.rooms.forEach((room) => {
            if (room.players.includes(userId)) {
                room.players[room.players.indexOf(userId)] = null;
            }
        });
    }
}


export default RoomRepository;