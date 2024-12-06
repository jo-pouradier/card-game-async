package com.cpe.springboot;

import com.cpe.springboot.notification.BrokerSender;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jms.annotation.EnableJms;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@EnableJms
@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Card Market Rest Api", version = "1.0", description = "Information about the Card Market APi and how to interact with"))
// doc here localhost:8083/swagger-ui.html
public class CardMngMonolithicApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);

		System.out.println("Sending a notification message.");
		Sender sender = context.getBean(BrokerSender.class);
		String queueKey = "fr.cpe.nodejs-app.queue.in";
		sender.setQueue(context.getEnvironment().getProperty(queueKey));
		sender.sendMessage(new NotificationDTO(1, "Hello", "INFO", "java monolithic"));
		sender.init();

		// SpringApplication.run(CardMngMonolithicApplication.class, args);
	}




}
