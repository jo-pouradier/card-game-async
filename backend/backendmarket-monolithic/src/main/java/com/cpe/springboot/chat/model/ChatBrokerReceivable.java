package com.cpe.springboot.chat.model;

public interface ChatBrokerReceivable {

    void handle(ChatBrokerHandler handler);
}
