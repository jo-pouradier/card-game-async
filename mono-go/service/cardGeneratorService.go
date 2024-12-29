package service

import (
	"encoding/json"
	"errors"
	"log"

	"github.com/go-stomp/stomp/v3"
	"github.com/jo-pouradier/card-game-async/mono-go/broker"
	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/repository"
)

type CardGeneratorService struct {
	cardmodelervice             *CardService
	cardRepository              *repository.CardRepository
	cardGeneratorBrokerSender   *broker.SenderBroker
	cardGeneratorBrokerReceiver *broker.ReceiverBroker
	notificationService         broker.NotificationService
}

func NewCardGeneratorService(
	cardmodelervice *CardService,
	cardRepository *repository.CardRepository,
	cardGeneratorBrokerSender *broker.SenderBroker,
	cardGeneratorBrokerReceiver *broker.ReceiverBroker,
	notificationService broker.NotificationService,
) *CardGeneratorService {
	cardGeneratorService := &CardGeneratorService{
		cardmodelervice:             cardmodelervice,
		cardRepository:              cardRepository,
		cardGeneratorBrokerSender:   cardGeneratorBrokerSender,
		cardGeneratorBrokerReceiver: cardGeneratorBrokerReceiver,
		notificationService:         notificationService,
	}
	cardGeneratorService.cardGeneratorBrokerReceiver.Callback = cardGeneratorService.handleMessage
	return cardGeneratorService
}

func (s *CardGeneratorService) saveCardGenerator(cardGenerator *model.CardGenerator) (*model.CardGenerator, error) {
	return s.cardRepository.SaveGenerator(cardGenerator)
}

func (s *CardGeneratorService) GenerateCard(descriptionPrompt, imagePrompt string, user *model.User) (*model.CardGenerator, error) {
	currentCardRef, err := s.cardRepository.CreateEmptyCard()
	if err != nil {
		return nil, err
	}

	cardGenerator := &model.CardGenerator{
		DescriptionPrompt: descriptionPrompt,
		ImagePrompt:       imagePrompt,
		User:              user,
		UserID:            user.ID,
		ID:                currentCardRef,
	}

	cardGenerator, err = s.saveCardGenerator(cardGenerator)
	if err != nil {
		return nil, err
	}

	log.Printf("Card generated with ID: %d\n", cardGenerator.ID)

	s.SendImageGeneration(cardGenerator)
	s.SendDescriptionGeneration(cardGenerator)

	return cardGenerator, nil
}

func (s *CardGeneratorService) SendImageGeneration(cardGenerator *model.CardGenerator) {
	s.cardGeneratorBrokerSender.Send(model.ImageGenerationDTO{CardID: cardGenerator.ID, ImagePrompt: cardGenerator.ImagePrompt})
}

func (s *CardGeneratorService) SendDescriptionGeneration(cardGenerator *model.CardGenerator) {
	s.cardGeneratorBrokerSender.Send(model.TextGenerationDTO{CardID: cardGenerator.ID, TextPrompt: cardGenerator.DescriptionPrompt})
}

func (s *CardGeneratorService) SendPropertiesGeneration(cardGenerator *model.CardGenerator) {
	s.cardGeneratorBrokerSender.Send(model.PropertiesGenerationDTO{CardID: cardGenerator.ID})
}

func (s *CardGeneratorService) UpdateCard(cardGenerator *model.CardGenerator) (*model.CardGenerator, error) {
	if cardGenerator.DescriptionGenerated && cardGenerator.ImageGenerated && !cardGenerator.PropertiesGenerated {
		s.generateProperties(cardGenerator)
	}

	return s.saveCardGenerator(cardGenerator)
}

func (s *CardGeneratorService) generateProperties(cardGenerator *model.CardGenerator) {
	log.Printf("Generating properties for card with ID: %d\n", cardGenerator.ID)
	s.SendPropertiesGeneration(cardGenerator)
}

func (s *CardGeneratorService) handleMessage(message *stomp.Message) {
	switch message.Header.Get("JMSType") {
	case "ImageGenerationDTO":
		var imageGenerationDTO model.ImageGenerationDTO
		err := json.Unmarshal(message.Body, &imageGenerationDTO)
		if err != nil {
			log.Println(err)
			return
		}
		err = s.ReceiveImageGenerationOutput(&imageGenerationDTO)
		if err != nil {
			log.Println(err)
		}
	case "TextGenerationDTO":
		var textGenerationDTO model.TextGenerationDTO
		err := json.Unmarshal(message.Body, &textGenerationDTO)
		if err != nil {
			log.Println(err)
			return
		}
		err = s.ReceiveDescriptionGenerationOutput(&textGenerationDTO)
		if err != nil {
			log.Println(err)
		}
	case "PropertiesGenerationDTO":
		var propertiesGenerationDTO model.PropertiesGenerationDTO
		err := json.Unmarshal(message.Body, &propertiesGenerationDTO)
		if err != nil {
			log.Println(err)
			return
		}
		err = s.ReceivePropertiesGenerationOutput(&propertiesGenerationDTO)
		if err != nil {
			log.Println(err)
		}
	}
}

func (s *CardGeneratorService) ReceiveImageGenerationOutput(imageGenerationDTO *model.ImageGenerationDTO) error {
	cardGenerator := s.GetCardGeneratorByID(imageGenerationDTO.CardID)
	if cardGenerator == nil {
		return errors.New("card not found")
	}

	cardGenerator.ImageURL = imageGenerationDTO.ImageUrl
	cardGenerator.SmallImageURL = imageGenerationDTO.ImageUrl
	cardGenerator.ImageGenerated = true

	_, err := s.cardRepository.SaveGenerator(cardGenerator)
	if err != nil {
		log.Println(err)
		return err
	}

	return s.CreateCardFromCardGenerator(cardGenerator)
}

func (s *CardGeneratorService) GetCardGeneratorByID(d uint) *model.CardGenerator {
	return s.cardRepository.FindGeneratorByID(d)
}

func (s *CardGeneratorService) ReceiveDescriptionGenerationOutput(descriptionGenerationDTO *model.TextGenerationDTO) error {
	cardGenerator := s.GetCardGeneratorByID(descriptionGenerationDTO.CardID)
	if cardGenerator == nil {
		return errors.New("card not found")
	}

	cardGenerator.Description = descriptionGenerationDTO.Text
	cardGenerator.DescriptionGenerated = true

	_, err := s.UpdateCard(cardGenerator)
	if err != nil {
		log.Println(err)
		return err
	}
	return s.CreateCardFromCardGenerator(cardGenerator)
}

func (s *CardGeneratorService) ReceivePropertiesGenerationOutput(propertiesGenerationDTO *model.PropertiesGenerationDTO) error {
	cardGenerator := s.GetCardGeneratorByID(propertiesGenerationDTO.CardID)
	if cardGenerator == nil {
		log.Printf("Card not found: %v\n", propertiesGenerationDTO.CardID)
		return nil
	}

	cardGenerator.Energy = propertiesGenerationDTO.Energy
	cardGenerator.HP = propertiesGenerationDTO.HP
	cardGenerator.Attack = propertiesGenerationDTO.Attack
	cardGenerator.Defence = propertiesGenerationDTO.Defence

	cardGenerator.PropertiesGenerated = true
	s.UpdateCard(cardGenerator)

	return s.CreateCardFromCardGenerator(cardGenerator)
}

// Called each time a card generator reiceive new data and create the card if all properties are generated
func (s *CardGeneratorService) CreateCardFromCardGenerator(cardGenerator *model.CardGenerator) error {
	// verification that all properties are generated
	if !cardGenerator.DescriptionGenerated || !cardGenerator.ImageGenerated || !cardGenerator.PropertiesGenerated {
		return nil
	}
	err := s.cardRepository.DeleteGenerator(cardGenerator)
	if err != nil {
		return err
	}

	card, err := s.cardmodelervice.AddCard(cardGenerator.ToCard())
	if err != nil {
		return err
	}

	notification := broker.NewNotification[any](card.UserID, CardGenerationNotificationMessage{CardID: card.ID}, broker.SeverityInfo, "card-generator")

	return s.notificationService.SendNotification(notification)
}

type CardGenerationNotificationMessage struct {
	CardID uint `json:"cardId"`
}

func (m CardGenerationNotificationMessage) GetData() (string, error) {
	data, err := json.Marshal(m)
	return string(data), err
}

func (m CardGenerationNotificationMessage) GetJMSType() string {
	return "CardGenerationNotificationMessage"
}
