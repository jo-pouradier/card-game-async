package com.cpe.springboot.asyncProcess;

import com.cpe.springboot.model.LoggerModel;
import com.cpe.springboot.services.LoggerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.MessageListener;
import jakarta.jms.TextMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Map;

@Component
public class BrokerReceiver implements MessageListener {

    @Autowired
    private LoggerService loggerService;

    @Override
    public void onMessage(Message message) {
        System.out.println("Received message: " + message);
        LoggerModel log = null;
        try {
            log = new LoggerModel(message.getJMSTimestamp(), message.getJMSDestination().toString(), message.toString());
        } catch (JMSException e) {
            throw new RuntimeException(e);
        }
        loggerService.save(log);
    }
}
