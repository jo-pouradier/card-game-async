type Player = {
  userId: number | null | undefined;
  isReadyToPlay: boolean;
};

type Room = {
  id: number;
  players: [Player, Player];
  date: Date | null;
};

class RoomRepository {
  private rooms: Set<Room>;
  private idRoom: number;
  waitingRoom: Room;

  constructor({}) {
    this.rooms = new Set();
    this.idRoom = 1;
    this.waitingRoom = {
      id: 0,
      players: [
        { userId: null, isReadyToPlay: false },
        { userId: null, isReadyToPlay: false },
      ],
      date: null,
    };
  }

  createRoom() {
    this.rooms.add({
      id: this.idRoom,
      players: [
        { userId: null, isReadyToPlay: false },
        { userId: null, isReadyToPlay: false },
      ],
      date: new Date(),
    });
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
    return Array.from(this.rooms).find((room) => room.players[0].userId == userId || room.players[1].userId == userId);
  }

  isEmpty(roomId: number) {
    return (
      this.getRoom(roomId)?.players[0] === null &&
      this.getRoom(roomId)?.players[1] === null
    );
  }

  addPlayer(roomId: number, userId: number) {
    const room = this.getRoom(roomId);
    if (room !== undefined) {
      if (room.players[0].userId === null) {
        room.players[0].userId = userId;
      } else if (room.players[1].userId === null) {
        room.players[1].userId = userId;
      }
    }
  }

  removePlayer(userId: number | undefined) {
    if (userId === undefined) {
      return;
    }
    this.rooms.forEach((room) => {
      if (room.players.map(player => player.userId).includes(userId)) {
        room.players.forEach(player => {
          if (player.userId === userId) {
            player.userId = null;
          }
        });
      }
    });
  }
}

export default new RoomRepository({});
