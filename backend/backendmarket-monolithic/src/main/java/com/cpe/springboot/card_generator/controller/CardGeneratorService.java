package com.cpe.springboot.card_generator.controller;

import com.cpe.springboot.card.controller.CardModelService;
import com.cpe.springboot.card.controller.CardReferenceService;
import com.cpe.springboot.card.model.CardDTO;
import com.cpe.springboot.card.model.CardReference;
import com.cpe.springboot.card_generator.acync_process.CardGeneratorBrokerSender;
import com.cpe.springboot.card_generator.model.CardGeneratorModel;
import com.cpe.springboot.generation.ImageGenerationDTO;
import com.cpe.springboot.generation.PropertiesGenerationDTO;
import com.cpe.springboot.generation.TextGenerationDTO;
import com.cpe.springboot.notification.NotificationSeverity;
import com.cpe.springboot.notification.NotificationService;
import com.cpe.springboot.notification.model.CardGenerationNotificationMessage;
import com.cpe.springboot.notification.model.NotificationDTO;
import com.cpe.springboot.user.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class CardGeneratorService {
    private final Logger logger = Logger.getLogger(CardGeneratorService.class.getName());
    private final CardModelService cardModelService;
    private final CardReferenceService cardReferenceService;
    private final CardGeneratorRepository cardGeneratorRepository;
    private final CardGeneratorBrokerSender cardGeneratorBrokerSender;
    private final NotificationService notificationService;

    public CardGeneratorService(CardModelService cardModelService, CardReferenceService cardReferenceService, CardGeneratorRepository cardGeneratorRepository, CardGeneratorBrokerSender cardGeneratorBrokerSender, NotificationService notificationService) {
        this.cardModelService = cardModelService;
        this.cardReferenceService = cardReferenceService;
        this.cardGeneratorRepository = cardGeneratorRepository;
        this.cardGeneratorBrokerSender = cardGeneratorBrokerSender;
        this.notificationService = notificationService;
    }

    private CardGeneratorModel saveCardGenerator(CardGeneratorModel cardGenerator) {
        return cardGeneratorRepository.save(cardGenerator);
    }

    public CardGeneratorModel generateCard(String descriptionPrompt, String imagePrompt, UserModel user) {
        CardReference currentCardRef = cardReferenceService.getRandCardRef();

        CardGeneratorModel cardGenerator = new CardGeneratorModel(currentCardRef);
        cardGenerator.setDescriptionPrompt(descriptionPrompt);
        cardGenerator.setImagePrompt(imagePrompt);
        cardGenerator.setUser(user);
        cardGenerator = saveCardGenerator(cardGenerator);
        logger.info("Card generated with id: " + cardGenerator.getId());
        cardGeneratorBrokerSender.sendImageGeneration(cardGenerator);
        cardGeneratorBrokerSender.sendDescriptionGeneration(cardGenerator);
        return cardGenerator;
    }

    public CardGeneratorModel getCardById(int id) {
        return cardGeneratorRepository.findById(id).orElse(null);
    }

    public CardGeneratorModel updateCard(CardGeneratorModel cardGenerator) {
        if (cardGenerator.isDescriptionGenerated() && cardGenerator.isImageGenerated()) {
            if (!cardGenerator.isPropertiesGenerated()) {
                generateProperties(cardGenerator);
            }
        }
        return saveCardGenerator(cardGenerator);
    }

    private void deleteCardGenerator(CardGeneratorModel cardGenerator) {
        cardGeneratorRepository.delete(cardGenerator);
    }

    private void generateProperties(CardGeneratorModel cardGenerator) {
        logger.info("Generating properties for card with id: " + cardGenerator.getId());
        cardGeneratorBrokerSender.sendPropertiesGeneration(cardGenerator);
    }

    public void receiveImageGenerationOutput(ImageGenerationDTO imageGenerationDTO) {
        CardGeneratorModel cardGenerator = getCardById(imageGenerationDTO.getCardId());
        if (cardGenerator == null) {
            throw new IllegalArgumentException("Card not found");
        }
        cardGenerator.setImgUrl(imageGenerationDTO.getImgUrl());
        cardGenerator.setSmallImgUrl(imageGenerationDTO.getImgUrl());
        cardGenerator.setImageGenerated(true);
        updateCard(cardGenerator);
    }

    public void receiveDescriptionGenerationOutput(TextGenerationDTO descriptionGenerationDTO) {
        CardGeneratorModel cardGenerator = getCardById(descriptionGenerationDTO.getCardId());
        if (cardGenerator == null) {
            throw new IllegalArgumentException("Card not found");
        }
        cardGenerator.setDescription(descriptionGenerationDTO.getText());
        cardGenerator.setDescriptionGenerated(true);
        updateCard(cardGenerator);
    }

    public void receivePropertiesGenerationOutput(PropertiesGenerationDTO propertiesGenerationDTO) {
        CardGeneratorModel cardGenerator = getCardById(propertiesGenerationDTO.getCardId());
        if (cardGenerator == null) {
            logger.severe("Card not found");
            return;
        }
        cardGenerator.setEnergy(propertiesGenerationDTO.getEnergy());
        cardGenerator.setHp(propertiesGenerationDTO.getHp());
        cardGenerator.setAttack(propertiesGenerationDTO.getAttack());
        cardGenerator.setDefence(propertiesGenerationDTO.getDefense());
        deleteCardGenerator(cardGenerator);
        CardDTO card = cardModelService.addCard(cardGenerator.toCardModel());
        NotificationDTO<CardGenerationNotificationMessage> notificationDTO
                = new NotificationDTO<>(card.getUserId(), new CardGenerationNotificationMessage(card.getId()), NotificationSeverity.INFO, "card-generator");
        notificationService.sendNotification(notificationDTO);
    }

}
