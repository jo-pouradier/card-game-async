package broker

import (
	"os"
	"sync"
)

// NotificationService defines the interface for sending notifications.
type NotificationService interface {
	SendNotification(notification *Notification[any]) error
}

// NotificationServiceImp is the concrete implementation of NotificationService.
type NotificationServiceImp struct {
	sender *SenderBroker
}

var (
	notificationServiceImpl NotificationService
	once                    sync.Once
)

// GetNotificationServiceImp returns the singleton instance of NotificationService.
func GetNotificationServiceImp() NotificationService {
	once.Do(func() {
		brokerSender := GetBrokerSender(os.Getenv("NODEJS_MESSAGING_QUEUE_NAME"))
		notificationServiceImpl = &NotificationServiceImp{sender: brokerSender}
	})
	return notificationServiceImpl
}

// SendNotification sends a Notification to the broker.
func (n *NotificationServiceImp) SendNotification(notification *Notification[any]) error {
	n.sender.Send(notification)
	return nil
}
