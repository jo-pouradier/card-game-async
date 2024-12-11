package com.cpe.springboot.card_generator.acync_process;

import com.cpe.springboot.card_generator.controller.CardGeneratorModel;
import com.cpe.springboot.generation.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class CardGeneratorBrokerSender {

    private final Logger logger = Logger.getLogger(CardGeneratorBrokerSender.class.getName());

    @Autowired
    JmsTemplate jmsTemplate;

    @Value("${generation-input.queue.name}")
    private String queueName;

    private ObjectMapper objectMapper;

    public CardGeneratorBrokerSender() {
        this.objectMapper = new ObjectMapper();
    }

    public void sendGenerationDTO(GenerationDTOAbstact generationDTO, GenerationType generationType) {
        logger.info(queueName.replace("{GENERATION_TYPE}", generationType.name()));
        jmsTemplate.convertAndSend(queueName.replace("{GENERATION_TYPE}", generationType.name()), generationDTO,
                message -> {
                    message.setStringProperty("ObjectType", generationDTO.getClass().getCanonicalName());
                    return message;
                }
        );
    }

    public void sendImageGeneration(CardGeneratorModel cardGenerator) {
        sendGenerationDTO(new ImageGenerationDTO(cardGenerator.getId(), cardGenerator.getImagePrompt()), GenerationType.IMAGE);
    }

    public void sendDescriptionGeneration(CardGeneratorModel cardGenerator) {
        sendGenerationDTO(new TextGenerationDTO(cardGenerator.getId(), cardGenerator.getDescriptionPrompt()), GenerationType.TEXT);
    }

    public void sendPropertiesGeneration(CardGeneratorModel cardGenerator) {
        sendGenerationDTO(new PropertiesGenerationDTO(cardGenerator.getId(), cardGenerator.getImgUrl()), GenerationType.PROPERTY);
    }
}
