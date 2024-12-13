package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.Room;
import org.springframework.data.repository.CrudRepository;

public interface RoomRepository extends CrudRepository<Room, Integer> {

}
