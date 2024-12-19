package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.ChatMessage;
import com.cpe.springboot.chat.model.ChatMessageDTO;
import com.cpe.springboot.chat.model.ChatRoom;
import com.cpe.springboot.chat.model.mapping.ChatMessageMapper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ChatMessagesService {


    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;
    private final ChatMessageMapper chatMessageMapper;

    public ChatMessagesService(ChatMessageRepository chatMessageRepository, ChatRoomService chatRoomService, ChatMessageMapper chatMessageMapper) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
        this.chatMessageMapper = chatMessageMapper;
    }


    public Iterable<ChatMessage> getChatMessages() {
        return chatMessageRepository.findAll();
    }

    public ChatMessage saveChatMessage(ChatMessage chatMessage) {
        return chatMessageRepository.save(chatMessage);
    }

    public Iterable<ChatMessage> getChatMessagesByRoom(UUID roomUuid) {
        ChatRoom chatRoom = chatRoomService.getRoom(roomUuid);
        return chatMessageRepository.findByRoom(chatRoom);
    }

    public ChatMessage getChatMessage(UUID uuid) {
        return chatMessageRepository.findById(uuid).orElseThrow(
                () -> new IllegalArgumentException("ChatMessage not found with uuid: " + uuid)
        );
    }

    public void handle(ChatMessageDTO chatMessageDTO) {
        ChatMessage chatMessage = chatMessageMapper.toEntity(chatMessageDTO);
        saveChatMessage(chatMessage);
    }
}
