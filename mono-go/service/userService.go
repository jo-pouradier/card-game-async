package service

import (
	"errors"
	"strconv"

	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"github.com/jo-pouradier/card-game-async/mono-go/repository"
)

type UserService struct {
	UserRepo         *repository.UserRepository
	CardModelService *CardService
}

// NewUserService creates a new instance of UserService.
func NewUserService(userRepo *repository.UserRepository, cardSvc *CardService) *UserService {
	return &UserService{
		UserRepo:         userRepo,
		CardModelService: cardSvc,
	}
}

// GetAllUsers retrieves all users from the repository.
func (s *UserService) GetAllUsers() ([]model.User, error) {
	return s.UserRepo.FindAll()
}

// GetUser retrieves a user by ID (as a string).
func (s *UserService) GetUser(id string) (*model.User, error) {
	return s.UserRepo.FindByID(id)
}

// AddUser adds a new user and initializes cards and account balance.
func (s *UserService) AddUser(user *model.User) (*model.User, error) {
	if existingUser, _ := s.UserRepo.FindByEmail(user.Email); existingUser != nil {
		return nil, errors.New("user already exists")
	}

	// Initialize random cards
	cards, err := s.CardModelService.GetRandCard(5)
	if err != nil {
		return nil, err
	}

	// create map for cardList
	user.CardList = []model.Card{}
	user.CardList = append(user.CardList, cards...)

	// Initialize account balance
	user.Account = 10000

	// Save the user
	savedUser, err := s.UserRepo.Save(user)
	if err != nil {
		return nil, err
	}

	// Map saved User back to DTO
	return savedUser, nil
}

// UpdateUser updates an existing user using DTO.
func (s *UserService) UpdateUser(id string, user *model.User) (*model.User, error) {
	// updatedUser, err := s.UserRepo.Save(user)
	// if err != nil {
	// 	return nil, err
	// }
	// return updatedUser, nil
	updatedUser, err := s.UserRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("user not found")
	}
	ID, _ := strconv.Atoi(id)
	if updatedUser.ID == uint(ID) {
		updatedUser.Login = user.Login
		updatedUser.Pwd = user.Pwd
		updatedUser.LastName = user.LastName
		updatedUser.SurName = user.SurName
		updatedUser.Email = user.Email
		updatedUser.Account = user.Account
		updatedUser.CardList = user.CardList
		_, err := s.UserRepo.Update(updatedUser)
		if err != nil {
			return nil, err
		}
		return updatedUser, nil
	} else {
		return nil, errors.New("user not found")
	}

}

// DeleteUser deletes a user by ID.
func (s *UserService) DeleteUser(id string) error {
	return s.UserRepo.Delete(id)
}

// GetUserByLoginPwd retrieves users by login and password.
func (s *UserService) GetUserByLoginPwd(login, pwd string) ([]model.User, error) {
	return s.UserRepo.FindByLoginAndPwd(login, pwd)
}

// WinBattle adds account balance to a user after winning a battle.
func (s *UserService) WinBattle(userID string) error {
	user, err := s.UserRepo.FindByID(userID)
	if err != nil {
		return err
	}

	// Increment user account balance
	user.Account += 100

	// Save the updated user
	_, updateErr := s.UserRepo.Update(user)
	return updateErr
}
