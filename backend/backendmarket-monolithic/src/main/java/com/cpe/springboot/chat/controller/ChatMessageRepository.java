package com.cpe.springboot.chat.controller;

import com.cpe.springboot.chat.model.ChatMessage;
import org.springframework.data.repository.CrudRepository;

public interface ChatMessageRepository extends CrudRepository<ChatMessage, Integer> {

}
