package com.cpe.springboot.spring;

import com.cpe.springboot.asyncProcess.BrokerReceiver;
import com.cpe.springboot.generation.GenerationType;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.jms.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.annotation.JmsListenerConfigurer;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerEndpointRegistrar;
import org.springframework.jms.config.SimpleJmsListenerEndpoint;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.handler.annotation.support.DefaultMessageHandlerMethodFactory;

import java.util.ArrayList;
import java.util.List;

@EnableJms
@Configuration
public class JmsListenerConfig implements JmsListenerConfigurer {
    @Bean
    public DefaultMessageHandlerMethodFactory handlerMethodFactory() {
        DefaultMessageHandlerMethodFactory factory = new DefaultMessageHandlerMethodFactory();
        factory.setMessageConverter(messageConverter());
        return factory;
    }

    @Bean
    public MessageConverter messageConverter() {
        final MappingJackson2MessageConverter jsonConverter = new MappingJackson2MessageConverter();
        jsonConverter.setObjectMapper(objectMapper());
        return jsonConverter;
    }

    @Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper;
    }

    @Value("${queue.pattern}")
    private String queuePattern;

    @Value("${generation-input.queue.name}")
    private String generationQueueName;

    @Value("${generation-output.queue.name}")
    private String generationOutputQueueName;

    @Value("${nodejs-messaging.queue.name}")
    private String nodejsMessagingQueueName;
    @Value("${chat.queue.name}")
    private String chatQueueName;

    @Autowired
    private BrokerReceiver messageListener;

    @Override
    public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {

        List<String> queueNames = new ArrayList<>();
        for (GenerationType type : GenerationType.values()) {
            queueNames.add(generationQueueName.replace("{GENERATION_TYPE}", type.name()) + queuePattern);
        }
        queueNames.add(generationOutputQueueName + queuePattern);
        queueNames.add(nodejsMessagingQueueName + queuePattern);
        queueNames.add(chatQueueName + queuePattern);

        int counter = 1;

        for (String queueName : queueNames) {
            System.out.println("Registering endpoint for queue: " + queueName);
            SimpleJmsListenerEndpoint endpoint = new SimpleJmsListenerEndpoint();
            endpoint.setId("endpoint-" + counter);
            endpoint.setDestination(queueName);
            endpoint.setMessageListener(messageListener);
            registrar.registerEndpoint(endpoint,
                    jmsTopicListenerContainerFactory(null));
            registrar.setMessageHandlerMethodFactory(handlerMethodFactory());
            counter++;
        }
    }

    @Bean
    public DefaultJmsListenerContainerFactory jmsTopicListenerContainerFactory(ConnectionFactory connectionFactory) {
        DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setPubSubDomain(true); // Enable topic-mode for Pub/Sub
        return factory;
    }
}
