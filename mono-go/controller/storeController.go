package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/service"
)

// StoreController struct
type StoreController struct {
	storeService *service.StoreService
}

// NewStoreRestController creates a new StoreRestController
func NewStoreController(storeService *service.StoreService) *StoreController {
	return &StoreController{
		storeService: storeService,
	}
}

// BuyCards godoc
// @Summary Buy cards
// @Description Buy cards
// @Tags store
// @Accept json
// @Produce json
// @Param order body model.StoreOrder true "Order"
// @Success 200 {string} string "true"
// @Failure 400 {string} string "false"
// @Router /store/buy [post]
func (controller *StoreController) BuyCards(w http.ResponseWriter, r *http.Request) {
	var order model.StoreOrder
	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err := controller.storeService.BuyCard(order.UserID, order.CardID, -1)
	if err != nil {
		http.Error(w, "false", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("true"))
}

// BuyCardBtoB godoc
// @Summary Buy card B2B
// @Description Buy card B2B
// @Tags store
// @Accept json
// @Produce json
// @Param order body model.StoreOrder true "Order"
// @Success 200 {string} string "true"
// @Failure 400 {string} string "false"
// @Router /store/buy/btob [post]
func (controller *StoreController) BuyCardBtoB(w http.ResponseWriter, r *http.Request) {
	var order model.StoreOrder
	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	success := controller.storeService.BuyCardBtob(order.UserID, order.CardID, order.StoreID)
	if success {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("true"))
	} else {
		http.Error(w, "B2B Purchase failed", http.StatusBadRequest)
		w.Write([]byte("false"))
	}
}

// SellCard godoc
// @Summary Sell card
// @Description Sell card
// @Tags store
// @Accept json
// @Produce json
// @Param order body model.StoreOrder true "Order"
// @Success 200 {string} string "true"
// @Failure 400 {string} string "false"
// @Router /store/sell [post]
func (controller *StoreController) SellCard(w http.ResponseWriter, r *http.Request) {
	var order model.StoreOrder
	if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println(order)

	success, errSell := controller.storeService.SellCard(order.UserID, order.CardID, -1)
	if errSell != nil {
		http.Error(w, "Sale failed", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("%t", success)))
}

// generateCard handles the generation of a new card
// func (controller *StoreRestController) generateCard(w http.ResponseWriter, r *http.Request) {
// 	var cardGeneratorDTO model.CardGenerator
// 	if err := json.NewDecoder(r.Body).Decode(&cardGeneratorDTO); err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	transaction := controller.storeService.GenerateCard(cardGeneratorDTO)
// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode(transaction)
// }

// GetTransactions godoc
// @Summary Get transactions
// @Description Get transactions
// @Tags store
// @Accept json
// @Produce json
// @Success 200 {string} string "true"
// @Failure 400 {string} string "false"
// @Router /store/transaction [get]
func (controller *StoreController) GetTransactions(w http.ResponseWriter, _ *http.Request) {
	transactions := controller.storeService.GetAllTransactions()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(transactions)
}

// GetCardsToSell godoc
// @Summary Get cards to sell
// @Description Get cards to sell
// @Tags store
// @Accept json
// @Produce json
// @Success 200 {string} string "true"
// @Failure 400 {string} string "false"
// @Router /store/cards_to_sell [get]
func (controller *StoreController) GetCardsToSell(w http.ResponseWriter, _ *http.Request) {
	cards, _ := controller.storeService.ListCardToSell()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cards)
}

// GetCardsToSellBtoB godoc
// @Summary Get cards to sell B2B
// @Description Get cards to sell B2B
// @Tags store
// @Accept json
// @Produce json
// @Success 200 {string} string "true"
// @Failure 400 {string} string "false"
// @Router /store/cards_to_sell/btob [get]
func (controller *StoreController) GetCardsToSellBtoB(w http.ResponseWriter, _ *http.Request) {
	cards, _ := controller.storeService.ListCardsToSellBtob()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cards)
}
