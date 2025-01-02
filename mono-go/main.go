package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-stomp/stomp"
	"github.com/jo-pouradier/card-game-async/mono-go/broker"
	"github.com/jo-pouradier/card-game-async/mono-go/controller"
	_ "github.com/jo-pouradier/card-game-async/mono-go/docs" // mandatory for swagger docs
	"github.com/jo-pouradier/card-game-async/mono-go/middleware"
	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/repository"
	"github.com/jo-pouradier/card-game-async/mono-go/router"
	"github.com/jo-pouradier/card-game-async/mono-go/service"
	"github.com/joho/godotenv"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/slok/go-http-metrics/middleware/std"
	httpSwagger "github.com/swaggo/http-swagger/v2"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func init() {
	// Initialize the logger
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	// load .default-env
	if err := godotenv.Load(".env"); err != nil {
		log.Println("No .env file found, continue with default values from .default.env file")
	}
	if err := godotenv.Load(".default.env"); err != nil {
		log.Println("No .default.env file found")
		os.Exit(1)
	}
}

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
	db.AutoMigrate(&model.CardGenerator{})
	db.AutoMigrate(&model.StoreOrder{})

	// Initialize the repository
	cardRepository := repository.NewCardRepository(db)
	userRepository := repository.NewUserRepository(db)
	storeRepository := repository.NewStoreRepository(db)

	// Initialize the service
	cardService := service.NewCardService(cardRepository)
	userService := service.NewUserService(userRepository, cardService)

	notificationService := broker.GetNotificationServiceImp()
	generatorReceiver := broker.GetBrokerReceiver("GENERATION-OUTPUT", func(msg *stomp.Message) {}) // empty callback, generated later when creating the service
	cardGeneratorService := service.NewCardGeneratorService(cardService, cardRepository, generatorReceiver, notificationService)
	storeService := service.NewStoreService(cardRepository, storeRepository, userService, cardService, cardGeneratorService, 100)

	// Initialize the controller
	cardController := controller.NewCardRestController(cardService)
	userController := controller.NewUserRestController(userService)
	storeController := controller.NewStoreController(storeService)
	// Initialize the router
	cardRouter := router.NewCardRouter(cardController)
	userRouter := router.NewUserRouter(userController)
	storeRouter := router.NewStoreRouter(storeController)

	// Create the Prometheus recorder
	metricsMiddleware, promRegistry := middleware.NewMetricsMiddleware()
	metricWrapper := func(path string, handler func(http.ResponseWriter, *http.Request)) http.Handler {
		return std.Handler(path, metricsMiddleware, http.HandlerFunc(handler))
	}
	// Register the routes
	mux := http.NewServeMux()
	cardRouter.RegisterRoutes(router.RegisterRoutesParams{
		Mux: mux,
		MetricWrapper: metricWrapper,
	})
	userRouter.RegisterRoutes(router.RegisterRoutesParams{
		Mux: mux,
		MetricWrapper: metricWrapper,
	})
	storeRouter.RegisterRoutes(router.RegisterRoutesParams{
		Mux: mux,
		MetricWrapper: metricWrapper,
	})
	mux.Handle("/swagger/", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"), //The url pointing to API definition"
	))
	mux.Handle("/metrics", promhttp.HandlerFor(promRegistry, promhttp.HandlerOpts{Registry: promRegistry}))

	loggingMiddleware := middleware.LoggingMiddleWare(logging)
	loggedHandler := loggingMiddleware(mux)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if err := http.ListenAndServe(":"+port, loggedHandler); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Server running on port ", port)
}
