package com.cpe.springboot.notification;

import com.cpe.springboot.notification.model.NotificationDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Value("${nodejs-messaging.queue.name}")
    private String notificationQueue;
    private final JmsTemplate jmsTemplate;

    public NotificationService(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }


    public void sendNotification(NotificationDTO<?> notificationDTO) {
        System.out.println("Sending a notification to brocker: " + notificationDTO);
        System.out.println("Queue: " + notificationQueue);
        jmsTemplate.convertAndSend(notificationQueue, notificationDTO);
    }
}
