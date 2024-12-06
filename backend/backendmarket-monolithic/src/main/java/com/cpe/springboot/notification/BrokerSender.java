package com.cpe.springboot.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.cpe.springboot.notification.model.NotificationDTO;

import jakarta.annotation.PostConstruct;

@Service
public class BrokerSender {

    private JmsTemplate jmsTemplate;

    private static final String QUEUE_KEY = "spring.notification.queue.name";

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

    public void sendNotification(NotificationDTO notificationDTO) {
        System.out.println("Sending a notification to brocker id: " + notificationDTO.getId());
        jmsTemplate.convertAndSend(queue, notificationDTO);
    }
}
