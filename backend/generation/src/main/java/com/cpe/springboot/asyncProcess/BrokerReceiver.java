package com.cpe.springboot.asyncProcess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
public class BrokerReceiver {

    private BrokerSender sender;

    @Autowired
    public void Receiver(BrokerSender sender) {
        this.sender = sender;
    }

    @JmsListener(destination = "${spring-messaging.queue.name}")
    public void receiveMessage() {
        sender.sendMessage();
    }
}
