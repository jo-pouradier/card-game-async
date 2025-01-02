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

type RegisterRoutesParams struct {
	Mux *http.ServeMux
	MetricWrapper func(string ,func(http.ResponseWriter, *http.Request)) http.Handler
}

func (r *CardRouter) RegisterRoutes(params RegisterRoutesParams) {
	params.Mux.Handle("GET /cards", params.MetricWrapper("/cards", r.cardController.GetAllCards))
	params.Mux.Handle("GET /card/{id}",params.MetricWrapper("/card/:cardId", r.cardController.GetCard))
	params.Mux.Handle("POST /card",params.MetricWrapper("/card", r.cardController.AddCard))
	params.Mux.Handle("DELETE /card/{id}",params.MetricWrapper("/card/:cardId", r.cardController.DeleteCard))
}

