package com.cpe.springboot.chat.model;

import com.cpe.springboot.user.model.UserModel;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.util.UUID;

@Entity
public class ChatMessage {
    @Id
    private UUID uuid;

    private String content;

    @ManyToOne
    private UserModel user;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChatRoom chatRoom;

    private long timestamp;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public Long getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public ChatRoom getRoom() {
        return chatRoom;
    }

    public void setRoom(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
    }
}
