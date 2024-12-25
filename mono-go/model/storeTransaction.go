package model

import "time"

type StoreTransaction struct {
	ID        uint       `json:"id" gorm:"id,primary_key"`
	UserID    int        `json:"userId" gorm:"userId,index"`
	CardID    int        `json:"cardId" gorm:"cardId,index"`
	StoreID   int        `json:"storeId" gorm:"storeId,index"`
	Amount    float32    `json:"amount" gorm:"amount"`
	Action    StoreAction `json:"action" gorm:"action"`
	CreatedAt time.Time  `json:"createdAt" gorm:"createdAt,autoCreateTime"`
}