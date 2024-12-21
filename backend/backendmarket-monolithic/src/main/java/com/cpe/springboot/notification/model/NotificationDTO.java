package com.cpe.springboot.notification.model;

import com.cpe.springboot.notification.NotificationSeverity;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Random;

public class NotificationDTO<T extends INotificationMessage> {
    int id = new Random().nextInt() * Integer.MAX_VALUE;
    int userId;
    @JsonProperty("message")
    INotificationMessage message;
    NotificationSeverity severity;
    String sender;
    boolean broadcast = false;

    public NotificationDTO() {
    }

    public NotificationDTO(int userId, T message, NotificationSeverity severity, String sender) {
        this.userId = userId;
        this.message = message;
        this.severity = severity;
        this.sender = sender;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message.getMessage();
    }

    public void setMessage(String message) {
        this.message.createMessage(message);
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public NotificationSeverity getSeverity() {
        return severity;
    }

    public void setSeverity(NotificationSeverity severity) {
        this.severity = severity;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setBroadcast(boolean broadcast) {
        this.broadcast = broadcast;
    }

    @Override
    public String toString() {
        return "NotificationDTO{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", severity='" + severity + '\'' +
                ", sender='" + sender + '\'' +
                '}';
    }
}
