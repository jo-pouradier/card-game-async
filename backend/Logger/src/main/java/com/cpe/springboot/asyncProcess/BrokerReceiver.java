package com.cpe.springboot.asyncProcess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cpe.springboot.model.LoggerModel;
import com.cpe.springboot.services.LoggerService;

import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.MessageListener;

@Component
public class BrokerReceiver implements MessageListener {

    @Autowired
    private LoggerService loggerService;

    @Override
    public void onMessage(Message message) {
        LoggerModel log = null;
        try {
            log = new LoggerModel(message.getJMSTimestamp(), message.getBody(String.class), message.getJMSDestination().toString(), message.getJMSType());
        } catch (JMSException e) {
            throw new RuntimeException(e);
        }
        loggerService.save(log);
    }
}
