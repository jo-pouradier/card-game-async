package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.ChatMessage;
import com.cpe.springboot.chat.model.ChatRoom;
import com.cpe.springboot.chat.model.IdTimestampKey;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ChatMessageRepository extends CrudRepository<ChatMessage, UUID> {

    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatRoom = ?1")
    Iterable<ChatMessage> findByRoom(ChatRoom chatRoom);
}
