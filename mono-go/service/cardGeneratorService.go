package service

import (
	"encoding/json"
	"errors"
	"log"

	"github.com/go-stomp/stomp"
	"github.com/jo-pouradier/card-game-async/mono-go/broker"
	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/repository"
)

type CardGeneratorService struct {
	cardmodelervice             *CardService
	cardRepository              *repository.CardRepository
	cardGeneratorBrokerReceiver *broker.ReceiverBroker
	notificationService         broker.NotificationService
}

func NewCardGeneratorService(
	cardmodelervice *CardService,
	cardRepository *repository.CardRepository,
	cardGeneratorBrokerReceiver *broker.ReceiverBroker,
	notificationService broker.NotificationService,
) *CardGeneratorService {
	cardGeneratorService := &CardGeneratorService{
		cardmodelervice:             cardmodelervice,
		cardRepository:              cardRepository,
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
	sender := broker.GetBrokerSender("GENERATION-IMAGE-INPUT")
	sender.Send(model.ImageGenerationDTO{CardID: cardGenerator.ID, ImagePrompt: &cardGenerator.ImagePrompt, GenerationType: "IMAGE"})
}

func (s *CardGeneratorService) SendDescriptionGeneration(cardGenerator *model.CardGenerator) {
	sender := broker.GetBrokerSender("GENERATION-TEXT-INPUT")
	sender.Send(model.TextGenerationDTO{CardID: cardGenerator.ID, TextPrompt: &cardGenerator.DescriptionPrompt, GenerationType: "TEXT"})
}

func (s *CardGeneratorService) SendPropertiesGeneration(cardGenerator *model.CardGenerator) {
	sender := broker.GetBrokerSender("GENERATION-PROPERTY-INPUT")
	sender.Send(model.PropertiesGenerationDTO{CardID: cardGenerator.ID, ImageUrl: cardGenerator.ImageURL, GenerationType: "PROPERTY"})
}

func (s *CardGeneratorService) UpdateCardGenerator(cardGenerator *model.CardGenerator) (*model.CardGenerator, error) {
	log.Println("Updating card generator:", cardGenerator)
	if cardGenerator.DescriptionGenerated && cardGenerator.ImageGenerated && !cardGenerator.PropertiesGenerated {
		s.generateProperties(cardGenerator)
		log.Println("Generating card properties")
	}

	return s.saveCardGenerator(cardGenerator)
}

func (s *CardGeneratorService) generateProperties(cardGenerator *model.CardGenerator) {
	log.Printf("Generating properties for card with ID: %d\n", cardGenerator.ID)
	s.SendPropertiesGeneration(cardGenerator)
}

func (s *CardGeneratorService) handleMessage(message *stomp.Message) {
	log.Printf("Handling message from queue: %s; %s; type=%s", message.Header.Get("type"), string(message.Body), message.Header.Get("type"))
	switch message.Header.Get("type") {
	case "com.cpe.springboot.generation.ImageGenerationDTO":
		var imageGenerationDTO model.ImageGenerationDTO
		err := json.Unmarshal(message.Body, &imageGenerationDTO)
		if err != nil {
			log.Println(err)
			return
		}
		log.Printf("Received image generation output: %+v", imageGenerationDTO)
		err = s.ReceiveImageGenerationOutput(&imageGenerationDTO)
		if err != nil {
			log.Println(err)
		}
	case "com.cpe.springboot.generation.TextGenerationDTO":
		var textGenerationDTO model.TextGenerationDTO
		err := json.Unmarshal(message.Body, &textGenerationDTO)
		if err != nil {
			log.Println(err)
			return
		}
		log.Printf("Received image generation output: %+v", textGenerationDTO)
		err = s.ReceiveDescriptionGenerationOutput(&textGenerationDTO)
		if err != nil {
			log.Println(err)
		}
	case "com.cpe.springboot.generation.PropertiesGenerationDTO":
		var propertiesGenerationDTO model.PropertiesGenerationDTO
		err := json.Unmarshal(message.Body, &propertiesGenerationDTO)
		if err != nil {
			log.Println(err)
			return
		}
		log.Printf("Received image generation output: %v", propertiesGenerationDTO)
		err = s.ReceivePropertiesGenerationOutput(&propertiesGenerationDTO)
		if err != nil {
			log.Println(err)
		}
	case "":
		log.Println("Empty message type")
	}
}

func (s *CardGeneratorService) ReceiveImageGenerationOutput(imageGenerationDTO *model.ImageGenerationDTO) error {
	cardGenerator := s.GetCardGeneratorByID(imageGenerationDTO.CardID)
	if cardGenerator == nil {
		return errors.New("card not found")
	}

	cardGenerator.ImageURL = *imageGenerationDTO.ImageUrl
	cardGenerator.SmallImageURL = *imageGenerationDTO.ImageUrl
	cardGenerator.ImageGenerated = true

	_, err := s.UpdateCardGenerator(cardGenerator)
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

	cardGenerator.Description = *descriptionGenerationDTO.Text
	cardGenerator.DescriptionGenerated = true

	_, err := s.UpdateCardGenerator(cardGenerator)
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
	s.UpdateCardGenerator(cardGenerator)

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
	log.Println("Card generated with ID: ", card.ID)

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
	return "com.cpe.springboot.CardGenerationNotificationMessage"
}
