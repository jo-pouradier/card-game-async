package com.cpe.springboot;


import com.cpe.springboot.generation.GenerationType;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GenerationApplication {
    public static GenerationType GENERATION_TYPE;
    public static String QUEUE_NAME;
    @Value("${generation-type-server}")
    private GenerationType generationTypeLocal;

    @Value("${generation-input.queue.name}")
    private String queueName;

    @PostConstruct
    public void init() {
        GENERATION_TYPE = generationTypeLocal;
        QUEUE_NAME = queueName;
    }

    public static void main(String[] args) {
        SpringApplication.run(GenerationApplication.class, args);
        System.out.println(GENERATION_TYPE + " server");
        System.out.println("Queue name: " + QUEUE_NAME);

    }
}