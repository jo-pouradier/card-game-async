package model

import "time"

type StoreTransaction struct {
	ID        uint       `json:"id" gorm:"id,primary_key"`
	UserID    uint        `json:"userId" gorm:"userId,index"`
	CardID    uint        `json:"cardId" gorm:"cardId,index"`
	StoreID   uint        `json:"storeId" gorm:"storeId,index"`
	Amount    float32    `json:"amount" gorm:"amount"`
	Action    StoreAction `json:"action" gorm:"action"`
	CreatedAt time.Time  `json:"createdAt" gorm:"createdAt,autoCreateTime"`
}