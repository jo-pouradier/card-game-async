package com.cpe.springboot.chat.model.mapping;

import com.cpe.springboot.chat.controller.ChatMessageRepository;
import com.cpe.springboot.chat.controller.ChatRoomRepository;
import com.cpe.springboot.chat.model.ChatMessage;
import com.cpe.springboot.chat.model.ChatMessageDTO;
import com.cpe.springboot.common.tools.DtoMapper;
import com.cpe.springboot.user.controller.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class ChatMessageMapper implements DtoMapper<ChatMessage, ChatMessageDTO> {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public ChatMessageMapper(ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ChatMessageDTO toDto(ChatMessage entity) {
        ChatMessageDTO cDTO = new ChatMessageDTO();
        cDTO.setUuid(entity.getUuid());
        cDTO.setContent(entity.getContent());
        cDTO.setTimestamp(entity.getTimestamp());
        cDTO.setUserId(entity.getUser().getId());
        cDTO.setRoomUuid(entity.getRoom().getUuid());
        return cDTO;
    }

    @Override
    public ChatMessage toEntity(ChatMessageDTO dto) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setUuid(dto.getUuid());
        chatMessage.setContent(dto.getContent());
        chatMessage.setTimestamp(dto.getTimestamp());
        chatMessage.setUser(
                userRepository.findById(dto.getUserId())
                        .orElseThrow(() -> new IllegalArgumentException("User " + dto.getUserId() + " not found")));
        chatMessage.setRoom(
                chatRoomRepository.findById(dto.getRoomUuid())
                        .orElseThrow(() -> new IllegalArgumentException("Room " + dto.getRoomUuid() + " not found")));
        return chatMessage;
    }
}
