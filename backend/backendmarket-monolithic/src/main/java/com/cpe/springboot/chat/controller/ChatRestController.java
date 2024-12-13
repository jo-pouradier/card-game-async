package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.Room;
import com.cpe.springboot.chat.model.RoomDTO;
import com.cpe.springboot.common.tools.DTOMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController("chat")
public class ChatRestController {

    private final RoomService roomService;
    @Autowired
    private DTOMapper dtoMapper;

    @Autowired
    public ChatRestController(RoomService roomService) {
        this.roomService = roomService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/rooms")
    public List<RoomDTO> getRooms() {
        List<RoomDTO> rooms = new ArrayList<>();
        for (Room room : roomService.getRooms()) {
            rooms.add(dtoMapper.fromRoomToRoomDTO(room));
        }
        return rooms;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/room/{id}")
    public RoomDTO getRoom(int id) {
        return dtoMapper.fromRoomToRoomDTO(roomService.getRoom(id));
    }

}
