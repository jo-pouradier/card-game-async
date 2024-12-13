package com.cpe.springboot.notification.model;

public interface INotificationMessage {
    String getMessage();

    INotificationMessage createMessage(String message);
}
