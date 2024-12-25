package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/service"
)

// CardController handles HTTP requests related to cards
type CardController struct {
	cardService *service.CardService
}

// NewCardRestController creates a new controller
func NewCardRestController(cardService *service.CardService) *CardController {
	return &CardController{cardService: cardService}
}

// GetAllCards godoc
// @Summary Get all cards
// @Description Retrieve all cards
// @Tags cards
// @Produce json
// @Success 200 {array} model.Card
// @Router /cards [get]
func (ctrl *CardController) GetAllCards(w http.ResponseWriter, r *http.Request) {
	cards, _ := ctrl.cardService.GetAllCards()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cards)
}

// GetCard godoc
// @Summary Get a card by ID
// @Description Retrieve a card by its ID
// @Tags cards
// @Produce json
// @Param id path int true "Card ID"
// @Success 200 {object} model.Card
// @Failure 400 {object} map[string]string
// @Router /card/{id} [get]
func (ctrl *CardController) GetCard(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/card/"):]

	// Convert string to integer
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid card ID", http.StatusBadRequest)
		return
	}

	// Retrieve the card
	card, err := ctrl.cardService.GetCard(id)
	if err != nil {
		http.Error(w, fmt.Sprintf("Card with ID %d not found", id), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(card)
}

// AddCard godoc
// @Summary Add a new card
// @Description Create and save a new card
// @Tags cards
// @Accept json
// @Produce json
// @Param card body model.Card true "Card object"
// @Success 201 {object} model.Card
// @Failure 400 {object} map[string]string
// @Router /card [post]
func (ctrl *CardController) AddCard(w http.ResponseWriter, r *http.Request) {
	var card model.Card
	err := json.NewDecoder(r.Body).Decode(&card)
	if err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	// Add the card
	createdCard, _ := ctrl.cardService.AddCard(&card)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(createdCard)
}

// UpdateCard godoc
// @Summary Update a card
// @Description Update an existing card
// @Tags cards
// @Accept json
// @Produce json
// @Param id path int true "Card ID"
// @Param card body model.Card true "Card object"
// @Success 200 {object} model.Card
// @Failure 400 {object} map[string]string
// @Router /card/{id} [put]
func (ctrl *CardController) UpdateCard(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/card/"):]

	// Convert string to integer
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid card ID", http.StatusBadRequest)
		return
	}

	var updatedCard model.Card
	err = json.NewDecoder(r.Body).Decode(&updatedCard)
	if err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	// Update the card
	updatedCardPtr, errUpdate := ctrl.cardService.UpdateCard(&updatedCard)
	if errUpdate != nil {
		http.Error(w, fmt.Sprintf("Card with ID %d not found", id), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedCardPtr)
}

// DeleteCard godoc
// @Summary Delete a card
// @Description Delete a card by its ID
// @Tags cards
// @Param id path int true "Card ID"
// @Success 204
// @Failure 400 {object} map[string]string
// @Router /card/{id} [delete]
func (ctrl *CardController) DeleteCard(w http.ResponseWriter, r *http.Request) {
	idStr := r.URL.Path[len("/card/"):]

	// Convert string to integer
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid card ID", http.StatusBadRequest)
		return
	}

	// Delete the card
	errDelete := ctrl.cardService.DeleteCard(id)
	if errDelete != nil {
		http.Error(w, fmt.Sprintf("Card with ID %d not found", id), http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
