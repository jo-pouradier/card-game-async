package com.cpe.springboot.asyncProcess;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class BrokerSender {

    private JmsTemplate jmsTemplate;

    private static final String QUEUE_KEY = "text-generation.queue.name";

    private String queue;

    private  Environment environment;

    @Autowired
    public void Sender(JmsTemplate jmsTemplate, Environment environment) {
        this.jmsTemplate = jmsTemplate;
        this.environment = environment;
    }

    @PostConstruct
    public void init() {
        queue = environment.getProperty(QUEUE_KEY);
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public void sendMessage(String msg) {
        // Send a message with a POJO - the template reuse the message converter
        System.out.println("Sending msg to queue: " + msg);
        jmsTemplate.convertAndSend(queue, msg);
    }
}
