package com.cpe.springboot.chat.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ChatRoomDTO implements ChatBrokerReceivable {
    private UUID uuid;

    private String name;

    private boolean isGlobal;

    private List<Integer> users = new ArrayList<>();

    private List<UUID> messages = new ArrayList<>();

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

    public List<UUID> getMessages() {
        return messages;
    }

    public void setMessages(List<UUID> messages) {
        this.messages = messages;
    }

    public boolean isGlobal() {
        return isGlobal;
    }

    public void setGlobal(boolean global) {
        isGlobal = global;
    }

    public List<Integer> getUsers() {
        return users;
    }

    public void setUsers(List<Integer> users) {
        this.users = users;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public void handle(ChatBrokerHandler handler) {
        handler.handle(this);
    }
}
