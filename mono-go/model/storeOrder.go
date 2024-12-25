package model

// StoreOrder represents an order in the store system.
type StoreOrder struct {
	UserID  int `json:"user_id"`
	CardID  int `json:"card_id"`
	StoreID int `json:"store_id"`
}
