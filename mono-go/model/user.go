package model

import (
	"encoding/json"
	"fmt"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model `json:"-"`
	ID         *int    `json:"id" gorm:"primaryKey;autoIncrement"`
	Login      string  `json:"login" gorm:"unique;not null"`
	Pwd        string  `json:"pwd" gorm:"not null, check:pwd <> '********', check:size(pwd) > 0"`
	Account    float32 `json:"account" gorm:"default:10000"`
	LastName   string  `json:"lastName" gorm:"not null"`
	SurName    string  `json:"surName" gorm:"not null"`
	Email      string  `json:"email" gorm:"unique;not null"`
	CardList   []Card  `json:"cardList" gorm:"foreignKey:UserID"`
}
type UserDTO struct {
	ID       *int    `json:"id,omitempty"`
	Login    string  `json:"login"`
	Pwd      string  `json:"pwd"`
	Account  float32 `json:"account"`
	LastName string  `json:"lastName"`
	SurName  string  `json:"surName"`
	Email    string  `json:"email"`
	CardList []int   `json:"cardList"`
}

func NewUser() *User {
	return &User{
		CardList: []Card{},
	}
}

func (u *User) HidePwd() *User {
	u.Pwd = "********"
	return u
}

func (u *User) ToDTO() *UserDTO {
	if u.CardList == nil {
		fmt.Println("******** CardList is nil ********")
		u.CardList = []Card{}
	}
	cardIDs := make([]int, len(u.CardList))
	for i, card := range u.CardList {
		cardIDs[i] = card.ID
	}
	return &UserDTO{
		ID:       u.ID,
		Login:    u.Login,
		Pwd:      u.Pwd,
		Account:  u.Account,
		LastName: u.LastName,
		SurName:  u.SurName,
		Email:    u.Email,
		CardList: cardIDs,
	}
}

func (u *User) FromDTO(dto *UserDTO) *User {
	cardList := make([]Card, len(dto.CardList))
	for i, cardID := range dto.CardList {
		cardList[i] = Card{ID: cardID}
	}
	return &User{
		ID:       dto.ID,
		Login:    dto.Login,
		Pwd:      u.Pwd,
		Account:  dto.Account,
		LastName: dto.LastName,
		SurName:  dto.SurName,
		Email:    dto.Email,
		CardList: cardList,
	}
}

func (u *UserDTO) ToModel() *User {
	cardList := make([]Card, len(u.CardList))
	for i, cardID := range u.CardList {
		cardList[i] = Card{ID: cardID}
	}
	return &User{
		ID:       u.ID,
		Login:    u.Login,
		Pwd:      u.Pwd,
		Account:  u.Account,
		LastName: u.LastName,
		SurName:  u.SurName,
		Email:    u.Email,
		CardList: cardList,
	}
}

func (u *UserDTO) FromModel(model *User) *UserDTO {
	cardIDs := make([]int, len(model.CardList))
	for i, card := range model.CardList {
		cardIDs[i] = card.ID
	}
	return &UserDTO{
		ID:       model.ID,
		Login:    model.Login,
		Account:  model.Account,
		LastName: model.LastName,
		SurName:  model.SurName,
		Email:    model.Email,
		CardList: cardIDs,
	}
}

// Custom MarshalJSON
func (u *UserDTO) MarshalJSON() ([]byte, error) {
	u.Pwd = "********"
	return json.Marshal(*u)
}
