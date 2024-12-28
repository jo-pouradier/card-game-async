package router

import (
	"net/http"

	"github.com/jo-pouradier/card-game-async/mono-go/controller"
)

type UserRouter struct {
	userController *controller.UserController
}

func NewUserRouter(userController *controller.UserController) *UserRouter {
	return &UserRouter{userController: userController}
}

func (r *UserRouter) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /users", r.userController.GetAllUsers)
	mux.HandleFunc("GET /user/{id}", r.userController.GetUser)
	mux.HandleFunc("PUT /user/{id}", r.userController.UpdateUser)
	mux.HandleFunc("POST /user", r.userController.AddUser)
	mux.HandleFunc("DELETE /user/{id}", r.userController.DeleteUser)
	mux.HandleFunc("POST /auth", r.userController.AuthUser)
	mux.HandleFunc("GET /winbattle/{id}", r.userController.WinBattle)
}
