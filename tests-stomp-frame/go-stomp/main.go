package main

import (
	"log"

	"github.com/jo-pouradier/stomp"
)

func main() {
	conn, err := stomp.Dial("tcp", "192.168.1.3:61613",
		stomp.ConnOpt.Login("myuser", "mypwd"),
		stomp.ConnOpt.Host("/"),
	)
	if err != nil {
		log.Fatalf("Failed to connect to broker: %v", err)
	}
	defer conn.Disconnect()

	// Send a message to a queue
	err = conn.Send(
		"GENERATION-IMAGE-INPUT",   // Destination
		"text/plain",               // Content-Type
		[]byte("Hello, STOMP GO!"), // Message body
		stomp.SendOpt.Header("content-type", "text/plain"),
	)
	if err != nil {
		log.Fatalf("Failed to send message: %v", err)
	}

	log.Println("Message sent successfully")
}
