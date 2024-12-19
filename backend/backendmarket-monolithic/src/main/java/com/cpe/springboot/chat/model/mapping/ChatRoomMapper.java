package com.cpe.springboot.chat.model.mapping;

import com.cpe.springboot.chat.controller.ChatMessageRepository;
import com.cpe.springboot.chat.model.*;
import com.cpe.springboot.common.tools.DtoMapper;
import com.cpe.springboot.user.controller.UserRepository;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChatRoomMapper implements DtoMapper<ChatRoom, ChatRoomDTO> {

    private final ChatMessageMapper chatMessageMapper;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;

    public ChatRoomMapper(ChatMessageMapper chatMessageMapper, UserMapper userMapper, UserRepository userRepository, ChatMessageRepository chatMessageRepository) {
        this.chatMessageMapper = chatMessageMapper;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    @Override
    public ChatRoomDTO toDto(ChatRoom entity) {
        ChatRoomDTO rDTO = new ChatRoomDTO();
        rDTO.setUuid(entity.getUuid());
        rDTO.setTimestamp(entity.getTimestamp());
        rDTO.setName(entity.getName());
        rDTO.setGlobal(entity.isGlobal());
        rDTO.setUsers(entity.getUsers().stream().map(userMapper::toDto).map(UserDTO::getId).toList());
        rDTO.setMessages(entity.getMessages().stream().map(chatMessageMapper::toDto).map(ChatMessageDTO::getUuid).toList());
        return rDTO;
    }

    public ChatRoomFullDTO toFullDto(ChatRoom entity) {
        ChatRoomFullDTO rDTO = new ChatRoomFullDTO();
        rDTO.setUuid(entity.getUuid());
        rDTO.setTimestamp(entity.getTimestamp());
        rDTO.setName(entity.getName());
        rDTO.setGlobal(entity.isGlobal());
        rDTO.setUsers(entity.getUsers().stream().map(userMapper::toDto).toList());
        rDTO.setMessages(entity.getMessages().stream().map(chatMessageMapper::toDto).toList());
        return rDTO;
    }

    @Override
    public ChatRoom toEntity(ChatRoomDTO dto) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUuid(dto.getUuid());
        chatRoom.setTimestamp(dto.getTimestamp());
        chatRoom.setName(dto.getName());
        chatRoom.setGlobal(dto.isGlobal());
        chatRoom.setUsers(dto.getUsers().stream().map(userRepository::findById).map(user -> user.orElseThrow(() -> new IllegalArgumentException("User " + user + " not found"))).toList());
        chatRoom.setMessages(dto.getMessages().stream().map(chatMessageRepository::findById).map(chatMessage -> chatMessage.orElseThrow(() -> new IllegalArgumentException("ChatMessage " + chatMessage + " not found"))).toList());
        return chatRoom;
    }
}
