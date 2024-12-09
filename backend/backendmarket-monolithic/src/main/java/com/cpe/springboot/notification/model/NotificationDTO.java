package com.cpe.springboot.notification.model;

public class NotificationDTO {
    int id;
    String message;
    String severity;
    String sender;

    public NotificationDTO() {}

    public NotificationDTO(int id, String message, String severity, String sender) {
        this.id = id;
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
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
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
