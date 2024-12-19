package com.cpe.springboot.chat.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class IdTimestampKey {
    @Column(nullable = false)
    private int id;
    @Column(nullable = false)
    private long timestamp;

    public IdTimestampKey() {
    }

    public IdTimestampKey(int id, long timestamp) {
        this.id = id;
        this.timestamp = timestamp;
    }

    public int getId() {
        return id;
    }

    public void setId(int roomId) {
        this.id = roomId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof IdTimestampKey)) {
            return false;
        }
        IdTimestampKey key = (IdTimestampKey) obj;
        return key.id == id && key.timestamp == timestamp;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, timestamp);
    }
}
