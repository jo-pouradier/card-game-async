package com.cpe.springboot.utils;

import org.springframework.jms.support.converter.MessageConversionException;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.Session;
import jakarta.jms.TextMessage;

/**
 * Used to convert JMS messages from/to JSON. Registered in Spring-JMS automatically via auto configuration
 */
@Component
public class JsonMessageConverter implements MessageConverter {
    private final ObjectMapper mapper;

    public JsonMessageConverter(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    /**
     * Converts message to JSON. Used mostly by {@link org.springframework.jms.core.JmsTemplate}
     */
    @Override
    public Message toMessage(Object object, Session session) throws JMSException, MessageConversionException {
        String json;

        try {
            json = mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new MessageConversionException("Message cannot be parsed: ", e);
        }

        TextMessage message = session.createTextMessage();
        message.setText(json);

        return message;
    }

    /**
     * Extracts JSON payload for further processing by JacksonMapper.
     */
    @Override
    public Object fromMessage(Message message) throws JMSException, MessageConversionException {
        return ((TextMessage) message).getText();
    }

}
