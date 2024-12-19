package com.cpe.springboot.services;

import com.cpe.springboot.model.LoggerModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        loggerRepository.save(log);
    }
}
