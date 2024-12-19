package com.cpe.springboot.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class LoggerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private long timestamp;
    private String log;
    private String queue;

    public LoggerModel(long timestamp,String log,String queue) {
        this.timestamp = timestamp;
        this.log = log;
        this.queue = queue;
    }

    public LoggerModel() {

    }
}
