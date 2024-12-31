package service

import (
	"math/rand"
	"time"

	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/repository"
)

type CardService struct {
	cardRepository *repository.CardRepository
	rand           *rand.Rand
}

func NewCardService(cardRepository *repository.CardRepository) *CardService {
	return &CardService{
		cardRepository: cardRepository,
		rand:           rand.New(rand.NewSource(time.Now().UnixNano())),
	}
}

// GetAllCard retrieves all card models.
func (s *CardService) GetAllCard() ([]model.Card, error) {
	cards, err := s.cardRepository.FindAll()
	return cards, err
}

// AddCard creates and saves a new card model.
func (s *CardService) AddCard(cardModel *model.Card) (*model.Card, error) {
	card, err := s.cardRepository.Save(cardModel)
	if err != nil {
		return nil, err
	}
	return card, nil
}

// UpdateCard updates an existing card model.
func (s *CardService) UpdateCard(cardModel *model.Card) (*model.Card, error) {
	cDb, err := s.cardRepository.Save(cardModel)
	if err != nil {
		return nil, err
	}
	return cDb, nil
}

// GetCard retrieves a card by its ID.
func (s *CardService) GetCard(id uint) (*model.Card, error) {
	return s.cardRepository.FindByID(id)
}

// DeleteCard deletes a card by its ID.
func (s *CardService) DeleteCard(id uint) error {
	return s.cardRepository.DeleteByID(id)
}

// GetRandCard generates a list of random cards without referencing CardReferenceService.
func (s *CardService) GetRandCard(nbr int) ([]model.Card, error) {
	var cardList []model.Card
	for i := 0; i < nbr; i++ {
		// Create a random card directly
		currentCard := model.Card{
			Name:        "Random Card " + string(rune(i)), // Random name generation (you can customize this)
			Description: "Description for random card " + string(rune(i)),
			Family:      "Family " + string(rune(i)),
			Affinity:    "Affinity " + string(rune(i)),
			ImgUrl:      "https://example.com/img" + string(rune(i)),       // You can customize this URL
			SmallImgUrl: "https://example.com/small_img" + string(rune(i)), // Customize this URL too
			Attack:      s.rand.Float32() * 100,
			Defence:     s.rand.Float32() * 100,
			Energy:      100,
			Hp:          s.rand.Float32() * 100,
		}
		currentCard.Price = currentCard.ComputePrice() // Assuming ComputePrice method exists for price calculation
		// Save the card before adding to list
		_, err := s.AddCard(&currentCard)
		if err != nil {
			return nil, err
		}
		cardList = append(cardList, currentCard)
	}
	return cardList, nil
}

// GetAllCardToSell retrieves all cards not owned by a user (i.e., available for sale).
func (s *CardService) GetAllCardToSell() ([]model.Card, error) {
	return s.cardRepository.FindByUser("")
}

func (s *CardService) GetAllCards() ([]model.Card, error) {
	return s.cardRepository.FindAll()
}
