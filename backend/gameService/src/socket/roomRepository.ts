import { v4 as uuidv4 } from 'uuid';

type Player = {
  userId: number | null | undefined;
  isReadyToPlay: boolean;
};

type Room = {
  uuid: string;
  players: [Player, Player];
  date: Date | null;
};


class RoomRepository {
  private rooms: Set<Room>;
  waitingRoom: Room;

  constructor({}) {
    this.rooms = new Set();
    this.waitingRoom = {
      uuid: uuidv4(),
      players: [
        { userId: null, isReadyToPlay: false },
        { userId: null, isReadyToPlay: false },
      ],
      date: null,
    };
  }

  createRoom() {
    const uuid = uuidv4()
    this.rooms.add({
      uuid: uuid,
      players: [
        { userId: null, isReadyToPlay: false },
        { userId: null, isReadyToPlay: false },
      ],
      date: new Date(),
    });
    return uuid;
  }

  deleteRoom(uuid: string) {
    const room = this.getRoom(uuid);
    if (room) {
      this.rooms.delete(room);
      return true;
    }
    return false;
  }

  getRoom(uuid: string) {
    return Array.from(this.rooms).find((room) => room.uuid === uuid);
  }

  getRoomByPlayer(userId: number) {
    return Array.from(this.rooms).find((room) => room.players[0].userId == userId || room.players[1].userId == userId);
  }

  isEmpty(uuid: string) {
    return (
      this.getRoom(uuid)?.players[0] === null &&
      this.getRoom(uuid)?.players[1] === null
    );
  }

  addPlayer(uuid: string, userId: number) {
    const room = this.getRoom(uuid);
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
