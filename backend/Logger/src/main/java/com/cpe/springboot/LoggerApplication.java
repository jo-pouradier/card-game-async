package com.cpe.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

@SpringBootApplication
@EnableJms
public class LoggerApplication {
    public static void main(String[] args) {
        SpringApplication.run(LoggerApplication.class, args);
    }
}