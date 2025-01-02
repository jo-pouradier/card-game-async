package router

import (
	"github.com/jo-pouradier/card-game-async/mono-go/controller"
)

type StoreRouter struct {
	storeController *controller.StoreController
}

func NewStoreRouter(storeController *controller.StoreController) *StoreRouter {
	return &StoreRouter{storeController: storeController}
}

func (r *StoreRouter) RegisterRoutes(params RegisterRoutesParams) {
	params.Mux.Handle("POST /store/buy", params.MetricWrapper("/store", r.storeController.BuyCards))
	params.Mux.Handle("POST /store/buy/btob", params.MetricWrapper("/store", r.storeController.BuyCardBtoB))
	params.Mux.Handle("POST /store/sell", params.MetricWrapper("/store", r.storeController.SellCard))
	params.Mux.Handle("GET /store/transaction", params.MetricWrapper("/store", r.storeController.GetTransactions))
	params.Mux.Handle("GET /store/cards_to_sell", params.MetricWrapper("/store", r.storeController.GetCardsToSell))
	params.Mux.Handle("GET /store/cards_to_sell/btob", params.MetricWrapper("/store", r.storeController.GetCardsToSellBtoB))
	params.Mux.Handle("POST /store/generate", params.MetricWrapper("/store", r.storeController.GenerateCard))
}
