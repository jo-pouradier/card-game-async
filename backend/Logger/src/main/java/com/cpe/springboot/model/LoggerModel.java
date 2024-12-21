package com.cpe.springboot.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class LoggerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;


    private long timestamp;

    @Getter
    @Setter
    @Column(length = 1000)
    private String text;
    private String queue;
    private String type;


    public LoggerModel(long timestamp, String text, String queue, String type) {
        this.timestamp = timestamp;
        this.text = text;
        this.queue = queue;
        this.type = type;
    }

    public LoggerModel() {

    }

    @Override
    public String toString() {
        return "timestamp:" + timestamp + " text:" + text + " queue:" + queue + " type:" + type;
    }

}
