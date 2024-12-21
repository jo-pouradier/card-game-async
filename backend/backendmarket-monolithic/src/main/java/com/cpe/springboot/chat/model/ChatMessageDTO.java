package com.cpe.springboot.chat.model;

import java.util.UUID;

public class ChatMessageDTO implements ChatBrokerReceivable {

    private UUID uuid;

    private String content;

    private int userId;

    private Long timestamp;

    private UUID roomUuid;

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public UUID getRoomUuid() {
        return this.roomUuid;
    }

    public void setRoomUuid(UUID roomUuid) {
        this.roomUuid = roomUuid;
    }

    public void handle(ChatBrokerHandler handler) {
        handler.handle(this);
    }
}
