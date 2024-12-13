package com.cpe.springboot.card_generator.acync_process;

import com.cpe.springboot.card_generator.controller.CardGeneratorService;
import com.cpe.springboot.generation.GenerationDTOAbstact;
import com.cpe.springboot.generation.ImageGenerationDTO;
import com.cpe.springboot.generation.PropertiesGenerationDTO;
import com.cpe.springboot.generation.TextGenerationDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.jms.JMSException;
import jakarta.jms.TextMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

// TODO use strategy pattern to avoid switch case
@Component
public class CardGeneratorBrokerReceiver {
    private final Logger logger = Logger.getLogger(CardGeneratorBrokerReceiver.class.getName());
    @Autowired
    CardGeneratorService cardGeneratorService;
    @Autowired
    ObjectMapper objectMapper;

    @JmsListener(destination = "${generation-output.queue.name}", containerFactory = "queueConnectionFactory")
    public void receiveMessage(TextMessage message) {
        try {
            String clazz = message.getStringProperty("ObjectType");
            GenerationDTOAbstact object = (GenerationDTOAbstact) objectMapper.readValue(message.getText(), Class.forName(clazz));
            switch (object.getGenerationType()) {
                case IMAGE:
                    receiveImageGenerationOutput((ImageGenerationDTO) object);
                    break;
                case TEXT:
                    receiveDescriptionGenerationOutput((TextGenerationDTO) object);
                    break;
                case PROPERTY:
                    receivePropertiesGenerationOutput((PropertiesGenerationDTO) object);
                    break;
            }
        } catch (JMSException | ClassNotFoundException | JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void receiveImageGenerationOutput(ImageGenerationDTO imageGenerationDTO) {
        logger.info("Received imageGenerationDTO=[" + imageGenerationDTO + "] cardId:" + imageGenerationDTO.getCardId());
        cardGeneratorService.receiveImageGenerationOutput(imageGenerationDTO);
    }

    public void receiveDescriptionGenerationOutput(TextGenerationDTO textGenerationDTO) {
        logger.info("Received textGenerationDTO=[" + textGenerationDTO + "] cardId:" + textGenerationDTO.getCardId());
        cardGeneratorService.receiveDescriptionGenerationOutput(textGenerationDTO);
    }

    public void receivePropertiesGenerationOutput(PropertiesGenerationDTO propertiesGenerationDTO) {
        logger.info("Received propertiesGenerationDTO=[" + propertiesGenerationDTO + "] cardId:" + propertiesGenerationDTO.getCardId());
        cardGeneratorService.receivePropertiesGenerationOutput(propertiesGenerationDTO);
    }


}
