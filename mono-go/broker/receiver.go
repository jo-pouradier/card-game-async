package broker

import (
	"log"
	"sync"

	"github.com/go-stomp/stomp/v3"
)

type ReceiverBroker struct {
	client   *stomp.Conn
	wg       *sync.WaitGroup
	queue    string
	Callback func(*stomp.Message)
}

func GetBrokerReceiver(queue string, callback func(*stomp.Message)) *ReceiverBroker {
	instance, ok := receiverInstances[queue];
	if  !ok {
		client, err := initializeBrokerClientConn()
		if err != nil {
			log.Fatalf("Failed to connect to the broker: %v", err)
		}

		instance = &ReceiverBroker{
			client:   client,
			queue:    queue,
			Callback: callback,
			wg:       &sync.WaitGroup{},
		}

		instance.Start()
		receiverInstances[queue] = instance
		log.Printf("Created new receiver for queue %s\n", queue)
	}
	return instance
}

func (receiver *ReceiverBroker) Start() {
	log.Printf("Starting receiver for queue %s\n", receiver.queue)
	sub, err := receiver.client.Subscribe(receiver.queue, stomp.AckAuto)
	// defer sub.Unsubscribe()
	if err != nil {
		println("cannot subscribe to", receiver.queue, err.Error())
		return
	}

	receiver.wg.Add(1)
	go func() {
		defer receiver.wg.Done()
		for {
			msg := <-sub.C
			if msg.Err != nil {
				log.Printf("Error while receiving message from queue %s: %v\n", receiver.queue, msg.Err)
				continue
			}
			log.Printf("Received message from queue %s: %s\n", receiver.queue, string(msg.Body))
			actualText := string(msg.Body)
			log.Println(actualText)
			receiver.Callback(msg)
		}
	}()
}
