package com.cpe.springboot.chat.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ChatRoomDTO implements ChatBrokerReceivable {
    private UUID uuid;

    private boolean isGlobal;

    private List<Integer> users = new ArrayList<>();

    private List<UUID> messages = new ArrayList<>();

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public UUID getUuid() {
        return uuid;
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

    public void handle(ChatBrokerHandler handler) {
        handler.handle(this);
    }
}
