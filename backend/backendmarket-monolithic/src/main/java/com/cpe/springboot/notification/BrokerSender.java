package com.cpe.springboot.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import com.cpe.springboot.notification.model.NotificationDTO;

@Service
public class BrokerSender {

    private final JmsTemplate jmsTemplate;

    @Value("${nodejs-messaging.queue.name}")
    private String queue;


    @Autowired
    public BrokerSender(JmsTemplate jmsTemplate, Environment environment) {
        this.jmsTemplate = jmsTemplate;
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public void sendNotification(NotificationDTO notificationDTO) {
        System.out.println("Sending a notification to brocker: " + notificationDTO);
        System.out.println("Queue: " + queue);
        jmsTemplate.convertAndSend(queue, notificationDTO);
    }
}
