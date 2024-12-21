package com.cpe.springboot.chat.model;

import org.springframework.stereotype.Service;

@Service
public interface ChatBrokerHandler {

    void handle(ChatRoomDTO chatRoomDTO);

    void handle(ChatMessageDTO chatMessageDTO);
}
