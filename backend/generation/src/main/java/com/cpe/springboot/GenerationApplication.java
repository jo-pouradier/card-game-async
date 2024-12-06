package com.cpe.springboot;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GenerationApplication {
    public static void main(String[] args) {
        SpringApplication.run(GenerationApplication.class, args);
	}
}