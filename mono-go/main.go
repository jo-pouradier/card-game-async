package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jo-pouradier/card-game-async/mono-go/controller"
	_ "github.com/jo-pouradier/card-game-async/mono-go/docs"
	"github.com/jo-pouradier/card-game-async/mono-go/middleware"
	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/repository"
	"github.com/jo-pouradier/card-game-async/mono-go/router"
	"github.com/jo-pouradier/card-game-async/mono-go/service"
	httpSwagger "github.com/swaggo/http-swagger/v2"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// @title Monolithic Card Game API
// @version 1.0.0
// @description This is a simple API for a card game.

// @BasePath /
func main() {
	// Initialize the database
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}

	logging := log.New(os.Stdout, "MAIN: ", log.LstdFlags)

	// Migrate the schema
	db.AutoMigrate(&model.Card{})
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.StoreTransaction{})

	// Initialize the repository
	cardRepository := repository.NewCardRepository(db)
	userRepository := repository.NewUserRepository(db)
	storeRepository := repository.NewStoreRepository(db)

	// Initialize the service
	cardService := service.NewCardService(cardRepository)
	userService := service.NewUserService(userRepository, cardService)
	storeService := service.NewStoreService(cardRepository, storeRepository, userService, cardService, 100)

	// Initialize the controller
	cardController := controller.NewCardRestController(cardService)
	userController := controller.NewUserRestController(userService)
	storeController := controller.NewStoreController(storeService)
	// Initialize the router
	cardRouter := router.NewCardRouter(cardController)
	userRouter := router.NewUserRouter(userController)
	storeRouter := router.NewStoreRouter(storeController)

	// Register the routes
	mux := http.NewServeMux()
	cardRouter.RegisterRoutes(mux)
	userRouter.RegisterRoutes(mux)
	storeRouter.RegisterRoutes(mux)
	mux.Handle("/swagger/", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"), //The url pointing to API definition"
	))

	loggingMiddleware := middleware.LoggingMiddleWare(logging)
	loggedMux := loggingMiddleware(mux)

	// Start the server
	fmt.Println("Server running on port 8080")
	http.ListenAndServe(":8080", loggedMux)
}
