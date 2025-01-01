package com.cpe.springboot.asyncProcess;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

import com.cpe.springboot.generation.GenerationDTOAbstact;
import com.cpe.springboot.generation.ImageGenerationDTO;
import com.cpe.springboot.generation.PropertiesGenerationDTO;
import com.cpe.springboot.generation.TextGenerationDTO;
import com.cpe.springboot.services.PropertiesGeneration;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.jms.JMSException;
import jakarta.jms.TextMessage;

// TODO use strategy pattern to avoid switch case
@Service
public class BrokerReceiver {

    private static final Logger log = LoggerFactory.getLogger(BrokerReceiver.class);
    private BrokerSender sender;
    @Value("${generation-input.queue.name}")
    private String queueName;
    ObjectMapper objectMapper;
    private int fakeDelay = 1000;

    @Autowired
    public void Receiver(BrokerSender sender, ObjectMapper objectMapper) {
        this.sender = sender;
        this.objectMapper = objectMapper;
    }

    @JmsListener(destination = "${generation-input.queue.name}", containerFactory = "queueConnectionFactory")
    public void receiveMessage(TextMessage message) {
            try {
                String clazz = message.getJMSType(); // this is basicalyy header 'type'
                GenerationDTOAbstact object = (GenerationDTOAbstact) objectMapper.readValue(message.getText(), Class.forName(clazz));

                switch (object.getGenerationType()) {
                    case IMAGE -> receiveImage((ImageGenerationDTO) object);
                    case TEXT -> receiveDescription((TextGenerationDTO) object);
                    case PROPERTY -> receiveProperties((PropertiesGenerationDTO) object);
                }
            } catch (JMSException|ClassNotFoundException|JsonProcessingException e) {
                // throw new RuntimeException(e);
                log.error("Error while receiving message", e);
            }
    }

    public void receiveImage(ImageGenerationDTO message) {
        System.out.println("[" + queueName + "] RECEIVED ImageGenerationDTO=[" + message + "]");
        message.setImgUrl(
                "https://media.istockphoto.com/id/1440592316/vector/king-of-diamonds-playing-card-classic-design.jpg?s=612x612&w=0&k=20&c=oDqEFXm84DSEYkL4BhgxdY5yfLw51o4zkL52YovqZrY=");
        try {
            Thread.sleep(fakeDelay);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        sender.sendMessage(message);
    }

    public void receiveDescription(TextGenerationDTO message) {
        System.out.println("[" + queueName + "] RECEIVED TextGenerationDTO=[" + message + "]");
        message.setText("This is a super description");
        try {
            Thread.sleep(fakeDelay);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        sender.sendMessage(message);
    }

    public void receiveProperties(PropertiesGenerationDTO message) {
        System.out.println("[" + queueName + "] RECEIVED PropertiesGenerationDTO=[" + message + "]");
        Map<String, Float> properties = PropertiesGeneration.getProperties(message.getImgUrl());
        System.out.println("Properties: " + properties);
        message.setEnergy(properties.get("ENERGY"));
        message.setHp(properties.get("HP"));
        message.setAttack(properties.get("ATTACK"));
        message.setDefence(properties.get("DEFENSE"));
        sender.sendMessage(message);
    }

}
