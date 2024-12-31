package com.cpe.springboot.asyncProcess;

import java.util.Map;

import org.apache.activemq.command.ActiveMQBytesMessage;
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
import com.fasterxml.jackson.databind.exc.MismatchedInputException;

import jakarta.jms.JMSException;
import jakarta.jms.Message;
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
    public void receiveMessage(Message message) {
        // public void receiveMessage(TextMessage textMessage) {
        String text;
        log.debug("Received message of type {}: {}", message.getClass(), message);
        try {
            // get text from Message
            if (message instanceof TextMessage textMessage) {
                text = textMessage.getText();
                log.debug("Message parsed to TextMessage: {}", textMessage);
            } else if (message instanceof ActiveMQBytesMessage bytesMessage) {
                byte[] bytes = new byte[(int) bytesMessage.getBodyLength()];
                bytesMessage.readBytes(bytes, (int) bytesMessage.getBodyLength());
                // create TextMessage with new data
                text = new String(bytes);
                log.debug("Message parsed to BytesMessage: {}", bytesMessage);
            } else {
                log.error("Message type not supported: {}", message.getClass());
                return;
            }

            // parse text to object
            try {
                String clazz = message.getJMSType(); // this is basicalyy header 'type'
                log.debug("Received message of type {}", clazz);
                GenerationDTOAbstact object = null;
                try {
                    object = (GenerationDTOAbstact) objectMapper.readValue(text,
                            Class.forName(clazz));
                } catch (ClassNotFoundException | MismatchedInputException e) {
                    // throw new RuntimeException(e);
                    log.error("Error while receiving message, type not found. {}\n{}\n",
                            "message type: " + message.getJMSType(),
                            "message : " + message);
                    return;
                }
                switch (object.getGenerationType()) {
                    case IMAGE:
                        receiveImage((ImageGenerationDTO) object);
                        break;
                    case TEXT:
                        receiveDescription((TextGenerationDTO) object);
                        break;
                    case PROPERTY:
                        receiveProperties((PropertiesGenerationDTO) object);
                        break;
                }
            } catch (JMSException | JsonProcessingException e) {
                // throw new RuntimeException(e);
                log.error("Error while receiving message", e);
            }
        } catch (Exception e) {
            log.error("Error while receiving message {}; {}", message, e);
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
