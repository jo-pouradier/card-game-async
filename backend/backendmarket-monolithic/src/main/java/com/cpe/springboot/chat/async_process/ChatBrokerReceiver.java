package com.cpe.springboot.chat.async_process;

import com.cpe.springboot.chat.controller.ChatMessagesService;
import com.cpe.springboot.chat.controller.ChatRoomService;
import com.cpe.springboot.chat.model.ChatBrokerHandler;
import com.cpe.springboot.chat.model.ChatBrokerReceivable;
import com.cpe.springboot.chat.model.ChatMessageDTO;
import com.cpe.springboot.chat.model.ChatRoomDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.jms.JMSException;
import jakarta.jms.TextMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class ChatBrokerReceiver implements ChatBrokerHandler {
    private final Logger logger = Logger.getLogger(ChatBrokerReceiver.class.getName());
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private ChatMessagesService chatMessagesService;
    @Autowired
    ObjectMapper objectMapper;

    @JmsListener(destination = "${chat.queue.name}", containerFactory = "queueConnectionFactory")
    public void receiveMessage(TextMessage message) {
        logger.info("Received message: " + message);
        try {
            Class<ChatBrokerReceivable> clazz = classMapper(message.getJMSType());
            ChatBrokerReceivable chatMessage = objectMapper.readValue(message.getText(), clazz);
            chatMessage.handle(this);
        } catch (JMSException | JsonProcessingException | ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public void handle(ChatRoomDTO chatRoomDTO) {
        chatRoomService.handle(chatRoomDTO);
    }

    public void handle(ChatMessageDTO chatMessageDTO) {
        chatMessagesService.handle(chatMessageDTO);
    }

    private Class<ChatBrokerReceivable> classMapper(String className) throws ClassNotFoundException {
        return (Class<ChatBrokerReceivable>) Class.forName("com.cpe.springboot.chat.model." + className);
    }
}
