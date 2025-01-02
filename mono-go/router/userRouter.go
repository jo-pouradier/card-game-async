package router

import (
	"github.com/jo-pouradier/card-game-async/mono-go/controller"
)

type UserRouter struct {
	userController *controller.UserController
}

func NewUserRouter(userController *controller.UserController) *UserRouter {
	return &UserRouter{userController: userController}
}

func (r *UserRouter) RegisterRoutes(params RegisterRoutesParams) {
	params.Mux.Handle("GET /users", params.MetricWrapper("/user", r.userController.GetAllUsers))
	params.Mux.Handle("GET /user/{id}", params.MetricWrapper("/user/:userId", r.userController.GetUser))
	params.Mux.Handle("PUT /user/{id}", params.MetricWrapper("/user/:userId", r.userController.UpdateUser))
	params.Mux.Handle("POST /user", params.MetricWrapper("/user", r.userController.AddUser))
	params.Mux.Handle("DELETE /user/{id}", params.MetricWrapper("/user/:userId", r.userController.DeleteUser))
	params.Mux.Handle("POST /auth", params.MetricWrapper("/auth", r.userController.AuthUser))
	params.Mux.Handle("GET /winbattle/{id}", params.MetricWrapper("/winbattle/:userId", r.userController.WinBattle))
}
