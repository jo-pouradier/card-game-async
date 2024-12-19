package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.ChatRoom;
import com.cpe.springboot.chat.model.IdTimestampKey;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ChatRoomRepository extends CrudRepository<ChatRoom, UUID> {

}
