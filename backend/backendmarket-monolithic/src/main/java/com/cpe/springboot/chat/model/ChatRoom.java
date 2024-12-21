package com.cpe.springboot.chat.model;

import com.cpe.springboot.user.model.UserModel;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class ChatRoom {
    @Id
    private UUID uuid;

    private String name;

    private boolean isGlobal;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<UserModel> users;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "chatRoom", fetch = FetchType.LAZY)
    private List<ChatMessage> messages;

    private long timestamp;

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public UUID getUuid() {
        return uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ChatMessage> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessage> messages) {
        this.messages = messages;
    }

    public boolean isGlobal() {
        return isGlobal;
    }

    public void setGlobal(boolean global) {
        isGlobal = global;
    }

    public List<UserModel> getUsers() {
        return users;
    }

    public void setUsers(List<UserModel> users) {
        this.users = users;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
