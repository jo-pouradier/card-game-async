package com.cpe.springboot.chat.model;

import com.cpe.springboot.user.model.UserModel;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Room {
    @Id
    private int id;

    private String name;

    private boolean isGlobal;


    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "id")
    private List<UserModel> users;

    @OneToMany(cascade = CascadeType.ALL,
            mappedBy = "room")
    private List<ChatMessage> messages;

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
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
}
