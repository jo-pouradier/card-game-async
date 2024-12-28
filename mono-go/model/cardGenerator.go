package model

import (
	"encoding/json"
)

type CardGenerator struct {
	ID                   uint              `gorm:"primaryKey"`
	Energy               float32           `gorm:""`
	HP                   float32           
	Defence              float32           
	Attack               float32          
	Price                float32         
	Name                 string         
	Description          string     
	ImageURL             string         
	SmallImageURL        string        
	Family               string       
	Affinity             string      
	DescriptionPrompt    string            `gorm:"type:text;not null"`
	ImagePrompt          string            `gorm:"type:text;not null"`
	UserID               uint              `gorm:"index"` // Foreign key to UserModel
	User                 *User             `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	StoreID              uint              `gorm:"index"` // Foreign key to StoreTransaction
	Store                *StoreTransaction `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ImageGenerated       bool              `gorm:"default:false"`
	DescriptionGenerated bool              `gorm:"default:false"`
	PropertiesGenerated  bool              `gorm:"default:false"`
}

func (c *CardGenerator) ToCard() *Card {
	return &Card{
		ID:                   c.ID,
		Energy:               c.Energy,
		Hp:                   c.HP,
		Defence:              c.Defence,
		Attack: c.Attack,
		Price: c.Price,
		Name: c.Name,
		Description: c.Description,
		ImgUrl: c.ImageURL,
		SmallImgUrl: c.SmallImageURL,
		Family: c.Family,
		Affinity: c.Affinity,
		UserID: c.UserID,
	}
}

func (c *CardGenerator) GetJMSType() string {
	return "CardGeneratorModel"
}

func (c *CardGenerator) GetData() (string, error) {
	data, err := json.Marshal(c)
	return string(data), err
}
