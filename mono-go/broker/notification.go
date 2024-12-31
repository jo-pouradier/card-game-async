package broker

import (
	"encoding/json"
	"fmt"
	"math/rand"
)

// NotificationSeverity represents the severity of a notification.
type NotificationSeverity string

const (
	SeverityInfo    NotificationSeverity = "INFO"
	SeverityWarning NotificationSeverity = "WARNING"
	SeverityError   NotificationSeverity = "ERROR"
)

// Notification represents a notification data transfer object.
type Notification[T any] struct {
	ID        int64                `json:"id"`
	UserID    uint                 `json:"userId"`
	Message   T                    `json:"message"`
	Severity  NotificationSeverity `json:"severity"`
	Sender    string               `json:"sender"`
	Broadcast bool                 `json:"broadcast"`
	jsmType   string               `json:"-"`
}

// NewNotificationDTO creates a new NotificationDTO instance.
func NewNotification[T any](userID uint, message T, severity NotificationSeverity, sender string) *Notification[T] {
	return &Notification[T]{
		ID:        rand.Int63(),
		UserID:    userID,
		Message:   message,
		Severity:  severity,
		Sender:    sender,
		Broadcast: false,
	}
}

// String returns a string representation of the NotificationDTO.
func (dto *Notification[T]) String() string {
	json, err := json.Marshal(dto)
	if err != nil {
		return fmt.Sprintf(
			"NotificationDTO{id=%d, message='%v', severity='%s', sender='%s'}",
			dto.ID, dto.Message, dto.Severity, dto.Sender,
		)
	}
	return fmt.Sprintf("NotificationDTO=%s", string(json))
}

// MarshalJSON checks if the message is JSON-marshallable and marshals the DTO.
func (dto *Notification[T]) MarshalJSON() ([]byte, error) {
	_, err := json.Marshal(dto.Message) // Ensure Message is marshallable
	if err != nil {
		return nil, fmt.Errorf("message is not JSON-marshallable: %w", err)
	}
	type Alias Notification[T]
	return json.Marshal((*Alias)(dto))
}

func (dto *Notification[T]) GetJMSType() string {
	return dto.jsmType
}

func (dto *Notification[T]) GetData() (string, error) {
	bytes, err := dto.MarshalJSON()
	return string(bytes), err
}
