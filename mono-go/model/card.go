package model

import (
	"gorm.io/gorm"
)

// Card godoc
// @Description Represents a card in the game
// @Model
type Card struct {
	gorm.Model `json:"-"`
	Name        string  `json:"name" gorm:"name"`
	Description string  `json:"description" gorm:"description"`
	Family      string  `json:"family" gorm:"family"`
	Affinity    string  `json:"affinity" gorm:"affinity"`
	ImgUrl      string  `json:"imgUrl" gorm:"imgUrl"`
	SmallImgUrl string  `json:"smallImgUrl" gorm:"smallImgUrl"`
	ID          int     `json:"id" gorm:"id,primaryKey"`
	Energy      float32 `json:"energy" gorm:"energy"`
	Hp          float32 `json:"hp" gorm:"hp"`
	Defence     float32 `json:"defence" gorm:"defence"`
	Attack      float32 `json:"attack" gorm:"attack"`
	Price       float32 `json:"price" gorm:"price"`
	UserID      int     `json:"userId" gorm:"userId"`
}

// ComputePrice calculates the price of a card based on its stats.
func (c *Card) ComputePrice() float32 {
	return c.Attack + c.Defence + c.Hp
}