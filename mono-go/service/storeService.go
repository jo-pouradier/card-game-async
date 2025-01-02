package service

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/repository"
)

const GENERATE_PRICE = 100

type StoreService struct {
	CardRepo        *repository.CardRepository
	StoreRepo       *repository.StoreRepository
	UserService     *UserService
	CardService     *CardService
	CardGeneratorService *CardGeneratorService
	CardGenerateFee float32
}

func NewStoreService(cardRepo *repository.CardRepository, storeRepo *repository.StoreRepository, userService *UserService, cardService *CardService, cardGeneratorService *CardGeneratorService, cardGenerateFee float32) *StoreService {
	return &StoreService{
		CardRepo:        cardRepo,
		StoreRepo:       storeRepo,
		UserService:     userService,
		CardService:     cardService,
		CardGeneratorService: cardGeneratorService,
		CardGenerateFee: cardGenerateFee,
	}
}

func (s StoreService) GetAllTransactions() any {
	panic("unimplemented")
}

func (s *StoreService) BuyCard(userID, cardID, storeID uint) (bool, error) {
	// Retrieve user and card from the repository
	ID := strconv.FormatUint(uint64(userID), 10)
	user, err := s.UserService.GetUser(ID)
	if err != nil {
		return false, fmt.Errorf("user not found: %v", err)
	}
	card, err := s.CardRepo.FindByID(cardID)
	if err != nil {
		return false, fmt.Errorf("card not found: %v", err)
	}

	// Check if user has enough money to buy the card
	if user.Account < card.Price {
		return false, fmt.Errorf("insufficient funds")
	}

	// Proceed with the purchase
	user.Account -= card.Price
	card.UserID = user.ID
	_, errUpdate := s.UserService.UpdateUser(ID, user)
	if errUpdate != nil {
		return false, fmt.Errorf("could not update user: %v", err)
	}
	card, errSave := s.CardRepo.Save(card)
	if errSave != nil {
		return false, fmt.Errorf("could not save card: %v", err)
	}

	// Record the transaction
	tx := &model.StoreTransaction{
		UserID:  userID,
		CardID:  cardID,
		StoreID: storeID,
		Amount:  card.Price,
		Action:  model.BUY,
	}
	err = s.StoreRepo.SaveTransaction(tx)
	if err != nil {
		return false, fmt.Errorf("could not save transaction: %v", err)
	}

	return true, nil
}

func (s *StoreService) BuyCardBtob(userID, cardID, storeID uint) bool {
	// Try to fetch the card from the card service
	card, err := s.CardService.GetCard(cardID)
	if err != nil {
		// Card not found
		return false
	}

	// Assume the other store has handled the money transfer and card removal
	err = s.CardService.DeleteCard(card.ID) // Delete the card from the current store
	if err != nil {
		// Error deleting card
		return false
	}

	// Create a new StoreTransaction for the purchase
	storeTransaction := model.StoreTransaction{
		UserID:  userID,
		CardID:  card.ID,
		StoreID: storeID,
		Amount:  card.Price, // Use the card's price for the transaction
		Action:  model.BUY,
	}

	// Save the transaction to the store repository
	err = s.StoreRepo.SaveTransaction(&storeTransaction)
	return err == nil
}

func (s *StoreService) SellCard(userID, cardID, storeID uint) (bool, error) {
	// Retrieve user and card from the repository
	ID := strconv.FormatUint(uint64(userID), 10)
	user, err := s.UserService.GetUser(ID)
	if err != nil {
		return false, fmt.Errorf("user not found: %v", err)
	}
	card, err := s.CardRepo.FindByID(cardID)
	if err != nil {
		return false, fmt.Errorf("card not found: %v", err)
	}

	// Remove card from user and update balance
	card.UserID = 0 // Removing ownership
	user.Account += card.Price
	_, err = s.UserService.UpdateUser(ID, user)
	if err != nil {
		return false, fmt.Errorf("could not update user: %v", err)
	}

	// Save the updated card in the repository
	card, errSave := s.CardRepo.Save(card)
	if errSave != nil {
		return false, fmt.Errorf("could not save card: %v", err)
	}

	// Record the transaction
	tx := &model.StoreTransaction{
		UserID:  userID,
		CardID:  cardID,
		StoreID: storeID,
		Amount:  card.Price,
		Action:  model.SELL,
	}
	err = s.StoreRepo.SaveTransaction(tx)
	if err != nil {
		return false, fmt.Errorf("could not save transaction: %v", err)
	}

	return true, nil
}

// List card to sell
func (s *StoreService) ListCardToSell() ([]model.Card, error) {
	return s.CardRepo.FindByUser("0")
}

func (s *StoreService) ListCardsToSellBtob() ([]model.Card, error) {
	return s.CardRepo.FindByUser("0")
}

// GenerateCard handles card generation
func (s *StoreService) GenerateCard(cardGenerator model.CardGenerator) (*model.StoreTransaction, error) {
	// Check if user exists
	user, err := s.UserService.GetUser(strconv.Itoa(int(cardGenerator.UserID)))
	if err != nil || user == nil {
		return nil, err
	}
	// Check if the user has enough money
	if user.Account < GENERATE_PRICE {
		return nil, errors.New("not enough money to generate a card")
	}
	// Generate the card using the CardGenerator service
	cardGeneratorModel, err := s.CardGeneratorService.GenerateCard(cardGenerator.DescriptionPrompt, cardGenerator.ImagePrompt, user)
	if err != nil {
		return nil, errors.Join(err, errors.New("failed to generate card"))
	}
	// Deduct money from the user's account
	user.Account -= GENERATE_PRICE
	if _, err := s.UserService.UpdateUser(strconv.Itoa(int(user.ID)), user); err != nil {
		return nil, errors.Join(err, errors.New("failed to update user account"))
	}
	// Create the store transaction
	storeTransaction := &model.StoreTransaction{
		UserID:  user.ID,
		CardID:  cardGeneratorModel.ID,
		StoreID: 0,
		Amount:  GENERATE_PRICE,
		Action:  model.GENERATE,
	}
	// Save the transaction to the store repository
	err = s.StoreRepo.SaveTransaction(storeTransaction)
	if err != nil {
		return nil, errors.New("failed to save store transaction")
	}
	return storeTransaction, nil
}
