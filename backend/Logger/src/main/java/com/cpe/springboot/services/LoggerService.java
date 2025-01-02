package com.cpe.springboot.services;

import org.springframework.stereotype.Service;

import com.cpe.springboot.model.LoggerModel;

@Service
public class LoggerService {
    private final LoggerRepository loggerRepository;
    public LoggerService(LoggerRepository loggerRepository) {

        this.loggerRepository = loggerRepository;
    }

    public void save(LoggerModel log) {
        if (log.getText().length() > 1000) {
            log.setText(log.getText().substring(0, 1000));
        }
        System.out.println(log);
        loggerRepository.save(log);
    }
}
