package controller

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/service"
)

type UserController struct {
	userService *service.UserService
}

func NewUserRestController(userService *service.UserService) *UserController {
	return &UserController{userService: userService}
}

// GetAllUsers godoc
// @Summary Get all users
// @Description Retrieve all users
// @Tags users
// @Produce json
// @Success 200 {array} model.UserDTO
// @Router /users [get]
func (c *UserController) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	users, err := c.userService.GetAllUsers()
	if err != nil {
		http.Error(w, "Failed to retrieve users", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	var userDTOs []model.UserDTO
	for _, user := range users {
		userDTOs = append(userDTOs, *user.ToDTO())
	}
	json.NewEncoder(w).Encode(userDTOs)
}

// GetUser godoc
// @Summary Get a user by ID
// @Description Retrieve a user by its ID
// @Tags users
// @Produce json
// @Param id path string true "User ID"
// @Success 200 {object} model.UserDTO
// @Failure 400 {object} map[string]string
// @Router /user/{id} [get]
func (c *UserController) GetUser(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	user, err := c.userService.GetUser(id)
	if err != nil {
		http.Error(w, fmt.Sprintf("User with ID %s not found", id), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user.ToDTO())
}

// AddUser godoc
// @Summary Add a new user
// @Description Add a new user
// @Tags users
// @Accept json
// @Produce json
// @Param user body model.UserDTO true "User object"
// @Success 200 {object} model.UserDTO
// @Failure 400 {object} map[string]string
// @Router /user [post]
func (c *UserController) AddUser(w http.ResponseWriter, r *http.Request) {
	var user model.UserDTO
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	savedUser, err := c.userService.AddUser(user.ToModel())
	if err != nil {
		http.Error(w, "Failed to save user", http.StatusInternalServerError)
		return
	}
	fmt.Println(savedUser)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(savedUser.ToDTO())
}

// UpdateUser godoc
// @Summary Update a user
// @Description Update an existing user
// @Tags users
// @Accept json
// @Produce json
// @Param id path string true "User ID"
// @Param user body model.UserDTO true "User object"
// @Success 200 {object} model.UserDTO
// @Failure 400 {object} map[string]string
// @Router /user/{id} [put]
func (c *UserController) UpdateUser(w http.ResponseWriter, r *http.Request) {
	var user model.UserDTO
	id := r.PathValue("id")
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	updatedUser, err := c.userService.UpdateUser(id, user.ToModel())
	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedUser.ToDTO())
}

// UpdateUser godoc
// @Summary Update a user
// @Description Update an existing user
// @Tags users
// @Param id path string true "User ID"
// @Success 200 {object} bool
// @Failure 400 {object} map[string]string
// @Router /user/{id} [delete]
func (c *UserController) DeleteUser(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	err := c.userService.DeleteUser(id)
	if err != nil {
		http.Error(w, fmt.Sprintf("User with ID %s not found", id), http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("%v", err != nil)))
}

// AuthUser godoc
// @Summary Authenticate a user
// @Description Authenticate a user by login and password
// @Tags users
// @Produce json
// @Param login query string true "User login"
// @Param pwd query string true "User password"
// @Success 200 {object} int
// @Failure 400 {object} map[string]string
// @Router /auth [post]
func (c *UserController) AuthUser(w http.ResponseWriter, r *http.Request) {
	var auth model.Auth
	json.NewDecoder(r.Body).Decode(&auth)
	user, err := c.userService.GetUserByLoginPwd(auth.Username, auth.Password)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	if len(user) == 0 {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	fmt.Println(user[0])

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user[0].ID)
}


func (c *UserController) WinBattle(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	err := c.userService.WinBattle(id)
	if err != nil || id == "" {
		http.Error(w, fmt.Sprintf("User with ID %s not found", id), http.StatusNotFound)
		return
	}

	err = c.userService.WinBattle(id)
	if err != nil {
		http.Error(w, "Failed to update user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("%v", err != nil)))
}