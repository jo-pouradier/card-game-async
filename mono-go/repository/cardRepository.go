package repository

import (
	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"gorm.io/gorm"
)

type CardRepository struct {
	DB *gorm.DB
}

// NewCardRepository creates a new instance of CardRepository.
func NewCardRepository(db *gorm.DB) *CardRepository {
	return &CardRepository{DB: db}
}

// FindByUser retrieves all cards associated with a specific user.
func (r *CardRepository) FindByUser(userId string) ([]model.Card, error) {
	var cards []model.Card
	if userId == "-1" {
		// find all cards that are not associated with a user
		err := r.DB.Where("user_id = -1").Find(&cards).Error
		return cards, err
	}
	err := r.DB.Where("user_id = ?", userId).Find(&cards).Error
	return cards, err
}

// FindAll retrieves all cards from the database.
func (r *CardRepository) FindAll() ([]model.Card, error) {
	var cards []model.Card
	err := r.DB.Find(&cards).Error
	return cards, err
}

// FindByID retrieves a card by its ID.
func (r *CardRepository) FindByID(id int) (*model.Card, error) {
	var card model.Card
	err := r.DB.First(&card, id).Error
	if err != nil {
		return nil, err
	}
	return &card, nil
}

// Save creates or updates a card in the database.
func (r *CardRepository) Save(card *model.Card) (*model.Card, error) {
	err := r.DB.Save(card).Error
	if err != nil {
		return nil, err
	}
	return card, nil
}

// DeleteByID deletes a card by its ID.
func (r *CardRepository) DeleteByID(id int) error {
	return r.DB.Delete(&model.Card{}, id).Error
}
