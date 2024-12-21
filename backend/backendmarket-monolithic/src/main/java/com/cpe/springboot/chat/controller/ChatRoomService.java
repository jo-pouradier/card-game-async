package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.ChatRoom;
import com.cpe.springboot.chat.model.ChatRoomDTO;
import com.cpe.springboot.chat.model.IdTimestampKey;
import com.cpe.springboot.chat.model.mapping.ChatRoomMapper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMapper chatRoomMapper;

    public ChatRoomService(ChatRoomRepository chatRoomRepository, ChatRoomMapper chatRoomMapper) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatRoomMapper = chatRoomMapper;
    }

    public Iterable<ChatRoom> getRooms() {
        return chatRoomRepository.findAll();
    }

    public ChatRoom getRoom(UUID id) {
        return chatRoomRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Room " + id + " not found"));
    }

    public ChatRoom createRoom(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    public void handle(ChatRoomDTO chatRoomDTO) {
        try {
            getRoom(chatRoomDTO.getUuid());
        } catch (IllegalArgumentException e) {
            createRoom(chatRoomMapper.toEntity(chatRoomDTO));
        }
    }
}
