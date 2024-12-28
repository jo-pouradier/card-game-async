package router

import (
	"net/http"

	"github.com/jo-pouradier/card-game-async/mono-go/controller"
)

type StoreRouter struct {
	storeController *controller.StoreController
}

func NewStoreRouter(storeController *controller.StoreController) *StoreRouter {
	return &StoreRouter{storeController: storeController}
}

func (r *StoreRouter) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("POST /store/buy", r.storeController.BuyCards)
	mux.HandleFunc("POST /store/buy/btob", r.storeController.BuyCardBtoB)
	mux.HandleFunc("POST /store/sell", r.storeController.SellCard)
	mux.HandleFunc("GET /store/transaction", r.storeController.GetTransactions)
	mux.HandleFunc("GET /store/cards_to_sell", r.storeController.GetCardsToSell)
	mux.HandleFunc("GET /store/cards_to_sell/btob", r.storeController.GetCardsToSellBtoB)
	mux.HandleFunc("POST /store/generate", r.storeController.GenerateCard)
}
