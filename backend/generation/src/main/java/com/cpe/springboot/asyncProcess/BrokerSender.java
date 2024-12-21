package com.cpe.springboot.asyncProcess;

import com.cpe.springboot.generation.GenerationDTOAbstact;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class BrokerSender {

    private static final org.slf4j.Logger log = LoggerFactory.getLogger(BrokerSender.class);
    private JmsTemplate jmsTemplate;

    @Value("${generation-output.queue.name}")
    private String queueName;

    private Environment environment;

    private ObjectMapper objectMapper;

    private final Logger logger = Logger.getLogger(BrokerSender.class.getName());

    @Autowired
    public void Sender(JmsTemplate jmsTemplate, Environment environment) {
        this.jmsTemplate = jmsTemplate;
        this.environment = environment;
        this.objectMapper = generateObjectMapper();
    }

    private ObjectMapper generateObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper;
    }

    public void sendMessage(GenerationDTOAbstact msg) {
        jmsTemplate.convertAndSend(queueName, msg,
                message -> {
                    message.setJMSType(msg.getClass().getName());
                    return message;
                });
    }
}
