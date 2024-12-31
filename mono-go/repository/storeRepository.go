package repository

import (
	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"gorm.io/gorm"
)

type StoreRepository struct {
	DB *gorm.DB
}

func NewStoreRepository(db *gorm.DB) *StoreRepository {
	return &StoreRepository{DB: db}
}

func (repo *StoreRepository) SaveTransaction(tx *model.StoreTransaction) error {
	return repo.DB.Save(tx).Error
}

func (repo *StoreRepository) FindTransactionByID(id int) (*model.StoreTransaction, error) {
	var tx model.StoreTransaction
	err := repo.DB.First(&tx, id).Error
	if err != nil {
		return nil, err
	}
	return &tx, nil
}

func (repo *StoreRepository) FindAllTransactions() ([]model.StoreTransaction, error) {
	var txs []model.StoreTransaction
	err := repo.DB.Find(&txs).Error
	return txs, err
}