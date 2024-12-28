package broker

import (
	"log"
	"sync"

	"github.com/go-stomp/stomp/v3"
)

type ReceiverBroker struct {
	client      *stomp.Conn
	wg          *sync.WaitGroup
	queue       string
	callback   func(*stomp.Message)
}

func GetBrokerReceiver(queue string, callback func(*stomp.Message)) *ReceiverBroker {
	if _, ok := receiverInstances[queue]; ok {
		client, err := initializeBrokerClientConn()
		if err != nil {
			log.Fatalf("Failed to connect to the broker: %v", err)
		}

		instance := &ReceiverBroker{
			client:            client,
			queue: queue,
			callback: callback,
		}

		instance.Start()
		receiverInstances[queue] = instance
		log.Printf("Created new receiver for queue %s\n", queue)
	}
	return receiverInstances[queue]
}

func (receiver *ReceiverBroker) Start() {
	log.Printf("Starting receiver for queue %s\n", receiver.queue)
	sub, err := receiver.client.Subscribe(receiver.queue, stomp.AckAuto)
	if err != nil {
		println("cannot subscribe to", receiver.queue, err.Error())
		return
	}

	// if already started, return
	if receiver.wg != nil {
		return
	}

	receiver.wg.Add(1)
	go func() {
		defer receiver.wg.Done()
		for {
			msg := <-sub.C
			log.Printf("Received message from queue %s: %s\n", receiver.queue, string(msg.Body))
			actualText := string(msg.Body)
			log.Println(actualText)
			receiver.callback(msg)
		}
	}()
}
