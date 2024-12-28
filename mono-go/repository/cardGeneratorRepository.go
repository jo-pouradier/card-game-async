package repository

import (
	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"gorm.io/gorm"
)

// CardRepository is a repository for cards.
type CardGeneratorRepository struct {
	DB *gorm.DB
}

// NewCardRepository creates a new instance of CardRepository.
func NewCardGeneratorRepository(db *gorm.DB) *CardGeneratorRepository {
	return &CardGeneratorRepository{DB: db}
}

// FindByUser retrieves all cards associated with a specific user.
func (r *CardGeneratorRepository) FindByUser(userId uint) ([]model.CardGenerator, error) {
	var cards []model.CardGenerator
	err := r.DB.Where("user_id = ?", userId).Find(&cards).Error
	return cards, err
}

func (r *CardGeneratorRepository) Save(card *model.CardGenerator) (*model.CardGenerator, error) {
	err := r.DB.Create(card).Error
	return card, err
}

func (r *CardGeneratorRepository) Delete(card *model.CardGenerator) error {
	return r.DB.Delete(card).Error
}

func (r *CardGeneratorRepository) DeleteByID(id uint) error {
	return r.DB.Delete(&model.CardGenerator{}, id).Error
}