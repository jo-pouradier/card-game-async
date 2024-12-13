package com.cpe.springboot.card_generator.acync_process;

import com.cpe.springboot.card_generator.controller.CardGeneratorModel;
import com.cpe.springboot.generation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class CardGeneratorBrokerSender {

    private final Logger logger = Logger.getLogger(CardGeneratorBrokerSender.class.getName());

    private final JmsTemplate jmsTemplate;

    @Value("${generation-input.queue.name}")
    private String queueName;


    public CardGeneratorBrokerSender(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
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
