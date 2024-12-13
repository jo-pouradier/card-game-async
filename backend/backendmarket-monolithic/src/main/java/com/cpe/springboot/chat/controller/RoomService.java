package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;


    public Iterable<Room> getRooms() {
        return roomRepository.findAll();
    }

    public Room getRoom(int id) {
        Room room = roomRepository.findById(id).orElse(null);
        if (room == null) {
            return null;
        }
        return room;
    }
}
