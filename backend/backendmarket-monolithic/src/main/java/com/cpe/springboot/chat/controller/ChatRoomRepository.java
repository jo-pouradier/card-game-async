package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.ChatRoom;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface ChatRoomRepository extends CrudRepository<ChatRoom, UUID> {

    List<ChatRoom> getChatRoomsByUuid(UUID uuid);
}
