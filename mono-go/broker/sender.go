package broker

import (
	"log"
	"os"
	"sync"
	"time"

	"github.com/go-stomp/stomp"
	"github.com/go-stomp/stomp/frame"
)

// Used to get correct communication between services (java specificaly)
type JMSData interface {
	GetJMSType() string
	GetData() (string, error)
}

type SenderBroker struct {
	client      *stomp.Conn
	messageChan chan JMSData
	wg          *sync.WaitGroup
	queue       string
}

var (
	senderInstances   = make(map[string]*SenderBroker)
	receiverInstances = make(map[string]*ReceiverBroker)
	client            *stomp.Conn
	clientErr         error
	clientOnce        sync.Once
	brokerAddr        string
	brokerUser        string
	brokerPwd         string
)

func initializeBrokerClientConn() (*stomp.Conn, error) {
	clientOnce.Do(func() {
		brokerAddr = os.Getenv("BROKER_ADDRESS")
		brokerUser = os.Getenv("BROKER_USER")
		brokerPwd = os.Getenv("BROKER_PWD")

		if brokerAddr == "" {
			brokerAddr = "localhost:61613" // Default broker address
		}

		options := []func(*stomp.Conn) error{
			stomp.ConnOpt.Login(brokerUser, brokerPwd),
			stomp.ConnOpt.HeartBeat(10*time.Second, (1<<16)*time.Hour), // basically disable heartbeats, there must be a better way
			stomp.ConnOpt.Header("client-id", "go-client"),
		}

		client, clientErr = stomp.Dial("tcp", brokerAddr, options...)
	})
	return client, clientErr
}

func GetBrokerSender(queue string) *SenderBroker {
	instance, ok := senderInstances[queue]
	if !ok {
		client, err := initializeBrokerClientConn()
		if err != nil {
			log.Fatalf("Failed to connect to the broker: %v", err)
		}

		instance = &SenderBroker{
			client:      client,
			queue:       queue,
			messageChan: make(chan JMSData, 100), // Buffered channel
			wg:          &sync.WaitGroup{},
		}

		instance.Start()
		senderInstances[queue] = instance
		log.Printf("Created new sender for queue %s\n", queue)
	}
	return instance
}

func (sender *SenderBroker) Start() {
	// if already started, return
	sender.wg.Add(1)
	go func() {
		defer sender.wg.Done()
		log.Println("Starting sender broker on queue: ", sender.queue)
		for {
			message, ok := <-sender.messageChan
			log.Println("Sending message from broker on queue '", sender.queue, "': ", message)
			if !ok {
				return
			}
			jsonMessage, err := message.GetData()
			if err != nil {
				log.Printf("Failed to marshal message: %v\n", err)
				continue
			}

			addHeaders := func(frame *frame.Frame) error {
				frame.Header.Add("type", message.GetJMSType())
				return nil
			}

			removeConentLength := func(frame *frame.Frame) error {
				frame.Header.Del("content-length")
				return nil
			}

			if err := sender.client.Send(sender.queue, "text/plain", []byte(jsonMessage), addHeaders, removeConentLength); err != nil {
				log.Printf("Failed to send message: %v\n", err)
			} else {
				log.Printf("Message sent successfully: %s\n", jsonMessage)
			}
		}
	}()
}

func (sender *SenderBroker) Send(message JMSData) {
	sender.messageChan <- message
}

func (sender *SenderBroker) Stop() {
	close(sender.messageChan)
	sender.wg.Wait()

	if err := sender.client.Disconnect(); err != nil {
		log.Printf("Failed to disconnect from broker: %v", err)
	}
}
