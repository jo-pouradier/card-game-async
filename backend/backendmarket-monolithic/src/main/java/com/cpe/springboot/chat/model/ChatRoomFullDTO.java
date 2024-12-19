package com.cpe.springboot.chat.model;

import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;

import java.util.List;
import java.util.UUID;

public class ChatRoomFullDTO {
    private UUID uuid;

    private String name;

    private boolean isGlobal;

    private List<UserDTO> users;

    private List<ChatMessageDTO> messages;

    private long timestamp;

    public UUID getUuid() {
        return this.uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ChatMessageDTO> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessageDTO> messages) {
        this.messages = messages;
    }

    public boolean isGlobal() {
        return isGlobal;
    }

    public void setGlobal(boolean global) {
        isGlobal = global;
    }

    public List<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UserDTO> users) {
        this.users = users;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
