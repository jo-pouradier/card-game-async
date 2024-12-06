package com.cpe.springboot.asyncProcess;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

import com.cpe.springboot.services.TextGeneration;

@Service
public class BrokerReceiver {

    private BrokerSender sender;

    @Autowired
    public void Receiver(BrokerSender sender) {
        this.sender = sender;
    }

    @JmsListener(destination = "${card-generator.queue.name}")
    public void receiveMessage(String imgUrl) {
        imgUrl = imgUrl.replaceAll("^\"|\"$", "");
        System.out.println("Received <" + imgUrl + ">");
        sender.sendMessage(TextGeneration.getProperties(imgUrl).toString());
    }
}
