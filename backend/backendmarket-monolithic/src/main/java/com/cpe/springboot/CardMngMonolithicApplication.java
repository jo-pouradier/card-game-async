package com.cpe.springboot;

import com.cpe.springboot.notification.BrokerSender;
import com.cpe.springboot.notification.model.NotificationDTO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.jms.annotation.EnableJms;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@EnableJms
@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Card Market Rest Api", version = "1.0", description = "Information about the Card Market APi and how to interact with"))
// doc here localhost:8080/swagger-ui.html
public class CardMngMonolithicApplication {

	public static void main(String[] args) {
//		 ConfigurableApplicationContext context = SpringApplication.run(CardMngMonolithicApplication.class, args);
//
//		System.out.println("Sending a notification message.");
//		BrokerSender sender = context.getBean(BrokerSender.class);
//		sender.sendNotification(new NotificationDTO(1, "Hello", "INFO", "java monolithic"));
//
//		// SpringApplication.run(CardMngMonolithicApplication.class, args);

		SpringApplication.run(CardMngMonolithicApplication.class, args);
	}




}
