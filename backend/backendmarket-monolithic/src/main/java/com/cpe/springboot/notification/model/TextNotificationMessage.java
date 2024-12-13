package com.cpe.springboot.notification.model;

public class TextNotificationMessage implements INotificationMessage {
    private String message;

    public TextNotificationMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return "";
    }

    @Override
    public INotificationMessage createMessage(String message) {
        return new TextNotificationMessage(message);
    }
}
