package model

// StoreOrder represents an order in the store system.
type StoreOrder struct {
	UserID  uint `json:"user_id"`
	CardID  uint `json:"card_id"`
	StoreID uint `json:"store_id"`
}
