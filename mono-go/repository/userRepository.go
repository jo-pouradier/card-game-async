package repository

import (
	"github.com/jo-pouradier/card-game-async/mono-go/model"
	"gorm.io/gorm"
)

type UserRepository struct {
	DB *gorm.DB
}

// NewUserRepository creates a new UserRepository instance.
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{DB: db}
}

// FindByLoginAndPwd retrieves users by login and password.
func (r *UserRepository) FindByLoginAndPwd(login, pwd string) ([]model.User, error) {
	var users []model.User
	err := r.DB.Where("login = ? AND pwd = ?", login, pwd).Find(&users).Error
	return users, err
}

// FindByEmail retrieves a user by email.
func (r *UserRepository) FindByEmail(email string) (*model.User, error) {
	var user model.User
	err := r.DB.Where("email = ?", email).First(&user).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	return &user, err
}

func (r *UserRepository) FindAll() ([]model.User, error) {
	var users []model.User
	// err := r.DB.Find(&users).Error
	err := r.DB.Model(&model.User{}).Preload("CardList").Find(&users).Error
	return users, err
}

func (r *UserRepository) FindByID(id string) (*model.User, error) {
	var user model.User
	err := r.DB.Where("id = ?", id).Preload("CardList").First(&user).Error
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	return &user, err
}

func (r *UserRepository) Save(user *model.User) (*model.User, error) {
	// delete id to avoid overwriting
	user.ID = 0
	err := r.DB.Create(user).Error
	return user, err
}

func (r *UserRepository) Update(user *model.User) (*model.User, error) {
	err := r.DB.Save(user).Error
	return user, err
}

func (r *UserRepository) Delete(id string) error {
	return r.DB.Delete(&model.User{}, id).Error
}
