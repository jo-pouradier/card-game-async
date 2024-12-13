package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatMessagesService {
    @Autowired
    private ChatMessageRepository chatMessageRepository;


    public Iterable<ChatMessage> getChatMessages() {
        return chatMessageRepository.findAll();
    }

    public ChatMessage getChatMessage(int id) {
        ChatMessage chatMessage = chatMessageRepository.findById(id).orElse(null);
        if (chatMessage == null) {
            return null;
        }
        return chatMessage;
    }
}
