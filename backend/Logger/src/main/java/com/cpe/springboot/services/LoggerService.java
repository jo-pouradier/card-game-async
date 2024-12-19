package com.cpe.springboot.services;

import com.cpe.springboot.model.LoggerModel;
import org.springframework.stereotype.Service;

@Service
public class LoggerService {
    public void save(LoggerModel log) {
        System.out.println("Save log: " + log);
    }
}
