package com.cpe.springboot.chat.model.mapping;

import com.cpe.springboot.chat.controller.ChatMessageRepository;
import com.cpe.springboot.chat.model.ChatMessageDTO;
import com.cpe.springboot.chat.model.ChatRoom;
import com.cpe.springboot.chat.model.ChatRoomDTO;
import com.cpe.springboot.chat.model.ChatRoomFullDTO;
import com.cpe.springboot.common.tools.DtoMapper;
import com.cpe.springboot.user.controller.UserRepository;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserMapper;
import org.springframework.stereotype.Component;

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
        rDTO.setGlobal(entity.isGlobal());
        rDTO.setUsers(entity.getUsers().stream().map(userMapper::toDto).map(UserDTO::getId).toList());
        rDTO.setMessages(entity.getMessages().stream().map(chatMessageMapper::toDto).map(ChatMessageDTO::getUuid).toList());
        return rDTO;
    }

    public ChatRoomFullDTO toFullDto(ChatRoom entity) {
        ChatRoomFullDTO rDTO = new ChatRoomFullDTO();
        rDTO.setUuid(entity.getUuid());
        rDTO.setGlobal(entity.isGlobal());
        rDTO.setUsers(entity.getUsers().stream().map(userMapper::toDto).toList());
        rDTO.setMessages(entity.getMessages().stream().map(chatMessageMapper::toDto).toList());
        return rDTO;
    }

    @Override
    public ChatRoom toEntity(ChatRoomDTO dto) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUuid(dto.getUuid());
        chatRoom.setGlobal(dto.isGlobal());
        if (dto.getUsers() != null && !dto.getUsers().contains(-1)) {
            chatRoom.setUsers(dto.getUsers().stream().map(userRepository::findById).map(user -> user.orElseThrow(() -> new IllegalArgumentException("User " + user + " not found"))).toList());
        }
        chatRoom.setMessages(dto.getMessages().stream().map(chatMessageRepository::findById).map(chatMessage -> chatMessage.orElseThrow(() -> new IllegalArgumentException("ChatMessage " + chatMessage + " not found"))).toList());
        return chatRoom;
    }
}
