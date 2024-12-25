package router

import (
	"net/http"

	"github.com/jo-pouradier/card-game-async/mono-go/controller"
)

type CardRouter struct {
	cardController *controller.CardController
}

func NewCardRouter(cardController *controller.CardController) *CardRouter {
	return &CardRouter{cardController: cardController}
}

func (r *CardRouter) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /cards", r.cardController.GetAllCards)
	mux.HandleFunc("GET /card/{id}", r.cardController.GetCard)
	mux.HandleFunc("POST /card", r.cardController.AddCard)
	mux.HandleFunc("DELETE /card/{id}", r.cardController.DeleteCard)
}

